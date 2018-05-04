//core
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const randomstring = require("randomstring");
const JWT = require('jsonwebtoken');
const async = require('async');
const config = process.env;
const moment = require('moment');
const nodemailer = require("nodemailer");

//custom
const validators = require('./../services/validators');
const paths = require('./../../config/paths');
const permissions = require('./../../config/permissions');

const careHomeSchema = require("./schemas/CareHome").schema;
const carerSchema = require('./schemas/Carer').schema;
const addressSchema = require("./schemas/Address").address;
const transactionSchema = require("./schemas/Transaction").schema;

//settings
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,}$/;
const settings =  {
    emailConfirmationExpirationDays: 7,
    accessTokenExpirationDays: 7,
    passwordResetExpirationDays: 7
};

const statuses = {
    CREATED: "CREATED",
    ACTIVE: "ACTIVE",
    BANNED: "BANNED",
    BLOCKED: "BLOCKED"
};

const schema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "{PATH} field is required."],
        validate: validators.email,
        unique: true
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, "{PATH} field is required."],
        validate: validators.password(passwordRegExp, "{PATH} must have at least 6 characters and contain at least one letter and number.")
    },
    access_token: {
        token: {
            type: String,
            default: null
        },
        refresh_token: {
            type: String,
            default: null
        }
    },
    phone_number: {
        type: String,
        required: [true, "{PATH} field is required."],
        validate: validators.numbers,
        minlength: [6,"{PATH} must have at least {MINLENGTH} characters."],
        unique: true
    },
    banned_until: {
        type: Date,
        default: null
    },
    activation_date: {
        type: Date,
        default: null
    },
    password_resets: [
        {
            token: {
                type: String,
                default: randomstring.generate(128)
            },
            expiration:{
                type: Date,
                default: +new Date() + (settings.passwordResetExpirationDays * 24 * 60 * 60 * 1000)
            }
        }
    ],
    email_confirmations: [
        {
            email: {
                type: String,
                required: true,
                validate: validators.email
            },
            token:{
                type: String,
                default: randomstring.generate(128)
            },
            expiration:{
                type: Date,
                default: +new Date() + (settings.emailConfirmationExpirationDays * 24 * 60 * 60 * 1000)
            }
        }
    ],
    care_home: careHomeSchema,
    carer: carerSchema,
    address: addressSchema,
    notes: {
        type: String,
        default: null,
        maxlength: [ 1000, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
    device: {
        device_id: {
            type: String,
            default: null
        },
        device_token: {
            type: String,
            default: null
        }
    },
    status: {
        type: String,
        enum: Object.values(statuses),
        default: statuses.CREATED
    },
    roles: [
        {
            type: String,
            required: true,
            enum: permissions.roles.map(role => role.role)
        }
    ],
    permissions:[
        {
            type: String,
            required: true,
            enum: permissions.permissions
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
}, { usePushEach: true })
.index([{ "address.location": "2dsphere" }]);

//middlewares
schema.post('init', function(user)
{
	//status handle
	user.blockingHandle();
	user.status = handleStatus(user);
});

schema.pre("save", function(next)
{
	//dates handle
	if(this.isNew)
		this.created = new Date();

    this.updated = new Date();

    if(!this.address.location.coordinates.length)
        this.address.location = undefined;

    //status handle
    this.blockingHandle();
    this.status = handleStatus(this);

    //for carer
    if(this.carer)
    {
        //carer experience
        const Job = require('./Job').schema;
        const reviewStatuses = require('./schemas/Review').reviewStatuses;

        async.parallel({
            care_experience: (callback) => {
                Job.aggregate([
                    { $match: { _id: { $in: this.carer.jobs }, 'assignment.summary_sheet': { $exists: true } } },
                    {
                        $group: {
                            _id: { month: { $month: '$start_date' }, year: { $year: '$start_date' }},
                            count: { $sum: 1 }
                        }
                    }
                ], (errors, results) => callback(null, results));
            },
            reviews: (callback) => {
                Job.aggregate([
                    { $match: { _id: { $in: this.carer.jobs }, 'assignment.review': { $exists: true }, 'assignment.review.status': reviewStatuses.PUBLISHED } },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: 1 },
                            average: { $avg: '$assignment.review.rate' }
                        }
                    }
                ], (errors, results) => callback(null, results));
            }
        }, (errors, results) => {

            //care exp calculation
            const activeMonths = results.care_experience.length;
            const joiningMonths = (this.carer.joining_care_experience.years * 12) + this.carer.joining_care_experience.months;
            const totalMonths = activeMonths + joiningMonths;

            this.carer.care_experience.years = Math.floor(totalMonths / 12);
            this.carer.care_experience.months = totalMonths % 12;

            //reviews calculation
            if(results.reviews.length)
            {
                this.carer.reviews.count = results.reviews[0].count;
                this.carer.reviews.average = results.reviews[0].average;
            }

            next();
        })

    }
    else
        next();
});

//methods
schema.methods.generateAccessTokens = function()
{
    //refreshes access tokens
    this.access_token = {
        token: JWT.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * settings.accessTokenExpirationDays),
            data: {
                _id: this._id,
                email: this.email
            }
        }, config.SECRET_AUTH),
        refresh_token: randomstring.generate(128)
    };

    return this.access_token;
}

schema.methods.addEmailConfirmationHandle = function(email, mailer)
{
    this.email_confirmations.push({ email });

    //sending email
    mailer.send(__dirname + "/../../views/emails/confirmation-email.jade", {
        to: email,
        subject: "Oliver James Email Verification"
    },
    {
        emailConfirmation: this.email_confirmations.slice().pop(),
        config: config,
        paths: paths
    }, (error) => console.log(error));
}

