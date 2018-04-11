
/**
 * @api {get} /carers Carers list
 * @apiSampleRequest /carers
 * @apiVersion 0.0.1
 * @apiName Carers list
 * @apiGroup Carer
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} [search] Search string.
 * @apiParam {Number} [page] Page number.
 * @apiParam {Number} [results] Results per page. Default 10.
 * @apiParam {Number} [status_filter] Available options: ALL(default) - all carers, CREATED - created carers, ACTIVE - activated carers, BANNED - banned carers.
 * @apiParam {String} [sort] Available options: id_asc(default) - by id ascending, id_desc - by id descending, name_asc - by name ascending, name_desc - by name descending, date_of_birth_asc - by date of birth ascending, date_of_birth_desc - by date of birth desc, activation_date_asc - by activation date ascending, activation_date_desc - by activation date descending, rating_asc - by rating ascending, rating_desc - by rating descending, status_asc - by status ascending, status_desc - by status descending, banned_until_asc - by banned date ascending, banned_until_desc - by banned date descending, deductions_balance_asc - by deductions balance ascending, deductions_balance_desc - by deductions balance descending .

 * @apiSuccess (Success 200){Object} results Pagination results.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "results": [
            {
                "_id": "5a9418e7e33cb930aa7c384f",
                "carer": {
                    "first_name": "Test",
                    "surname": "Test",
                    "date_of_birth": "1995-02-15",
                    "deductions_balance": 20,
                    "reviews": {
                        "average": 5,
                        "count": 1
                    }
                },
                "status": "ACTIVE",
                "notes": "Carer notes",
                "banned_until": 1521474300000,
                "activation_date": 1521473924560
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
 * @api {get} /carers/:id Carer details
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Carer details
 * @apiGroup Carer
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Carer id

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "_id": "5a9418e7e33cb930aa7c384f",
            "carer": {
                "first_name": "Test",
                "surname": "Test",
                "middle_name": "null",
                "date_of_birth": "1992-04-22",
                "reference": {
                    "references": [
                        {
                            "name": "Test reference",
                            "type": "Personal"
                        }
                    ],
                    "files": []
                },
                "dbs": {
                    "status": "Minor issues - approved",
                    "ref_number": "1233345",
                    "dbs_date": 1440979200000,
                    "files": []
                },
                "joining_care_experience": {
                    "months": 11,
                    "years": 2
                },
                "training_record": {
                    "other": "Other description",
                    "fire_safety": 1440979200000,
                    "dementia": 1440979200000,
                    "h_and_s": 1440979200000,
                    "first_aid_awareness": 1440979200000,
                    "first_aid_and_basic_life_support": 1440979200000,
                    "infection_control": 1440979200000,
                    "medication_management": 1440979200000,
                    "manual_handling_people": 1440979200000,
                    "safeguarding": 1440979200000,
                    "qualifications": [
                        "Nursing qualification (elsewhere)",
                        "QCF / NVQ level 5 in Health & Social Care"
                    ],
                    "files": []
                },
                "eligible_roles": [
                    "Carer",
                    "Senior Carer"
                ],
                "cv_uploads": [
                    "http://localhost:8000/uploads/users/5a9418e7e33cb930aa7c384f/151965514364612.-tst.docx"
                ],
                "deductions": [
                    {
                        "amount": 20,
                        "description": "Dementia training",
                        "created": 1523366751295,
                        "status": "CONFIRMED",
                        "balance": 20
                    }
                ],
                "deductions_balance": 23
            },
            "status": "ACTIVE",
            "notes": "Carer notes",
            "banned_until": 1521474300000
 *    }
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
 * @apiError NotFound Not Found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Carer not found"
 *              }
 *          ]
 *      }
 */

/**
 * @api {put} /carers/:id Update carer details
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Update carer details
 * @apiGroup Carer
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Carer id

 * @apiParamExample {json} Request-Example:
 *     {
            "carer": {
                "first_name": "Test",
                "surname": "Test",
                "middle_name": "null",
                "date_of_birth": "1992-04-22",
                "reference": {
                    "references": [
                        {
                            "name": "Test reference",
                            "type": "Personal"
                        }
                    ],
                },
                "dbs": {
                    "status": "Minor issues - approved",
                    "ref_number": "1233345",
                    "dbs_date": 1440979200000,
                },
                "joining_care_experience": {
                    "months": 11,
                    "years": 2
                },
                "training_record": {
                    "other": "Other description",
                    "fire_safety": 1440979200000,
                    "dementia": 1440979200000,
                    "h_and_s": 1440979200000,
                    "first_aid_awareness": 1440979200000,
                    "first_aid_and_basic_life_support": 1440979200000,
                    "infection_control": 1440979200000,
                    "medication_management": 1440979200000,
                    "manual_handling_people": 1440979200000,
                    "safeguarding": 1440979200000,
                    "qualifications": [
                        "Nursing qualification (elsewhere)",
                        "QCF / NVQ level 5 in Health & Social Care"
                    ]
                },
                "eligible_roles": [
                    "Carer",
                    "Senior Carer"
                ],
            },
            "status": "ACTIVE",
            "notes": "Carer notes",
            "banned_until": 1521474300000
 *    }

 * @apiSuccess {Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "status": true
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
 * @apiError NotFound Not Found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Carer not found"
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
 *                   "field": "carer.training_record.fire_safety",
 *                   "message": "Carer training record fire safety must be valid date timestamp."
 *              }
 *          ]
 *      }
 */



