//core
const mongoose = require('mongoose');

//custom
const validators = require("./../../services/validators");

//settings
const challengeStatuses = {
    ACTIVE: "ACTIVE",
    UPHELD: "UPHELD",
    CANCELLED: "CANCELLED"
};

const schema = mongoose.Schema({
    description: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        maxlength: [ 1000, "{PATH} can't be longer than {MAXLENGTH} characters." ],
    },
    response: {
        type: String,
        required: validators.required_if_not("status", challengeStatuses.ACTIVE),
        maxlength: [ 1000, "{PATH} can't be longer than {MAXLENGTH} characters." ],
        default: null
    },
    status: {
        type: String,
        enum: Object.values(challengeStatuses),
        default: challengeStatuses.ACTIVE
    },
    created: {
        type: Date,
	    required: [ true, "{PATH} field is required." ]
    }
});

module.exports = { schema, challengeStatuses };