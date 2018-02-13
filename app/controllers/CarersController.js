/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const moment = require("moment");

//custom
const User = require("./../models/User").schema;
const Job = require("./../models/Job").schema;
const Utils = require("../services/utils");
const locationHandler = require('../services/locationHandler');

module.exports = {
	checkCarersNearArea: function (req, res)
	{
		locationHandler.getCustomLocation(req)
			.then((address) =>
			{
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
						"care_home": 1,
						"care_home.care_service_name": 1,
						"care_home.type_of_home": 1,
						"care_home.address": 1,
						"care_home.name": 1
					})
					.lean()
					.exec();

		//parsing
        jobs.map(job => Job.parseJob(job, req));
		calendar.forEach(day => day["jobs"] = jobs.filter(job => moment(job.start_date).format("YYYY-MM-DD") == day.day));

        res.json({ calendar });
	}
}
