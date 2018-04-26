
const NOTIFICATIONS = {
    NEW_JOBS: {
        title: "New job(s) available!",
        description: ["New job(s) available that you may be interested in"],
        inputs: [],
        target: "new_jobs",
        job_id: false
    },
    JOB_CANCELLED: {
        title: "Cancelled job!",
        description: ["A job you accepted has been cancelled"],
        inputs: [],
        target: "job_details",
        job_id: true
    },
    JOB_MODIFIED: {
        title: "Modified job!",
        description: ["A job you accepted has been modified by the client"],
        inputs: [],
        target: "job_details",
        job_id: true
    },
    REVIEW_PUBLISHED: {
        title: "New review published!",
        description: ["New review published. Your average rating is now "," out of 5"],
        inputs: ["average"],
        target: "home",
        job_id: false
    },
    PAYMENT_PROCESSED: {
        title: "Payment scheduled!",
        description: ["Payment of £", " for your job at ", " on ", " has been scheduled. You should receive payment shortly" ],
        inputs: ["amount", "care_service_name", "date"],
        target: "home",
        job_id: false
    }
}

//core
const request = require('request');
const async = require('async');
const moment = require('moment');
const endpoint = "https://fcm.googleapis.com/fcm/send";

//models
const Notification  = require('./../models/Notification').schema;
const JobModel  = require('./../models/Job');
const Job = JobModel.schema;
const User = require('./../models/User').schema;

//services
const JobHandler = require("./JobsHandler");

module.exports = class
{
    constructor()
    {
        const config = process.env;
        this.key = config.FIREBASE_KEY;
    }

    addNotification(type, data)
    {
        if(Object.keys(NOTIFICATIONS).indexOf(type) != -1)
        {
            //if there is token than build and send push
            if(data.user.device.device_id && data.user.device.device_token)
            {
                let pushData = {
                    inputs: data.inputs,
                    to: data.user.device.device_token,
                    sound: this.isSilent(data.user.carer.silent_notifications_settings)
                };

                if(NOTIFICATIONS[type].job_id)
                    pushData["job_id"] = data.job._id

                this.buildNotification(type, pushData);
            }

            //building and saving notification
            const notification = new Notification({
                title: NOTIFICATIONS[type].title,
                description: this.prepareDescription(NOTIFICATIONS[type].description, data.inputs || []),
                job:  NOTIFICATIONS[type].job_id ? data.job._id : null,
                carer: data.user._id
            });

            notification.save().catch(error => console.log(error));
        }
    }

    buildNotification(type, data = {})
    {
        let notification = {};

        if(Object.keys(NOTIFICATIONS).indexOf(type) != -1)
        {
            const description = this.prepareDescription(NOTIFICATIONS[type].description, data.inputs || [])
            notification = {
                to: data.to,
                notification: {
                    title: NOTIFICATIONS[type].title,
                    body: description,
                    sound: data.sound || true,
                    target: NOTIFICATIONS[type].target,
                    job_id: data.job_id || null,
                    type: type
                },
                data: {
                    title: NOTIFICATIONS[type].title,
                    body: description,
                    sound: data.sound || true,
                    target: NOTIFICATIONS[type].target,
                    job_id: data.job_id || null,
                    type: type
                }
            }

            this.sendNotification(notification);
        }

        return notification;
    }

    prepareDescription(partials, inputs)
    {
        let description = "";
        for(let key in partials)
        {
            description += partials[key] ? partials[key] : "";
            description += inputs[key] ? inputs[key] : "";
        }

        return description;
    }

    sendNotification(data)
    {
        //building notification
        const options = {
            url: endpoint,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `key=${this.key}`,
            },
            body: data,
            json: true
        };

        //sending push
        request(options, (error, response, body) => console.log(body))
    }

    isSilent(silenceConfig)
    {
        let isSilent = false;

        const now = new Date();
        const minutes = now.getHours() * 60 + now.getMinutes();
        const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
        const weekday = weekdays[now.getDay()];

        if(silenceConfig.days[weekday] && minutes >= silenceConfig.from && minutes < silenceConfig.to )
            isSilent = true;

        return isSilent;
    }

    prepareInputs(type, carer, job, careHome)
    {
        let inputs = [];

        if(type == "REVIEW_PUBLISHED")
            inputs.push(user.carer.reviews.average);

        if(type == "PAYMENT_PROCESSED")
        {
            inputs.push(job.assignment.payment.net_income);
            inputs.push(careHome.care_home.care_service_name);
            inputs.push(job.assignment.summary_sheet.start_date ? moment(job.assignment.summary_sheet.start_date).format("YYYY-MM-DD") : moment(job.start_date).format("YYYY-MM-DD"));
        }

        return inputs;
    }

    getScheduledNotificationsToSend()
    {
        return new Promise(resolve => {

            const now = new Date();
            let groups = [];
            let notifications = [];

            Job.find({ 'notifications.status': JobModel.jobNotificationStatuses.SCHEDULED })
                .then(async jobs => {

                    const callbacks = jobs.map(job => async (callback) => {

                        if(groups.indexOf(job.group) == -1)
                        {
                            //getting care home and checking if notification still should be sent
                            const careHome = await User.findOne({ _id: job.care_home }).exec();
                            const carers = await JobHandler.getAvailableCarers(job, careHome);

                            job.notifications.forEach(notification => {
                                if(notification.status == JobModel.jobNotificationStatuses.SCHEDULED && notification.time.getTime() <= now.getTime())
                                {
                                    if(carers.findIndex(carer => carer._id.toString() == notification.user.toString()) == -1) //not found
                                        notification.status = JobModel.jobNotificationStatuses.CARER_UNAVAILABLE;
                                    else
                                    {
                                        notification.status = JobModel.jobNotificationStatuses.SENT;
                                        notifications.push({ job_id: job._id, user_id: notification.user });
                                    }
                                }
                            });

                            groups.push(job.group);
                        }
                        //duplicated group
                        else
                        {
                            job.notifications.forEach(notification => {
                                notification.status = JobModel.jobNotificationStatuses.DUPLICATE;
                            });
                        }

                        return notifications.length ? job.save().then(() => callback(null)).catch(error => {
                            console.log(error)
                            callback(null);
                        }): callback(null);
                    });

                    async.waterfall(callbacks, () => resolve(notifications));
                });
        })
    }
}