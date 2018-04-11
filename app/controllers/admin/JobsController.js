/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const ObjectId = require('mongoose').Types.ObjectId;
const async = require("async");
const randomstring = require('randomstring');

//models
const JobModel = require("../../models/Job");
const Job = JobModel.schema;
const User = require("../../models/User").schema;
const ReviewSchema = require("../../models/schemas/Review");
const ChallengeSchema = require("../../models/schemas/Challenge");

//services
const Utils = require("../../services/utils");
const fileHandler = require("../../services/fileHandler");
const QueuesHandler = require('../../services/QueuesHandler');

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
                'cost.total_cost': 1,
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
                cost: 1,

                'charge.charge_date': 1,
                'charge.net_cost': 1,
                'charge.total_cost': 1,
                'charge.manual_booking_cost': 1,
                'charge.job_cost': 1,
                'charge.deductions': 1,

                'assignment.carer': 1,

                'assignment.payment.transaction_charge': 1,
                'assignment.payment.application_fee': 1,
                'assignment.payment.deductions': 1,
                'assignment.payment.job_income': 1,
                'assignment.payment.net_income': 1,
                'assignment.payment.status': 1,
                'assignment.payment.payment_date': 1,
                'assignment.payment.debit_date': 1,

                'assignment.review.description': 1,
                'assignment.review.rate': 1,
                'assignment.review.status': 1,
                'assignment.review.created': 1,

                'assignment.challenge.created': 1,
                'assignment.challenge.status': 1,
                'assignment.challenge.description': 1,
                'assignment.challenge.response': 1,

                'assignment.summary_sheet.notes': 1,
                'assignment.summary_sheet.created': 1,
                'assignment.summary_sheet.voluntary_deduction': 1,
                'assignment.summary_sheet.end_date': 1,
                'assignment.summary_sheet.start_date': 1,
                'assignment.summary_sheet.position': 1,
                'assignment.summary_sheet.name': 1,
                'assignment.summary_sheet.signature': 1,
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

        //job not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        res.json(Job.parse(job, req));
    },
    
    approveJobReview: async function (req, res)
    {
        //params
        const status = req.body["status"];

        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec();

        //job not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        //missing review
        if(!job.assignment.review)
            return res.status(409).json(Utils.parseStringError("This job has no review added yet.", "job"));

        //invalid status
        if([ReviewSchema.reviewStatuses.PUBLISHED, ReviewSchema.reviewStatuses.ARCHIVED].indexOf(status) == -1)
            return res.status(406).json(Utils.parseStringError("Invalid status", "job"));

        const notificationStatus = job.assignment.review.notification_sent;
        job.assignment.review.status = status;

        if(job.assignment.review.status == ReviewSchema.reviewStatuses.PUBLISHED)
            job.assignment.review.notification_sent = true;

        //saving job and sending response
        job
            .save()
            .then(() => {

                //sending notification
                if(job.assignment.review.status == ReviewSchema.reviewStatuses.PUBLISHED && !notificationStatus)
                    QueuesHandler.publish({ user_id: job.assignment.carer, job_id: job._id, type: "REVIEW_PUBLISHED" }, { exchange: "notifications", queue: "notifications" })

                res.json({ status: true });
            })
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },

    retryJobPayment: async function (req, res)
    {
        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec();

        //job not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        //invalid status
        if(job.status != JobModel.statuses.PAYMENT_REJECTED)
            return res.status(409).json(Utils.parseStringError("Payment process for this job cannot be renewed", "job"));

        //sending response
        res.json({ status: true });

        //updating status
        job.status = JobModel.statuses.PENDING_PAYMENT;
        job.save().catch(error => console.log(error));
    },

    resolveJobChallenge: async function (req, res)
    {
        //params
        const status = req.body["status"];
        const response = req.body["response"];

        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec();

        //job not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        //missing challenge or invalid job status
        if(!job.assignment.challenge || job.status != JobModel.statuses.CHALLENGED)
            return res.status(409).json(Utils.parseStringError("This job has not pending challenge.", "job"));

        //invalid status
        if([ChallengeSchema.challengeStatuses.UPHELD, ChallengeSchema.challengeStatuses.CANCELLED].indexOf(status) == -1)
            return res.status(406).json(Utils.parseStringError("Invalid status", "job"));

        //updating challenge
        job.assignment.challenge.set({
            status: status,
            response: response
        });

        //updating job status
        if(job.assignment.challenge.status == ChallengeSchema.challengeStatuses.UPHELD)
            job.status = JobModel.statuses.PAYMENT_CANCELLED;
        else if(job.assignment.challenge.status == ChallengeSchema.challengeStatuses.CANCELLED)
            job.status = JobModel.statuses.PENDING_PAYMENT;

        //saving job and sending response
        job
            .save()
            .then(() => res.json({ status: true }))
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },

    updateJob: async function(req, res)
    {
        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec();

        //job not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        //invalid statuses
        if(job.status == JobModel.statuses.PAID || job.status == JobModel.statuses.CANCELLED || job.status == JobModel.statuses.PAYMENT_CANCELLED)
            return res.status(409).json(Utils.parseStringError("This job cannot be edited at this stage", "job"));

        //floor plan upload
        const uploader = fileHandler(req, res);
        const filePath = await uploader.handleSingleUpload("floor_plan", "users/" +  job.care_home,
            {
                allowedMimeTypes: [
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "application/pdf",
                    "image/png",
                    "image/jpg",
                    "image/jpeg",
                ],
                maxFileSize: 10
            });

        //editing fields
        job.set({
            start_date: req.body.start_date || job.start_date,
            end_date: req.body.end_date || job.end_date,
            role: req.body.role || job.role,
            notes: req.body.notes || job.notes,
            gender_preference: req.body.gender_preference || job.gender_preference,
            manual_booking: req.body.manual_booking ? (req.body.manual_booking == "ENABLED" ? true : false) : job.manual_booking,
            general_guidance: {
                superior_contact: req.body.superior_contact || job.general_guidance.superior_contact,
                report_contact: req.body.report_contact || job.general_guidance.report_contact,
                emergency_guidance: req.body.emergency_guidance || job.general_guidance.emergency_guidance,
                notes_for_carers: req.body.notes_for_carers || job.general_guidance.notes_for_carers,
                parking: req.body.report_contact || job.general_guidance.parking,
                floor_plan: filePath || job.general_guidance.floor_plan,
            }
        });

        //summary sheet changes
        if(job.assignment.summary_sheet)
        {
            job.assignment.summary_sheet.start_date = req.body["summary_sheet_start_date"] || job.assignment.summary_sheet.start_date;
            job.assignment.summary_sheet.end_date = req.body["summary_sheet_end_date"] || job.assignment.summary_sheet.end_date;
            job.assignment.summary_sheet.voluntary_deduction = req.body["voluntary_deduction"] || job.assignment.summary_sheet.voluntary_deduction;
        }

        //is job accepted
        if(job.assignment.carer && (new Date(job.initial.start_date).getTime() != job.start_date.getTime() || job.end_date.getTime() != new Date(job.initial.end_date).getTime()))
            return res.status(409).json(Utils.parseStringError("You can\'t edit dates in job which has already been accepted", "job"));

        //saving job and sending response
        job
            .save()
            .then(() => {

                //checking changes
                let jobChanged = false;
                if(
                    job.role != job.initial.role ||
                    job.notes != job.initial.notes ||
                    job.gender_preference != job.initial.gender_preference ||
                    job.manual_booking != job.initial.manual_booking ||
                    job.general_guidance.superior_contact != job.initial.general_guidance.superior_contact ||
                    job.general_guidance.report_contact != job.initial.general_guidance.report_contact ||
                    job.general_guidance.emergency_guidance != job.initial.general_guidance.emergency_guidance ||
                    job.general_guidance.notes_for_carers != job.initial.general_guidance.notes_for_carers ||
                    job.general_guidance.parking != job.initial.general_guidance.parking ||
                    job.general_guidance.floor_plan != job.initial.general_guidance.floor_plan
                )
                    jobChanged = true;

                //summary sheet changes
                if(
                    job.assignment.summary_sheet &&
                    (
                        job.assignment.summary_sheet.start_date.getTime() != new Date(job.initial.assignment.summary_sheet.start_date).getTime() ||
                        job.assignment.summary_sheet.end_date.getTime() != new Date(job.initial.assignment.summary_sheet.end_date).getTime() ||
                        job.assignment.summary_sheet.voluntary_deduction != job.initial.assignment.summary_sheet.voluntary_deduction
                    )
                )
                    jobChanged = true;

                //sending notification
                if(job.assignment.carer && jobChanged)
                    QueuesHandler.publish({ user_id: job.assignment.carer, job_id: job._id, type: "JOB_MODIFIED" }, { exchange: "notifications", queue: "notifications" })

                res.json({ status: true })
            })
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },

    cancelJob: async function(req, res)
    {
        //validation
        let errors;
        req.check("waive_charges").notEmpty().withMessage('Waive_charges field is required.').isIn(["YES", "NO"]).withMessage('Waive_charges field can hold only value YES or NO.');
        if (errors = req.validationErrors())
            return res.status(406).json({ errors: errors });

        //params
        const waiveCharges = req.body["waive_charges"];

        //getting job
        const job = await Job.findOne({ _id: req.params.id }).exec();

        //not found
        if(!job)
            return res.status(404).json(Utils.parseStringError("Job not found", "job"));

        //invalid statuses
        if(job.status == JobModel.statuses.PAID || job.status == JobModel.statuses.CANCELLED || job.status == JobModel.statuses.PAYMENT_CANCELLED)
            return res.status(409).json(Utils.parseStringError("This job cannot be cancelled at this stage", "job"));

        job.status = JobModel.statuses.CANCELLED;
        job.save()
            .then(job => {

                //sending notification
                if(job.assignment.carer)
                    QueuesHandler.publish({ user_id: job.assignment.carer, job_id: job._id, type: "JOB_CANCELLED" }, { exchange: "notifications", queue: "notifications" })
            })
            .catch(error => console.log(error));

        //sending response
        res.json({ status: true });
    },

    addJobs: async function (req, res)
    {
        //getting care home
        const careHome = await User.findOne({ _id: req.params.id, care_home: { $exists: true } }).exec();

        //not found
        if(!careHome)
            return res.status(404).json(Utils.parseStringError("Care home not found", "care home"));

        //floor plan upload
        const uploader = fileHandler(req, res);
        const filePath = await uploader.handleSingleUpload("floor_plan", "users/" + careHome._id,
            {
                allowedMimeTypes: [
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "application/pdf",
                    "image/png",
                    "image/jpg",
                    "image/jpeg",
                ],
                maxFileSize: 10
            });


        //getting job objects
        let jobs = [], jobsObjects = [], validGeneralGuidance = careHome.care_home.hasValidGeneralGuidance();
        try {
            jobsObjects = Array.isArray(JSON.parse(req.body[ "jobs" ])) ? JSON.parse(req.body[ "jobs" ]) : [];
        }
        catch (error) {}

        const group = randomstring.generate(32);

        //creating job objects
        jobsObjects.forEach(jobObject => {
            if (typeof jobObject == "object")
            {
                //generating multiple jobs
                const carersAmount = (parseInt(jobObject[ "amount" ]) || 1) > 1 ? (parseInt(jobObject[ "amount" ]) || 1) : 1;
                for (let i = 0; i < carersAmount; i++)
                {
                    let job = new Job({
                        start_date: new Date(jobObject.start_date),
                        end_date: new Date(jobObject.end_date),
                        care_home: careHome._id,
                        role: jobObject.role,
                        notes: jobObject.notes,
                        group: group,
                        gender_preference: Object.values(JobModel.genderPreferences).indexOf(req.body.gender_preference) != -1 ? req.body.gender_preference : JobModel.genderPreferences.NO_PREFERENCE,
                        manual_booking: jobObject.manual_booking || true,
                        general_guidance: {
                            superior_contact: validGeneralGuidance ? req.body.superior_contact || careHome.care_home.general_guidance.superior_contact : req.body.superior_contact,
                            report_contact: validGeneralGuidance ? req.body.report_contact || careHome.care_home.general_guidance.report_contact : req.body.report_contact,
                            emergency_guidance: validGeneralGuidance ? req.body.emergency_guidance || careHome.care_home.general_guidance.emergency_guidance : req.body.emergency_guidance,
                            notes_for_carers: validGeneralGuidance ?  req.body.notes_for_carers || careHome.care_home.general_guidance.notes_for_carers: req.body.notes_for_carers,
                            parking: validGeneralGuidance ? req.body.parking || careHome.care_home.general_guidance.parking : req.body.parking,
                            floor_plan: filePath ? filePath : validGeneralGuidance ? careHome.care_home.general_guidance.floor_plan : null,
                        }
                    });

                    jobs.push(job);
                }
            }
        });

        if(!jobs.length)
            return res.status(406).json(Utils.parseStringError("Invalid jobs", "jobs"));

        //validation
        async.parallel(
            jobs.map(job => (callback) => {
                job.validate()
                    .then(() => callback(null))
                    .catch(error => {
                        if (!res.headersSent)
                            res.status(406).json(Utils.parseValidatorErrors(error));
                        callback(error);
                    });
            }),
            (errors, results) => {

                if (!res.headersSent && results)
                {
                    //sending response
                    res.status(201).json({ status: true });

                    //saving jobs
                    jobs.forEach(job => job.save().catch(error => console.log(error)));

                    //updating general guidance
                    if (!validGeneralGuidance && jobs.length)
                        careHome.care_home.general_guidance = jobs[0].general_guidance;

                    //saving job references
                    jobs.forEach(job => careHome.care_home.jobs.push(job));
                    careHome.save().catch(error => console.log(error));
                }
            }
        );
    }
}
