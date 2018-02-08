//core
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

//custom
const validators = require('./../services/validators');
const GeneralGuidance = require('./schemas/GeneralGuidance');

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
	assignment: {
		carer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		income: {
			type: Number,
			default: 0
		}
	},
	role: {
		type: String,
		required: [ true, "{PATH} field is required." ],
		enum: [ "Carer", "Senior Carer" ]
	},
	gender_preference: {
		type: String,
		enum: [ "Male", "Female" ]
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
	next();
});

schema.post("findOne", function (job)
{
    job.start_date = job.start_date.getTime();
    job.end_date = job.end_date.getTime();
});

schema.plugin(mongoosePaginate);
module.exports.schema = mongoose.model("Job", schema);