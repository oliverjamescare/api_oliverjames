//core
const mongoose = require('mongoose');

//settings
const challengeStatuses = {
    ACTIVE: "ACTIVE",
    CANCELLED: "CANCELLED"
}

const schema = mongoose.Schema({
    description: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        maxlength: [ 1000, "{PATH} can't be longer than {MAXLENGTH} characters." ],
    },
    status: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        enum: Object.values(challengeStatuses)
    },
    created: {
        type: Date,
        required: [ true, "{PATH} field is required." ]
    }
});

module.exports = { schema, challengeStatuses };