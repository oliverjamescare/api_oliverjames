//core
const async = require("async");

//custom
const JobModel = require("./../models/Job");
const Job = JobModel.schema;
const User = require("./../models/User").schema;

module.exports = {
    getNewJobs: function(req, fromCareHome = null, withoutJob = null)
    {
        return new Promise((resolve, reject) => {

            //params
            const withDontMeetCriteria = req.query['dont_meet_criteria'] == 1 ? true : false;
            const filterDistance = parseFloat(req.query.distance);
            const sort = req.query.sort;

            async.parallel({
                careHomes: (callback) => {
                    let careHomesQuery = {
                        care_home: { $exists: true },
                        'care_home.blocked_carers': { $ne: req.user._id } //without care homes which blocks you
                    };

                    //only from care homes within max distance area
                    if(isNaN(filterDistance))
                        careHomesQuery["address.location"] = { $geoWithin: { $centerSphere: [ req.user.address.location.coordinates,  parseInt(req.user.carer.max_job_distance) / 3963.2 ]} }

                    //from single care home
                    if(fromCareHome)
                        careHomesQuery["_id"] = fromCareHome;

                    User.find(careHomesQuery, { _id: 1 }).lean().then(careHomes => callback(null, careHomes.map(careHome => careHome._id)));
                },

                //finds all jobs from your calendar
                calendarJobsQuery: (callback) => {
                    Job.find({ _id: { $in: req.user.carer.jobs }, 'assignment.summary_sheet': { $exists: false }}, { start_date: 1, end_date: 1}) // not counts jobs with sent summary sheet
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

                //building query
                let query = {
                    status: JobModel.statuses.POSTED, //not accepted, not expired and not cancelled,
                    role: { $in: req.user.carer.eligible_roles }, //without different role than you are allowed to
                    gender_preference: { $in: [ JobModel.genderPreferences.NO_PREFERENCE, req.user.carer.gender ] }, //without gender preference or matching to gender
                    care_home: { $in: results.careHomes }, //only from care homes within max distance area
                    $and: [{ _id: { $exists: true } }] //required only to properly build query
                };

                //not declined
                if(!withDontMeetCriteria)
                    query.$and.push({_id : { $not: { $in: req.user.carer.job_declines }}});

                //without job
                if(withoutJob)
                    query.$and.push({_id : { $ne: withoutJob }});

                //exclude calendar conflicts
                if(results.calendarJobsQuery[0].length)
                    query['$or'] = results.calendarJobsQuery[0];

                //availability handle
                let filteredJobs = await Job.find(query, { start_date: 1, end_date: 1}).lean().exec();
                if(!withDontMeetCriteria)
                    filteredJobs = filteredJobs.filter(job => req.user.carer.checkAvailabilityForDateRange(job.start_date, job.end_date));

                //query
                let aggregateQuery = [
                    {
                        $match: {
                            _id: { $in: filteredJobs.map(job => job._id) }
                        }
                    },
                    {
                        $project: {
                            start_date: 1, end_date: 1, care_home: 1, role: 1, notes: 1, general_guidance: 1
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
                            start_date: 1, end_date: 1, care_home: 1,  role: 1, notes: 1, general_guidance: 1,
                            conflict: { $anyElementTrue: { $map: { input: "$conflicts", as: "el", in: "$$el.conflict" } } }
                        }
                    }
                ];

                //filter by distance  - max 10 miles
                if(!isNaN(filterDistance))
                    aggregateQuery.push({ $match: { "care_home.distance": { $lt: filterDistance < 10 ? filterDistance : 10 } } })

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

                resolve({ query: Job.aggregate(aggregateQuery), options: options });
            });
        });

    }
}