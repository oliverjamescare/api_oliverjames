//core
const mongoose = require('mongoose');

//settings
const transactionStatuses = {
    CONFIRMED: "CONFIRMED",
    PENDING: "PENDING"
};

const schema = mongoose.Schema({
    description: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        maxlength: [ 500, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
    amount: {
        type: Number,
        required: [ true, "{PATH} field is required." ]
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        default: null
    },
    status: {
        type: String,
        enum: Object.values(transactionStatuses),
        default: transactionStatuses.PENDING
    },
    created: {
        type: Date,
	    required: [ true, "{PATH} field is required." ]
    }
});

module.exports = { schema, transactionStatuses };