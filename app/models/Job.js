//core
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

//services
const validators = require('./../services/validators');

//schemas
const GeneralGuidance = require('./schemas/GeneralGuidance');
const CarerRoles = require('./schemas/Carer').eligibleRoles;
const ReviewSchema = require("./schemas/Review").schema;
const Challenge = require("./schemas/Challenge");
const Payment = require("./schemas/Payment").schema;
const Charge = require("./schemas/Charge").schema;
const Pricing = require("./schemas/Pricing");
const SummarySheetSchema = require("./schemas/SummarySheet").schema;

//settings
const statuses = {
	POSTED: "POSTED",
	EXPIRED: "EXPIRED",
	ACCEPTED: "ACCEPTED",
	PENDING_SUMMARY_SHEET: "PENDING_SUMMARY_SHEET",
    PENDING_PAYMENT: "PENDING_PAYMENT",
    CHALLENGED: "CHALLENGED",
    PAYMENT_CANCELLED: "PAYMENT_CANCELLED",
    PAID: "PAID",
    PAYMENT_REJECTED: "PAYMENT_REJECTED",
    CANCELLED: "CANCELLED"
};

const genderPreferences = {
	MALE: "Male",
	FEMALE: "Female",
	NO_PREFERENCE: "No preference"
}

//job notifications
const jobNotificationStatuses = {
	SCHEDULED: "SCHEDULED",
	SENT: "SENT",
	DUPLICATE: "DUPLICATE",
	CARER_UNAVAILABLE: "CARER_UNAVAILABLE",
	CANCELLED: "CANCELLED"
};

//notification job buckets
const buckets = ["preferred", "starsFourToFive", "starsThreeToFour", "unrated", "starsTwoToThree", "starsOneToTwo" ];

const schema = mongoose.Schema({
	start_date: {
		type: Date,
		required: [ true, "{PATH} field is required." ],
		validate: [ validators.futureDate('start_date'), validators.dateMaxDaysForward('start_date', 35) ],
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
	booking_pricing: {
		manual_booking_pricing: {
			type: Number,
            min: 0,
            default: 0,
		},
		app_commission: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
		},
		pricing: Pricing.pricing_hours
	},
	charge: Charge,
	assignment: {
		carer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		payment: Payment,
		summary_sheet: SummarySheetSchema,
		review: ReviewSchema,
		challenge: Challenge.schema,
        created: Date
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
	priority_carers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
	],
    notifications: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
			},
            time: {
                type: Date,
                required: [ true, "{PATH} field is required." ]
            },
            bucket: {
                type: String,
                required: [ true, "{PATH} field is required." ]
            },
			status: {
            	type: String,
				enum: Object.values(jobNotificationStatuses),
				default: jobNotificationStatuses.SCHEDULED
			},
        }
    ],
    group: {
        type: String,
        required: [ true, "{PATH} field is required." ]
    },
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
	this.status = handleJobStatus(this);

	if(this.assignment.carer)
	{
		//removing decline
		this.declines.pull(this.assignment.carer);
		const job = this;

		//adding job to carer if doesn't exists
		const User = require('./User').schema;
		User.findOne({ _id: job.assignment.carer }, (error, user) => {
			if(user.carer.jobs.indexOf(job._id) == -1)
				user.carer.jobs.push(job);

			user.save().catch(error => console.log(error)); // trigger save to automatically handle care exp and reviews calculation
		});
	}

	next();
});

schema.post('init', function(job)
{
    if(!this.isNew)
        job.initial = JSON.parse(JSON.stringify(job));

    //job status handle
    job.status = handleJobStatus(job);
});

