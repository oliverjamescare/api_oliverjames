//core
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate');
const randomstring = require("randomstring");
const JWT = require('jsonwebtoken');
const config = process.env;

//custom
const validators = require('./../services/validators');
const paths = require('./../../config/paths');
const careHomeSchema = require("./schemas/CareHome").schema;
const carerSchema = require('./schemas/Carer').schema;

//settings
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,}$/;
const settings =  {
    emailConfirmationExpirationDays: 7,
    accessTokenExpirationDays: 7,
    passwordResetExpirationDays: 7
};

const statuses = {
    CREATED: 0,
    CONFIRMED: 1,
    BLOCKED: 2,
    WAITING_LIST: 3
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
        required: validators.required_if_not("status", statuses.WAITING_LIST),
        validate: {
            validator: value => (/^\$2/.test(value) && value.length >= 50)? true : passwordRegExp.test(value),
            message: "Password must have at least 6 characters and contain at least one letter and number"
        }
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
        required: validators.required_if_not("status", statuses.WAITING_LIST),
        validate: validators.numbers,
        minlength: [6,"{PATH} must have at least {MINLENGTH} characters."],
        unique: true
    },
    status: {
        type: Number,
        enum: Object.values(statuses),
        default: statuses.CREATED
    },
    blocked_until: Date,
    password_resets: [{
        token: {
            type: String,
            default: randomstring.generate(128)
        },
        expiration:{
            type: Date,
            default: +new Date() + (settings.passwordResetExpirationDays * 24 * 60 * 60 * 1000)
        }
    }],
    email_confirmations: [{
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
    }],
    care_home: careHomeSchema,
    carer: carerSchema,
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
schema.pre("save", function(next)
{
    this.updated = new Date();
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
    mailer.send(__dirname + "/../../views/emails/confirmation-email", {
        to: email,
        subject: "Oliver James Email Verification",
        emailConfirmation: this.email_confirmations.slice().pop(),
        config: config,
        paths: paths
    }, (error) => console.log(error));
}

schema.methods.blockingHandle = function()
{
    if(this.status == statuses.BLOCKED)
    {
        if(this.blocked_until.getTime() < new Date().getTime())
            this.status = statuses.CONFIRMED;
    }

    return this.status != statuses.BLOCKED;
}

schema.methods.addPasswordRemindHandle = function(mailer)
{
    this.password_resets.push({ _id: mongoose.Types.ObjectId()});

    //sending email
    mailer.send(__dirname + "/../../views/emails/password-reset", {
        to: this.email,
        subject: "Oliver James - password reset request",
        passwordReminder: this.password_resets.slice().pop(),
        config: config,
        paths: paths
    }, (error) => console.log(error));
}

schema.plugin(uniqueValidator, { message: 'The {PATH} has already been taken.' });
schema.plugin(mongoosePaginate);

module.exports.schema = mongoose.model("User", schema);