/**
 * @api {post} /carers/:id/:resource/upload Upload files to carer resource
 * @apiSampleRequest /carers/:id/:resource/upload
 * @apiVersion 0.0.1
 * @apiName Upload files to carer resource
 * @apiGroup Carer
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Carer id
 * @apiParam {String} resource Resource name. Available options: reference - upload to reference files, dbs - upload to dbs files, training_record - upload to training record files, cv - cv upload
 * @apiParam {File} files File or files (max 5) for resource. Max 10MB per single file. Allowed mime types: application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, image/png, image/jpg, image/jpeg
 *
 * @apiSuccess (Success 201){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        "status": true
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
 * @apiError NotFound Not Found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Carer not found"
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
 *                   "field": "files",
 *                   "message": "Invalid mime type"
 *              }
 *          ]
 *      }
 */

/**
 * @api {delete} /carers/:id/:resource/upload Delete file from carer resource
 * @apiSampleRequest /carers/:id/:resource/upload
 * @apiVersion 0.0.1
 * @apiName Delete file from carer resource
 * @apiGroup Carer
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Carer id
 * @apiParam {String} resource Resource name. Available options: reference - upload to reference files, dbs - upload to dbs files, training_record - upload to training record files, cv - cv upload
 * @apiParam {String} file File url.
 *
 * @apiSuccess {Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "status": true
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
 * @apiError NotFound Not Found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Carer not found"
 *              }
 *          ]
 *      }
 */

/**
 * @api {post} /carers Add carer
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Add carer
 * @apiGroup Carer
 *
 * @apiHeader {String} X-access-token Access token

 * @apiParamExample {json} Request-Example:
 *     {
 *          "email": "test@test.test.com",
            "password": "test123",
            "phone_number": "7823828388343",
            "address": {
                "postal_code": "Ex8 2el",
                "city": "Exmouth",
                "address_line_1": "Elwyn Rd, Exmouth EX8 2E",
                "address_line_2": null,
                "company": null
            },
            "carer": {
                "first_name": "Test",
                "surname": "Test",
                "middle_name": null,
                "date_of_birth": "1992-04-22",
                "reference": {
                    "references": [
                        {
                            "name": "Test reference",
                            "type": "Personal"
                        }
                    ],
                },
                "dbs": {
                    "status": "Minor issues - approved",
                    "ref_number": "1233345",
                    "dbs_date": 1440979200000,
                },
                "joining_care_experience": {
                    "months": 11,
                    "years": 2
                },
                "training_record": {
                    "other": "Other description",
                    "fire_safety": 1440979200000,
                    "dementia": 1440979200000,
                    "h_and_s": 1440979200000,
                    "first_aid_awareness": 1440979200000,
                    "first_aid_and_basic_life_support": 1440979200000,
                    "infection_control": 1440979200000,
                    "medication_management": 1440979200000,
                    "manual_handling_people": 1440979200000,
                    "safeguarding": 1440979200000,
                    "qualifications": [
                        "Nursing qualification (elsewhere)",
                        "QCF / NVQ level 5 in Health & Social Care"
                    ]
                },
                "eligible_roles": [
                    "Carer",
                    "Senior Carer"
                ],
            },
            "notes": "Carer notes"
 *    }

 * @apiSuccess {Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "status": true,
 *        "_id": "5a814b8deb5cee1dc0720128"
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
 * @apiError WrongParameters Wrong Parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong Parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "carer.training_record.fire_safety",
 *                   "message": "Carer training record fire safety must be valid date timestamp."
 *              }
 *          ]
 *      }
 */

/**
 * @api {post} /carers/:id/deductions Add deduction
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Add deduction
 * @apiGroup Carer
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Carer id
 * @apiParam {String} description Deduction description
 * @apiParam {Number} amount Amount of deduction. Must be greater than 0.
 * @apiParam {String} type Deduction type. Available types: DEBIT, CREDIT
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        "status": true
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
 * @apiError NotFound Not Found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Carer not found"
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
 *                   "field": "amount",
 *                   "message": "Amount must be greater than 0"
 *              }
 *          ]
 *      }
 */