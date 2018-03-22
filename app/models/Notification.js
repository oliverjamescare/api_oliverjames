//core
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

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

schema.plugin(mongoosePaginate);

schema.statics.parse = function (notification)
{
    if(notification)
    {
        if(notification.created)
            notification.created = notification.created.getTime();
    }

    return notification;
}

module.exports.schema = mongoose.model("Notification", schema);
module.exports.statuses = statuses;