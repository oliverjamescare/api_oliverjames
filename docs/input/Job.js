
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
 *       "job": {
            "_id": "5a814b8deb5cee1dc0720128",
            "start_date": 1518422931942,
            "end_date": 1518425101942,
            "care_home": {
                "_id": "5a71b2834f1f26305c6abf2a",
                "care_home": {
                    "care_service_name": "Test care home",
                    "type_of_home": "Nursing",
                    "name": "Test Test",
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
                        "company": null
                    }
                },
                "email": "test.test@test.com",
                "phone_number": "123456788777"
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
                    "care_home": {
                        "_id": "5a71b2834f1f26305c6abf2a",
                        "care_home": {
                            "care_service_name": "Test care home",
                            "type_of_home": "Nursing",
                            "name": "Test Test",
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
                                "company": null
                            }
                        },
                        "email": "test.test@test.com",
                        "phone_number": "123456788777"
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
 * @api {post} /jobs Add jobs
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Add jobs
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} jobs Parsed to string job objects e.g [{ "start_date": 1518436800000, "end_date": 1518436900000, "amount" : 1, "role": "Carer" },{ "start_date": 1518436800000, "end_date": 1518436900000, "role": "Senior Carer"}]
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