exports.up = function(next) {

    this.model("Job").schema.find({ }, (error, jobs) => {
        Promise
            .all(jobs.map(job => job.save().catch(error => console.log(error))))
            .then(() => {
              next();
            })
            .catch(error => console.log(error))
    });
};

exports.down = function(next) {
  next();
};