//methods
schema.methods.calculateJobCost = function()
{
	const startDate = (this.assignment && this.assignment.summary_sheet && this.assignment.summary_sheet.start_date) ? this.assignment.summary_sheet.start_date : this.start_date;
	const endDate = (this.assignment && this.assignment.summary_sheet && this.assignment.summary_sheet.end_date) ? this.assignment.summary_sheet.end_date : this.end_date;
	const deductedMinutes = this.assignment && this.assignment.summary_sheet && this.assignment.summary_sheet.voluntary_deduction ? this.assignment.summary_sheet.voluntary_deduction : 0;

	const price = 11.5;
	const manualBooking = 1;

	const durationMinutes = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60));
	const jobMinutes = Math.max((durationMinutes - deductedMinutes), 0);

	const cost = ((jobMinutes / 60) * price + (this.manual_booking ? (jobMinutes / 60) * manualBooking : 0)).toPrecision(2);

	console.log(cost);
}

//statics
schema.statics.parse = function(job, req)
{
    if(job)
    {
	    const fileHandler = require("../services/fileHandler")(req);
		const User = require('./User').schema;

		//dates
		if(job.start_date)
        	job.start_date = job.start_date.getTime();

		if(job.end_date)
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

		if(job.assignment)
		{
			//carer
			if(job.assignment.carer)
				job.carer = job.assignment.carer ? User.parse(job.assignment.carer, req) : null;

			//review
			if(job.assignment.review)
			{
				if(job.assignment.review.created)
                	job.assignment.review.created = job.assignment.review.created.getTime();

                job.review = job.assignment.review;
            }

            //challenge
            if(job.assignment.challenge)
            {
                if(job.assignment.challenge.created)
                    job.assignment.challenge.created = job.assignment.challenge.created.getTime();

                job.challenge = job.assignment.challenge;
            }

            //summary sheet
            if(job.assignment.summary_sheet)
            {
                if(job.assignment.summary_sheet.created)
                    job.assignment.summary_sheet.created = job.assignment.summary_sheet.created.getTime();

                if(job.assignment.summary_sheet.signature)
                    job.assignment.summary_sheet.signature = fileHandler.getFileUrl(job.assignment.summary_sheet.signature);

                if(job.assignment.summary_sheet.start_date && job.assignment.summary_sheet.end_date)
				{
                    job.assignment.summary_sheet.start_date = job.assignment.summary_sheet.start_date.getTime();
                    job.assignment.summary_sheet.end_date = job.assignment.summary_sheet.end_date.getTime();
				}

                job.summary_sheet = job.assignment.summary_sheet;
            }

	        delete job.assignment;
		}

		if(job.created)
			job.created = job.created.getTime();
    }

    return job;
}

function handleJobStatus(job)
{
    if(!job.assignment.carer && job.end_date.getTime() > new Date().getTime() && job.status != statuses.CANCELLED)
        return statuses.POSTED;
    else if(!job.assignment.carer && job.end_date.getTime() < new Date().getTime() && job.status != statuses.CANCELLED)
        return statuses.EXPIRED;
    else if(job.assignment.carer && !job.assignment.summary_sheet && job.start_date.getTime() > new Date().getTime() && job.status != statuses.CANCELLED)
        return statuses.ACCEPTED;
    else if(job.assignment.carer && !job.assignment.summary_sheet && job.start_date.getTime() < new Date().getTime() && job.status != statuses.CANCELLED)
        return statuses.PENDING_SUMMARY_SHEET;
    else if(job.assignment.carer && job.assignment.summary_sheet && job.assignment.payment && (job.assignment.payment.debit_date.getTime() > new Date().getTime()) && (!job.assignment.challenge || job.assignment.challenge.status == Challenge.challengeStatuses.CANCELLED) && job.status != statuses.CANCELLED)
        return statuses.PENDING_PAYMENT;
    else if(job.assignment.carer && job.assignment.summary_sheet && job.assignment.challenge && job.assignment.challenge.status == Challenge.challengeStatuses.ACTIVE && job.status != statuses.CANCELLED)
        return statuses.CHALLENGED;
    else
        return job.status;
}

schema.plugin(mongoosePaginate);
schema.plugin(mongooseAggregatePaginate);

module.exports.schema = mongoose.model("Job", schema);
module.exports.statuses = statuses;
module.exports.genderPreferences = genderPreferences;
module.exports.jobNotificationStatuses = jobNotificationStatuses;
module.exports.buckets = buckets;