
//loading config
require('dotenv').config();
require("./../../config/database");

//core
const async = require('async');

//custom
const QueuesHandler = require('./../services/QueuesHandler');
const NotificationsHandler = require('../services/NotificationsHandler');
const User = require("./../models/User").schema;
const Job = require("./../models/Job").schema;

//queues config
const config = {
    queue: "notifications",
    exchange: "notifications"
};

//Notifications listener
QueuesHandler.subscribe(data => {

    async.parallel({
        carer: (callback) => User.findOne({ _id: data.user_id, carer: { $exists: true } }, (error, user) => callback(null, user)),
        job: (callback) => Job.findOne({ _id: data.job_id }, (error, job) => callback(null, job))
    }, (errors,  results) => {

        const handler = new NotificationsHandler();
        const inputs = handler.prepareInputs(data.type, results.carer, results.job);
        handler.addNotification(data.type, { inputs: inputs, user: results.carer, job: results.job });
    });

}, config);