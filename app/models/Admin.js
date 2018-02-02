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
const permissions = require('./../../config/permissions');
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
    password: {
        type: String,
        required: [true, "{PATH} field is required."],
        validate: {
            validator: value => (/^\$2/.test(value) && value.length >= 50)? true : passwordRegExp.test(value),
            message: "Password must have at least 6 characters and contain at least one letter and number."
        }
    },
    token: {
        type: String,
        default: null
    },
    first_name: {
        type: String,
        required: [true, "{PATH} field is required."],
        validate: validators.alpha,
        maxlength: [100,"{PATH} can't be longer than {MAXLENGTH} characters."]
    },
    surname: {
        type: String,
        required: [true, "{PATH} field is required."],
        validate: validators.alpha,
        maxlength: [100,"{PATH} can't be longer than {MAXLENGTH} characters."]
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
schema.pre("save", function(next)
{
    this.updated = new Date();
    next();
});

//methods
schema.methods.generateAccessTokens = function()
{
    //refreshes access tokens
    this.token = randomstring.generate(128);
    return this.token;
}

schema.plugin(uniqueValidator, { message: 'The {PATH} has already been taken.' });
module.exports.schema = mongoose.model("Admin", schema);