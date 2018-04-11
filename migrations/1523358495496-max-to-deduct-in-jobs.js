exports.up = function(next) {
    this.model("Job").schema.update(
        { },
        {
            $set: {
                "booking_pricing.max_to_deduct": 20
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