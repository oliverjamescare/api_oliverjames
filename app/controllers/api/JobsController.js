/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const async = require('async');
const bcrypt = require('bcrypt-nodejs');

//custom
const JobModel = require("../../models/Job");
const Job = JobModel.schema;
const JobWithdrawal = require("../../models/JobWithdrawal").schema;
const reviewStatuses = require("../../models/schemas/Review").reviewStatuses;

const fileHandler = require("../../services/fileHandler");
const JobHandler = require('../../services/JobsHandler');
const Utils = require("../../services/utils");
const PaymentsHandler = require('../../services/PaymentsHandler');
const NotificationsHandler = require('../../services/NotificationsHandler');
const QueuesHandler = require('../../services/QueuesHandler');

module.exports = {
	//all
    getJobDetails: function(req, res)
    {
        // const handler = new PaymentsHandler();
        // handler.calculatePaymentTime(new Date("2018-03-02 12:59:59"));

        // const handler = new NotificationsHandler();
        // const a = handler.isSilent(req.user.carer.silent_notifications_settings);


    	//for all
        const jobsQuery = Job.findOne({_id: req.params.id }, { start_date: 1, end_date: 1, care_home: 1, role: 1, notes: 1, general_guidance: 1 })
            .populate("care_home",{
                "email": 1,
                "phone_number": 1,
                "address": 1,
                "care_home": 1,
                "care_home.care_service_name": 1,
                "care_home.type_of_home": 1,
                "care_home.name": 1
            });

        //request by care home
		if(req.user.care_home)
		{
            jobsQuery
				.populate({
                    path: "assignment.carer",
                    select: {
                        "phone_number": 1,
                        "email": 1,
                        "carer.first_name": 1,
                        "carer.surname": 1,
                        "carer.profile_image": 1,
                        "carer.training_record.qualifications": 1,
                        "carer.training_record.safeguarding": 1,
                        "carer.training_record.manual_handling_people": 1,
                        "carer.training_record.medication_management": 1,
                        "carer.training_record.infection_control": 1,
                        "carer.training_record.first_aid_and_basic_life_support": 1,
                        "carer.training_record.first_aid_awareness": 1,
                        "carer.training_record.h_and_s": 1,
                        "carer.training_record.dementia": 1,
                        "carer.training_record.fire_safety": 1,
                        "carer.dbs.status": 1,
                        "carer.dbs.dbs_date": 1,
                        "carer.reviews": 1,
                        "carer.care_experience": 1,
                        "carer.jobs": 1,
                    },
                    populate: {
                        path: 'carer.jobs',
                        match: { 'assignment.review': { $exists: true }, 'assignment.review.status': reviewStatuses.PUBLISHED },
                        sort: { 'assignment.review.created': "DESC" },
                        limit: 10,
                        select: {
                            'assignment.review.created': 1,
                            'assignment.review.description': 1,
                            'assignment.review.rate': 1,
                            'care_home': 1
                        },
                        populate: {
                            path: 'care_home',
                            select: {
                                "email": 1,
                                "phone_number": 1,
                                "address": 1,
                                "care_home": 1,
                                "care_home.care_service_name": 1,
                                "care_home.type_of_home": 1,
                                "care_home.name": 1
                            }
                        }
                    }
                })
		}

        jobsQuery
			.lean()
            .exec((error, job) => {

                if(!job)
                    return res.status(404).json(Utils.parseStringError("Job not found", "job"));

                res.json(Job.parse(job, req));
            });
    },

	//only care home methods
	addJobs: async function (req, res)
	{
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


		//getting job objects
		let jobs = [], jobsObjects = [], validGeneralGuidance = req.user.care_home.hasValidGeneralGuidance();
		try {
			jobsObjects = Array.isArray(JSON.parse(req.body[ "jobs" ])) ? JSON.parse(req.body[ "jobs" ]) : [];
		}
		catch (error) {}

		//creating job objects
		jobsObjects.forEach(jobObject => {
			if (typeof jobObject == "object")
			{
				//generating multiple jobs
				const carersAmount = (parseInt(jobObject[ "amount" ]) || 1) > 1 ? (parseInt(jobObject[ "amount" ]) || 1) : 1;
				for (let i = 0; i < carersAmount; i++) {
					let job = new Job({
						start_date: new Date(jobObject.start_date),
						end_date: new Date(jobObject.end_date),
						care_home: req.user._id,
						role: jobObject.role,
						notes: jobObject.notes,
						gender_preference: req.body.gender_preference,
						general_guidance: {
							superior_contact: validGeneralGuidance ? req.body.superior_contact || req.user.care_home.general_guidance.superior_contact : req.body.superior_contact,
							report_contact: validGeneralGuidance ? req.body.report_contact || req.user.care_home.general_guidance.report_contact : req.body.report_contact,
							emergency_guidance: validGeneralGuidance ? req.body.emergency_guidance || req.user.care_home.general_guidance.emergency_guidance : req.body.emergency_guidance,
							notes_for_carers: validGeneralGuidance ?  req.body.notes_for_carers || req.user.care_home.general_guidance.notes_for_carers: req.body.notes_for_carers,
							parking: validGeneralGuidance ? req.body.parking || req.user.care_home.general_guidance.parking : req.body.parking,
							floor_plan: filePath ? filePath : validGeneralGuidance ? req.user.care_home.general_guidance.floor_plan : null,
						}
					});

					jobs.push(job);
				}
			}
		});

		console.log(jobs[0].assignment);

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
			(errors, results) => {

				console.log(new Date().getTime())
				if (!res.headersSent && results)
				{
					//sending response
					res.status(201).json({ status: true });

					//saving jobs
					jobs.forEach(job => job.save().catch(error => console.log(error)));

					//updating general guidance
					if (!validGeneralGuidance && jobs.length)
						req.user.care_home.general_guidance = jobs[0].general_guidance;

					//saving job references
					jobs.forEach(job => req.user.care_home.jobs.push(job));
					req.user.save().catch(error => console.log(error));
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

                const availableCarers = await JobHandler.getAvailableCarers(job, req.user);
                job["carersToContact"] = availableCarers.length;

                return job;
           }
        }));


        return res.json({ jobs });
    },

	//only carer methods
    acceptJob: function(req, res)
    {
        Job.findOne({ _id: req.params.id }, (error, job) => {

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

            //availability failure
			if(!req.user.carer.checkAvailabilityForDateRange(job.start_date, job.end_date))
                return res.status(409).json(Utils.parseStringError("You're not available during this job. Check your availability.", "job"));

			//required gender preference
			if(job.gender_preference != JobModel.genderPreferences.NO_PREFERENCE && job.gender_preference != req.user.carer.gender)
                return res.status(409).json(Utils.parseStringError("This job requires gender to be " + job.gender_preference + " .", "job"));

			//required role
			if(req.user.carer.eligible_roles.indexOf(job.role) == -1)
                return res.status(409).json(Utils.parseStringError("This job requires role to be " + job.role + " .", "job"));

			//finding my jobs in this time
			Job.count({ $and: [{_id: { $in: req.user.carer.jobs }}, { start_date: { $lte: job.end_date }},  { end_date: { $gte: job.end_date }}, { 'assignment.summary_sheet': { $exists: false }} ]})
				.then(amount => {
					if(Boolean(amount))
                        return res.status(409).json(Utils.parseStringError("Conflict! You already have job in this time.", "job"));

					//sending response
                    res.json({ status: true });

					//saving assignment
					job.assignment.carer = req.user;
					job.assignment.created = new Date();
					job.save().catch(error => console.log(error))

				});
		})
    },

	declineJob: function (req, res)
	{
        Job.findOne({ _id: req.params.id }, (error, job) => {

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
        })
	},

    withdrawJob: function(req, res)
    {
        Job.findOne({ _id: req.params.id }, (error, job) => {

            //not found
            if(!job)
                return res.status(404).json(Utils.parseStringError("Job not found", "job"));

            if(!job.assignment.carer || (job.assignment.carer && job.assignment.carer.toString() != req.user._id.toString()))
                return res.status(409).json(Utils.parseStringError("You are not assigned to this job", "job"));

            if(job.assignment.summary_sheet)
                return res.status(409).json(Utils.parseStringError("You can't withdraw from job which has summary sheet sent", "job"));

            if(job.start_date.getTime() < new Date().getTime())
            {
                bcrypt.compare(req.body["password"], req.user.password, (error, status) =>
                {
                    //wrong password
                    if (!status)
                        return res.status(406).json(Utils.parseStringError("Wrong password", "password"));

                    //sending response
                    res.json({ status: true });

                    //adding new withdrawal
                    JobWithdrawal.findOne({ carer: req.user._id , job: job._id }, (error,  withdrawal) => {
                        if(!withdrawal)
                        {
                            let jobWithdrawal = new JobWithdrawal({ carer: req.user, job: job });
                            jobWithdrawal.save().catch(error => console.log(error));
                        }
                    });
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
                JobWithdrawal.findOne({ carer: req.user._id , job: job._id }, (error,  withdrawal) => {
                    if(!withdrawal)
                    {
                        let jobWithdrawal = new JobWithdrawal({ carer: req.user, job: job, message: req.body.message });
                        jobWithdrawal.save().catch(error => console.log(error));
                    }
                });
            }
        });
    },

    sendSummarySheet: async function(req, res)
    {
        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec();

        //not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        //not your job
        if(job.assignment.carer.toString() != req.user._id.toString())
            return res.status(409).json(Utils.parseStringError("You're not assigned to this job", "job"));

        //summary sheet already sent
        if(job.assignment.status == JobModel.statuses.CANCELLED)
            return res.status(409).json(Utils.parseStringError("This job is cancelled", "job"));

        //summary sheet already sent
        if(job.assignment.summary_sheet && job.assignment.summary_sheet.signature)
            return res.status(409).json(Utils.parseStringError("This job already has summary sheet", "job"));

        //signature upload
        const uploader = fileHandler(req, res);
        const filePath = await uploader.handleSingleUpload("signature", "jobs/" + job._id, { allowedMimeTypes: [ "image/jpeg", "image/jpg", "image/png" ], maxFileSize: 10 });

        job.assignment.summary_sheet = {
            signature: filePath,
            name: req.body.name,
            position: req.body.position,
            notes: req.body.notes || null,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            voluntary_deduction: parseInt(req.body.voluntary_deduction) || 0,
            created: new Date()
        };

	    //saving signature and sending response
	    job
		    .save()
		    .then(() => res.json({ status: true }))
		    .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },

	updateJob: async function(req, res)
	{
        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec();

        //not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        //checking is user an author of this job
        if(req.user._id.toString() != job.care_home.toString())
            return res.status(403).json(Utils.parseStringError("You are not author of this job", "author"));



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
                    QueuesHandler.publish({ user_id: job.assignment.carer, job_id: job._id, type: "JOB_MODIFIED" }, { exchange: "notifications", queue: "notifications" })

                res.json({ status: true })
            })
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
	},

    cancelJob: async function(req, res)
    {
		//getting job
        const job = await Job.findOne({ _id: req.params.id }).exec();

        //not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        //checking is user an author of this job
        if(req.user._id.toString() != job.care_home.toString())
            return res.status(403).json(Utils.parseStringError("You are not author of this job", "author"));

        //summary sent
        if(job.assignment.summary_sheet)
            return res.status(409).json(Utils.parseStringError("You can\'t cancel this job, because summary sheet for this job has already been sent", "job"));

        //summary sent
        if(job.status == JobModel.statuses.CANCELLED)
            return res.status(409).json(Utils.parseStringError("This job has already been cancelled", "job"));

        job.status = JobModel.statuses.CANCELLED;
        job.save()
            .then(job => {

                //sending notification
                if(job.assignment.carer)
                    QueuesHandler.publish({ user_id: job.assignment.carer, job_id: job._id, type: "JOB_CANCELLED" }, { exchange: "notifications", queue: "notifications" })
            })
            .catch(error => console.log(error));

        //sending response
        res.json({ status: true });
    },

    getCareHomeOtherJobs: async function(req, res)
    {
        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec();

        //not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        JobHandler
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
        const job = await Job.findOne({ _id: req.params.id }).exec();

        //not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        //checking is user an author of this job
        if(req.user._id.toString() != job.care_home.toString())
            return res.status(403).json(Utils.parseStringError("You are not author of this job", "author"));

        const availableStatuses = [
            JobModel.statuses.PAID,
            JobModel.statuses.PAYMENT_REJECTED,
            JobModel.statuses.PAYMENT_CANCELLED
        ];

        //not payment stadium
        if(availableStatuses.indexOf(job.status) == -1)
            return res.status(409).json(Utils.parseStringError("This job cannot be rated yet.", "job"));

        //review exists
        if(job.assignment.review)
            return res.status(409).json(Utils.parseStringError("Carer of this job has already been rated.", "carer"));


        job.assignment.review = {
            rate: req.body.rate,
            description: req.body.description
        };

        //saving review and sending response
        job
            .save()
            .then(() => res.json({ status: true }))
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    }

}

