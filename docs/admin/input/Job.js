
/**
 * @api {get} /jobs Jobs list
 * @apiSampleRequest /jobs
 * @apiVersion 0.0.1
 * @apiName Jobs list
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {Number} [page] Page number.
 * @apiParam {Number} [results] Results per page. Default 10.
 * @apiParam {String} [search] Search string.
 * @apiParam {String} [job_status_filter] Available options: ALL(default) - all statuses, POSTED - newly created, EXPIRED - expired jobs, ACCEPTED - accepted by carer, PENDING_SUMMARY_SHEET - pending summary sheet, PENDING_PAYMENT - pending payment jobs, CHALLENGED - challenged jobs, PAYMENT_CANCELLED - jobs with canceled payment after challenge, PAID - paid jobs, PAYMENT_REJECTED - jobs with payment rejected by payment system, CANCELLED - cancelled jobs
 * @apiParam {String} [review_status_filter] Available options: ALL(default) - all statuses, NONE - without review, PENDING - jobs with pending status on review, PUBLISHED - jobs with published reviews, ARCHIVED - jobs with archived reviews
 * @apiParam {String} [manual_booking_filter] Available options: ALL(default) - without filter, ENABLED - with enabled manual booking,  DISABLED - without manual booking


 * @apiSuccess (Success 200){Object} results Pagination results.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "results": [
            {
                "_id": "5a95290a1e28cd1d88ea64cd",
                "start_date": 1521136000000,
                "end_date": 1521137000000,
                "created": 1519666191786,
                "status": "CANCELLED",
                "manual_booking": false,
                "cost": {
                    "total_cost": 8.63
                },
                "author": {
                    "_id": "5a71b2834f1f26305c6abf2a",
                    "care_home": {
                        "care_service_name": "Test care home",
                        "type_of_home": "Nursing",
                        "name": "Test Test",
                    },
                    "address": {
                        "postal_code": "Ex8 2el",
                        "city": "Exmouth",
                        "address_line_1": "Elwyn Rd, Exmouth EX8 2E",
                        "location": {
                            "coordinates": [
                                50.7583820,
                                19.005533
                            ],
                            "type": "Point"
                        },
                        "address_line_2": null,
                        "company": null,
                        "link": "https://www.google.com/maps/search/?api=1&query=50.7583820,19.005533"
                    }
                },
                "carer": {
                    "_id": "5a9418e7e33cb930aa7c384f",
                    "carer": {
                        "first_name": "Test",
                        "surname": "Test"
                    }
                },
                "review": {
                    "status": "PUBLISHED"
                }
            }
        ],
        "pages": 1,
        "total": 3
 *     }
 *
 * @apiError AccessDenied Access Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Access Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access Denied"
 *              }
 *          ]
 *      }
 */

