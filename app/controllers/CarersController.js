/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const moment = require("moment");
const async = require("async");

//custom
const User = require("./../models/User").schema;
const Job = require("./../models/Job").schema;
const Utils = require("../services/utils");
const locationHandler = require('../services/locationHandler');

module.exports = {
	checkCarersNearArea: function (req, res)
	{
		locationHandler.getCustomLocation(req)
			.then((address) => {
				if (!address.location || !address.location.coordinates.length)
					return res.json({ exists: false });

				//finding carers near area
				User.aggregate([
					{
						$geoNear: {
							near: address.location.coordinates,
							distanceField: "distance",
							distanceMultiplier: 3963.2,
							limit: 1,
							spherical: true,
							query: {
								carer: { $exists: true }
							}
						}
					},
					{
						$project: {
							"carer.max_job_distance": 1,
							"distance": 1,
							"distanceArea": { "$subtract": [ "$carer.max_job_distance", "$distance" ] },
						}
					},
					{
						$match: { "distanceArea": { $gte: 0 } }
					}
				]).then((results) => res.json({ exists: Boolean(results.length) }));
			});
	},

	getAvailabilityCalendar: function(req, res)
	{
		let week = parseInt(req.query.week);
		week = week >= 0 && week <= 5 ? week : 0;

		if(week == 0)
			res.json({ type: "general", availability: req.user.carer.availability.general });
		else
		{
			//looking for specific date range
			const { from, to } = Utils.getDatesRange(week - 1);
			const specialWeek = req.user.carer.availability.special_weeks.find( special_week => special_week.from == from && special_week.to == to);

			res.json({ type: from + " / " + to, availability: specialWeek ? specialWeek.days : req.user.carer.availability.general });
		}
	},

	updateAvailability: function(req, res)
	{
		let week = parseInt(req.query.week);
		week = week >= 0 && week <= 5 ? week : 0;

		//updating general availablility
		if(week == 0)
			req.user.carer.availability.general = req.body.availability;

		//updating special weeks
		else
		{
			//looking for specific date range
			const { from, to } = Utils.getDatesRange(week - 1);
			const specialWeek = req.user.carer.availability.special_weeks.find( special_week => special_week.from == from && special_week.to == to);

			if(specialWeek)
				req.user.carer.availability.special_weeks.id(specialWeek._id).set({ days: req.body.availability })
			else
			{
				//creating new special week
				req.user.carer.availability.special_weeks.push({
					from: from,
					to: to,
					days: req.body.availability
				});
			}
		}

		req.user
			.save()
			.then(() => res.json({ status: true }))
			.catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
	},

	getCalendar: async function(req, res)
	{
		//generating calendar
		const currentWeek = Utils.getDatesRange();
		const start = moment(currentWeek.from);
		let calendar = [];

		for(let i = 0; i < 35; i++)
		{
			calendar.push({ day: start.format("YYYY-MM-DD")});
			start.add(1, "days");
		}

		//getting carer jobs for calendar
		const jobs = await Job.find({
						start_date: { $gte:  new Date(calendar[0].day + " 00:00:00")},
						end_date: { $lte: new Date(calendar[34].day + " 23:59:59")},
						_id: { $in: req.user.carer.jobs }
					},
            		{ start_date: 1, end_date: 1, care_home: 1, role: 1}
            		)
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
					.exec();

		//parsing
        jobs.map(job => Job.parse(job, req));
		calendar.forEach(day => day["jobs"] = jobs.filter(job => moment(job.start_date).format("YYYY-MM-DD") == day.day));

        res.json({ calendar });
	},

	getCarerAvailableJobs: function(req, res)
	{
		async.parallel({
			careHomes: (callback) => {
				User.find({
						care_home: { $exists: true },
						'address.location': { $geoWithin: { $centerSphere: [ req.user.address.location.coordinates,  parseInt(req.user.carer.max_job_distance) / 3963.2 ]} }
					},
					{ _id: 1 })
					.lean()
					.then(careHomes => callback(null, careHomes.map(careHome => careHome._id)));
			},
			calendarJobsQuery: (callback) => {
				Job.find({ _id: { $in: req.user.carer.jobs }, 'assignment.summary_sheet': { $exists: false }}, { start_date: 1, end_date: 1})
					.then(myCalendarJobs => {

						let calendarJobsQuery = [];
						for(let i = 0; i < myCalendarJobs.length; i++)
						{
							if (i == 0) //first element
								calendarJobsQuery.push({ end_date: { $lt: myCalendarJobs[i].start_date } })

							if (myCalendarJobs[i + 1]) // if next element exists
								calendarJobsQuery.push({ $and: [ { start_date: { $gt: myCalendarJobs[i].end_date } }, { end_date: { $lt: myCalendarJobs[i + 1].start_date } } ] })

							if ((i + 1) == myCalendarJobs.length) //last element
								calendarJobsQuery.push({ start_date: { $gt: myCalendarJobs[i].end_date } });
						}

						callback(null, calendarJobsQuery, myCalendarJobs);
					});
			}
		}, async (error, results) => {

			//params
			const withDontMeetCriteria = req.query.dont_meet_criteria == 1 ? true : false;
			const filterDistance = parseFloat(req.query.distance);
			const sort = req.query.sort;

			//building query
			let query = {
				care_home: { $in: results.careHomes }, //only from care homes within max distance area
				'assignment.carer': { $exists : false } //not accepted
			};

			if(!withDontMeetCriteria)
				query["_id"] = { $not: { $in: req.user.carer.job_declines }} // not declined

			if(results.calendarJobsQuery[0].length)
				query['$or'] = results.calendarJobsQuery[0]; //exclude calendar conflicts

			//availability handle
			let filteredJobs = await Job.find(query, { start_date: 1, end_date: 1}).lean().exec();
			if(!withDontMeetCriteria)
				filteredJobs = filteredJobs.filter(job => req.user.carer.checkAvailabilityForDateRange(job.start_date, job.end_date));

			filteredJobs = filteredJobs.map(job => job._id);

			//query
			let aggregateQuery = [
				{
					$match: {
						_id: { $in: filteredJobs }
					}
				},
				{
					$project: {
						start_date: 1, end_date: 1, care_home: 1, role: 1
					}
				},
				{
					$lookup: {
						from: "users",
						as: "care_home",
						let: { foreignId: "$care_home"},
						pipeline: [
							{
								$geoNear: {
									near: req.user.address.location.coordinates,
									distanceField: "distance",
									distanceMultiplier: 3963.2,
									spherical: true
								}
							},
							{
								$match: { $expr: { $eq: ["$_id", "$$foreignId"] } }
							},
							{
								$project: {
									"email": 1,
									"phone_number": 1,
									"address": 1,
									"care_home.care_service_name": 1,
									"care_home.type_of_home": 1,
									"care_home.name": 1,
									"distance": 1
								}
							}
						]
					}
				},
				{ $unwind: '$care_home'},
				{
					$lookup: {
						from: "jobs",
						as: "conflicts",
						let: { start_date: "$start_date", end_date: "$end_date"},
						pipeline: [
							{
								$match: { _id : { $in: results.calendarJobsQuery[1].map(job => job._id) }}
							},
							{
								$project: {
									_id: 0,
									"conflict": { $cond: { if: { $or: [ { $lt: [ { $abs: { $subtract: [ "$start_date" , "$$end_date"]} }, 1000 * 60 * 60 ] }, { $lt: [ { $abs: { $subtract: [ "$end_date" , "$$start_date"]} }, 1000 * 60 * 60 ] }] }, then: true, else: false }}
								}
							},
						]
					}
				},
				{
					$project: {
						start_date: 1, end_date: 1, care_home: 1, role: 1,
						conflict: { $anyElementTrue: { $map: { input: "$conflicts", as: "el", in: "$$el.conflict" } } }
					}
				}
			];

			if(!isNaN(filterDistance))
				aggregateQuery.push({ $match: { "care_home.distance": { $lt: filterDistance } } })

			//sorts
			let options = {};
			switch (sort)
			{
				case "roleASC":
				{
					options["sortBy"] = { role: "ASC" }
					break;
				}
				case "roleDESC":
				{
					options["sortBy"] = { role: "DESC" }
					break;
				}
				case "startDESC":
				{
					options["sortBy"] = { start_date: "DESC" }
					break;
				}
				case "endASC":
				{
					options["sortBy"] = { end_date: "ASC" }
					break;
				}
				case "endDESC":
				{
					options["sortBy"] = { end_date: "DESC" }
					break;
				}
				default:
				{
					options["sortBy"] = { start_date: "ASC" }
					break;
				}
			}

			//pagination and parsing
			const jobs = await Utils.paginate(Job, { query: Job.aggregate(aggregateQuery), options: options }, req, true);
			let paginated = Utils.parsePaginatedResults(jobs);
			paginated.results.map(job => Job.parse(job, req));

			res.json(paginated);
		});
	},

	getCarerMyJobs: async function(req, res)
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

		const  query = { $and: [ { _id: {  $in: req.user.carer.jobs } }, { "assignment.summary_sheet": { $exists: false } } ]};

		const jobs = await Utils.paginate(Job, { query: query, options: options }, req);
		let paginated = Utils.parsePaginatedResults(jobs);
		paginated.results.map(job => Job.parse(job, req));

		res.json(paginated);
	},
}
