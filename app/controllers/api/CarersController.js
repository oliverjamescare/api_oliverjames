/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const moment = require("moment");
const async = require("async");

//models
const JobModel = require("../../models/Job");
const Job = JobModel.schema;
const NotificationModel = require("../../models/Notification");
const Notification = NotificationModel.schema;

//services
const Utils = require("../../services/utils");
const locationHandler = require('../../services/locationHandler');
const JobsHandler = require('../../services/JobsHandler');
const CarersHandler = require('../../services/CarersHandler');

module.exports = {
	checkCarersNearArea: function (req, res)
	{
		locationHandler.getCustomLocation(req.query)
			.then((address) => {
				if (!address.location || !address.location.coordinates.length)
					return res.json({ exists: false });


                CarersHandler
					.getAvailableCarersNearby(address.location.coordinates)
					.then((results) => res.json({ exists: Boolean(results.length) }));
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
						_id: { $in: req.user.carer.jobs },
        				"assignment.summary_sheet": { $exists: false },
						status: { $ne: JobModel.statuses.CANCELLED }
					},
            		{ start_date: 1, end_date: 1, care_home: 1, role: 1, notes: 1, general_guidance: 1,  status: 1, 'assignment.projected_income': 1 }
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

    getMonthlyCalendar: async function(req, res)
    {
        let startDate = moment(isNaN(Date.parse(req.query.start_date))? new Date() : new Date(req.query.start_date));
		let endDate = moment(isNaN(Date.parse(req.query.end_date))? new Date() : new Date(req.query.end_date)).add(1, "days");

        //generating calendar
        let calendar = [];
        for(let i = 0; startDate.format("YYYY-MM-DD") != endDate.format("YYYY-MM-DD") && i < 62; i++)
        {
            calendar.push({ day: startDate.format("YYYY-MM-DD")});
            startDate.add(1, "days");
        }

		if(calendar.length)
		{
            //getting carer jobs for calendar
            const jobs = await Job.find({
                    start_date: { $gte:  new Date(calendar[0].day + " 00:00:00")},
                    end_date: { $lte: new Date(calendar[calendar.length - 1].day + " 23:59:59")},
                    _id: { $in: req.user.carer.jobs },
                    "assignment.summary_sheet": { $exists: false },
                    status: { $ne: JobModel.statuses.CANCELLED }
                },
                { start_date: 1, end_date: 1, care_home: 1, role: 1, notes: 1, general_guidance: 1,  status: 1, 'assignment.projected_income': 1  }
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
		}

        return res.json({ calendar });
    },

	getCarerAvailableJobs: function(req, res)
	{
        JobsHandler
			.getNewJobs(req)
			.then(async (queryConfig) => {

				//pagination and parsing
				const jobs = await Utils.paginate(Job, queryConfig, req, true);
				let paginated = Utils.parsePaginatedResults(jobs);
                paginated.results.map(job => Job.parse(job, req));

				res.json(paginated);
			});
	},

	getCarerMyJobs: async function(req, res)
	{
		const options = {
			select: { start_date: 1, end_date: 1, care_home: 1, role: 1, notes: 1, general_guidance: 1, status: 1, 'assignment.projected_income': 1 },
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

		const query = { $and: [ { _id: {  $in: req.user.carer.jobs } }, { "assignment.summary_sheet": { $exists: false } }, { status: { $ne: JobModel.statuses.CANCELLED } } ]};

		const jobs = await Utils.paginate(Job, { query: query, options: options }, req);
		let paginated = Utils.parsePaginatedResults(jobs);
        paginated.results.map(job => Job.parse(job, req));

		res.json(paginated);
	},

    getNotificationsSettings: function (req, res)
    {
        res.json(req.user.carer.silent_notifications_settings);
    },

    updateNotificationsSettings: function (req, res)
    {
        req.user.carer.silent_notifications_settings = req.body;
        console.log(req.headers);

        req.user
            .save()
            .then(() => res.json({ status: true }))
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },

    getHomeScreenDetails: async function(req, res)
	{
        async.parallel({
			nearestJob: (callback) => {

                Job.find({ $and: [ { _id: {  $in: req.user.carer.jobs } }, { "assignment.summary_sheet": { $exists: false } }, { start_date: { $gt:  new Date() }} ]})
                .sort({ start_date: 1 })
                .limit(1)
				.exec()
                .then(results => callback(null, results));

			},
			jobs24: (callback) => {

                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);

                Job.count({ $and: [ { _id: {  $in: req.user.carer.jobs } }, { "assignment.summary_sheet": { $exists: false } }, { start_date: { $gte: new Date() } }, { start_date: { $lte: tomorrow } } ]})
					.exec()
                    .then(results => callback(null, results));
			},
			newJobs: (callback) => {
                JobsHandler
                    .getNewJobs(req)
                    .then(async (queryConfig) => {

                        let pipeline = queryConfig.query.pipeline();
                        pipeline.push({ $count: 'jobs' });

                        const newJobs = await Job.aggregate(pipeline).exec();
                        callback(null, newJobs);
                    });
			}
		}, (errors, results) => {

        	//sending response
        	const response = {
                reviews: req.user.carer.reviews,
				nextJobStartDate: results.nearestJob.length ? results.nearestJob[0].start_date.getTime(): null,
				jobs24: results.jobs24,
				newJobs: results.newJobs.length ? results.newJobs[0].jobs : 0
			}

            res.json(response);
		});
	},

    getNotifications: async function (req, res)
    {
        const options = {
        	select: {
        		title: 1,
				description: 1,
				job: 1,
				created: 1,
				status: 1
			},
            sort: { created: -1 },
			lean: true,
			leanWithId: false
        };

        const query = { carer: req.user._id };

        //pagination and sending response
        const notifications = await Utils.paginate(Notification, { query: query, options: options }, req);
        let paginated = Utils.parsePaginatedResults(notifications);
        paginated.results.map(notification => Notification.parse(notification));

        res.json(paginated);

        //updating status
        Notification.update(
        	{ _id: { $in: paginated.results.map(notification => notification._id ) } },
			{ status: NotificationModel.statuses.READ },
			{ multi: true, strict: false }
		).catch(error => console.log(error));
    },

    getSubmittedJobs: async function (req, res)
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
                care_home: 1,
                status: 1,
                'assignment.projected_income': 1,
                'assignment.payment.transaction_charge': 1,
                'assignment.payment.application_fee': 1,
                'assignment.payment.deductions': 1,
                'assignment.payment.job_income': 1,
                'assignment.payment.net_income': 1,
                'assignment.payment.payment_date': 1,
                'assignment.payment.debit_date': 1,
                'assignment.payment.status': 1,

                'assignment.summary_sheet.start_date': 1,
                'assignment.summary_sheet.end_date': 1,
                'assignment.summary_sheet.voluntary_deduction': 1,
            },
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

        //query
        const query = { $and: [ { _id: {  $in: req.user.carer.jobs } }, { "assignment.summary_sheet": { $exists: true } }, { status: { $ne: JobModel.statuses.CANCELLED } } ]};

        if(from)
            query.$and.push({ start_date: { $gte: from }});
        if(to)
            query.$and.push({ start_date: { $lte: to }})

        const jobs = await Utils.paginate(Job, { query: query, options: options }, req);
        let paginated = Utils.parsePaginatedResults(jobs);
        paginated.results.map(job => Job.parse(job, req));

        res.json(paginated);
    }
}
