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
const permissions = require("./../../../config/permissions");

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

    getProfile: function(req, res)
    {
        const admin = {
            _id: req.user._id,
            email: req.user.email,
            first_name: req.user.first_name,
            surname: req.user.surname,
            role: req.user.roles[0]
        };

        res.json(admin);
    },

    updateProfile: function(req, res)
    {
        //updating admin
        req.user.set({
            email: req.body.email || req.user.email,
            first_name: req.body.first_name || req.user.first_name,
            surname: req.body.surname || req.user.surname,
        });

        req.user
            .save()
            .then(() => res.json({ status: true }))
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },
    changePassword: function(req, res)
    {
        bcrypt.compare(req.body["old_password"], req.user.password, (error, status) =>
        {
            //wrong password
            if (!status)
                return res.status(406).json(Utils.parseStringError("Wrong old password", "password"));

            req.user.password = req.body["new_password"];
            req.user
                .validate()
                .then(() => {

                    //sending response
                    res.status(200).json({ status: true });

                    //hashing password and saving user
                    bcrypt.hash(req.user.password, null, null, (error, hash) => {
                        req.user.password = hash;
                        req.user.save().catch(error => console.log(error));
                    });
                })
                .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
        });
    },

    getAdminsList: async function(req, res)
    {
        const options = {
            select: {
            	email: 1,
				first_name: 1,
				surname: 1,
                created: 1,
                roles: 1
			},
			lean: true,
			leanWithId: false
        };

        //pagination and parsing
		const adminsList = await Utils.paginate(Admin, { query: { _id: { $ne: req.user._id }}, options: options }, req);
        let paginated = Utils.parsePaginatedResults(adminsList);
        paginated.results.map(admin => {
            if(admin.created)
                admin.created = admin.created.getTime();

            if(admin.roles && admin.roles.length)
            {
                admin["role"] = admin.roles[0];
                admin.roles = undefined;
            }

            return admin;
        });

        res.json(paginated);
    },

    addAdmin: async function(req, res)
    {
        //admin
        const body = req.body;
        let admin = new Admin({
            email: body.email,
            password: body.password,
            first_name: body.first_name,
            surname: body.surname,
            roles: ["ADMIN"]
        })

        admin
            .validate()
            .then(() => {

                //sending response
                res.status(201).json({status: true })

                //hashing password and saving admin
                bcrypt.hash(admin.password, null, null, (error, hash) => {
                    admin.set({ password: hash });
                    admin.save().catch(error => console.log(error));
                });
            })
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },

    updateAdmin: async function(req, res)
    {
        //getting admin
        const body = req.body
        const admin = await Admin.findOne( { $and: [{  _id: req.params.id }, {  _id: { $ne: req.user._id } }] } );

        //user not found
        if(!admin)
            return res.status(404).json(Utils.parseStringError("Admin not found", "admin"));

        //permissions handle
        const availableRoles = req.user.roles.includes("ADMIN_DIRECTOR") ? ["ADMIN_DIRECTOR", "ADMIN_MANAGER", "ADMIN"] : ["ADMIN_MANAGER", "ADMIN"]

        admin.set({
            email: body.email || admin.email,
            first_name: body.first_name || admin.first_name,
            surname: body.surname || admin.surname,
            roles: availableRoles.includes(body.role) ? [ body.role ] : admin.roles
        })

        //updating admin
        admin
            .save()
            .then(() => res.json({ status: true }))
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)))
    },

    changeAdminPassword: async function(req, res)
    {
        //getting user
        const admin = await Admin.findOne( { $and: [{  _id: req.params.id }, {  _id: { $ne: req.user._id } }] } );

        //user not found
        if(!admin)
            return res.status(404).json(Utils.parseStringError("Admin not found", "admin"));

        admin.password = req.body.password;
        admin
            .validate()
            .then(() => {

                //sending response
                res.status(200).json({ status: true });

                //hashing password and updating admin
                bcrypt.hash(admin.password, null, null, (error, hash) => {

                    admin.password = hash;
                    admin.save().catch(error => console.log(error));
                });
            })
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)))
    },

    removeAdminAccount: async function(req, res)
    {
        //getting user
        const admin = await Admin.findOne( { $and: [{  _id: req.params.id }, {  _id: { $ne: req.user._id } }] } );

        //user not found
        if(!admin)
            return res.status(404).json(Utils.parseStringError("Admin not found", "admin"));

        //sending response
        res.status(200).json({ status: true });

        //deleting admin
        admin.remove();
    }
}