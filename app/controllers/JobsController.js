/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const moment = require('moment');
const async = require('async');

//custom
const Job = require("./../models/Job").schema;
const User = require("./../models/User").schema;
const JobWithdrawal = require("./../models/JobWithdrawal").schema;

const fileHandler = require("../services/fileHandler");
const Utils = require("../services/utils");

module.exports = {
	//all
    getJobDetails: function(req, res)
    {
        Job.findOne({_id: req.params.id }, { start_date: 1, end_date: 1, care_home: 1, role: 1, notes: 1, general_guidance: 1 })
            .populate("care_home",{
                "email": 1,
                "phone_number": 1,
                "address": 1,
                "care_home": 1,
                "care_home.care_service_name": 1,
                "care_home.type_of_home": 1,
                "care_home.name": 1
            })
            .lean()
            .exec((error, job) => {

                if(!job)
                    return res.status(404).json(Utils.parseStringError("Job not found", "job"));

                res.json(Job.parseJob(job, req));
            });
    },

	//only care home methods
	addJobs: function (req, res)
	{
		//floor plan upload
		const uploader = fileHandler(req, res);
		uploader.singleUpload("floor_plan", "users", [
				"application/msword",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				"application/pdf"
			], 10)
			.then(() => {

				//getting job objects
				let jobs = [], jobsObjects = [], validGeneralGuidance = req.user.hasValidGeneralGuidance();
				try {
					jobsObjects = Array.isArray(JSON.parse(req.body[ "jobs" ])) ? JSON.parse(req.body[ "jobs" ]) : [];
				}
				catch (error) {
				}

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
									superior_contact: validGeneralGuidance ? req.user.care_home.general_guidance.superior_contact || req.body.superior_contact : req.body.superior_contact,
									report_contact: validGeneralGuidance ? req.user.care_home.general_guidance.report_contact || req.body.report_contact : req.body.report_contact,
									emergency_guidance: validGeneralGuidance ? req.user.care_home.general_guidance.emergency_guidance || req.body.emergency_guidance : req.body.emergency_guidance,
									notes_for_carers: validGeneralGuidance ? req.user.care_home.general_guidance.notes_for_carers || req.body.notes_for_carers : req.body.notes_for_carers,
									parking: validGeneralGuidance ? req.user.care_home.general_guidance.parking || req.body.parking : req.body.parking,
									floor_plan: req.file ? req.file.path : validGeneralGuidance ? req.user.care_home.general_guidance.floor_plan : null,
								}
							});

							jobs.push(job);
						}
					}
				});

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
								req.user.care_home.general_guidance = jobs[ 0 ].general_guidance;

							//saving job references
							jobs.forEach(job => req.user.care_home.jobs.push(job));
							req.user.save().catch(error => console.log(error));
						}
					}
				);
			});
	},

	//only carer methods
    getMyJobs: async function(req, res)
    {
        const options = {
            select: { start_date: 1, end_date: 1, care_home: 1, role: 1, notes: 1, general_guidance: 1 },
            populate: [
                {
                	path: "care_home",
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
            ],
			sort: { start_date: 1 },
            lean: true,
            leanWithId: false
        };

        const  query = { $and: [ { _id: {  $in: req.user.carer.jobs } }, { summary_sheet: { $exists: false } } ]};

    	const jobs = await Utils.paginate(Job, { query: query, options: options }, req);
    	let paginated = Utils.parsePaginatedResults(jobs);
    	paginated.results.map(job => Job.parseJob(job, req));

		res.json(paginated);
    },

    getCarerAvailableJobs: async function(req, res)
    {
        const users = await User.find({ care_home: { $exists: true }, 'address.location': { $geoWithin: { $centerSphere: [ req.user.address.location.coordinates,  parseInt(req.user.carer.max_job_distance) / 3963.2 ]} }}, { _id: 1 }).lean().exec();

        const calendarStart = Utils.getDatesRange().from;
        const calendarEnd = Utils.getDatesRange(4).to;
        const myCalendarJobs = await Job.find({ _id: { $in: req.user.carer.jobs }, 'assignment.summary_sheet': { $exists: false }}).lean().exec();
        let calendarJobsQuery = { $or: []}

        for(let i = 0; i < myCalendarJobs.length; i++)
        {
            if(i == 0 && myCalendarJobs.length == 1)
                calendarJobsQuery.$or.push({ $and: [ { start_date: { $lt: myCalendarJobs[i].start_date }}, { end_date: { $lt: myCalendarJobs[i].start_date }} ]})

        }


        
        return res.json(myCalendarJobs.map(job => {
            const object = {
                start_date: { $lt: job.end_date },
                end_date: { $gt: job.start_date }
            }

            return object;
        }));

        const jobs = await Job.find(
                {
                    care_home: { $in: users.map(user => user._id) }, //only from care homes within max distance area
                    _id : { $not: { $in: req.user.carer.job_declines }}, // not declined
                    'assignment.carer': { $exists : false }, //not accepted

                },
                { start_date: 1, end_date: 1, care_home: 1, role: 1, notes: 1, general_guidance: 1 }
            )
            // .populate({
            //     path: "care_home",
            //     match: { 'address.location': { $geoWithin: { $centerSphere: [ req.user.address.location.coordinates,  parseInt(req.user.carer.max_job_distance) / 3963.2 ]} } },
            //     select: {
            //         "email": 1,
            //         "phone_number": 1,
            //         "address": 1,
            //         "care_home": 1,
            //         "care_home.care_service_name": 1,
            //         "care_home.type_of_home": 1,
            //         "care_home.name": 1
            //     }
            // })
            .exec();


        // User.aggregate([
        //     {
        //         $geoNear: {
        //             near: req.user.address.location.coordinates,
        //             distanceField: "distance",
        //             distanceMultiplier: 3963.2,
        //             maxDistance: parseInt(req.user.carer.max_job_distance) / 3963.2,
        //             spherical: true,
        //             query: {
        //                 care_home: { $exists: true }
        //             }
        //         }
        //     },
        //     {
        //         $project: {
        //             "distance": 1,
        //             address: 1
        //         }
        //     },
        //     // {
        //     //     $match: { "distanceArea": { $gte: 0 } }
        //     // }
        // ])
        // .then((results) => res.json({ exists: results }));
        // const jobs = await Job.find({
        //
        //             })
        //             .exec();

        // const options = {
        //     select: { start_date: 1, end_date: 1, care_home: 1, role: 1, notes: 1, general_guidance: 1 },
        //     populate: [
        //         {
        //             path: "care_home",
        //             select: {
        //                 "email": 1,
        //                 "phone_number": 1,
        //                 "care_home": 1,
        //                 "care_home.care_service_name": 1,
        //                 "care_home.type_of_home": 1,
        //                 "care_home.address": 1,
        //                 "care_home.name": 1
        //             }
        //         }
        //     ],
        //     sort: { start_date: 1 },
        //     lean: true,
        //     leanWithId: false
        // };
        //
        // const  query = { };
        // const jobs = await Utils.paginate(Job, { query: query, options: options }, req);
        // let paginated = Utils.parsePaginatedResults(jobs);
        // paginated.results.map(job => Job.parseJob(job, req));


    },

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

    getJobs: async function (req, res)
    {

        const options = {
            select: { start_date: 1, end_date: 1, care_home: 1, role: 1, notes: 1, general_guidance: 1 },
            populate: [
                {
                    path: "care_home",
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
            ],
            sort: { start_date: 1 },
            lean: true,
            leanWithId: false
        };

        const  query = { };

        const jobs = await Utils.paginate(Job, { query: query, options: options }, req);
        let paginated = Utils.parsePaginatedResults(jobs);
        paginated.results.map(job => Job.parseJob(job, req));

        res.json(paginated);
    }

}

