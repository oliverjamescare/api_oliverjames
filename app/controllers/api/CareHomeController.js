/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const moment = require("moment");

//custom
const JobModel = require("../../models/Job");
const Job = JobModel.schema;
const User = require("../../models/User").schema;
const Utils = require("../../services/utils");

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
						_id: { $in: req.user.care_home.jobs },
        				"assignment.summary_sheet": { $exists: false },
                        status: { $not: { $in: [ JobModel.statuses.CANCELLED, JobModel.statuses.EXPIRED ]} }
					},
            		{ start_date: 1, end_date: 1, care_home: 1, role: 1, status: 1 }
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

        const carers = await User.aggregate(
            [
                {
                    $match: {
                        carer: { $exists: true },
                        _id: { $in: lastCarers }
                    }
                },
                {
                    $project: {
                        'carer.first_name': 1,
                        'carer.surname': 1,
                        'fullname': { $concat: [ '$carer.first_name', " ", '$carer.surname' ] },
                    }
                },
                {
                    $match: {
                        $or:[
                            { 'carer.first_name': { $regex: pattern, $options: "xi" } },
                            { 'carer.surname': { $regex: pattern, $options: "xi" } },
                            { 'fullname': { $regex: pattern, $options: "i" } },
                        ],
                    }
                },
                {
                    $project: {
                        'carer.first_name': 1,
                        'carer.surname': 1
                    }
                },
                { $limit : 10 }
            ]);

		res.json({ carers });
    },

	getCareHomeMyJobs: async function(req, res)
	{
		const options = {
			select: { start_date: 1, end_date: 1, "assignment.carer": 1, status: 1, created: 1 },
			populate: [
				{
					path: "assignment.carer",
					select: {
						"carer.first_name": 1,
						"carer.surname": 1,
						"carer.reviews": 1,
						"carer.care_experience": 1
					}
				}
			],
			sort: { start_date: 1 },
			lean: true,
			leanWithId: false
		};

		const  query = {
			$and: [
				{ _id: {  $in: req.user.care_home.jobs } }, //
                { end_date: { $gte: new Date() } }, //end date must be not expired
				{ "assignment.summary_sheet": { $exists: false } }, //with summary sheet goes only to past jobs
				{ status: { $not: { $in: [ JobModel.statuses.CANCELLED, JobModel.statuses.EXPIRED ]} }} // cancelled and expired will be lost
				]
		};

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
	},

    getPastJobs: async function (req, res)
    {
    	//preparing bounds dates
    	let from = !isNaN(Date.parse(req.query.from))? new Date(req.query.from) : !isNaN(parseInt(req.query.from))? new Date(parseInt(req.query.from)) : false;
    	let to = !isNaN(Date.parse(req.query.to)) ? new Date(req.query.to) : !isNaN(parseInt(req.query.to))? new Date(parseInt(req.query.to)) : false;

    	if(from && to && from.getTime() > to.getTime())
		{
			const temp = from;
			to = from;
			from = temp;
		}


        const options = {
            select: {
            	start_date: 1,
				end_date: 1,
				"cost.total_cost":1,
				"assignment.carer": 1,
				status: 1,
				created: 1,
			},
            populate: [
                {
                    path: "assignment.carer",
                    select: {
                        "carer.first_name": 1,
                        "carer.surname": 1
                    }
                }
            ],
            sort: { start_date: - 1 },
            lean: true,
            leanWithId: false
        };

    	//query
        const query = {
        	_id: {  $in: req.user.care_home.jobs }, //care home jobs
        	"assignment.carer": { $exists: true }, //carer must exists
        	status: { $not: { $in: [ JobModel.statuses.CANCELLED, JobModel.statuses.EXPIRED ]}}, //expired and cancelled jobs will be lost
            $or: [
                { end_date: { $lte: new Date() } }, //end date is expired
                { "assignment.summary_sheet": { $exists: true } } // or summary sheet exists
            ]
        };

        if(from)
        	query["start_date"] = { $gte: from };
        if(to)
            query["start_date"] = { $lte: to };

        const jobs = await Utils.paginate(Job, { query: query, options: options }, req);
        let paginated = Utils.parsePaginatedResults(jobs);
        paginated.results.map(job => Job.parse(job, req));

        res.json(paginated);
    },
	
	getPastJob: async function (req, res)
    {
        //query
        const query = {
            _id: req.params.id, //care home job
            "assignment.carer": { $exists: true }, //carer must exists
            status: { $not: { $in: [ JobModel.statuses.CANCELLED, JobModel.statuses.EXPIRED ]}}, //expired and cancelled jobs will be lost
            $or: [
                { end_date: { $lte: new Date() } }, //end date is expired
                { "assignment.summary_sheet": { $exists: true } } // or summary sheet exists
            ]
        };
        const job = await Job.findOne(query, {
				start_date: 1,
				end_date: 1,
				care_home: 1,
				role: 1,
				notes: 1,
				gender_preference: 1,
				general_guidance: 1,
				status: 1,
				"assignment.acceptance_document": 1
			})
            .populate("care_home",{
                "email": 1,
                "phone_number": 1,
                "address": 1,
                "care_home": 1,
                "care_home.care_service_name": 1,
                "care_home.type_of_home": 1,
                "care_home.name": 1
            })
			.populate({
				path: "assignment.carer",
				select: {
					"carer.first_name": 1,
					"carer.surname": 1,
					"carer.profile_image": 1
				}
			})
			.lean()
			.exec();

        //job not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        res.json(Job.parse(job, req));
    },

    getJobsToReview: async function (req, res)
    {
        const options = {
            select: {
                start_date: 1,
                end_date: 1,
                "assignment.carer": 1,
                status: 1,
                created: 1,
            },
            populate: [
                {
                    path: "assignment.carer",
                    select: {
                        "carer.first_name": 1,
                        "carer.surname": 1,
                        "carer.reviews": 1,
                        "carer.care_experience": 1
                    }
                }
            ],
            sort: { start_date: -1 },
            lean: true,
            leanWithId: false
        };

        //query
        const query = { $and: [ { _id: {  $in: req.user.care_home.jobs } }, { "assignment.summary_sheet": { $exists: true } }, { "assignment.review": { $exists: false } }, { status: { $not: { $in: [ JobModel.statuses.CANCELLED, JobModel.statuses.EXPIRED ]} }} ]};

        const jobs = await Utils.paginate(Job, { query: query, options: options }, req);
        let paginated = Utils.parsePaginatedResults(jobs);
        paginated.results.map(job => Job.parse(job, req));

        res.json(paginated);
    },
}
