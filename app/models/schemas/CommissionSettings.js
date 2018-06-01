//core
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    app_commission: {
        type: Number,
        required: [ true, "{PATH} field is required." ],
        min: [0, "{PATH} cannot be lower than {MIN}."],
        max: [100, "{PATH} cannot be greater than {MAX}."],
    },
    max_to_deduct: {
        type: Number,
        required: [ true, "{PATH} field is required." ],
        min: [0, "{PATH} cannot be lower than {MIN}."],
        max: [100, "{PATH} cannot be greater than {MAX}."],
    },
    manual_booking_pricing: {
        type: Number,
        required: [ true, "{PATH} field is required." ],
        min: [0, "{PATH} cannot be lower than {MIN}."],
    }
});

module.exports = { schema };