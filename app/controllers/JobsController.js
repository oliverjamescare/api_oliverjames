/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const Job = require("./../models/Job").schema;
const fileHandler = require("../services/fileHandler");
const Utils = require("../services/utils");
const async = require('async');
const moment = require('moment');

module.exports = {
	//all
    getJobDetails: function(req, res)
    {
        Job.findOne({_id: req.params.id }, { start_date: 1, end_date: 1, care_home: 1, role: 1, notes: 1, general_guidance: 1 })
            .populate("care_home",{
                "email": 1,
                "phone_number": 1,
                "care_home": 1,
                "care_home.care_service_name": 1,
                "care_home.type_of_home": 1,
                "care_home.address": 1,
                "care_home.name": 1
            })
            .lean()
            .exec((error, job) => {

                if(!job)
                    return res.status(404).json(Utils.parseStringError("Job not found", "job"));

                let link = job.general_guidance.floor_plan.substr(job.general_guidance.floor_plan.indexOf("\\") + 1).replace(/\\/g,"/");
                job.general_guidance.floor_plan = `http://${req.headers.host}/${link}`;
                res.json({ job: job });
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
    getMyJobs: function(req, res)
    {
        res.json({ status: req.user.carer.checkAvailabilityForDateRange(new Date("2018-02-08 10:00:00"), new Date("2018-02-09 09:00:00")) });
    },

    acceptJob: function(req, res)
    {
        Job.findOne({ _id: req.params._id }, (error, job) => {

        	//not found
            if(!job)
                return res.status(404).json(Utils.parseStringError("Job not found", "job"));

            //accepted job
			if(job.assignment.carer)
                return res.status(409).json(Utils.parseStringError("This job has already been accepted", "job"));

			// //
			// Job.find({ })


            res.json({ status: true });

		})
    },

    withdrawJob: function(req, res)
    {
        Job.findOne({ _id: req.params._id }, (error, job) => {

            //not forund
            if(!job)
                return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        })
    }
}

