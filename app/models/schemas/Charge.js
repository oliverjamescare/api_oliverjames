//core
const mongoose = require('mongoose');

//custom
const validators = require("./../../services/validators");

const schema = mongoose.Schema({
    deductions: {
        type: Number,
        min: 0,
        required: [ true, "{PATH} field is required." ]
    },
    job_cost: {
        type: Number,
        min: 0,
        required: [ true, "{PATH} field is required." ]
    },
    manual_booking_cost: {
        type: Number,
        min: 0,
        required: [ true, "{PATH} field is required." ]
    },
    total_cost: {
        type: Number,
        min: 0,
        required: [ true, "{PATH} field is required." ]
    },
    net_cost: {
        type: Number,
        min: 0,
        required: [ true, "{PATH} field is required." ]
    },
    charge_date: {
        type: Date,
        required: [ true, "{PATH} field is required." ]
    }
});

module.exports = { schema };