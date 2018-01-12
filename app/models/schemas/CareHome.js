const mongoose = require('mongoose');
const validators = require('./../../services/validators');
const addressSchema = require('./Address');

const homeTypes = [
    "Residential",
    "Nursing",
    "Learning disabilit",
    "Supported living"
];

module.exports = mongoose.Schema({
    care_service_name: {
        type: String,
        required: validators.required_if_present("care_home"),
        validate: validators.alpha,
        maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
    type_of_home: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        enum: Object.keys(homeTypes)
    },
    name: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        validate: validators.alpha,
        maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
    address: addressSchema,
    blocked_carers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    general_guidance: {
        superior: {
            type: String,
            maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
        },
        report_contact: {
            type: String,
            maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
        },
        emergency_guidance: {
            type: String,
            maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
        },
        notes_for_carers: {
            type: String,
            maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
        },
        parking: {
            type: String,
            maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
        },
        florplan: {
            type: String,
            maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
        }
    }
});