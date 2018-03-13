exports.up = async function(next)
{
    await this.model("User").schema.find({ carer: { $exists: true }}).then(users =>
    {
        users.forEach(async user =>
        {
            user.carer["silent_notifications_settings"] = {
                from: 0,
                to: 0,
                days: {
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false
                }
            };

            user.save().then((u) => console.log(u.carer)).catch(e => console.log(e));
        });
    });

  next();
};

exports.down = function(next) {
  next();
};