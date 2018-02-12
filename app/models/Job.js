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
		},
		created: Date,
		summary_sheet: {
			signature: {
				type: String,
				required: validators.required_if_present("assignment.summary_sheet")
            },
            name: {
                type: String,
                required: validators.required_if_present("assignment.summary_sheet"),
                maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
            },
            position: {
                type: String,
                required: validators.required_if_present("assignment.summary_sheet"),
                maxlength: [ 50, "{PATH} can't be longer than {MAXLENGTH} characters." ]
            },
            notes: {
                type: String,
                maxlength: [ 500, "{PATH} can't be longer than {MAXLENGTH} characters." ]
            },
			start_date: {
				type: Date,
                required: validators.required_if_present("assignment.summary_sheet.end_date"),
                validate: validators.dateGreaterThanDateField("start_date")
			},
            end_date: {
                type: Date,
                required: validators.required_if_present("assignment.summary_sheet.start_date"),
                validate: validators.dateGreaterThanDateField("start_date")
            }
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
	if(!this.isNew && this.assignment.carer)
	{
		//removing decline
		this.declines.pull(this.assignment.carer);
		const job = this;

		const User = require('./User').schema;
		User.findOne({ _id: job.assignment.carer }, (error, user) => {
			user.carer.jobs.pull(job._id);
			user.save().catch(error => console.log(error));
		});
	}

	next();
});

//statics
schema.statics.parseJob = function(job, req)
{
    if(job)
    {
        job.start_date = job.start_date.getTime();
        job.end_date = job.end_date.getTime();

        //guidance link
        if(job.general_guidance)
		{
            let link = job.general_guidance.floor_plan.substr(job.general_guidance.floor_plan.indexOf("\\") + 1).replace(/\\/g,"/");
            job.general_guidance.floor_plan = `http://${req.headers.host}/${link}`;
		}

		job["author"] = job.care_home;
        delete job.care_home;
    }

    return job;
}

schema.plugin(mongoosePaginate);
module.exports.schema = mongoose.model("Job", schema);