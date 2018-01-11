const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate');
const validators = require('./../services/validators');

const careHomeSchema = require("./schemas/CareHome");
const carerSchema = require('./schemas/Carer');

//settings
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,}$/;
const emailConfirmationExpirationDays = 7;
const accessTokenExpirationDays = 7;
const passwordResetExpirationDays = 7;

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
            required: true
        },
        expiration: {
            type: Date,
            default: +new Date() + accessTokenExpirationDays * 24 * 60 * 60 * 1000
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
        token:{
            type: String,
            required: true
        },
        expiration:{
            type: Date,
            default: +new Date() + passwordResetExpirationDays * 24 * 60 * 60 * 1000
        }
    }],
    email_confirmations: [{
        email:{
            type: String,
            required: true,
            validate: validators.email
        },
        token:{
            type: String,
            required: true
        },
        expiration:{
            type: Date,
            default: +new Date() + emailConfirmationExpirationDays * 24 * 60 * 60 * 1000
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

});
//middlewares
schema.pre("save", function(next)
{
    this.updated = new Date();
    next();
});


schema.plugin(uniqueValidator, { message: 'The {PATH} has already been taken.' });
schema.plugin(mongoosePaginate);

module.exports.schema = mongoose.model("User", schema);
module.exports.accessTokenExpirationDays = accessTokenExpirationDays;