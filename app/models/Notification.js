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
        default: null
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


schema.pre("save", function(next)
{
	//dates handle
	if (this.isNew)
		this.created = new Date();

	next();
});

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
schema.plugin(mongoosePaginate);
module.exports.statuses = statuses;
