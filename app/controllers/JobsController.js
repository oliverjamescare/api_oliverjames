/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const async = require('async');

//custom
const JobModel = require("./../models/Job");
const Job = JobModel.schema;
const JobWithdrawal = require("./../models/JobWithdrawal").schema;

const fileHandler = require("../services/fileHandler");
const Utils = require("../services/utils");

module.exports = {
	//all
    getJobDetails: function(req, res)
    {
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
				.populate("assignment.carer", {
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
					"carer.dbs.dbs_date": 1
				});
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

    checkCarersToContact: function(req, res)
    {
        //getting job objects
        let jobs = [], jobsObjects = [];
        const gender = req.query.gender;

        try {
            jobsObjects = Array.isArray(JSON.parse(req.query["jobs"])) ? JSON.parse(req.query["jobs"]) : [];
        }
        catch (error) {}

        jobsObjects.forEach(jobObject => {
           if(jobObject._id && jobObject.start_date && jobObject.end_date && jobObject.role)
           {
                const job = {
                    _id: jobObject._id,
                    start_date: jobObject.start_date,
                    end_date: jobObject.end_date,
                    amount: jobObject.amount || 1,
                    role: jobObject.role,
                    notes: jobObject.notes || null,
                    priority_carers: jobObject.priority_carers || [],
                    carersToContact: 10
                }

                jobs.push(job);
           }
        });

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


			//availability failure
			if(!req.user.carer.checkAvailabilityForDateRange(job.start_date, job.end_date))
                return res.status(409).json(Utils.parseStringError("You're not available during this job. Check your availability.", "job"));

			//finding my jobs in this time
			Job.count({ $and: [{_id: { $in: req.user.carer.jobs }}, { start_date: { $lte: job.end_date }},  { end_date: { $gte: job.end_date }} ]})
				.then(amount => {
					if(Boolean(amount))
                        return res.status(409).json(Utils.parseStringError("Conflict! You already have job in this time.", "job"));

					//sending response
                    res.json({ status: true });

					//saving assignment
					job.assignment.carer = req.user;
					job.assignment.created = new Date();
					job.save().catch(error => console.log(error))

                    req.user.carer.jobs.push(job);
                    req.user.save().catch(error => console.log(error))
				});
		})
    },

	declineJob: function (req, res)
	{
        Job.findOne({ _id: req.params.id }, (error, job) => {

            //not found
            if(!job)
                return res.status(404).json(Utils.parseStringError("Job not found", "job"));

            if(job.assignment.carer == req.user.id)
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
    	//validation
        let errors;
        req.check("message").notEmpty().withMessage('Message field is required.').isLength({ max: 200 }).withMessage('Message cannot be longer than 200 characters.');

        if (errors = req.validationErrors())
            return res.status(406).json({ errors: errors });

        Job.findOne({ _id: req.params.id }, (error, job) => {

            //not found
            if(!job)
                return res.status(404).json(Utils.parseStringError("Job not found", "job"));

            if(job.assignment.carer != req.user.id)
                return res.status(409).json(Utils.parseStringError("You are not assigned to this job", "job"));

            if(job.start_date.getTime() < new Date().getTime())
                return res.status(409).json(Utils.parseStringError("You can't withdraw from a job which already started", "job"));

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
        })
    },

    sendSummarySheet: async function(req, res)
    {
        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec();

        //not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        //not your job
        if(!req.user.carer.jobs.find(carerJobId => carerJobId == job._id.toString()))
            return res.status(409).json(Utils.parseStringError("You're not assigned to this job", "job"));

        //summary sheet already sent
        if(job.assignment.summary_sheet && job.assignment.summary_sheet.signature)
            return res.status(409).json(Utils.parseStringError("This job already has summary sheet", "job"));

        //signature upload
        const uploader = fileHandler(req, res);
        const filePath = await uploader.handleSingleUpload("signature", "jobs/" + job._id, { allowedMimeTypes: [ "image/jpeg", "image/jpg", "image/png"], maxFileSize: 10 });

        job.assignment.summary_sheet = {
            signature: filePath,
            name: req.body.name,
            position: req.body.position,
            notes: req.body.notes || '',
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

        //is job accepted
        if(job.assignment.carer)
            return res.status(409).json(Utils.parseStringError("You can\'t edit already accepted job", "job"));

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

        //saving job and sending response
        job
            .save()
            .then(() => res.json({ status: true }))
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

        job.status = JobModel.statuses.CANCELLED;
        job.save().catch(error => console.log(error));

        //sending response
        res.json({ status: true });
    }
}

