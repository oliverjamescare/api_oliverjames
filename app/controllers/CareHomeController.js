/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const moment = require("moment");

//custom
const Job = require("./../models/Job").schema;
const Utils = require("../services/utils");

module.exports = {

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

		//getting care homes jobs for calendar
		const jobs = await Job.find({
						start_date: { $gte:  new Date(calendar[0].day + " 00:00:00")},
						end_date: { $lte: new Date(calendar[34].day + " 23:59:59")},
						_id: { $in: req.user.care_home.jobs }
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
