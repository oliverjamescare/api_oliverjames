
/**
 * @api {get} /carers/nearby Checks carers near point
 * @apiSampleRequest /carers/nearby
 * @apiVersion 0.0.1
 * @apiName Checks carers near point
 * @apiGroup Carer
 *
 * @apiParam {String} postal_code Postal code.
 * @apiParam {String} [company] Company name.
 * @apiParam {String} address_line_1 First line of address string.
 * @apiParam {String} [address_line_2] Second line of address string.
 * @apiParam {String} city City.

 * @apiSuccess (Success 200){Boolean} exists Existance status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "exists" : true,
 *     }
 *
 */

/**
 * @api {get} /carer/availability Carer availability calendar
 * @apiSampleRequest /carer/availability
 * @apiVersion 0.0.1
 * @apiName Carer availability calendar
 * @apiGroup Carer
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {Number} [week] Week number. Default is 0 - general availablility. 1 means current week. Maximum 5 weeks forward.

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "type": "general",
 *      "availability": {
 *          "monday": {
 *              "am_shift": true,
 *	            "pm_shift": false,
 *	            "night_shift": false
 *          },
 *	        "tuesday": {
 *	            "am_shift": false,
 *	            "pm_shift": true,
 *	            "night_shift": true
 *	        },
 *	        "wednesday": {
 *	            "am_shift": true,
 *	            "pm_shift": true,
 *	            "night_shift": true
 *	        },
 *	        "thursday": {
 *	            "am_shift": true,
 *	            "pm_shift": true,
 *	            "night_shift": true
 *	        },
 *	        "friday": {
 *	            "am_shift": true,
 *	            "pm_shift": true,
 *	            "night_shift": true
 *	        },
 *	        "saturday": {
 *	            "am_shift": true,
 *	            "pm_shift": true,
 *	            "night_shift": true
 *	        },
 *	        "sunday": {
 *	            "am_shift": true,
 *	            "pm_shift": true,
 *	            "night_shift": true
 *	        }
 *       }
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
 * @api {put} /carer/availability Carer availability calendar update
 * @apiSampleRequest /carer/availability
 * @apiVersion 0.0.1
 * @apiName Carer availability calendar update
 * @apiGroup Carer
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {Number} [week] Week number. Default is 0 - general availablility. 1 means current week. Maximum 5 weeks forward.

 * @apiParamExample {json} Request-Example:
 *     {
 *      "type": "general",
 *      "availability": {
 *          "monday": {
 *              "am_shift": true,
 *	            "pm_shift": false,
 *	            "night_shift": false
 *          },
 *	        "tuesday": {
 *	            "am_shift": false,
 *	            "pm_shift": true,
 *	            "night_shift": true
 *	        },
 *	        "wednesday": {
 *	            "am_shift": true,
 *	            "pm_shift": true,
 *	            "night_shift": true
 *	        },
 *	        "thursday": {
 *	            "am_shift": true,
 *	            "pm_shift": true,
 *	            "night_shift": true
 *	        },
 *	        "friday": {
 *	            "am_shift": true,
 *	            "pm_shift": true,
 *	            "night_shift": true
 *	        },
 *	        "saturday": {
 *	            "am_shift": true,
 *	            "pm_shift": true,
 *	            "night_shift": true
 *	        },
 *	        "sunday": {
 *	            "am_shift": true,
 *	            "pm_shift": true,
 *	            "night_shift": true
 *	        }
 *       }
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
 * @api {get} /carer/calendar Carer jobs calendar
 * @apiSampleRequest /carer/calendar
 * @apiVersion 0.0.1
 * @apiName Carer jobs calendar
 * @apiGroup Carer
 *
 * @apiHeader {String} X-access-token Access token
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
    {
        "calendar": [
            {
                "day": "2018-02-12",
                "jobs": [
                    {
                        "_id": "5a814b8deb5cee1dc0720128",
                        "start_date": 1518422931942,
                        "end_date": 1518425101942,
                        "role": "Senior Carer",
                        "author": {
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
                                "company": null
                            }
                        },
                        "status": "POSTED",
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
                ]
            },
            {
                "day": "2018-02-13",
                "jobs": []
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

/**
 * @api {get} /carer/calendar/monthly Carer jobs calendar monthly
 * @apiSampleRequest /carer/calendar/monthly
 * @apiVersion 0.0.1
 * @apiName Carer jobs calendar monthly
 * @apiGroup Carer
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} [start_date] Formatted to string start day e.g. 2018-03-01
 * @apiParam {String} [end_date] Formatted to string end day e.g. 2018-03-31
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 {
     "calendar": [
         {
             "day": "2018-02-12",
             "jobs": [
                 {
                     "_id": "5a814b8deb5cee1dc0720128",
                     "start_date": 1518422931942,
                     "end_date": 1518425101942,
                     "role": "Senior Carer",
                     "author": {
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
                             "company": null
                         }
                     },
                     "status": "POSTED",
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
             ]
         },
         {
             "day": "2018-02-13",
             "jobs": []
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

/**
 * @api {get} /carer/my-jobs Carer my jobs
 * @apiSampleRequest /carer/my-jobs
 * @apiVersion 0.0.1
 * @apiName Carer my jobs
 * @apiGroup Carer
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
            "status": "POSTED",
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
 * @apiGroup Carer
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
            "conflict": false,
            "status": "POSTED",
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
 * @api {get} /carer/notifications Carer notifications settings
 * @apiSampleRequest /carer/notifications
 * @apiVersion 0.0.1
 * @apiName Carer notifications settings
 * @apiGroup Carer
 *
 * @apiHeader {String} X-access-token Access token
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "from": 20,
 *          "to": 1440,
 *          "days": {
 *              "monday": false,
 *              "tuesday": false,
 *              "wednesday": true,
 *              "thursday": false,
 *              "friday": false,
 *              "saturday": false,
 *              "sunday": true
 *          }
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
 * @api {put} /carer/notifications Carer notifications settings update
 * @apiSampleRequest /carer/notifications
 * @apiVersion 0.0.1
 * @apiName Carer notifications settings update
 * @apiGroup Carer
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParamExample {json} Request-Example:
 *     {
 *          "from": 20,
 *          "to": 1440,
 *          "days": {
 *              "monday": false,
 *              "tuesday": false,
 *              "wednesday": true,
 *              "thursday": false,
 *              "friday": false,
 *              "saturday": false,
 *              "sunday": true
 *          }
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
 *                   "field": "carer.silent_notifications_settings.to",
 *                   "message": "Silent notifications settings to cannot be greater than 1440."
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
 * @api {get} /carer/home Carer home screen
 * @apiSampleRequest /carer/home
 * @apiVersion 0.0.1
 * @apiName Carer home screen
 * @apiGroup Carer
 *
 * @apiHeader {String} X-access-token Access token
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *           "reviews": {
 *              "count": 1,
 *              "average": 5
 *          },
 *          "nextJobStartDate": 1521136000000,
 *          "jobs24": 0,
 *          "newJobs": 1
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
 * @api {get} /carer/notifications/list Carer notifications
 * @apiSampleRequest /carer/home
 * @apiVersion 0.0.1
 * @apiName Carer notifications
 * @apiGroup Carer
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {Number} [page] Page number.
 * @apiParam {Number} [results] Results per page. Default 10.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "results": [
                {
                    "_id": "5ab27206d27d0508a444b220",
                    "title": "Modified job!",
                    "description": "A job you accepted has been modified by the client",
                    "job": "5a95290a1e28cd1d88ea64cd",
                    "created": 1521643104447,
                    "status": "READ"
                },
            ],
            "pages": 3,
            "total": 21
         }
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
