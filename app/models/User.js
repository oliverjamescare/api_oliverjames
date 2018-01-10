const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate');
const validators = require('./../services/validators');

//settings
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,}$/;
const emailConfirmationExpirationDays = 7;
const accessTokenExpirationDays = 7;
const passwordResetExpirationDays = 7;

const statuses = {
    CREATED: 0,
    CONFIRMED: 1,
    BLOCKED: 1
};

const homeTypes = [
    "Residential",
    "Nursing",
    "Learning disabilit",
    "Supported living"
];


//schemas
const addressSchema = {
    postal_code: {
        type: String,
        required: [true, "{PATH} field is required."],
        validate: validators.alphaNumbers,
        maxlength: [30,"{PATH} can't be longer than {MAXLENGTH} characters."]
    },
    address: {
        type: String,
        required: [true, "{PATH} field is required."],
        validate: validators.alphaNumbers,
        maxlength: [100,"{PATH} can't be longer than {MAXLENGTH} characters."]
    },
    city: {
        type: String,
        required: [true, "{PATH} field is required."],
        validate: validators.alpha,
        maxlength: [50,"{PATH} can't be longer than {MAXLENGTH} characters."]
    },
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: [Number]
    }
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
        required: [true, "{PATH} field is required."],
        validate: validators.numbers,
        minlength: [6,"{PATH} must have at least {MINLENGTH} characters."]
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

    //care home
    care_home: {
        care_service_name: {
            type: String,
            required: [true, "{PATH} field is required."],
            validate: validators.alpha,
            maxlength: [100,"{PATH} can't be longer than {MAXLENGTH} characters."]
        },
        type_of_home: {
            type: String,
            required: [true, "{PATH} field is required."],
            enum: Object.keys(homeTypes)
        },
        name: {
            type: String,
            required: [true, "{PATH} field is required."],
            validate: validators.alpha,
            maxlength: [100,"{PATH} can't be longer than {MAXLENGTH} characters."]
        },
        address: addressSchema,
        blocked_carers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
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