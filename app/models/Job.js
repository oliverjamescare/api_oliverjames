//core
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const moment = require('moment');
const async = require('async');
const config = process.env;

//services
const validators = require('./../services/validators');
const paths = require('./../../config/paths');

//schemas
const GeneralGuidance = require('./schemas/GeneralGuidance');
const Pricing = require("./schemas/Pricing");

const CarerRoles = require('./schemas/Carer').eligibleRoles;
const ReviewSchema = require("./schemas/Review");
const Review = ReviewSchema.schema;
const ChallengeSchema = require("./schemas/Challenge");
const Challenge = ChallengeSchema.schema;
const Payment = require("./schemas/Payment").schema;
const Charge = require("./schemas/Charge").schema;
const SummarySheet = require("./schemas/SummarySheet").schema;

const User = require("./User").schema;

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
		validate: [ validators.futureDate('start_date', "{PATH} cannot be earlier than 30 minutes from now.", 1000 * 60 * 30), /* 30min delay */ validators.dateMaxDaysForward('start_date', 35) ],
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
    percent_charge: {
        type: Number,
        min: 0,
        max: 100,
        default: 100
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
        max_to_deduct: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },
		pricing: Pricing.pricing_hours
	},
	charge: Charge,
    cost: {
        job_cost: {
            type: Number,
            min: 0,
            default: 0
        },
        manual_booking_cost: {
            type: Number,
            min: 0,
            default: 0
        },
        total_cost: {
            type: Number,
            min: 0,
            default: 0
        }
    },
	assignment: {
	    projected_income: {
            type: Number,
            min: 0
        },
		carer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		payment: Payment,
		summary_sheet: SummarySheet,
		review: Review,
		challenge: Challenge,
        acceptance_document: String,
        created: {
		    type: Date,
            required: validators.required_if_present('assignment.carer')
        }
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
	//dates handle
	if (this.isNew)
		this.created = new Date();

	this.updated = new Date();
	this.status = handleJobStatus(this);

	//cost calculation
    const JobsHandler = require("./../services/JobsHandler");
    const costs = JobsHandler.calculateJobCost(this);
    this.cost = { job_cost: costs.job_cost, manual_booking_cost: costs.manual_booking_cost, total_cost: costs.total_cost }
    this.assignment.projected_income  = costs.job_income;

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
schema.methods.sendJobAcceptance = function(pdfPath, mailer, careHome, carer)
{
    const job = this;
    job.assignment.acceptance_document = pdfPath;

    //sending email
    mailer.send(__dirname + "/../../views/emails/job-accepted.jade",
        {
            to: careHome.email,
            subject: "Booking confirmation – " + moment(job.start_date).format("YYYY-MM-DD") + " – " + moment(job.start_date).format("h:mm A"),
            attachments: [ { path: __dirname + "/../../public/uploads/" + pdfPath } ]
        },
        { user: carer }, (error) => console.log(error));
}

schema.methods.sendJobWithdrawal = function(mailer, carer, careHome, withdrawal)
{
    const job = this;

    //sending email
    mailer.send(__dirname + "/../../views/emails/job-withdrawed.jade",
        {
            to: careHome.email,
            subject: carer.carer.first_name + " has cancelled a job – " + moment(job.start_date).format("YYYY-MM-DD") + " – " + moment(job.start_date).format("h:mm A"),
        },
        {
            user: carer,
            job: job,
            withdrawal: withdrawal,
            moment: moment
        }, (error) => console.log(error));
}

schema.methods.sendJobSummaryEmails = function(mailer, careHome, carer, totalMinutes)
{
    const job = this;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    //sending email to carer
    mailer.send(__dirname + "/../../views/emails/carer-job-summary-sent.jade", {
        to: carer.email,
        subject: "Oliver James Job sheet: " + moment(job.assignment.summary_sheet.start_date ? job.assignment.summary_sheet.start_date : job.start_date).format("YYYY-MM-DD") + " / " + careHome.care_home.care_service_name + " / " + (hours > 0 ? hours  + " " : "") + (hours == 0 ? '' : hours == 1 ? "hour" : "hours") +  (minutes > 0 && hours > 0 ? ", " : "") + (minutes > 0 ? minutes + " " : "") + (minutes == 0 ? '' : minutes == 1 ? "minute" : "minutes"),
    },
    { job: job, carer: carer, care_home: careHome, total_minutes: totalMinutes, moment: moment  }, (error) => console.log(error));

    //sending email to care home
    mailer.send(__dirname + "/../../views/emails/care-home-job-summary-sent.jade", {
        to: careHome.email,
        subject: "Oliver James Job sheet: " + moment(job.assignment.summary_sheet.start_date ? job.assignment.summary_sheet.start_date : job.start_date).format("YYYY-MM-DD"),
        attachments: [
            { path: __dirname + "/../../public/uploads/" + job.assignment.summary_sheet.standard_invoice },
            { path: __dirname + "/../../public/uploads/" + job.assignment.summary_sheet.signature }
        ]
    },
    { job: job, carer: carer, care_home: careHome, paths: paths, config: config, moment: moment }, (error) => console.log(error));

}

schema.methods.sendJobPaymentEmails = function(mailer, careHome, carer)
{
    const job = this;

    //sending email to carer
    mailer.send(__dirname + "/../../views/emails/carer-payment-processed.jade", {
        to: carer.email,
        subject: "Oliver James - Payment confirmation - Job ID: " + job._id,
        attachments: [
            { path: __dirname + "/../../public/uploads/" + job.assignment.payment.invoice },
        ]
    },
    { config: config  }, (error) => console.log(error));


    //sending email to care home
    mailer.send(__dirname + "/../../views/emails/care-home-payment-processed.jade", {
        to: careHome.email,
        subject: "Oliver James - Payment confirmation - Job ID: " + job._id,
        attachments: [
            { path: __dirname + "/../../public/uploads/" + job.charge.invoice },
        ]
    },
    { config: config  }, (error) => console.log(error));

    //sending email to admin
    mailer.send(__dirname + "/../../views/emails/app-payment-processed.jade", {
        to: careHome.email,
        subject: "Oliver James - Commission confirmation - Job ID: " + job._id,
        attachments: [
            { path: __dirname + "/../../public/uploads/" + job.assignment.payment.commission_confirmation },
            { path: __dirname + "/../../public/uploads/" + job.charge.invoice },
            { path: __dirname + "/../../public/uploads/" + job.assignment.payment.invoice },
        ]
    },
    { }, (error) => console.log(error));


}

schema.methods.sendJobChallenge = function(mailer)
{
    const job = this;

    async.parallel({
        carer: (callback) => User.findOne({ _id: job.assignment.carer }).then(user => callback(null, user)),
        care_home: (callback) => User.findOne({ _id: job.care_home }).then(user => callback(null, user))
    },(errors, results) => {

        //sending email
        mailer.send(__dirname + "/../../views/emails/job-challenged.jade", {
                to: config.CONTACT_EMAIL,
                subject: "A client has challenged payment for a job"
            },
            {
                carer: results.carer,
                job: job,
                care_home: results.care_home,
                moment: moment
            }, (error) => console.log(error));
    });
}

schema.methods.sendJobCancellation = function(mailer, carerId)
{
    const job = this;

    async.parallel({
        carer: (callback) => User.findOne({ _id: carerId }).then(user => callback(null, user)),
        care_home: (callback) => User.findOne({ _id: job.care_home }).then(user => callback(null, user))
    },(errors, results) => {

        //sending email
        mailer.send(__dirname + "/../../views/emails/job-cancelled.jade", {
                to: results.carer.email,
                subject: "Job cancelled"
            },
            {
                carer: results.carer,
                job: job,
                care_home: results.care_home,
                moment: moment
            }, (error) => console.log(error));
    });
}

schema.methods.sendJobCancellationCharge = function(mailer, carerId, totalMinutes)
{
    const job = this;

    async.parallel({
        carer: (callback) => User.findOne({ _id: carerId }).then(user => callback(null, user)),
        care_home: (callback) => User.findOne({ _id: job.care_home }).then(user => callback(null, user))
    },(errors, results) => {

        //sending email
        mailer.send(__dirname + "/../../views/emails/job-cancelled-charge.jade", {
                to: results.carer.email,
                subject: "Job cancelled"
            },
            {
                carer: results.carer,
                job: job,
                care_home: results.care_home,
                moment: moment,
                total_minutes: totalMinutes
            }, (error) => console.log(error));
    });
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

		//charge
        if(job.charge)
        {
            if(job.charge.charge_date)
                job.charge.charge_date = job.charge.charge_date.getTime();
        }

		if(job.assignment)
		{
			//carer
			if(job.assignment.carer)
            {
				job.carer = job.assignment.carer ? User.parse(job.assignment.carer, req) : null;
                if(job.assignment.acceptance_document)
                    job.carer.acceptance_document = fileHandler.getFileUrl(job.assignment.acceptance_document);

                if(job.assignment.created)
                    job.carer.acceptance_date = job.assignment.created.getTime();
            }

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

            //projected income
            if(job.assignment.projected_income != undefined)
                job.projected_income = job.assignment.projected_income;

            //payment
            if(job.assignment.payment)
            {
                if(job.assignment.payment.debit_date)
                    job.assignment.payment.debit_date = job.assignment.payment.debit_date.getTime();

                if(job.assignment.payment.payment_date)
                    job.assignment.payment.payment_date = job.assignment.payment.payment_date.getTime();

                job.payment = job.assignment.payment;
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
    if(job.status == statuses.PAID || job.status == statuses.PAYMENT_CANCELLED || job.status == statuses.PAYMENT_REJECTED)
        return job.status;
	if(!job.assignment.carer && job.end_date.getTime() > new Date().getTime() && job.status != statuses.CANCELLED)
		return statuses.POSTED;
	else if(!job.assignment.carer && job.end_date.getTime() < new Date().getTime() && job.status != statuses.CANCELLED)
		return statuses.EXPIRED;
	else if(job.assignment && job.assignment.carer && !job.assignment.summary_sheet && !job.assignment.payment && job.start_date.getTime() > new Date().getTime() && job.status != statuses.CANCELLED)
		return statuses.ACCEPTED;
	else if(job.assignment && job.assignment.carer && !job.assignment.summary_sheet && !job.assignment.payment && job.start_date.getTime() < new Date().getTime() && job.status != statuses.CANCELLED)
		return statuses.PENDING_SUMMARY_SHEET;
	else if(
		job.assignment &&
		job.assignment.carer &&
		((job.assignment.summary_sheet && job.status != statuses.CANCELLED) || (!job.assignment.summary_sheet && job.status == statuses.CANCELLED && job.percent_charge != 100)) &&
		job.assignment.payment && (job.assignment.payment.debit_date.getTime() > new Date().getTime()) &&
		(!job.assignment.challenge || job.assignment.challenge.status == ChallengeSchema.challengeStatuses.CANCELLED)
	)
		return statuses.PENDING_PAYMENT;
	else if(job.assignment && job.assignment.carer && job.assignment.summary_sheet && job.assignment.challenge && job.assignment.challenge.status == ChallengeSchema.challengeStatuses.ACTIVE && job.status != statuses.CANCELLED)
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