/**
 * @api {get} /jobs/:id Jobs details
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Jobs details
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Job id

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
         {
            "_id": "5a95290a1e28cd1d88ea64cd",
            "start_date": 1521136000000,
            "end_date": 1521137000000,
            "role": "Carer",
            "created": 1519666191786,
            "status": "CHALLENGED",
            "general_guidance": {
                "floor_plan": "http://localhost:8000/uploads/users/5a9419d8e33cb930aa7c3856/151972481016501b2ceacf735ed2f39aaf31f7a145e7f.png",
                "parking": "test",
                "notes_for_carers": "bsb",
                "emergency_guidance": "sd",
                "report_contact": "asd",
                "superior_contact": "asd"
            },
            "notes": null,
            "gender_preference": "No preference",
            "manual_booking": false,
            "cost": {
                "total_cost": 103.5,
                "manual_booking_cost": 51.75,
                "job_cost": 51.75
            },
            "charge": {
                "charge_date": 1523440106660,
                "net_cost": 93.5,
                "total_cost": 103.5,
                "manual_booking_cost": 51.75,
                "job_cost": 51.75,
                "deductions": 10,
                "invoice": "http://localhost:8000/uploads/jobs/5a95290a1e28cd1d88ea64cd/152162607972516344484_1321466411247611_2119070772_n.pdf",
            },
            "author": {
                "_id": "5a9419d8e33cb930aa7c3856",
                "care_home": {
                    "care_service_name": "Coolest Care  Home",
                    "type_of_home": "Residential",
                    "name": "Test Test"
                },
                "address": {
                    "postal_code": "Ex8 2el",
                    "city": "Exmouth",
                    "address_line_1": "Elwyn Rd, Exmouth EX8 2E",
                    "location": {
                        "coordinates": [
                            50.7583820,
                            19.005533
                        ],
                        "type": "Point"
                    },
                    "address_line_2": null,
                    "company": null,
                    "link": "https://www.google.com/maps/search/?api=1&query=50.7583820,19.005533"
                }
            },
            "carer": {
                "_id": "5a9418e7e33cb930aa7c384f",
                "carer": {
                    "first_name": "Test",
                    "surname": "Test"
                }
            },
            "review": {
                "status": "PUBLISHED",
                "created": 1520957549836,
                "description": "Great work!",
                "rate": 5
            },
            "challenge": {
                "status": "ACTIVE",
                "created": 1521564477746,
                "description": "Challenge message",
                "response": "Challenge approved"
            },
            "summary_sheet": {
                "notes": null,
                "created": 1521626079729,
                "voluntary_deduction": 60, //minutes deducted
                "end_date": 1524999900000,
                "start_date": 1524999600000,
                "position": "CEO",
                "name": "Richard",
                "signature": "http://localhost:8000/uploads/jobs/5a95290a1e28cd1d88ea64cd/152162607972516344484_1321466411247611_2119070772_n.jpg"
                "standard_invoice": "http://localhost:8000/uploads/jobs/5a95290a1e28cd1d88ea64cd/152162607972516344484_1321466411247611_2119070772_n.pdf"
            },
            "payment": {
                "transaction_charge": 2.91,
                "application_fee": 5.17,
                "deductions": 9.32,
                "job_income": 46.58,
                "net_income": 34.35,
                "status": "PAID",
                "payment_date": 1523440106661,
                "debit_date": 1522879200000,
                "invoice": "http://localhost:8000/uploads/jobs/5a95290a1e28cd1d88ea64cd/152162607972516344484_1321466411247611_2119070772_n.pdf",
                "commission_confirmation": "http://localhost:8000/uploads/jobs/5a95290a1e28cd1d88ea64cd/152162607972516344484_1321466411247611_2119070772_n.pdf"
            }
        }
 *
 * @apiError AccessDenied Access Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Access Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access Denied"
 *              }
 *          ]
 *      }
 *
 * @apiError NotFound Job not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Job not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "job",
 *                   "message": "Job not found"
 *              }
 *          ]
 *      }
 */

/**
 * @api {put} /jobs/:id/review Approve job review
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Approve job review
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Job id
 * @apiParam {String} status Available options: PUBLISHED - review will be published on carer profile, ARCHIVED - review will be archived and not visible on carer profile

 * @apiSuccess (Success 200){Object} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
    {
        "status": true
    }
 *
 * @apiError AccessDenied Access Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Access Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access Denied"
 *              }
 *          ]
 *      }
 *
 * @apiError NotFound Job not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Job not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "job",
 *                   "message": "Job not found"
 *              }
 *          ]
 *      }
 *
 * @apiError WrongParameters Wrong Parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong Parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "job",
 *                   "message": "Invalid status"
 *              }
 *          ]
 *      }
 *
 * @apiError Conflict! This job has no review added yet.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 This job has no review added yet"
 *     {
 *          "errors": [
 *              {
 *                   "field": "job",
 *                   "message": "This job has no review added yet"
 *              }
 *          ]
 *      }
 */


/**
 * @api {put} /jobs/:id/challenge Resolve challenge
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Resolve challenge
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Job id
 * @apiParam {String} status Available options: UPHELD - challenge will be upheld and charge will be cancelled, CANCELLED - challenge will be cancelled, care home will be charged
 * @apiParam {String} response Text response from admin to care home about challenge. Max 1000 characters.

 * @apiSuccess (Success 200){Object} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": true
 *     }
 *
 * @apiError AccessDenied Access Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Access Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access Denied"
 *              }
 *          ]
 *      }
 *
 * @apiError NotFound Job not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Job not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "job",
 *                   "message": "Job not found"
 *              }
 *          ]
 *      }
 *
 * @apiError WrongParameters Wrong Parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong Parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "job",
 *                   "message": "Invalid status"
 *              }
 *          ]
 *      }
 *
 * @apiError Conflict! This job has not pending challenge.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 This job has not pending challenge"
 *     {
 *          "errors": [
 *              {
 *                   "field": "job",
 *                   "message": "This job has not pending challenge"
 *              }
 *          ]
 *      }
 */

/**
 * @api {put} /jobs/:id/payment-retry Retry job payment
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Retry job payment
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Job id

 * @apiSuccess (Success 200){Object} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": true
 *     }
 *
 * @apiError AccessDenied Access Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Access Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access Denied"
 *              }
 *          ]
 *      }
 *
 * @apiError NotFound Job not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Job not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "job",
 *                   "message": "Job not found"
 *              }
 *          ]
 *      }
 *
 * @apiError Conflict! Payment process for this job cannot be renewed.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 Payment process for this job cannot be renewed"
 *     {
 *          "errors": [
 *              {
 *                   "field": "job",
 *                   "message": "Payment process for this job cannot be renewed"
 *              }
 *          ]
 *      }
 */

