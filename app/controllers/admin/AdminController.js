//core
const async = require('async');


//models
const JobModel = require("./../../models/Job");
const ReviewSchema = require("./../../models/schemas/Review");
const Job = JobModel.schema;
const CareHomeWaitingUser = require("./../../models/CareHomeWaitingUser").schema;
const UserModel = require("./../../models/User");
const User = UserModel.schema;

module.exports = {
    home: function (req, res)
    {
        async.parallel({
            jobs: (callback) => {

                let yesterday = new Date();
                yesterday.setHours(yesterday.getHours() - 24);

                Job.aggregate([
                    {
                        $project: {
                            failed_payment: {
                                $cond: {
                                    if: { $eq: [ "$status", JobModel.statuses.PAYMENT_REJECTED ] },
                                    then: 1,
                                    else: 0
                                }
                            },
                            challenged: {
                                $cond: {
                                    if: { $eq: [ "$status", JobModel.statuses.CHALLENGED ] },
                                    then: 1,
                                    else: 0
                                }
                            },
                            pending_review: {
                                $cond: {
                                    if: { $eq: [ "$assignment.review.status", ReviewSchema.reviewStatuses.PENDING ] },
                                    then: 1,
                                    else: 0
                                }
                            },
                            booked_24: {
                                $cond: {
                                    if: { $gt: [ "$created", yesterday ] },
                                    then: 1,
                                    else: 0
                                }
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            failed_payments: { $sum: "$failed_payment" },
                            challenged_jobs: { $sum: "$challenged" },
                            pending_reviews: { $sum: "$pending_review" },
                            booked_in_24_jobs: { $sum: "$booked_24" }
                        }
                    }
                ]).then(results => callback(null, results[0]));
            },

            waitingList: (callback) => CareHomeWaitingUser.count().then(results => callback(null, results)),
            pendingUsers: (callback) => User.count({ carer: { $exists: true }, status: UserModel.statuses.CREATED }).then(results => callback(null, results))

        }, (errors, results) => {

            res.json({
                failed_payments: results.jobs.failed_payments,
                challenged_jobs: results.jobs.challenged_jobs,
                pending_reviews: results.jobs.pending_reviews,
                booked_in_24_jobs: results.jobs.booked_in_24_jobs,
                waiting_list: results.waitingList,
                in_progress_carers: results.pendingUsers
            })
        })
    }
}