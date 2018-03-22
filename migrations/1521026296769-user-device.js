exports.up = async function(next) {
    const users = await this.model("User").schema.find({}).exec();

    console.log(users.length);

    Promise.all(users.map(user => {
        user['device'] = {
            device_id: null,
            device_token: null
        };

        return user.save();
    })).then(() => {

        console.log("Updated");
        next();
    });

};

exports.down = function(next) {
  next();
};