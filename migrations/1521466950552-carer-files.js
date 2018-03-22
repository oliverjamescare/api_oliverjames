exports.up = function(next) {
    this.model("User").schema.update(
        { carer: { $exists: true}},
        {
            $set: {
                'carer.training_record.files': [],
                'carer.dbs.files': [],
                'carer.reference.files': [],
            },
            $unset: {
                'carer.training_record.photos': 1,
                'carer.dbs.photos': 1,
                'carer.reference.photos': 1,
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

        })
};

exports.down = function(next) {
  next();
};