exports.up = function(next) {
	this.model("Admin").schema.update(
		{},
		{
			$set: {
				roles: [ "ADMIN" ],
                permissions: []
			},
            $unset: {
			    token: 1
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