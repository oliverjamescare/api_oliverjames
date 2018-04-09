//core
const mongoose = require('mongoose');

//custom
const validators = require("./../../services/validators");

//settings
const statuses = {
    IN_PROGRESS: "IN_PROGRESS",
    CHARGED: "CHARGED",
    REJECTED: "REJECTED",
    CANCELLED: "CANCELLED"
};

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
    status: {
        type: String,
        enum: Object.values(statuses),
        default: statuses.IN_PROGRESS
    },
    charge_date: {
        type: Date,
        required: validators.required_if("status", statuses.CHARGED)
    }
});

module.exports = { schema, statuses };