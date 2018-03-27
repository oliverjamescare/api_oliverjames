exports.up = function(next) {

    const dayPrice = 11.5;

    const days = {
        monday_price: dayPrice,
        tuesday_price: dayPrice,
        wednesday_price: dayPrice,
        thursday_price: dayPrice,
        friday_price: dayPrice,
        saturday_price: dayPrice,
        sunday_price: dayPrice,
    }

    const pricing_hours = {
        hour_0_1: days,
        hour_1_2: days,
        hour_2_3: days,
        hour_3_4: days,
        hour_4_5: days,
        hour_5_6: days,
        hour_6_7: days,
        hour_7_8: days,
        hour_8_9: days,
        hour_9_10: days,
        hour_10_11: days,
        hour_11_12: days,
        hour_12_13: days,
        hour_13_14: days,
        hour_14_15: days,
        hour_15_16: days,
        hour_16_17: days,
        hour_17_18: days,
        hour_18_19: days,
        hour_19_20: days,
        hour_20_21: days,
        hour_21_22: days,
        hour_22_23: days,
        hour_23_0: days
    };

    this.model("Job").schema.update(
        {},
        {
            $set: {
                booking_pricing: {
                    manual_booking_pricing: 10,
                    app_commission: 10,
                    pricing: pricing_hours
                }
            },
            $unset: {
                'assignment.income': 1
            }
        },
        {
            multi: true,
            strict: false
        }, (error, numberAffected, raw) => {

            if (error) {
                console.error(error);
            }
            console.log('The number of updated documents was %d', numberAffected);
            console.log('The raw response from Mongo was ', raw);
            next();

        });
};

exports.down = function(next) {
  next();
};