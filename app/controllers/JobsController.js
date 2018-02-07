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
	}
}

