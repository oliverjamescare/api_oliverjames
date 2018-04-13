//core
const mongoose = require('mongoose');

//custom
const validators = require("./../../services/validators");

//settings
const statuses = {
    IN_PROGRESS: "IN_PROGRESS",
    PAID: "PAID"
};

const schema = mongoose.Schema({
    debit_date: {
        type: Date,
        required: [ true, "{PATH} field is required." ]
    },
    transaction_charge: {
        type: Number,
        min: 0,
        default: 0
    },
    application_fee: {
        type: Number,
        min: 0,
        default: 0
    },
    deductions: {
        type: Number,
        min: 0,
        default: 0
    },
    job_income: {
        type: Number,
        min: 0,
        default: 0
    },
    net_income: {
        type: Number,
        min: 0,
        default: 0
    },
    status: {
        type: String,
        enum: Object.values(statuses),
        default: statuses.IN_PROGRESS
    },
    invoice: String,
    commission_confirmation: String,
    payment_date: {
        type: Date,
        required: validators.required_if("status", statuses.PAID),
    }
});

module.exports = { schema, statuses };