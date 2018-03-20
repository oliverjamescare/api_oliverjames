/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const ObjectId = require('mongoose').Types.ObjectId;

//custom
const JobModel = require("../../models/Job");
const Job = JobModel.schema;
const User = require("../../models/User").schema;
const Utils = require("../../services/utils");
const fileHandler = require("../../services/fileHandler");

module.exports = {
    getJobs: async function(req, res)
    {
        //params
        const search = req.query.search || "";
        const pattern = new RegExp("^.*" + search + ".*$");
        const jobStatusFilter = req.query["job_status_filter"];
        const reviewStatusFilter = req.query["review_status_filter"];
        const manualBookingFilter = req.query["manual_booking_filter"];

        //filtering every possible user
        const users  = await User.find(
                    {
                        $or: [
                            { 'carer.jobs': { $exists: true, $not: {$size: 0} } },
                            { 'care_home.jobs': { $exists: true, $not: {$size: 0} } }
                        ],
                        $or:[
                            { 'carer.first_name': { $regex: pattern, $options: "xi" } },
                            { 'carer.surname': { $regex: pattern, $options: "xi" } },
                            { 'care_home.care_service_name': { $regex: pattern, $options: "xi" } },
                            { 'care_home.name': { $regex: pattern, $options: "xi" } },
                            { 'address.postal_code': { $regex: pattern, $options: "xi" } },
                        ]
                    },
                    { _id: 1 })
                    .exec();

        const query = {
            $or: [
                { care_home: { $in: users.map(user => user._id ) } },
                { 'assignment.carer': { $in: users.map(user => user._id) } }
            ]
        };

        //search by id
        if(ObjectId.isValid(search))
            query.$or.push({ _id: search });

        //job status filter
        if(Object.values(JobModel.statuses).indexOf(jobStatusFilter) != -1)
            query["status"] = jobStatusFilter;

        //manual booking filter
        switch (manualBookingFilter)
        {
            case "DISABLED":
            {
                query["manual_booking"] = false;
                break;
            }
            case "ENABLED":
            {
                query["manual_booking"] = true;
                break;
            }
        }

        //review status filter
        switch (reviewStatusFilter)
        {
            case "PENDING":
            {
                query["assignment.review.status"] = "PENDING";
                break;
            }
            case "PUBLISHED":
            {
                query["assignment.review.status"] = "PUBLISHED";
                break;
            }
            case "ARCHIVED":
            {
                query["assignment.review.status"] = "ARCHIVED";
                break;
            }
            case "NONE":
            {
                query["assignment.review"] = { $exists: false };
                break;
            }
        }

        const options = {
            select: {
                start_date: 1,
                end_date: 1,
                created: 1,
                care_home: 1,
                status: 1,
                manual_booking: 1,
                'assignment.carer': 1,
                'assignment.review.status': 1
            },
            populate: [
                {
                    path: 'care_home',
                    select: {
                        'care_home.care_service_name': 1,
                        'care_home.type_of_home': 1,
                        'care_home.name': 1,
                        address: 1
                    }
                },
                {
                    path: 'assignment.carer',
                    select: {
                        'carer.first_name': 1,
                        'carer.surname': 1
                    }
                }
            ],
            lean: true,
            leanWithId: false
        };


        //pagination and parsing
        const jobs = await Utils.paginate(Job, { query: query, options: options }, req);
        let paginated = Utils.parsePaginatedResults(jobs);
        paginated.results.map(job => Job.parse(job, req));

        res.json(paginated);
    },

    getJob: async function (req, res)
    {
        const job = await Job.findOne(
            { _id: req.params.id },
            {
                start_date: 1,
                end_date: 1,
                role: 1,
                gender_preference: 1,
                notes: 1,
                general_guidance: 1,
                care_home: 1,
                status: 1,
                manual_booking: 1,
                created: 1,
                'assignment.carer': 1,
                'assignment.review.description': 1,
                'assignment.review.rate': 1,
                'assignment.review.status': 1,
                'assignment.review.created': 1,
            }
        )
        .populate({
            path: 'care_home',
            select: {
                'care_home.care_service_name': 1,
                'care_home.type_of_home': 1,
                'care_home.name': 1,
                address: 1
            }
        })
        .populate({
            path: 'assignment.carer',
            select: {
                'carer.first_name': 1,
                'carer.surname': 1
            }
        })
        .lean();

        //user not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        res.json(Job.parse(job, req));
    }
}
