exports.up = async function (next)
{
    await this.model("Job").schema.find().then(jobs =>
    {
        jobs.forEach(async job =>
        {
            job.withdrawals = [];
            job.declines = [];
            job.assignment.carer = undefined;
            job.assignment.summary_sheet = undefined;

            await job.save();
        });
    });

    await this.model("User").schema.find({ carer: { $exists: true }}).then(users =>
    {
        users.forEach(async user =>
        {
            user.carer.job_declines = [];
            user.carer.job_withdrawals = [];
            user.carer.jobs = [];
            user.transactions = undefined;

            await user.save();
        });
    });

    await this.model("JobWithdrawal").schema.find().then(jobWithdrawals =>
    {
        jobWithdrawals.forEach(async jobWithdrawal =>
        {
            await jobWithdrawal.remove();
        });
    });

    next();
};

exports.down = function (next)
{
    next();
};