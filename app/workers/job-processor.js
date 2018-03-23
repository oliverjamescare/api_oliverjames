
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
                // if(job.status == JobModel.statuses.PENDING_PAYMENT && (job.assignment.summary_sheet.created.getTime() + (1000 * 60 * 60 * 24 * 3)) < new  Date().getTime())
                // {
                //
                // }

                if(job.initial.status != job.status) //if status changed
                    job.save().catch(error => console.log(error));
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