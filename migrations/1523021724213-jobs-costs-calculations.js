exports.up = function(next) {

    this.model("Job").schema.find({ }, (error, jobs) => {
        Promise
            .all(jobs.map(job => job.save()))
            .then(() => {
              next();
            })
    });
};

exports.down = function(next) {
  next();
};