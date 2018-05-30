//core
const mongoose = require('mongoose');
const Pricing = require("./Pricing").pricing_hours;

const CarerRoles = {
    CARER: "Carer",
    SENIOR_CARER: "Senior Carer"
};

const schema = mongoose.Schema({
    role: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        enum: Object.values(CarerRoles)
    },
    pricing: Pricing
});

module.exports = { schema, roles: CarerRoles };