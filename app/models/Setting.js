//core
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//settings
const settingTypes = ["price_days", "commission", "max_deducts", "manual_booking_charge", "notifications"];

const schema = mongoose.Schema({
    type: {
        type: String,
        required: [true, "{PATH} field is required."],
        enum: settingTypes,
        unique: true
    },
    value: mongoose.Schema.Types.Mixed
}, { usePushEach: true });

schema.plugin(uniqueValidator, { message: 'The {PATH} has already been taken.' });
module.exports.schema = mongoose.model("Setting", schema);