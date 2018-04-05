//core
const async = require("async");

//custom
const JobModel = require("./../models/Job");
const Job = JobModel.schema;
const ReviewSchema = require("./../models/schemas/Review");

const User = require("./../models/User").schema;
const CarersHandler = require('./CarersHandler');


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
                            start_date: 1, end_date: 1, care_home: 1, role: 1, notes: 1, general_guidance: 1,  status: 1
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
                            start_date: 1, end_date: 1, care_home: 1,  role: 1, notes: 1, general_guidance: 1,  status: 1,
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

    },

    getAvailableCarers: function(job, careHome)
    {
        return new Promise(resolve => {
            async.parallel({
                carersInArea: (callback) => CarersHandler.getAvailableCarersNearby(careHome.address.location.coordinates).then(carers => callback(null, carers)),
                conflictJobs: (callback) => {

                    const quarterOverlap = 1000 * 60 * 15;
                    Job.find(
                        {
                            'assignment.carer': { $exists: true },
                            'assignment.summery_sheet': { $exists: false },
                            status: { $ne: JobModel.statuses.CANCELLED },
                            $or: [
                                {
                                    $and: [
                                        { start_date: { $lt: new Date(job.end_date + quarterOverlap) } },
                                        { end_date: { $gt: new Date(job.start_date - quarterOverlap) } },
                                        { care_home: { $ne: careHome._id } },
                                    ]
                                },
                                {
                                    $and: [
                                        { start_date: { $lt: new Date(job.end_date) } },
                                        { end_date: { $gt: new Date(job.start_date) } },
                                        { care_home: careHome._id },
                                    ]
                                }
                            ]
                        }).then(jobs => callback(null, jobs))
                }
            }, (errors, results) => {

                let query = {
                    carer: { $exists: true }, //carers
                    $and: [
                        { _id: { $not: { $in: careHome.care_home.blocked_carers } } }, // without blocked
                        { _id: { $in: results.carersInArea.map(carer => carer._id )} }, // available in area
                        { _id: { $not: { $in: results.conflictJobs.map(job => job.assignment.carer) } } }, // without calendar conflicts
                    ],
                    'carer.eligible_roles': job.role, //required role
                };

                if(job.gender_preference != JobModel.genderPreferences.NO_PREFERENCE) //required gender preference
                    query["carer.gender"] = job.gender_preference;


                User.find(query).then(users => {

                    users.filter(user => user.carer.checkAvailabilityForDateRange(new Date(job.start_date), new Date(job.end_date)));
                    resolve(users)
                });
            });
        });
    },
    
    assignBuckets: function (users = [], priority = [], jobStart, settings)
    {
        let time = new Date();
        let notifications = [];


        const timeRangeName = getTimeRangeName(jobStart);
        let applyTimeDelay = true;

        JobModel.buckets.forEach(bucket => {

            //time delay apply
            applyTimeDelay ? time.setMinutes(time.getMinutes() + settings.value[bucket][timeRangeName]) : applyTimeDelay = true;

            users.forEach(user => {

                if(notifications.findIndex(notification => notification.user.toString() == user._id.toString()) == -1)
                {
                    if(
                        (priority.indexOf(user._id.toString()) != -1 && bucket == "preferred") ||
                        (bucket == "starsFourToFive" && user.carer.reviews.average > 4 && user.carer.reviews.average <= 5) ||
                        (bucket == "starsThreeToFour" && user.carer.reviews.average > 3 && user.carer.reviews.average <= 4) ||
                        (bucket == "unrated" && user.carer.reviews.count == 0) ||
                        (bucket == "starsTwoToThree" && user.carer.reviews.average > 2 && user.carer.reviews.average <= 3) ||
                        (bucket == "starsOneToTwo" && user.carer.reviews.average >= 1 && user.carer.reviews.average <= 2)
                    )
                        notifications.push({ user: user._id, bucket: bucket, time: new Date(time.getTime()) });
                }
            });

            //if no notifications in current bucket than don't apply time delay in the next bucket
            if(!notifications.filter(notification => notification.time.getTime() == time.getTime()).length)
                applyTimeDelay = false;
        });

        return notifications;

    },

    getJobDetailsQuery: function(id, withCarerDetails = false)
    {
        const JobModel = require("./../models/Job");
        const Job = JobModel.schema;

        const jobQuery = Job.findOne({_id: id }, { start_date: 1, end_date: 1, care_home: 1, role: 1, notes: 1, general_guidance: 1, status: 1 })
            .populate("care_home",{
                "email": 1,
                "phone_number": 1,
                "address": 1,
                "care_home": 1,
                "care_home.care_service_name": 1,
                "care_home.type_of_home": 1,
                "care_home.name": 1
            });

        //request by care home
        if(withCarerDetails)
        {
            jobQuery
                .populate({
                    path: "assignment.carer",
                    select: {
                        "phone_number": 1,
                        "email": 1,
                        "carer.first_name": 1,
                        "carer.surname": 1,
                        "carer.profile_image": 1,
                        "carer.training_record.qualifications": 1,
                        "carer.training_record.safeguarding": 1,
                        "carer.training_record.manual_handling_people": 1,
                        "carer.training_record.medication_management": 1,
                        "carer.training_record.infection_control": 1,
                        "carer.training_record.first_aid_and_basic_life_support": 1,
                        "carer.training_record.first_aid_awareness": 1,
                        "carer.training_record.h_and_s": 1,
                        "carer.training_record.dementia": 1,
                        "carer.training_record.fire_safety": 1,
                        "carer.dbs.status": 1,
                        "carer.dbs.dbs_date": 1,
                        "carer.reviews": 1,
                        "carer.care_experience": 1,
                        "carer.jobs": 1,
                    },
                    populate: {
                        path: 'carer.jobs',
                        match: { 'assignment.review': { $exists: true }, 'assignment.review.status': ReviewSchema.reviewStatuses.PUBLISHED },
                        sort: { 'assignment.review.created': "DESC" },
                        limit: 10,
                        select: {
                            'assignment.review.created': 1,
                            'assignment.review.description': 1,
                            'assignment.review.rate': 1,
                            'care_home': 1
                        },
                        populate: {
                            path: 'care_home',
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
                    }
                });
        }

        return jobQuery;
    }
}

function getTimeRangeName(jobStart)
{
    const hoursToStart = Math.ceil((jobStart.getTime() - new Date().getTime()) / (1000 * 60 * 60));
    const timeRanges = [
        {
            name: "lessThanFourHours",
            upperBound: 4,
        },
        {
            name: "betweenFourAndTwelveHours",
            upperBound: 12,
        },
        {
            name: "betweenTwelveAndTwentyFourHours",
            upperBound: 24,
        },
        {
            name: "moreThanTwentyFourHours",
            upperBound: 840,
        }
    ];

    let timeRangeName = "";

    timeRanges.forEach(range => {
        if(hoursToStart <= range.upperBound)
            timeRangeName = range.name;

        if(hoursToStart > 24)
            timeRangeName = "moreThanTwentyFourHours";
    });

    return timeRangeName
}