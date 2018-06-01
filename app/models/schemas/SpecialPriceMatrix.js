//core
const mongoose = require('mongoose');

//config
const hourPrice = {
	type: Number,
	required: [ true, "{PATH} field is required." ],
	min: [0, "{PATH} cannot be lower than {MIN}."],
};
const pricing_hours = {
	hour_0_1: hourPrice,
	hour_1_2: hourPrice,
	hour_2_3: hourPrice,
	hour_3_4: hourPrice,
	hour_4_5: hourPrice,
	hour_5_6: hourPrice,
	hour_6_7: hourPrice,
	hour_7_8: hourPrice,
	hour_8_9: hourPrice,
	hour_9_10: hourPrice,
	hour_10_11: hourPrice,
	hour_11_12: hourPrice,
	hour_12_13: hourPrice,
	hour_13_14: hourPrice,
	hour_14_15: hourPrice,
	hour_15_16: hourPrice,
	hour_16_17: hourPrice,
	hour_17_18: hourPrice,
	hour_18_19: hourPrice,
	hour_19_20: hourPrice,
	hour_20_21: hourPrice,
	hour_21_22: hourPrice,
	hour_22_23: hourPrice,
	hour_23_0: hourPrice
};

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
    date: {
        type: Date,
	    required: [ true, "{PATH} field is required." ]
    },
    pricing: pricing_hours
});

module.exports = { schema, roles: CarerRoles };