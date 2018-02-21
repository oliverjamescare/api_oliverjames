
/**
 * @api {get} /care-home/my-jobs Care home my jobs
 * @apiSampleRequest /care-home/my-jobs
 * @apiVersion 0.0.1
 * @apiName Care home my jobs
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {Number} [page] Page number.
 * @apiParam {Number} [results] Results per page. Default 10.
 *
 * @apiSuccess (Success 200){Object} results Pagination results.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "results": [
 *              {
 *                  "_id": "5a814b8deb5cee1dc0720128",
 *                  "start_date": 1518422931942,
 *                  "end_date": 1518425101942,
 *                  "carer": {
 *                      "_id": "5a6b1413599b6f3c8c7eaa8b",
 *                      "carer": {
 *                          "surname": "m",
 *                          "first_name": "Adr"
 *                      }
 *                  }
 *              }
 *           ],
 *           "pages": 1,
 *           "total": 3
 *
 *      }
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
 * @apiError PermissionDenied Permission Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Permission Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Permission Denied"
 *              }
 *          ]
 *      }
 *
 * @apiError ExpiredToken Token expired.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 410 Token expired
 *     {
 *          "errors": [
 *              {
 *                   "field": "token",
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */

/**
 * @api {get} /jobs/:id Job details
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Job details
 * @apiGroup Job
 * 
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Job id
 *
 * @apiSuccess (Success 200){Object} job Job object.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "_id": "5a814b8deb5cee1dc0720128",
            "start_date": 1518422931942,
            "end_date": 1518425101942,
            "care_home": {
                "_id": "5a71b2834f1f26305c6abf2a",
                "care_home": {
                    "care_service_name": "Test care home",
                    "type_of_home": "Nursing",
                    "name": "Test Test"
                },
                "email": "test.test@test.com",
                "phone_number": "123456788777",
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
            "role": "Senior Carer",
            "general_guidance": {
                "floor_plan": "http://localhost:8000/uploads/users/151808246323012.floor_plan.docx",
                "parking": "test",
                "notes_for_carers": "test",
                "emergency_guidance": "test",
                "report_contact": "test",
                "superior_contact": "test"
            },
            "notes": null
 *     }
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
 * @apiError ExpiredToken Token expired.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 410 Token expired
 *     {
 *          "errors": [
 *              {
 *                   "field": "token",
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */


/**
 * @api {get} /carer/my-jobs Carer my jobs
 * @apiSampleRequest /carer/my-jobs
 * @apiVersion 0.0.1
 * @apiName Carer my jobs
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {Number} [page] Page number.
 * @apiParam {Number} [results] Results per page. Default 10.
 *
 * @apiSuccess (Success 200){Object} results Pagination results.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
         {
             "results": [
                 {
                    "_id": "5a814b8deb5cee1dc0720128",
                    "start_date": 1518422931942,
                    "end_date": 1518425101942,
                    "author": {
                        "_id": "5a71b2834f1f26305c6abf2a",
                        "care_home": {
                            "care_service_name": "Test care home",
                            "type_of_home": "Nursing",
                            "name": "Test Test",
                        },
                        "email": "test.test@test.com",
                        "phone_number": "123456788777",
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
                    "role": "Senior Carer",
                    "general_guidance": {
                        "floor_plan": "http://localhost:8000/uploads/users/151808246323012.floor_plan.docx",
                        "parking": "test",
                        "notes_for_carers": "test",
                        "emergency_guidance": "test",
                        "report_contact": "test",
                        "superior_contact": "test"
                    },
                    "notes": null
                }
             ],
             "pages": 1,
             "total": 3
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
 * @apiError PermissionDenied Permission Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Permission Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Permission Denied"
 *              }
 *          ]
 *      }
 *
 * @apiError ExpiredToken Token expired.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 410 Token expired
 *     {
 *          "errors": [
 *              {
 *                   "field": "token",
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */

/**
 * @api {get} /carer/jobs Carer available jobs
 * @apiSampleRequest /carer/jobs
 * @apiVersion 0.0.1
 * @apiName Carer available jobs
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {Number} [page] Page number.
 * @apiParam {Number} [results] Results per page. Default 10.
 * @apiParam {Number} [dont_meet_criteria] Filter which disables availability checking. Available options 1 - enabled, 0(default) - disabled.
 * @apiParam {Number} [distance] Filter by distance.
 * @apiParam {String} [sort] Sort parameter. Available options: roleASC - by role ascending, roleDESC - by role descending, startDESC - by start date descending, startASC(default) - by start date ascending, endDESC - by end date descending, endASC - by end date ascending
 *
 * @apiSuccess (Success 200){Object} results Pagination results.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
     "results": [
         {
            "_id": "5a814b8deb5cee1dc0720128",
            "start_date": 1518422931942,
            "end_date": 1518425101942,
            "author": {
                "_id": "5a71b2834f1f26305c6abf2a",
                "care_home": {
                    "care_service_name": "Test care home",
                    "type_of_home": "Nursing",
                    "name": "Test Test",
                },
                "email": "test.test@test.com",
                "phone_number": "123456788777",
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
                },
                "distance": 4.25
            },
            "role": "Senior Carer",
            "conflict": false
        }
     ],
     "pages": 1,
     "total": 3
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
 * @apiError PermissionDenied Permission Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Permission Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Permission Denied"
 *              }
 *          ]
 *      }
 *
 * @apiError ExpiredToken Token expired.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 410 Token expired
 *     {
 *          "errors": [
 *              {
 *                   "field": "token",
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */

