//core
const async = require("async");
const randomstring = require('randomstring');

//modesl
const JobModel = require("./../models/Job");
const Job = JobModel.schema;
const ReviewSchema = require("./../models/schemas/Review");
const User = require("./../models/User").schema;
const Setting = require('./../models/Setting').schema;

//handlers
const CarersHandler = require('./CarersHandler');
const PDFHandler = require('./../services/PDFHandler');


//TO REMOVE
//regular
const carer_first_set = {
    monday_price: 14.25,
    tuesday_price: 12.15,
    wednesday_price: 12.15,
    thursday_price: 12.15,
    friday_price: 12.15,
    saturday_price: 13.80,
    sunday_price: 14.25
}

const carer_second_set = {
	monday_price: 11.25,
	tuesday_price: 11.25,
	wednesday_price: 11.25,
	thursday_price: 11.25,
	friday_price: 11.25,
	saturday_price: 12.95,
	sunday_price: 12.95
}

const carer_third_set = {
	monday_price: 12.15,
	tuesday_price: 12.15,
	wednesday_price: 12.15,
	thursday_price: 12.15,
	friday_price: 13.80,
	saturday_price: 14.25,
	sunday_price: 14.25
}

//senior
const senior_first_set = {
	monday_price: 16.25,
	tuesday_price: 14.15,
	wednesday_price: 14.15,
	thursday_price: 14.15,
	friday_price: 14.15,
	saturday_price: 15.80,
	sunday_price: 16.25
}

const senior_second_set = {
	monday_price: 13.25,
	tuesday_price: 13.25,
	wednesday_price: 13.25,
	thursday_price: 13.25,
	friday_price: 13.25,
	saturday_price: 14.95,
	sunday_price: 14.95
}

const senior_third_set = {
	monday_price: 14.15,
	tuesday_price: 14.15,
	wednesday_price: 14.15,
	thursday_price: 14.15,
	friday_price: 15.80,
	saturday_price: 16.25,
	sunday_price: 16.25
}


const booking_pricing = {
    carer: {
        hour_0_1: carer_first_set,
        hour_1_2: carer_first_set,
        hour_2_3: carer_first_set,
        hour_3_4: carer_first_set,
        hour_4_5: carer_first_set,
        hour_5_6: carer_first_set,
        hour_6_7: carer_first_set,
        hour_7_8: carer_first_set,
        hour_8_9: carer_second_set,
        hour_9_10: carer_second_set,
        hour_10_11: carer_second_set,
        hour_11_12: carer_second_set,
        hour_12_13: carer_second_set,
        hour_13_14: carer_second_set,
        hour_14_15: carer_second_set,
        hour_15_16: carer_second_set,
        hour_16_17: carer_second_set,
        hour_17_18: carer_second_set,
        hour_18_19: carer_second_set,
        hour_19_20: carer_second_set,
        hour_20_21: carer_third_set,
        hour_21_22: carer_third_set,
        hour_22_23: carer_third_set,
        hour_23_0: carer_third_set
    },
    senior_carer: {
        hour_0_1: senior_second_set,
        hour_1_2: senior_second_set,
        hour_2_3: senior_second_set,
        hour_3_4: senior_second_set,
        hour_4_5: senior_third_set,
        hour_5_6: senior_third_set,
        hour_6_7: senior_third_set,
        hour_7_8: senior_third_set,
        hour_8_9: senior_first_set,
        hour_9_10: senior_first_set,
        hour_10_11: senior_first_set,
        hour_11_12: senior_first_set,
        hour_12_13: senior_first_set,
        hour_13_14: senior_first_set,
        hour_14_15: senior_first_set,
        hour_15_16: senior_first_set,
        hour_16_17: senior_second_set,
        hour_17_18: senior_second_set,
        hour_18_19: senior_second_set,
        hour_19_20: senior_second_set,
        hour_20_21: senior_second_set,
        hour_21_22: senior_second_set,
        hour_22_23: senior_second_set,
        hour_23_0: senior_second_set
    },
}

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
                    Job.find({ _id: { $in: req.user.carer.jobs }, 'assignment.payment': { $exists: false }}, { start_date: 1, end_date: 1})// not counts jobs with sent summary sheet
                        .sort({ start_date: 1 })
                        .then(myCalendarJobs => {

                            let calendarJobsQuery = [];
                            for(let i = 0; i < myCalendarJobs.length; i++)
                            {
                                if (i == 0) //first element
                                    calendarJobsQuery.push({ end_date: { $lte: myCalendarJobs[i].start_date } })

                                if (myCalendarJobs[i + 1]) // if next element exists
                                    calendarJobsQuery.push({ $and: [ { start_date: { $gte: myCalendarJobs[i].end_date } }, { end_date: { $lte: myCalendarJobs[i + 1].start_date } } ] })

                                if ((i + 1) == myCalendarJobs.length) //last element
                                    calendarJobsQuery.push({ start_date: { $gte: myCalendarJobs[i].end_date } });
                            }

                            callback(null, calendarJobsQuery, myCalendarJobs);
                        });
                }
            }, async (error, results) => {

                //building query
                let query = {
                    status: JobModel.statuses.POSTED, //not accepted, not expired and not cancelled,
                    end_date: { $gte: new Date() }, //end date not expired
                    role: { $in: req.user.carer.eligible_roles }, //without different role than you are allowed to
                    gender_preference: { $in: [ JobModel.genderPreferences.NO_PREFERENCE, req.user.carer.gender ] }, //without gender preference or matching to gender
                    care_home: { $in: results.careHomes }, //only from care homes within max distance area
                    $and: [{ _id: { $exists: true } }] //required only to properly build query
                };


                //without job
                if(withoutJob)
                    query.$and.push({_id : { $ne: withoutJob }});

                //exclude calendar conflicts
                if(results.calendarJobsQuery[0].length)
                    query['$or'] = results.calendarJobsQuery[0];

                let filteredJobs = await Job.find(query, { start_date: 1, end_date: 1}).lean().exec();

                //query
                let aggregateQuery = [
                    {
                        $match: {
                            _id: { $in: filteredJobs.map(job => job._id) }
                        }
                    },
                    {
                        $project: {
                            start_date: 1, end_date: 1, care_home: 1, role: 1, notes: 1, general_guidance: 1,  status: 1, 'assignment.projected_income': 1
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
                            start_date: 1, end_date: 1, care_home: 1,  role: 1, notes: 1, general_guidance: 1,  status: 1, 'assignment.projected_income': 1,
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
                        options["sortBy"] = { start_date: -1 }
                        break;
                    }
                    case "endASC":
                    {
                        options["sortBy"] = { end_date: 1 }
                        break;
                    }
                    case "endDESC":
                    {
                        options["sortBy"] = { end_date: -1 }
                        break;
                    }
                    case "incomeASC":
                    {
                        options["sortBy"] = { 'assignment.projected_income': 1 }
                        break;
                    }
                    case "incomeDESC":
                    {
                        options["sortBy"] = { 'assignment.projected_income': -1 }
                        break;
                    }
                    default:
                    {
                        options["sortBy"] = { start_date: 1 }
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


                User.find(query).then(users => resolve(users));
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
            applyTimeDelay ? time.setMinutes(time.getMinutes() + settings.notifications[bucket][timeRangeName]) : applyTimeDelay = true;

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
        const jobQuery = Job.findOne({_id: id }, { start_date: 1, end_date: 1, care_home: 1, role: 1, notes: 1, general_guidance: 1, gender_preference: 1, status: 1, 'assignment.projected_income': 1, 'assignment.created': 1 })
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
                        "carer.training_record.other": 1,
                        "carer.dbs.status": 1,
                        "carer.dbs.dbs_date": 1,
                        "carer.dbs.ref_number": 1,
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
    },
    
    generateJobAcceptanceDocument: function (job, req)
    {
        return new Promise(resolve => {
            this.getJobDetailsQuery(job._id, true)
                .lean()
                .exec((error, detailedJob) => {
                    if(detailedJob)
                    {
                        //generating pdf, sending email and saving object
                        const handler = new PDFHandler(req);
                        handler.generatePdf("JOB_ACCEPTANCE", "jobs/" + job._id, { job: detailedJob })
                            .then(pdfPath => resolve(pdfPath));
                    }
                })
        })
    },

    calculateJobCost: function (job)
    {
        const startDate = (job.assignment && job.assignment.summary_sheet && job.assignment.summary_sheet.start_date) ? job.assignment.summary_sheet.start_date : job.start_date;
        const endDate = (job.assignment && job.assignment.summary_sheet && job.assignment.summary_sheet.end_date) ? job.assignment.summary_sheet.end_date : job.end_date;
        const deductedMinutes = job.assignment && job.assignment.summary_sheet && job.assignment.summary_sheet.voluntary_deduction ? job.assignment.summary_sheet.voluntary_deduction : 0;


        //calculating full price
        let totalCost = 0;
        let durationMinutes = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60));
        const totalMinutes = Math.max(durationMinutes - deductedMinutes, 0);

        let currentTime = new Date(startDate.getTime());

        //HALF CHARGE APPLIED ONLY TO MANUAL BOOKING COST, DEDUCTED COST AND JOB COST. Other values comes from these core values

        //manual booking cost
        const manualBookingPrice = findPriceForHour(startDate, job.booking_pricing) * job.booking_pricing.manual_booking_pricing;
        const manualBookingCost = job.manual_booking ? parseFloat(((( Math.max(durationMinutes - deductedMinutes, 0) / 60) * manualBookingPrice * job.percent_charge) / 100).toFixed(2)) : 0;

        while(durationMinutes > 0)
        {
            const price = findPriceForHour(currentTime, job.booking_pricing);
            const minutesInThisHour = (currentTime.getDate() != endDate.getDate() || currentTime.getHours() != endDate.getHours()) ? 60 - currentTime.getMinutes() : endDate.getMinutes() - currentTime.getMinutes();
            const cost = parseFloat((((minutesInThisHour / 60) * price * job.percent_charge) / 100).toFixed(2));

            totalCost += cost;
            durationMinutes -= minutesInThisHour;
            currentTime.setMinutes(currentTime.getMinutes() + minutesInThisHour);
        }

        //deductions
        const priceToDeducted = findPriceForHour(startDate, job.booking_pricing);
        const deductedCost = parseFloat((((deductedMinutes / 60) * priceToDeducted * job.percent_charge) / 100).toFixed(2));
        totalCost = Math.max(parseFloat((totalCost - deductedCost).toFixed(2)), 0); // protection against minus cost

        const applicationFee = parseFloat(((job.booking_pricing.app_commission * totalCost) / 100).toFixed(2))

        return {
            job_cost: totalCost,
            manual_booking_cost: manualBookingCost,
            total_cost:  parseFloat((totalCost + manualBookingCost ).toFixed(2)),
            job_income:  parseFloat((totalCost - applicationFee ).toFixed(2)),
            applicationFee: applicationFee,
            deducted_income: parseFloat((deductedCost - ((job.booking_pricing.app_commission * deductedCost) / 100)).toFixed(2)),
            total_minutes: totalMinutes
        };
    },

    prepareBookingJobs: async function (user, requestedJobsArray, genderPreference, generalGuidance = {}, manualBooking = false)
    {
        //getting job objects
        const group = randomstring.generate(32);
        let jobs = [], jobsObjects = [], validGeneralGuidance = user.care_home.hasValidGeneralGuidance();
        try {
            jobsObjects = Array.isArray(JSON.parse(requestedJobsArray)) ? JSON.parse(requestedJobsArray) : [];
        }
        catch (error) {}

        //getting general commission
        const generalCommission = await Setting.findOne({ type: "general_commission" }).exec();

        //creating job objects
        jobsObjects.forEach(jobObject => {
            if (typeof jobObject == "object")
            {
                //generating multiple jobs
                const carersAmount = (parseInt(jobObject[ "amount" ]) || 1) > 1 ? (parseInt(jobObject[ "amount" ]) || 1) : 1;
                for (let i = 0; i < carersAmount && i < 5; i++)
                {
                    let job = new Job({
                        start_date: new Date(jobObject.start_date),
                        end_date: new Date(jobObject.end_date),
                        care_home: user._id,
                        role: jobObject.role,
                        notes: jobObject.notes,
                        group: group,
                        manual_booking: manualBooking,
                        booking_pricing: {
                            manual_booking_pricing: generalCommission.general_commission.manual_booking_pricing,
                            app_commission: generalCommission.general_commission.app_commission,
                            max_to_deduct: generalCommission.general_commission.max_to_deduct
                        },
                        priority_carers: Array.isArray(jobObject.priority_carers) ? jobObject.priority_carers.filter(carerId => ObjectId.isValid(carerId)) : [],
                        gender_preference: Object.values(JobModel.genderPreferences).indexOf(genderPreference) != -1 ? genderPreference : JobModel.genderPreferences.NO_PREFERENCE,
                        general_guidance: {
                            superior_contact: validGeneralGuidance ? generalGuidance.superior_contact || user.care_home.general_guidance.superior_contact : generalGuidance.superior_contact,
                            report_contact: validGeneralGuidance ? generalGuidance.report_contact || user.care_home.general_guidance.report_contact : generalGuidance.report_contact,
                            emergency_guidance: validGeneralGuidance ? generalGuidance.emergency_guidance || user.care_home.general_guidance.emergency_guidance : generalGuidance.emergency_guidance,
                            notes_for_carers: validGeneralGuidance ?  generalGuidance.notes_for_carers || user.care_home.general_guidance.notes_for_carers: generalGuidance.notes_for_carers,
                            parking: validGeneralGuidance ? generalGuidance.parking || user.care_home.general_guidance.parking : generalGuidance.parking,
                            floor_plan: generalGuidance.floor_plan ? generalGuidance.floor_plan : validGeneralGuidance ? user.care_home.general_guidance.floor_plan : null,
                        }
                    });

                    jobs.push(job);
                }
            }
        });


        //preparing pricing
        jobs = await Promise.all(jobs.map(async job => {
            job.booking_pricing.pricing = await getBookingPricing(job.role, job.start_date, job.end_date);
            return job;
        }));

        return jobs;
    },
}

