//core
const mongoose = require('mongoose');

const statuses = {
    CREATED: "CREATED",
    READ: "READ"
};

const schema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "{PATH} field is required."]
    },
    description: {
        type: String,
        required: [true, "{PATH} field is required."]
    },
    carer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "{PATH} field is required."]
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: [true, "{PATH} field is required."]
    },
    status: {
        type: String,
        enum: Object.values(statuses),
        default: statuses.CREATED
    },
    created: {
        type: Date,
        default: Date.now()
    }
}, { usePushEach: true });

module.exports.schema = mongoose.model("Notification", schema);