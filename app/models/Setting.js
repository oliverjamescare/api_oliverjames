//core
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//settings
const settingTypes = [ "general_commission", "notifications", "general_price_matrix", "special_price_matrix" ];

//sub schemas
const { schema: CommissionSettings } = require("./schemas/CommissionSettings");
const { schema: NotificationsSettings } = require("./schemas/NotificationsSettings");
const { schema: GeneralPriceMatrix } = require("./schemas/GeneralPriceMatrix");
const { schema: SpecialPriceMatrix } = require("./schemas/SpecialPriceMatrix");

const schema = mongoose.Schema({
    type: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        enum: settingTypes
    },
    notifications:  NotificationsSettings,
    general_commission:  CommissionSettings,
    general_price_matrix:  GeneralPriceMatrix,
    special_price_matrix:  SpecialPriceMatrix,

}, { usePushEach: true });

schema.plugin(uniqueValidator, { message: 'The {PATH} has already been taken.' });
module.exports.schema = mongoose.model("Setting", schema);