/**
 * @api {put} /jobs/:id Edit job
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Edit job
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Job id
 * @apiParam {Number} [start_date] Start date of job.
 * @apiParam {Number} [end_date] End date of job.
 * @apiParam {String} [role] Required role of carer. Available options: Carer, Senior Carer.
 * @apiParam {File} [floor_plan] Floor plan file. Required if not already exists. Allowed mime types: application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, image/png, image/jpg, image/jpeg
 * @apiParam {String} [parking] Description about parking.
 * @apiParam {String} [notes_for_carers] Notes for carers.
 * @apiParam {String} [emergency_guidance] Emergency guidance.
 * @apiParam {String} [report_contact] Report contact info.
 * @apiParam {String} [superior_contact] Superior contact info.
 * @apiParam {String} [notes] Additional notes.
 * @apiParam {String} [gender_preference] Gender preference. Available options: No preference, Male, Female.
 * @apiParam {String} [manual_booking] Available options: ENABLED, DISABLED(default).
 * @apiParam {Number} [summary_sheet_start_date] Summary sheet edited start date of job.
 * @apiParam {Number} [summary_sheet_end_date] Summary sheet edited end date of job.
 * @apiParam {Number} [voluntary_deduction] Amount of deducted minutes.
 *
 * @apiSuccess (Success 200){Object} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": true
 *     }
 *
 * @apiError AccessDenied Access Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Access Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access Denied"
 *              }
 *          ]
 *      }
 *
 * @apiError NotFound Job not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Job not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "job",
 *                   "message": "Job not found"
 *              }
 *          ]
 *      }
 *
 * @apiError WrongParameters Wrong Parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong Parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "start_date",
 *                   "message": "Start date is required"
 *              }
 *          ]
 *      }
 *
 * @apiError Conflict This job cannot be edited at this stage.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 This job cannot be edited at this stage
 *     {
 *          "errors": [
 *              {
 *                   "field": "job",
 *                   "message": "This job cannot be edited at this stage"
 *              }
 *          ]
 *      }
 */

/**
 * @api {put} /jobs/:id/cancel Cancel job
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Cancel job
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Job id.
 * @apiParam {String} waive_charges Available options: YES - cancels job without charging care home, NO - cancels job with applied 50% charge when job is within 24h before start.
 *
 * @apiSuccess {Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "status": true
 *   }
 *
 * @apiError AccessDenied Access Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Access Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access Denied"
 *              }
 *          ]
 *      }
 *
 * @apiError NotFound Job not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Job not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "job",
 *                   "message": "Job not found"
 *              }
 *          ]
 *      }

 * @apiError WrongParameters Wrong Parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong Parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "waive_charges",
 *                   "message": "Waive_charges field is required."
 *              }
 *          ]
 *      }
 *
 * @apiError Conflict This job cannot be cancelled at this stage.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 This job cannot be cancelled at this stage
 *     {
 *          "errors": [
 *              {
 *                   "field": "job",
 *                   "message": "This job cannot be cancelled at this stage"
 *              }
 *          ]
 *      }
 */

/**
 * @api {post} /care-homes/:id/jobs Add jobs
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Add jobs
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Care home id.
 * @apiParam {String} jobs Parsed to string job objects e.g [{ "start_date": 1518436800000, "end_date": 1518436900000, "amount" : 1, "role": "Carer", "manual_booking": true },{ "start_date": 1518436800000, "end_date": 1518436900000, "role": "Senior Carer"}]
 * @apiParam {String} [gender_preference] Gender preference. Available options: Male, Female, No preference(default)
 * @apiParam {File} [floor_plan] Floor plan file. Required if not already exists. Allowed mime types: application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, image/png, image/jpg, image/jpeg
 * @apiParam {String} [parking] Description about parking. Required if not already exists.
 * @apiParam {String} [notes_for_carers] Notes for carers. Required if not already exists.
 * @apiParam {String} [emergency_guidance] Emergency guidance. Required if not already exists.
 * @apiParam {String} [report_contact] Report contact info. Required if not already exists.
 * @apiParam {String} [superior_contact] Superior contact info. Required if not already exists.
 *
 * @apiSuccess (Success 201){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "status": true
 *   }
 *
 * @apiError AccessDenied Access Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Access Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access Denied"
 *              }
 *          ]
 *      }
 *
 * @apiError WrongParameters Wrong Parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong Parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "start_date",
 *                   "message": "Start date is required"
 *              }
 *          ]
 *      }
 *
 * @apiError MissingCard Missing card.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Missing card.
 *     {
 *          "errors": [
 *              {
 *                   "field": "card",
 *                   "message": "This care home has no added card"
 *              }
 *          ]
 *      }
 */

