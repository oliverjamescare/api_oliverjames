/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const async = require('async');
const bcrypt = require('bcrypt-nodejs');
const randomstring = require('randomstring');
const ObjectId = require('mongoose').Types.ObjectId;

//models
const JobModel = require("../../models/Job");
const User = require("../../models/User").schema;
const Job = JobModel.schema;
const JobWithdrawal = require("../../models/JobWithdrawal").schema;
const reviewStatuses = require("../../models/schemas/Review").reviewStatuses;
const Setting = require('./../../models/Setting').schema;

//services
const fileHandler = require("../../services/fileHandler");
const JobsHandler = require('../../services/JobsHandler');
const Utils = require("../../services/utils");
const PaymentsHandler = require('../../services/PaymentsHandler');
const QueuesHandler = require('../../services/QueuesHandler');
const PDFHandler = require('../../services/PDFHandler');

module.exports = {
	//all
    getJobDetails: async function(req, res)
    {
        JobsHandler.getJobDetailsQuery(req.params.id, req.user.care_home ? true : false)
            .lean()
            .exec((error, job) => {
                if(!job)
                    return res.status(404).json(Utils.parseStringError("Job not found", "job"));

                job = Job.parse(job, req);
                if(req.user.care_home)
                    job.projected_income = undefined;

                if(req.user.carer)
                    job.acceptance_date = undefined;

                res.json(job);
            }).catch(error => console.log("Invalid object id"));;
    },

	//only care home methods
	addJobs: async function (req, res)
	{
	    //card is required
	    if(!req.user.care_home.payment_system.customer_id)
            return res.status(403).json(Utils.parseStringError("You have to add card before booking jobs", "card"));

		//floor plan upload
		const uploader = fileHandler(req, res);
		const filePath = await uploader.handleSingleUpload("floor_plan", "users/" + req.user._id,
						{
							allowedMimeTypes: [
								"application/msword",
								"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
								"application/pdf",
								"image/png",
								"image/jpg",
								"image/jpeg",
							],
							maxFileSize: 10
						});

		//new general guidance
        const generalGuidance = {
            superior_contact: req.body.superior_contact,
            report_contact: req.body.report_contact,
            emergency_guidance: req.body.emergency_guidance,
            notes_for_carers: req.body.notes_for_carers,
            parking: req.body.parking,
            floor_plan: filePath
        }

        //preparing jobs instances
        const jobs = await JobsHandler.prepareBookingJobs(req.user, req.body.jobs, req.body.gender_preference, generalGuidance);
        if(!jobs.length)
            return res.status(406).json(Utils.parseStringError("Invalid jobs", "jobs"));

		//validation
		async.parallel(
			jobs.map(job => (callback) => {
				job.validate()
					.then(() => callback(null))
					.catch(error => {
						if (!res.headersSent)
							res.status(406).json(Utils.parseValidatorErrors(error));
						callback(error);
					});
			}),
			async (errors, results) => {

				if(!res.headersSent && results)
				{
					//sending response
					res.status(201).json({ status: true, group: jobs[0].group });

                    //updating general guidance
                    if (jobs.length)
                    {
						req.user.care_home.general_guidance = jobs[0].general_guidance;
						req.user.care_home.gender_preference = jobs[0].gender_preference;
                    }

                    //saving job references
                    jobs.forEach(job => req.user.care_home.jobs.push(job));
                    req.user.save().catch(error => console.log(error));

                    //saving jobs and preparing notifications
                    const settings = await Setting.findOne({ type: "notifications" }).exec();

                    jobs.forEach(async job => {

                        const availableCarers = await JobsHandler.getAvailableCarers(job, req.user);
                        const notifications = await JobsHandler.assignBuckets(availableCarers, job.priority_carers, job.start_date, settings);
                        notifications.forEach(notification => job.notifications.push(notification));

                        job.save().catch(error => console.log(error))
                    });
				}
			}
		);
	},

    checkCarersToContact: async function(req, res)
    {
        //getting job objects
        let jobsObjects = [];
        const gender = req.query.gender;

        try {
            jobsObjects = Array.isArray(JSON.parse(req.query["jobs"])) ? JSON.parse(req.query["jobs"]) : [];
        }
        catch (error) {}

        const jobs = await Promise.all(jobsObjects.map(async jobObject => {
           if(jobObject._id && jobObject.start_date && jobObject.end_date && jobObject.role)
           {
                let job = {
                    _id: jobObject._id,
                    start_date: jobObject.start_date || 0,
                    end_date: jobObject.end_date || 0,
                    amount: jobObject.amount || 1,
                    role: jobObject.role,
                    notes: jobObject.notes || null,
                    priority_carers: jobObject.priority_carers || [],
                    gender_preference: Object.values(JobModel.genderPreferences).indexOf(gender) != -1 ? gender : JobModel.genderPreferences.NO_PREFERENCE
                }

                const availableCarers = await JobsHandler.getAvailableCarers(job, req.user).catch(error => console.log(error));
                job["carersToContact"] = availableCarers.length;

                return job;
           }
        }));


        return res.json({ jobs });
    },

    getJobNotificationsCarers: async function (req, res)
    {
        const group = req.params.group;
        const jobs = await Job.find({ group: group, care_home: req.user._id });
        const priorityCarers = [];
        const carers = [];

        //group not found
        if(!jobs.length)
            return res.status(404).json(Utils.parseStringError("Group not found", "group"));

        jobs.forEach(job => {
            job.notifications.forEach(notification => {
                const index = carers.findIndex(carer => carer.id.toString() == notification.user.toString());
                if(index == -1)
                    carers.push({ id: notification.user, time: notification.time });
                else
                {
                    if(carers[index].time.getTime() < notification.time)
                        carers[index].time = notification.time;
                }

                if(priorityCarers.indexOf(notification.user.toString()) == -1 && notification.bucket == JobModel.buckets[0]) //is priority
                    priorityCarers.push(notification.user.toString());
            })
        });

        const query = User.aggregate([
            {
                $match: {
                    carer: { $exists: true },
                    _id: { $in: carers.map(carer => ObjectId(carer.id)) }
                }
            },
            {
                $project: {
                    'carer.profile_image': 1,
                    'carer.first_name': 1,
                    'carer.surname': 1,
                    'carer.reviews': 1,
                    'carer.care_experience': 1,
                    'isPriority': {
                        $cond: {
                            if: { $in: [ "$_id", priorityCarers.map(id => ObjectId(id)) ] },
                            then: 1,
                            else: 0
                        }
                    },
                    'carer_notification': {
                        $filter: {
                            input: carers,
                            as: 'carer_notifications',
                            cond: { $eq: [ "$$carer_notifications.id", "$_id" ] }
                        }
                    }
                }
            },
            {
                $unwind: "$carer_notification"
            },
            {
                $sort : { isPriority : -1, 'carer_notification.time': 1 }
            },
            {
                $project: {
                    _id: 1,
                    'carer.profile_image': 1,
                    'carer.first_name': 1,
                    'carer.surname': 1,
                    'carer.reviews': 1,
                    'carer.care_experience': 1,
                    'isPriority': 1,
                    'notification_time': "$carer_notification.time"
                }
            },
        ]);

        //pagination and parsing
        const users = await Utils.paginate(User, { query: query, options: {} }, req, true);
        let paginated = Utils.parsePaginatedResults(users);

        paginated.results.map(user => {
            user = User.parse(user, req);
            user.notification_time = user.notification_time ? user.notification_time.getTime() : null;
            user.isPriority = Boolean(user.isPriority);
            return user;
        });

        res.json(paginated);

    },

    removeJobNotificationCarer: async function(req, res)
    {
        const group = req.params.group;
        const jobs = await Job.find({ group: group, care_home: req.user._id });
        const carerId = req.params.id;

        //group not found
        if(!jobs.length)
            return res.status(404).json(Utils.parseStringError("Group not found", "group"));

        //sending response
        res.json({ status: true });

        //updating jobs
        jobs.forEach(job => {
            job.notifications.forEach(notification => {
                if(notification.status == JobModel.jobNotificationStatuses.SCHEDULED && notification.user.toString() == carerId)
                    notification.status = JobModel.jobNotificationStatuses.CANCELLED;
            });

            job.save().catch(error => console.log(error));
        });
    },

	//only carer methods
    acceptJob: async function(req, res)
    {
        //bank details required
        if(!req.user.carer.payment_system.account_id)
            return res.status(403).json(Utils.parseStringError("You have to add bank account before accepting jobs", "bank account"));

        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec().catch(error => console.log("Invalid object id"));

        //not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        //accepted job
        if(job.assignment.carer)
            return res.status(409).json(Utils.parseStringError("This job has already been accepted", "job"));

        //expired job
        if(job.status == JobModel.statuses.EXPIRED)
            return res.status(409).json(Utils.parseStringError("This job is expired", "job"));

        //cancelled job
        if(job.status == JobModel.statuses.CANCELLED)
            return res.status(409).json(Utils.parseStringError("This job is cancelled", "job"));

        //required gender preference
        if(job.gender_preference != JobModel.genderPreferences.NO_PREFERENCE && job.gender_preference != req.user.carer.gender)
            return res.status(409).json(Utils.parseStringError("This job requires gender to be " + job.gender_preference + " .", "job"));

        //required role
        if(req.user.carer.eligible_roles.indexOf(job.role) == -1)
            return res.status(409).json(Utils.parseStringError("This job requires role to be " + job.role + " .", "job"));

        //checking if care home hasn't blocked this carer
        const careHome = await User.findOne({ _id: job.care_home, care_home: { $exists: true }}).exec();
        if(careHome.care_home.blocked_carers.find(carerId => carerId.toString() == req.user._id.toString()))
            return res.status(409).json(Utils.parseStringError("You are blocked by this care home.", "job"));

        //finding my jobs in this time
        const conflicts = await Job.count({ $and: [{_id: { $in: req.user.carer.jobs }}, { start_date: { $lt: job.end_date }},  { end_date: { $gt: job.start_date }}, { 'assignment.payment': { $exists: false }} ]});
        if(Boolean(conflicts))
            return res.status(409).json(Utils.parseStringError("Conflict! You already have job in this time.", "job"));

        //sending response
        res.json({ status: true });

        //saving assignment
        job.assignment.carer = req.user;
        job.assignment.created = new Date();

        job.save()
            .then(job => JobsHandler.generateJobAcceptanceDocument(job, req))
            .then(documentPath => {

                job.sendJobAcceptance(documentPath, req.app.mailer, careHome, req.user);
                job.save().catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    },

    requestCarerChange: async function(req, res)
    {
        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec().catch(error => console.log("Invalid object id"));

        //not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        //checking is user an author of this job
        if(req.user._id.toString() != job.care_home.toString())
            return res.status(403).json(Utils.parseStringError("You are not author of this job", "author"));

        //summary sent
        if(!job.assignment.carer)
            return res.status(409).json(Utils.parseStringError("This job has no carer", "job"));

        //summary sent
        if(job.assignment.payment)
            return res.status(409).json(Utils.parseStringError("You can't request for carer change in job with summary sheet sent", "job"));

        //summary sent
        if(job.status == JobModel.statuses.CANCELLED)
            return res.status(409).json(Utils.parseStringError("You can't modify cancelled job", "job"));

        //getting carer
        const carer = await User.findOne({ _id: job.assignment.carer }).exec();

        //sending response
        res.json({ status: true });

        //clearing carer job assignment
        if(job.assignment.acceptance_document)
        {
            const handler = fileHandler();
            handler.deleteFile(job.assignment.acceptance_document)
        }

        job.assignment.carer = undefined;
        job.assignment.created = undefined;
        job.assignment.acceptance_document = undefined;

        job.save()
            .then(job => {

                //sending notification and email to carer
                QueuesHandler.publish({ carer_id: carer._id, job_id: job._id, type: "JOB_CANCELLED" }, { exchange: "notifications", queue: "notifications" })
                job.sendJobCancellation(req.app.mailer, carer);
            })
            .catch(error => console.log(error));

        //clearing carer
        carer.carer.jobs.pull(job._id);
        carer.save().catch(error => console.log(error));
    },

	declineJob: async function (req, res)
	{
        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec().catch(error => console.log("Invalid object id"));

        //not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        if(job.assignment.carer && job.assignment.carer.toString() == req.user._id.toString())
            return res.status(409).json(Utils.parseStringError("You can't decline previously accepted job", "job"));

        //sending response
        res.json({ status: true });

        //adding job decline if not exists
        if(req.user.carer.job_declines.indexOf(job._id) == -1 && job.declines.indexOf(req.user._id) == -1)
        {
            req.user.carer.job_declines.push(job);
            req.user.save().catch(error => console.log(error));

            job.declines.push(req.user);
            job.save().catch(error => console.log(error));
        }
	},

    withdrawJob: async function(req, res)
    {
        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec().catch(error => console.log("Invalid object id"));

        //not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        if(!job.assignment.carer || (job.assignment.carer && job.assignment.carer.toString() != req.user._id.toString()))
            return res.status(409).json(Utils.parseStringError("You are not assigned to this job", "job"));

        if(job.assignment.payment)
            return res.status(409).json(Utils.parseStringError("You can't withdraw from job which has summary sheet sent", "job"));

        //getting care home
        const careHome = await User.findOne({ _id: job.care_home }).exec();

        if(job.start_date.getTime() < new Date().getTime())
        {
            bcrypt.compare(req.body["password"], req.user.password, (error, status) => {
                //wrong password
                if (!status)
                    return res.status(406).json(Utils.parseStringError("Wrong password", "password"));

                //sending response
                res.json({ status: true });

                //adding new withdrawal
                let jobWithdrawal = new JobWithdrawal({ carer: req.user, job: job });
                jobWithdrawal.save().catch(error => console.log(error));

                //sending withdrawal to care home
                job.sendJobWithdrawal(req.app.mailer, req.user, careHome, jobWithdrawal)
            });
        }
        else
        {
            //validation
            let errors;
            req.check("message").notEmpty().withMessage('Message field is required.').isLength({ max: 200 }).withMessage('Message cannot be longer than 200 characters.');

            if (errors = req.validationErrors())
                return res.status(406).json({ errors: errors });

            //sending response
            res.json({ status: true });

            //adding new withdrawal
            let jobWithdrawal = new JobWithdrawal({ carer: req.user, job: job, message: req.body.message });
            jobWithdrawal.save().catch(error => console.log(error));

            //sending withdrawal to care home
            job.sendJobWithdrawal(req.app.mailer, req.user, careHome, jobWithdrawal)
        }
    },

    sendSummarySheet: async function(req, res)
    {
        //bank details required
        if(!req.user.carer.payment_system.account_id)
            return res.status(403).json(Utils.parseStringError("You have to add bank account before sending summary sheet", "bank account"));

        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec().catch(error => console.log("Invalid object id"));;

        //not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        //not your job
        if(job.assignment.carer.toString() != req.user._id.toString())
            return res.status(409).json(Utils.parseStringError("You're not assigned to this job", "job"));

        //summary sheet already sent
        if(job.status == JobModel.statuses.CANCELLED)
            return res.status(409).json(Utils.parseStringError("This job is cancelled", "job"));

        //summary sheet already sent
        if((job.assignment.summary_sheet && job.assignment.summary_sheet.signature) || job.assignment.payment)
            return res.status(409).json(Utils.parseStringError("This job already has summary sheet", "job"));

        //summary sheet already sent
        if(job.start_date.getTime() > new Date().getTime())
            return res.status(409).json(Utils.parseStringError("You can't sent summary before start of the job", "job"));

        //signature upload
        const uploader = fileHandler(req, res);
        const filePath = await uploader.handleSingleUpload("signature", "jobs/" + job._id, { allowedMimeTypes: [ "image/jpeg", "image/jpg", "image/png" ], maxFileSize: 10 });

        //summary sheet
        let now = new Date();
        job.assignment.summary_sheet = {
            signature: filePath,
            name: req.body.name,
            position: req.body.position,
            notes: req.body.notes || null,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            voluntary_deduction: parseInt(req.body.voluntary_deduction) || 0,
            created: now
        };

        //payment init and debit date calculation
        const handler = new PaymentsHandler();
        const debitDate = handler.calculateDebitDate(now);

        job.assignment.payment = {
            debit_date: debitDate
        };

	    //saving signature and sending response
	    job
		    .save()
		    .then(job => {

		        //sending response
                const { job_income, total_minutes, total_cost } = JobsHandler.calculateJobCost(job);
                res.json({ status: true, debit_date: debitDate.getTime(), projected_income: job_income, minutes: total_minutes });


                async.waterfall([
                    (callback) => User.findOne({ _id: job.care_home }).then(user => callback(null, user)), //getting care home
                    (careHome, callback) => {

                        //generating reducers
                        async.parallel({
                            carer: (callback) => {
                                const reducedDeduction = Math.min(parseFloat(((job_income * job.booking_pricing.max_to_deduct) / 100).toFixed(2)), req.user.carer.getDeductionsBalance());
                                req.user.carer.addDeduction(reducedDeduction, job);
                                req.user.save().then(carer => callback(null, carer)).catch(error => console.log(error))
                            },
                            care_home: (callback) => {
                                const reducedCredits = Math.min(total_cost, careHome.care_home.getCreditsBalance());
                                careHome.care_home.addCredits(reducedCredits, job);
                                careHome.save().then(careHome => callback(null, careHome)).catch(error => console.log(error))
                            }
                        }, (errors, results) => callback(null, results))
                    }
                ], (errors, results) => {

                    //generating standard invoice, sending emails and saving job
                    const handler = new PDFHandler(req);
                    handler.generatePdf("STANDARD_INVOICE", "jobs/" + job._id, { job: job, carer: results.carer, care_home: results.care_home })
                        .then(pdfPath => {

                            job.assignment.summary_sheet.standard_invoice = pdfPath;
                            job.sendJobSummaryEmails(req.app.mailer, results.care_home, results.carer, total_minutes);

                            job.save().catch(error => console.log(error));
                        });
                });
            })
		    .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },

    getProjectedIncome: async function (req, res)
    {
        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec().catch(error => console.log("Invalid object id"));;

        //not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        let startDate = parseInt(req.query.start_date) || 0;
        let endDate = parseInt(req.query.end_date) || 0;
        let deduction = Math.max((parseInt(req.query.voluntary_deduction) || 0),0);

        if(startDate > endDate)
        {
            const tmp = startDate;
            startDate = endDate;
            endDate = tmp;
        }

        //fake assignment
        job.assignment.summary_sheet = {
            start_date: new Date(startDate),
            end_date: new Date(endDate),
            voluntary_deduction: deduction
        }

        //sending response
        const { job_income, deducted_income } = JobsHandler.calculateJobCost(job);
        res.json({ projected_income: job_income, deducted: deducted_income });
    },

	updateJob: async function(req, res)
	{
        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec().catch(error => console.log("Invalid object id"));;

        //not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        //checking is user an author of this job
        if(req.user._id.toString() != job.care_home.toString())
            return res.status(403).json(Utils.parseStringError("You are not author of this job", "author"));

        //summary sent
        if(job.assignment.payment)
            return res.status(409).json(Utils.parseStringError("You can\'t edit this job, because summary sheet for this job has already been sent", "job"));

        //summary sent
        if(job.status == JobModel.statuses.CANCELLED)
            return res.status(409).json(Utils.parseStringError("You can't edit cancelled job", "job"));

        //floor plan upload
        const uploader = fileHandler(req, res);
        const filePath = await uploader.handleSingleUpload("floor_plan", "users/" +  req.user._id,
            {
                allowedMimeTypes: [
                    "application/msword",
	                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	                "application/pdf",
	                "image/png",
	                "image/jpg",
	                "image/jpeg",
                ],
                maxFileSize: 10
            });

        //editing fields
        job.set({
			start_date: req.body.start_date || job.start_date,
			end_date: req.body.end_date || job.end_date,
			role: req.body.role || job.role,
            notes: req.body.notes || job.notes,
            gender_preference: req.body.gender_preference || job.gender_preference,
            general_guidance: {
                superior_contact: req.body.superior_contact || job.general_guidance.superior_contact,
                report_contact: req.body.report_contact || job.general_guidance.report_contact,
                emergency_guidance: req.body.emergency_guidance || job.general_guidance.emergency_guidance,
                notes_for_carers: req.body.notes_for_carers || job.general_guidance.notes_for_carers,
                parking: req.body.report_contact || job.general_guidance.parking,
                floor_plan: filePath || job.general_guidance.floor_plan,
			}
		});

        //is job accepted
        if(job.assignment.carer && (new Date(job.initial.start_date).getTime() != job.start_date.getTime() || job.end_date.getTime() != new Date(job.initial.end_date).getTime()))
            return res.status(409).json(Utils.parseStringError("You can\'t edit dates in job which has already been accepted", "job"));

        //saving job and sending response
        job
            .save()
            .then(() => {

                //checking changes
                let jobChanged = false;
                if(
                    job.role != job.initial.role ||
                    job.notes != job.initial.notes ||
                    job.gender_preference != job.initial.gender_preference ||
                    job.general_guidance.superior_contact != job.initial.general_guidance.superior_contact ||
                    job.general_guidance.report_contact != job.initial.general_guidance.report_contact ||
                    job.general_guidance.emergency_guidance != job.initial.general_guidance.emergency_guidance ||
                    job.general_guidance.notes_for_carers != job.initial.general_guidance.notes_for_carers ||
                    job.general_guidance.parking != job.initial.general_guidance.parking ||
                    job.general_guidance.floor_plan != job.initial.general_guidance.floor_plan
                )
                    jobChanged = true;

                //sending notification
                if(job.assignment.carer && jobChanged)
                    QueuesHandler.publish({ carer_id: job.assignment.carer, job_id: job._id, type: "JOB_MODIFIED" }, { exchange: "notifications", queue: "notifications" })

                res.json({ status: true })
            })
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
	},

    cancelJob: async function(req, res)
    {
		//getting job
        const job = await Job.findOne({ _id: req.params.id }).exec().catch(error => console.log("Invalid object id"));;

        //not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        //checking is user an author of this job
        if(req.user._id.toString() != job.care_home.toString())
            return res.status(403).json(Utils.parseStringError("You are not author of this job", "author"));

        //summary sent
        if(job.assignment.payment)
            return res.status(409).json(Utils.parseStringError("You can\'t cancel this job, because summary sheet for this job has already been sent", "job"));

        //summary sent
        if(job.status == JobModel.statuses.CANCELLED)
            return res.status(409).json(Utils.parseStringError("This job has already been cancelled", "job"));

        job.status = JobModel.statuses.CANCELLED;

        //half charge
        const now = new Date();
        const acceptanceTimeBound = 1000 * 60 *  60 * 2; //2 hours
        const jobTimeBound = 1000 * 60 *  60 * 24; //24 hours
        let halfCharge = false;

        if(job.start_date.getTime() - jobTimeBound <= now.getTime() && job.assignment.carer && job.assignment.created.getTime() + acceptanceTimeBound <= now.getTime())
        {
            halfCharge = true;
            now.setMinutes(now.getMinutes() + 1); //one minute payment processing delay to apply all payment processing rules

            job.percent_charge = 50;
            job.assignment.payment = {
                debit_date: now
            };
        }

        //sending response
        res.json({ status: true, half_charge_applied: halfCharge });

        job.save()
            .then(job => {

                if(halfCharge)
                {
                    const { total_minutes } = JobsHandler.calculateJobCost(job);
                    QueuesHandler.publish({ carer_id: job.assignment.carer, job_id: job._id, type: "JOB_CANCELLED" }, { exchange: "notifications", queue: "notifications" })
                    job.sendJobCancellationCharge(req.app.mailer, job.assignment.carer, total_minutes);
                }
                else
                {
                    //sending notification and email to carer
                    if(job.assignment.carer)
                    {
                        QueuesHandler.publish({ carer_id: job.assignment.carer, job_id: job._id, type: "JOB_CANCELLED" }, { exchange: "notifications", queue: "notifications" })
                        job.sendJobCancellation(req.app.mailer, job.assignment.carer);
                    }
                }
            })
            .catch(error => console.log(error));

    },

    getCareHomeOtherJobs: async function(req, res)
    {
        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec().catch(error => console.log("Invalid object id"));;

        //not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        JobsHandler
            .getNewJobs(req, job.care_home, job._id)
            .then(async (queryConfig) => {

                //pagination and parsing
                const jobs = await Utils.paginate(Job, queryConfig, req, true);
                let paginated = Utils.parsePaginatedResults(jobs);
                paginated.results.map(job => Job.parse(job, req));

                res.json(paginated);
            });
    },

    reviewJob: async function (req, res)
    {
        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec().catch(error => console.log("Invalid object id"));;

        //not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        //checking is user an author of this job
        if(req.user._id.toString() != job.care_home.toString())
            return res.status(403).json(Utils.parseStringError("You are not author of this job", "author"));

        //without assignment or job summary
        if(!job.assignment || !job.assignment.payment)
            return res.status(409).json(Utils.parseStringError("This job cannot be rated yet.", "job"));

        //review exists
        if(job.assignment.review)
            return res.status(409).json(Utils.parseStringError("Carer of this job has already been rated.", "carer"));

        job.assignment.review = {
            rate: req.body.rate,
            description: req.body.description,
            created: new Date()
        };

        //saving review and sending response
        job
            .save()
            .then(() => res.status(201).json({ status: true }))
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },

    challengeJob: async function(req, res)
    {
        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec().catch(error => console.log("Invalid object id"));

        //not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        //checking is user an author of this job
        if(req.user._id.toString() != job.care_home.toString())
            return res.status(403).json(Utils.parseStringError("You are not author of this job", "author"));

        //not payment stadium
        if(job.status != JobModel.statuses.PENDING_PAYMENT || job.assignment.challenge || job.percent_charge != 100)
            return res.status(409).json(Utils.parseStringError("This job cannot be challenged.", "job"));

        job.assignment.challenge = {
            description: req.body.description,
            created: new Date()
        };

        //saving challenge, sending response and email
        job
            .save()
            .then(() => {
                job.sendJobChallenge(req.app.mailer);
                res.status(201).json({ status: true })
            })
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));

    },
}

