//core
const mongoose = require('mongoose');

//custom
const validators = require('./../../services/validators');

//settings
const reviewStatuses = {
    PENDING: "PENDING",
    PUBLISHED: "PUBLISHED",
    ARCHIVED: "ARCHIVED"
};

const schema = mongoose.Schema({
    rate: {
        type: Number,
        required: [ true, "{PATH} field is required." ],
        validate: validators.integer,
        min: [1, "Rate cannot be lower than 1."],
        max: [5, "Rate cannot be greater than 5."],
    },
    description: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        maxlength: [ 500, "{PATH} can't be longer than {MAXLENGTH} characters." ],
    },
    status: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        enum: Object.values(reviewStatuses),
    },
    created: {
        type: Date,
        required: [ true, "{PATH} field is required." ]
    }
});

module.exports = { schema, reviewStatuses };