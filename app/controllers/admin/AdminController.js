//core
const async = require('async');
const bcrypt = require('bcrypt-nodejs');

//models
const JobModel = require("./../../models/Job");
const ReviewSchema = require("./../../models/schemas/Review");
const Job = JobModel.schema;
const CareHomeWaitingUser = require("./../../models/CareHomeWaitingUser").schema;
const UserModel = require("./../../models/User");
const AdminModel = require("./../../models/Admin");
const User = UserModel.schema;
const Admin = AdminModel.schema;

//services
const Utils = require("../../services/utils");

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
    },

    getAdminsList: async function(req, res)
    {
        const query = {};

        const options = {
            select: {
            	email: 1,
				first_name: 1,
				surname: 1,
                created: 1
			},
			lean: true,
			leanWithId: false
        };

        //pagination and parsing
		const adminsList = await Utils.paginate(Admin, { query: query, options: options }, req);
        let paginated = Utils.parsePaginatedResults(adminsList);

        res.json(adminsList);
    },

    addAdmin: async function(req, res)
    {
        const body = req.body;

        //admin
        let admin = new Admin({
            email: body.email,
            password: body.password,
            first_name: body.first_name,
            surname: body.surname
        })

        admin.validate().then(() => {
            bcrypt.hash(admin.password, null, null, (error, hash) =>
            {
                admin.set({ password: hash, password_resets: [] });
                admin.save().catch(error => console.log(error));
            });
            res.status(201).json({status: true})

        })
        .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },

    updateAdmin: async function(req, res)
    {
        const body = req.body
        //getting user
        const user = await Admin.findOne( { _id: req.params.id } );

        user.set({
            email: body.email || user.email,
            first_name: body.first_name || user.first_name,
            surname: body.surname || user.surname
        })

        user.save()
        .then(() => res.json({status: true}))
        .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)))
    },

    changePassAdmin: async function(req, res)
    {
        const body = req.body
        //getting user
        const user = await Admin.findOne( { _id: req.params.id } );

        if(!body.password)
            return res.status(404).json("Missing password param");

        bcrypt.hash(body.password, null, null, (error, hash) =>
        {
            user.set({ password: hash});
            user.save().catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
            res.status(201).json({status: true})
            
        });
    },

    changeOwnPassAdmin: async function(req, res)
    {
        const body = req.body
        //getting user
        const user = await Admin.findOne( { _id: req.params.id } );

        if(!body.password)
            return res.status(400).json({status: "Missing password param" });

        if(!body.password_new)
            return res.status(400).json({status: "Missing password_new param" });


        bcrypt.compare(body.password, user.password, (error, status) =>
        {
            //wrong password
            if (!status)
                return res.status(401).json({status: "Password doeasnt match" });

                bcrypt.hash(body.password_new, null, null, (error, hash) =>
                {
                    user.set({ password: hash});
                    user.save().catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
                    res.status(201).json({status: true})
                });
        });
    },

    removeAdminAccount: async function(req, res)
    {
        const user = await Admin.findOne({ _id: req.params.id } );
        Admin.remove({ _id: req.params.id }, (error) => {
            if(error){
                console.log(error)
                res.status(401).json({status: "Error during delete" })
            }else{
                res.status(201).json({status: true})
            }
        })
    }
}