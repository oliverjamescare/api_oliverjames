//core
const mongoose = require('mongoose');

//custom
const validators = require('./../../services/validators');

const schema = mongoose.Schema({
    signature: {
        type: String,
        required: [ true, "{PATH} field is required." ]
    },
    name: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
    position: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        maxlength: [ 50, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
    notes: {
        type: String,
        maxlength: [ 500, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
    start_date: {
        type: Date,
        validate: validators.dateGreaterThanDateField("start_date")
    },
    end_date: {
        type: Date,
        required: validators.required_if_present("start_date"),
        validate: validators.dateGreaterThanDateField("start_date")
    },
    voluntary_deduction: { //number of minutes to deduct
        type: Number,
        validate: validators.integer,
        min: [0, "Voluntary deduction cannot be lower than 0."]
    },
    created: {
        type: Date,
        required: [ true, "{PATH} field is required." ]
    }
});

module.exports = { schema };