function getBookingPricing(role, start, end)
{
    return new Promise(async resolve => {

        //preparing bounds
        let startBound = new Date(start.getTime());
        startBound.setHours(0,0,0,0);

        let endBound = new Date(end.getTime());
        end.setHours(23,59,59,999);

        //getting general price matrix and special dates
        const generalPriceMatrix = await Setting.findOne({ type: "general_price_matrix", 'general_price_matrix.role': role }).lean().exec();
        const specialDates = await Setting.find({
            type: "special_price_matrix",
            'special_price_matrix.role': role,
            $and:[ { 'special_price_matrix.date': { $gte: startBound } }, { 'special_price_matrix.date': { $lte: endBound } }]
        })
        .lean()
        .exec();


        console.log("special dates", specialDates)

        //preparing pricing
        const pricing = generalPriceMatrix.general_price_matrix.pricing;
        const weekdays = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

        //overriding special dates
        specialDates.forEach(specialDate => {
            Object.keys(pricing).forEach(hourKey => {
                pricing[hourKey][weekdays[specialDate.special_price_matrix.date.getDay()] + "_price"] = specialDate.special_price_matrix.pricing[hourKey];
            });
        });

        resolve(pricing);
    });
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

function findPriceForHour(date, bookingPricing)
{
    const weekdays = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const currentHour = date.getHours();
    const nextHour = date.getHours() != 23 ? date.getHours() + 1 : 0;

    return bookingPricing.pricing[ "hour_" + currentHour + "_" + nextHour ][weekdays[date.getDay()] + "_price"];
}