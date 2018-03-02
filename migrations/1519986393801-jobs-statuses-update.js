exports.up = function(next)
{
    this.model("Job").schema.find().then(jobs => {
        jobs.forEach(job => job.save());
    })
    next();
};

exports.down = function(next) {
  next();
};