exports.up = async function(next)
{
    const users = await this.model("User").schema.find({ carer: { $exists: true }}).exec();

    Promise.all(users.map(user => {
        user.carer["care_experience"] = {
            years: 1,
            months: 0
        };

        user.carer["reviews"] = {
            count: 0,
            average: 0
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