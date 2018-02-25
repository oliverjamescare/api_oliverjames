/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const moment = require("moment");

//custom
const Job = require("./../models/Job").schema;
const User = require("./../models/User").schema;
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
		const jobs = await Job.find(
					{
						start_date: { $gte:  new Date(calendar[0].day + " 00:00:00")},
						end_date: { $lte: new Date(calendar[34].day + " 23:59:59")},
						_id: { $in: req.user.care_home.jobs }
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

	getCarersSearch: async function (req, res)
    {
    	//getting carers which worked on your jobs previously
		const jobs = await Job.find({ _id : { $in: req.user.care_home.jobs }, 'assignment.summary_sheet': { $exists: true } }, { assignment: 1} ).exec();
		const lastCarers = jobs.map(job => job.assignment.carer );

		//params
    	const search = req.query.search || "";
    	const pattern = new RegExp("^.*" + search + ".*$");

    	const carers = await User.find(
				{ carer: { $exists: true }, _id: { $in: lastCarers }, $or: [ { 'carer.first_name': { $regex: pattern, $options: "x" } }, {'carer.surname': { $regex: pattern, $options: "x" }} ]},
				{ 'carer.first_name': 1, 'carer.surname': 1 }
			)
			.limit(10)
			.exec();

		res.json({ carers });
    },

	getCareHomeMyJobs: async function(req, res)
	{
		const options = {
			select: { start_date: 1, end_date: 1, "assignment.carer": 1},
			populate: [
				{
					path: "assignment.carer",
					select: {
						"carer.first_name": 1,
						"carer.surname": 1
					}
				}
			],
			sort: { start_date: 1 },
			lean: true,
			leanWithId: false
		};

		const  query = { $and: [ { _id: {  $in: req.user.care_home.jobs } }, { "assignment.summary_sheet": { $exists: false } } ]};

		const jobs = await Utils.paginate(Job, { query: query, options: options }, req);
		let paginated = Utils.parsePaginatedResults(jobs);
		paginated.results.map(job => Job.parse(job, req));

		res.json(paginated);
	},

	//blocking carers
	blockCarer: async function(req, res)
	{
		const carer = await User.findOne({ _id: req.params.id, carer: { $exists: true } }).exec();
		if(!carer)
			return res.status(404).json(Utils.parseStringError("Carer not found", "carer"));

		//sending response
		res.json({ status: true });

		//if this carer is not already blocked then adding to block list
		if(!req.user.care_home.blocked_carers.find(carerId => carerId == carer._id.toString() ))
		{
			req.user.care_home.blocked_carers.push(carer);
			req.user.save().catch(error => console.log(error));
		}
	},

	unblockCarer: function(req, res)
	{
		//sending response
		res.json({ status: true });

		//removing carer and saving changes
		req.user.care_home.blocked_carers.pull(req.params.id)
		req.user.save().catch(error => console.log(error));
	}
}