schema.methods.blockingHandle = function()
{
    if(this.status != statuses.BLOCKED && this.banned_until)
    {
        if(this.banned_until.getTime() < new Date().getTime())
        {
            this.status = this.activation_date ? statuses.ACTIVE : statuses.CREATED;
            this.banned_until = null;
        }
    }
}

schema.methods.addPasswordRemindHandle = function(mailer)
{
    this.password_resets.push({ _id: mongoose.Types.ObjectId()});

    //sending email
    mailer.send(__dirname + "/../../views/emails/password-reset.jade", {
        to: this.email,
        subject: "Oliver James - password reset request"
    },
    {
        passwordReminder: this.password_resets.slice().pop(),
        config: config,
        paths: paths
    }, (error) => console.log(error));
}

schema.methods.addDeviceHandle = function(deviceId, deviceToken)
{
    return new Promise((resolve) => {
        if(deviceId && deviceToken)
        {
            //logout all devices with that id
            mongoose.model("User", schema)
                .update({"device.device_id": deviceId }, { $set: { 'device.device_id': null, 'device.device_token': null }}, { multi: true })
                .then(() => {
                    this.device.device_id = deviceId || null;
                    this.device.device_token = deviceToken || null;

                    resolve();
                });
        }
        else
        {
            //logout this device
            this.device.device_id = null;
            this.device.device_token = null;

            resolve();
        }
    });
}

//statics
schema.statics.parse = function(user, req)
{
	const fileHandler = require("../services/fileHandler")(req);

    //care home
    if(user.care_home)
    {
        //floor plan link
        if(user.care_home.general_guidance && user.care_home.general_guidance.floor_plan)
	        user.care_home.general_guidance.floor_plan = fileHandler.getFileUrl(user.care_home.general_guidance.floor_plan);


        //distance
	    if(user.distance != undefined)
		    user.distance = parseFloat(user.distance.toFixed(2));

        //credits
        if(user.care_home.credits)
        {
            let totalBalance = 0;
            user.care_home.credits.forEach(credit => {

                totalBalance += credit.amount;
                credit["balance"] = totalBalance;

                if(credit.created)
                    credit.created = credit.created.getTime();

            })
        }
    }

    //carer
	if(user.carer)
    {
        if(user.carer.date_of_birth)
            user.carer.date_of_birth = moment(user.carer.date_of_birth).format("YYYY-MM-DD");

        if(user.carer.profile_image)
		    user.carer.profile_image = fileHandler.getFileUrl(user.carer.profile_image);

        //training record
        if(user.carer.training_record)
        {
            Object.keys(user.carer.training_record).forEach(key => {
                if(user.carer.training_record[key] && !Array.isArray(user.carer.training_record[key]) && typeof user.carer.training_record[key] != "string")
                    user.carer.training_record[key] = user.carer.training_record[key].getTime();
            });

            if(user.carer.training_record.files)
                user.carer.training_record.files = user.carer.training_record.files.map(file => fileHandler.getFileUrl(file));
        }

        //dbs
        if(user.carer.dbs)
        {
            if(user.carer.dbs.dbs_date)
                user.carer.dbs.dbs_date = user.carer.dbs.dbs_date.getTime();

            if(user.carer.dbs.files)
                user.carer.dbs.files = user.carer.dbs.files.map(file => fileHandler.getFileUrl(file));
        }

        //reference
        if(user.carer.reference)
        {
            if(user.carer.reference.files)
                user.carer.reference.files = user.carer.reference.files.map(file => fileHandler.getFileUrl(file));
        }

        //CV
        if(user.carer.cv_uploads)
            user.carer.cv_uploads = user.carer.cv_uploads.map(file => fileHandler.getFileUrl(file));

        //jobs
        if(user.carer.jobs)
        {
            const Job = require("./Job").schema;
            user.carer.jobs.map(job => Job.parse(job));
        }

        //deductions
        if(user.carer.deductions)
        {
            let totalBalance = 0;
            user.carer.deductions.forEach(deduction => {

                totalBalance += deduction.amount;
                deduction["balance"] = totalBalance;

                if(deduction.created)
                    deduction.created = deduction.created.getTime();

            })
        }
    }

	//address link
	if(user.address && user.address.location)
		user.address.link = `https://www.google.com/maps/search/?api=1&query=${user.address.location.coordinates[0]},${user.address.location.coordinates[1]}`;

    //dates
    if(user.banned_until)
        user.banned_until = user.banned_until.getTime();

    if(user.activation_date)
        user.activation_date = user.activation_date.getTime();

	if(user.created)
		user.created = user.created.getTime();

    return user;
}

function handleStatus(user)
{
    if(!user.activation_date && (!user.banned_until || user.banned_until.getTime() < new Date().getTime()) && user.status != statuses.BLOCKED)
        return statuses.CREATED;
    else if(user.activation_date && (!user.banned_until || user.banned_until.getTime() < new Date().getTime()) && user.status != statuses.BLOCKED)
        return statuses.ACTIVE;
    else if(user.banned_until && user.banned_until.getTime() > new Date().getTime() && user.status != statuses.BLOCKED )
        return statuses.BANNED;
    else
        return user.status;
}

schema.plugin(uniqueValidator, { message: 'The {PATH} has already been taken.' });
schema.plugin(mongoosePaginate);
schema.plugin(mongooseAggregatePaginate);

module.exports.schema = mongoose.model("User", schema);
module.exports.statuses = statuses;