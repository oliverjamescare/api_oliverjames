exports.up = function(next) {

    const Setting  = this.model("Setting").schema;
    const setting = new Setting({
        type: "general_commission",
        general_commission: {
            manual_booking_pricing: 1,
            max_to_deduct: 20,
            app_commission: 8,
        }
    });

    setting.save((error) => {
        console.log(error)
        console.log("Done!")
        next();
    });
};

exports.down = function(next) {
  next();
};