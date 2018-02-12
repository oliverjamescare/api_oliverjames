//core
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    carer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
	job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
    },
    message: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        maxlength: [ 350, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
	created: {
		type: Date,
		default: Date.now()
	}

}, { usePushEach: true });

//middlewares
schema.pre("save", function (next)
{
	//on add new withdrawal
	const User = require("./User").schema;
	const Job = require("./Job").schema;
	const withdrawal = this;

	if(this.isNew)
	{
		User.findOne({ _id: withdrawal.carer }).then(user => {
			user.carer.job_withdrawals.push(withdrawal);
			user.carer.jobs.pull(withdrawal.job);

			user.save().catch(error => console.log(error));
        });

        Job.findOne({ _id: withdrawal.job }).then(job => {
            job.withdrawals.push(withdrawal);
            job.assignment.carer = undefined;

            job.save().catch(error => console.log(error));
        });
	}

	this.updated = new Date();
	next();
});

module.exports.schema = mongoose.model("Job_withdrawal", schema);