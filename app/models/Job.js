//core
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

//custom
const validators = require('./../services/validators');
const GeneralGuidance = require('./schemas/GeneralGuidance');
const CarerRoles = require('./schemas/Carer').eligibleRoles;
const ReviewSchema = require("./schemas/Review").schema;
const ChallengeSchema = require("./schemas/Challenge").schema;
const SummarySheetSchema = require("./schemas/SummarySheet").schema;

//settings
const statuses = {
	POSTED: "POSTED",
	EXPIRED: "EXPIRED",
	ACCEPTED: "ACCEPTED",
	PENDING_SUMMARY_SHEET: "PENDING_SUMMARY_SHEET",
	SUBMITTED_SUMMARY_SHEET: "SUBMITTED_SUMMARY_SHEET",
    PENDING_PAYMENT: "PENDING_PAYMENT",
    CHALLENGED: "CHALLENGED",
    PAID: "PAID",
    PAYMENT_REJECTED: "PAYMENT_REJECTED",
    CANCELLED: "CANCELLED"
};

const genderPreferences = {
	MALE: "Male",
	FEMALE: "Female",
	NO_PREFERENCE: "No preference"
}


const schema = mongoose.Schema({
	start_date: {
		type: Date,
		required: [ true, "{PATH} field is required." ],
		validate: validators.futureDate,
	},
	end_date: {
		type: Date,
		required: [ true, "{PATH} field is required." ],
		validate: [ validators.dateGreaterThanDateField("start_date"), validators.maxDateRangeAccordingToField("start_date", 1000 * 60 * 60 * 24) ]
	},
	care_home: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: [ true, "{PATH} field is required." ]
	},
	manual_booking: {
		type: Boolean,
		default: false
	},
	assignment: {
		carer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		income: {
			type: Number,
			default: 0
		},
		created: Date,
		summary_sheet: SummarySheetSchema,
		review: ReviewSchema,
		challenge: ChallengeSchema
	},
	role: {
		type: String,
		required: [ true, "{PATH} field is required." ],
		enum: Object.values(CarerRoles)
	},
	gender_preference: {
		type: String,
		enum: Object.values(genderPreferences),
		default: genderPreferences.NO_PREFERENCE
	},
	notes: {
		type: String,
		maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ],
		default: null
	},
	general_guidance: GeneralGuidance.general_guidance(true),
    withdrawals: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job_withdrawal",
        }
    ],
    declines: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    status: {
        type: String,
        enum: Object.values(statuses),
        default: statuses.POSTED
    },
	created: {
		type: Date,
		default: Date.now()
	},
	updated: {
		type: Date,
		default: Date.now()
	},

}, { usePushEach: true });

//middlewares
schema.pre("save", function (next)
{
	this.updated = new Date();
	if(!this.isNew && this.assignment.carer)
	{
		//removing decline
		this.declines.pull(this.assignment.carer);
		const job = this;

		const User = require('./User').schema;
		User.findOne({ _id: job.assignment.carer }, (error, user) => {
			if(user.carer.jobs.indexOf(job._id) == -1)
			{
				user.carer.jobs.push(job);
				user.save().catch(error => console.log(error));
			}
		});
	}



	next();
});

//statics
schema.statics.parse = function(job, req)
{
    if(job)
    {
	    const fileHandler = require("../services/fileHandler")(req);
		const User = require('./User').schema;

        job.start_date = job.start_date.getTime();
        job.end_date = job.end_date.getTime();

        //guidance link
        if(job.general_guidance && job.general_guidance.floor_plan)
	        job.general_guidance.floor_plan = fileHandler.getFileUrl(job.general_guidance.floor_plan);

		//care home
		if(job.care_home)
		{
			job.care_home =  User.parse(job.care_home, req);
            job.author = job.care_home;
            delete job.care_home;
		}

		//carer
		if(job.assignment)
		{
            User.parse(job.assignment.carer, req);
			job.carer = job.assignment.carer || null;
			delete job.assignment;
		}
    }

    return job;
}

schema.plugin(mongoosePaginate);
schema.plugin(mongooseAggregatePaginate);

module.exports.schema = mongoose.model("Job", schema);
module.exports.statuses = statuses;