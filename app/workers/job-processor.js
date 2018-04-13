
//loading config
require('dotenv').config();
require("./../../config/database");

//core
const cron = require('node-cron');

//custom
const JobModel = require("./../models/Job");
const Job = JobModel.schema;

//services
const QueuesHandler = require('./../services/QueuesHandler');
const NotificationsHandler = require('./../services/NotificationsHandler');

//updates jobs which has not final status
cron.schedule('* * * * *', () =>
{
    const excludedStatuses = [
        JobModel.statuses.CANCELLED,
        JobModel.statuses.EXPIRED,
        JobModel.statuses.PAID,
        JobModel.statuses.PAYMENT_REJECTED,
        JobModel.statuses.PAYMENT_CANCELLED
    ];

    Job.find({ status: { $not: { $in: excludedStatuses }} })
        .then(jobs => {
            jobs.forEach(job => {


                if(job.initial.status != job.status) //if status changed
                    job.save().catch(error => console.log(error));

                //sending request to payment processor
                if(job.status == JobModel.statuses.PENDING_PAYMENT && job.assignment && job.assignment.payment && job.assignment.payment.debit_date.getTime() <= new Date().getTime())
                    QueuesHandler.publish({ job_id: job._id }, { exchange: "payments", queue: "payments" })

            })
        });


    //sending scheduled notifications
    const handler = new NotificationsHandler();
    handler
        .getScheduledNotificationsToSend()
        .then(notifications => {

            notifications.forEach(notification => {
                QueuesHandler.publish({ user_id: notification.user_id, job_id: notification.job_id, type: "NEW_JOBS" }, { exchange: "notifications", queue: "notifications" })
            })
        });
});