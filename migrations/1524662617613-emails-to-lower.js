exports.up = function(next) {
    this.model("User").schema.find().then(async users => {
      await Promise.all(users.map(async user => {
          user.email = user.email.toLowerCase();
          return user.save();
      }))

        next();
    })

};

exports.down = function(next) {
  next();
};