/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const User = require("./../models/User").schema;
const Utils = require("../services/utils");
const locationHandler = require('../services/locationHandler');
const moment = require("moment");

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
			const { from, to } = getDatesRange(week - 1);
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
			//looking for specifica date range
			const { from, to } = getDatesRange(week - 1);
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
	}
}

//retreives full week range
function getDatesRange(week = 0)
{
	const today = new Date();
	today.setDate(today.getDate() + (7 * week));

	const startOffset = today.getDay() - 1 > -1 ? today.getDay() - 1 : 6;
	const start = moment(today.getTime()).add( -startOffset, "days").format("YYYY-MM-DD");
	const end = moment(today.getTime()).add((6 - startOffset), "days").format("YYYY-MM-DD");

	return { from: start, to: end };
}

