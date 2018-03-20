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
        enum: Object.values(challengeStatuses),
        default: challengeStatuses.ACTIVE
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = { schema, challengeStatuses };