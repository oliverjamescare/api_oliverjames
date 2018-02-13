//core
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//custom
const validators = require('./../services/validators');
const User = require('./User').schema;

const schema = mongoose.Schema({
    email: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        validate: [
            validators.email,
            {
                isAsync: true,
                validator: function (value, callback)
                {
                    User.findOne({ email: value }, (error, result) => callback(result ? false : true ));
                },
                message: "The {PATH} has already been taken."
            }
        ],
        unique: true
    },
    address: {
        postal_code: {
            type: String,
            required: [ true, "{PATH} field is required." ],
            maxlength: [ 30, "{PATH} can't be longer than {MAXLENGTH} characters." ]
        },
        company: {
            type: String,
            maxlength: [ 50, "{PATH} can't be longer than {MAXLENGTH} characters." ],
            default: null
        },
        address_line_1: {
            type: String,
            required: [ true, "{PATH} field is required." ],
            maxlength: [ 50, "{PATH} can't be longer than {MAXLENGTH} characters." ]
        },
        address_line_2: {
            type: String,
            maxlength: [ 50, "{PATH} can't be longer than {MAXLENGTH} characters." ],
            default: null
        },
        city: {
            type: String,
            required: [ true, "{PATH} field is required." ],
            maxlength: [ 50, "{PATH} can't be longer than {MAXLENGTH} characters." ]
        },
        location: {
            type: {
                type: String,
                default: "Point"
            },
            coordinates: [ Number ]
        }
    },
    name: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        validate: validators.alpha,
        maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    }
}, { usePushEach: true });

//middlewares
schema.pre("save", function (next)
{
    this.updated = new Date();
    if(!this.address.location.coordinates.length)
        this.address.location = undefined;

    next();
});

schema.plugin(uniqueValidator, { message: 'The {PATH} has already been added.' });
module.exports.schema = mongoose.model("care_home_waiting_user", schema);