/**
 * @api {put} /jobs/:id/accept Accept job
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Accept job
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Job id
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
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
 * @apiError PermissionDenied Permission Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Permission Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Permission Denied"
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
 * @apiError Conflict Job already accepted.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 Job already accepted
 *     {
 *          "errors": [
 *              {
 *                   "field": "job",
 *                   "message": "Job already accepted"
 *              }
 *          ]
 *      }
 *
 * @apiError ExpiredToken Token expired.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 410 Token expired
 *     {
 *          "errors": [
 *              {
 *                   "field": "token",
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */

/**
 * @api {put} /jobs/:id/withdraw Withdraw job
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Withdraw job
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Job id
 * @apiParam {String} message Withdrawal message explanation.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
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
 * @apiError PermissionDenied Permission Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Permission Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Permission Denied"
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
 * @apiError WrongParameters WrongParameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 WrongParameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "message",
 *                   "message": "Message field is required"
 *              }
 *          ]
 *      }
 *
 * @apiError Conflict You can't withdraw from a job which already started.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 You can't withdraw from a job which already started
 *     {
 *          "errors": [
 *              {
 *                   "field": "job",
 *                   "message": "You can't withdraw from a job which already started"
 *              }
 *          ]
 *      }
 *
 * @apiError ExpiredToken Token expired.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 410 Token expired
 *     {
 *          "errors": [
 *              {
 *                   "field": "token",
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */


/**
 * @api {put} /jobs/:id/decline Decline job
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Decline job
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Job id
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
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
 * @apiError PermissionDenied Permission Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Permission Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Permission Denied"
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
 * @apiError Conflict You can't decline previously accepted job.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 You can't decline previously accepted job
 *     {
 *          "errors": [
 *              {
 *                   "field": "job",
 *                   "message": "You can't decline previously accepted job"
 *              }
 *          ]
 *      }
 *
 * @apiError ExpiredToken Token expired.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 410 Token expired
 *     {
 *          "errors": [
 *              {
 *                   "field": "token",
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */

/**
 * @api {post} /jobs/:id/summary Add summary sheet
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Add summary sheet
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Job id
 * @apiParam {File} signature Signature image. Available file extensions: jpg, jpeg, png. Max file size 10MB.
 * @apiParam {String} name Principals's name.
 * @apiParam {String} position Principals's position.
 * @apiParam {Number} [start_date] Start date of job if it was different than original. Cannot be earlier than original start date. Timestamp formatted to UTC timezone.
 * @apiParam {Number} [end_date] End date of job if it was different than original. Timestamp formatted to UTC timezone.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *       "status": true
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
 * @apiError PermissionDenied Permission Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Permission Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Permission Denied"
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
 * @apiError WrongParameters Wrong parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "name",
 *                   "message": "Name is required."
 *              }
 *          ]
 *      }
 *
 * @apiError Conflict You're not assigned to this job.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 You're not assigned to this job
 *     {
 *          "errors": [
 *              {
 *                   "field": "job",
 *                   "message": "You're not assigned to this job"
 *              }
 *          ]
 *      }
 *
 * @apiError ExpiredToken Token expired.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 410 Token expired
 *     {
 *          "errors": [
 *              {
 *                   "field": "token",
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */

/**
 * @api {post} /jobs Add jobs
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Add jobs
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} jobs Parsed to string job objects e.g [{ "start_date": 1518436800000, "end_date": 1518436900000, "amount" : 1, "role": "Carer" },{ "start_date": 1518436800000, "end_date": 1518436900000, "role": "Senior Carer"}]
 * @apiParam {String} [gender] Gender preference. Available options: male, female, no preference(default)
 * @apiParam {File} [floor_plan] Floor plan file. Required if not already exists.
 * @apiParam {String} [parking] Description about parking. Required if not already exists.
 * @apiParam {String} [notes_for_carers] Notes for carers. Required if not already exists.
 * @apiParam {String} [emergency_guidance] Emergency guidance. Required if not already exists.
 * @apiParam {String} [report_contact] Report contact info. Required if not already exists.
 * @apiParam {String} [superior_contact] Superior contact info. Required if not already exists.
 *
 * @apiSuccess (Success 201){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
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
 * @apiError PermissionDenied Permission Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Permission Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Permission Denied"
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
 * @apiError ExpiredToken Token expired.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 410 Token expired
 *     {
 *          "errors": [
 *              {
 *                   "field": "token",
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */

/**
 * @api {get} /jobs/carers Check carers to contact with
 * @apiSampleRequest /jobs/carers
 * @apiVersion 0.0.1
 * @apiName Check carers to contact with
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} jobs Parsed to string job objects e.g [{ "_id": "72837ydasdasd", "start_date": 1518436800000, "end_date": 1518436900000, "amount" : 1, "role": "Carer" },{ "_id": "72837ydasdasd", "start_date": 1518436800000, "end_date": 1518436900000, "role": "Senior Carer"}]
 * @apiParam {String} [gender] Gender preference. Available options: male, female, no preference(default)
 *
 * @apiSuccess (Success 201){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 {
     "jobs": [
        {
            "_id": "sasdasda",
            "start_date": 1521126000000,
            "end_date": 1521127000000,
            "amount": 10,
            "role": "Carer",
            "notes": "",
            "priority_carers": [],
            "carersToContact": 10
        },
        {
            "_id": "sasdasda",
            "start_date": 1521127000000,
            "end_date": 1521128000000,
            "amount": 1,
            "role": "Senior Carer",
            "notes": "",
            "priority_carers": [],
            "carersToContact": 10
        }
    ]
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
 * @apiError PermissionDenied Permission Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Permission Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Permission Denied"
 *              }
 *          ]
 *      }
 *
 * @apiError ExpiredToken Token expired.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 410 Token expired
 *     {
 *          "errors": [
 *              {
 *                   "field": "token",
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */