
/**
 * @api {get} /care-homes Care homes list
 * @apiSampleRequest /care-homes
 * @apiVersion 0.0.1
 * @apiName Care homes list
 * @apiGroup Care home
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} [search] Search string.
 * @apiParam {Number} [page] Page number.
 * @apiParam {Number} [results] Results per page. Default 10.
 * @apiParam {Number} [status_filter] Available options: ALL(default) - all care homes, ACTIVE - activated care homes, BANNED - banned care homes.
 * @apiParam {String} [sort] Available options: id_asc(default) - by id ascending, id_desc - by id descending, name_asc - by name ascending, name_desc - by name descending, care_service_name_asc - by care service name ascending, care_service_name_desc - by care service name descending, activation_date_asc - by activation date ascending, activation_date_desc - by activation date descending, status_asc - by status ascending, status_desc - by status descending, banned_until_asc - by banned date ascending, banned_until_desc - by banned date descending, credits_balance_asc - by credits balance ascending, credits_balance_desc - by credits balance descending


 * @apiSuccess (Success 200){Object} results Pagination results.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "results": [
            {
                "_id": "5a9418e7e33cb930aa7c384f",
                "care_home": {
                    "care_service_name": "Test care home",
                    "name": "Test",
                    "credits_balance": 0
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
                },
                "status": "ACTIVE",
                "notes": "Care home notes",
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
 * @api {get} /care-homes/:id Care home details
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Care home details
 * @apiGroup Care home
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Care home id.

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "_id": "5a9419d8e33cb930aa7c3856",
            "care_home": {
                "care_service_name": "Test Care  Home",
                "type_of_home": "Residential",
                "name": "Test",
                "gender_preference": "No preference",
                "general_guidance": {
                    "floor_plan": "http://localhost:8000/uploads/users/5a9419d8e33cb930aa7c3856/151972481016501b2ceacf735ed2f39aaf31f7a145e7f.png",
                    "parking": "test",
                    "notes_for_carers": "s",
                    "emergency_guidance": "sd",
                    "report_contact": "asd",
                    "superior_contact": "asd"
                },
                "payment_system": {
                    "card_number": "**** **** **** **** 6577"
                },
                "blocked_carers": [],
                "credits": [
                    {
                        "amount": 10,
                        "description": "promo credits",
                        "created": 1523366751295,
                        "status": "CONFIRMED",
                        "balance": 10
                    }
                ],
                "credits_balance": 10
            },
            "email": "test@test.com",
            "phone_number": "3545232323",
            "status": "CREATED",
            "notes": null,
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
            "email_verified": false,
            "banned_until": null,
            "activation_date": 1523455970774
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
 * @apiError NotFound User not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Care home not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "User not found"
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
 * @api {put} /care-homes/:id Update care home
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Update care home
 * @apiGroup Care home
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Care home id.
 * @apiParam {String} [notes] Notes about care home.
 * @apiParam {String} [status] Care home status. Available statuses: BANNED, BLOCKED, ACTIVE
 * @apiParam {String} [banned_until] banned date. If valid than sets automatically BANNED status.
 * @apiParam {String} [care_service_name] Care service name.
 * @apiParam {String} [type_of_home] Type of home Available types: Residential, Nursing, Learning disabilit, Supported living.
 * @apiParam {String} [name] Care home owner name
 * @apiParam {String} [gender_preference] Gender preference for jobs. Available options: No preference, Male, Female
 *
 * @apiParam {File} [floor_plan] Floor plan file. Required if not already exists. Allowed mime types: application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, image/png, image/jpg, image/jpeg
 * @apiParam {String} [parking] Description about parking.
 * @apiParam {String} [notes_for_carers] Notes for carers.
 * @apiParam {String} [emergency_guidance] Emergency guidance.
 * @apiParam {String} [report_contact] Report contact info.
 * @apiParam {String} [superior_contact] Superior contact info.
 *
 * @apiParam {String} [postal_code] Postal code. Required to change address.
 * @apiParam {String} [company] Company name.
 * @apiParam {String} [address_line_1] First line of address string. Required to change address.
 * @apiParam {String} [address_line_2] Second line of address string.
 * @apiParam {String} [city] City. Required to change address.

 * @apiSuccess (Success 200){Boolean} status Operation status.
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
 * @apiError NotFound User not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Care home not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "User not found"
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
 *                   "field": "care_home.name",
 *                   "message": "Care home name is required."
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
 * @api {post} /care-homes Add care home
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Add care home
 * @apiGroup Care home
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Care home id.
 * @apiParam {String} email Valid email address.
 * @apiParam {String} password Min 8 characters, RegExp = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,}$/.
 * @apiParam {String} phone_number Phone number. Only numbers and min 6 characters.
 *
 * @apiParam {String} [notes] Notes about care home.
 * @apiParam {String} care_service_name Care service name.
 * @apiParam {String} type_of_home Type of home Available types: Residential, Nursing, Learning disabilit, Supported living.
 * @apiParam {String} name Care home owner name
 * @apiParam {String} [gender_preference] Gender preference for jobs. Available options: No preference, Male, Female
 *
 * @apiParam {File} [floor_plan] Floor plan file. Required if not already exists. Allowed mime types: application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, image/png, image/jpg, image/jpeg
 * @apiParam {String} [parking] Description about parking.
 * @apiParam {String} [notes_for_carers] Notes for carers.
 * @apiParam {String} [emergency_guidance] Emergency guidance.
 * @apiParam {String} [report_contact] Report contact info.
 * @apiParam {String} [superior_contact] Superior contact info.
 *
 * @apiParam {String} postal_code Postal code.
 * @apiParam {String} [company] Company name.
 * @apiParam {String} address_line_1 First line of address string.
 * @apiParam {String} [address_line_2] Second line of address string.
 * @apiParam {String} city City.

 * @apiSuccess (Success 201){Boolean} status Operation status.
 * @apiSuccess (Success 201){Boolean} _id Care home id
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        "status": true,
 *        "_id": "5ace258538e8b012a0cf534f"
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
 *                   "field": "care_home.name",
 *                   "message": "Care home name is required."
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
 * @api {post} /care-homes/:id/credits Add credits
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Add credits
 * @apiGroup Care home
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Carer id
 * @apiParam {String} description Credits description
 * @apiParam {Number} amount Amount of deduction. Must be greater than 0.
 * @apiParam {String} type Credit type. Available types: DEBIT, CREDIT
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
 *                   "message": "Care home not found"
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
 * @api {get} /care-homes/waiting-list Care homes waiting list
 * @apiSampleRequest /care-homes/waiting-list
 * @apiVersion 0.0.1
 * @apiName Care homes waiting list
 * @apiGroup Care home
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {Number} [page] Page number.
 * @apiParam {Number} [results] Results per page. Default 10.
 *
 * @apiSuccess (Success 200){Object} results Pagination results.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "results": [
            {
                "_id": "5a9418e7e33cb930aa7c384f",
                "name": "Test care home",
                "email": "test.test@test.com",
                "created": 1522315841513,
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
 * @api {delete} /care-homes/waiting-list/:id Delete waiting list care home
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Delete waiting list care home
 * @apiGroup Care home
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Waiting list care home id.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
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
 * @apiError NotFound Not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "User not found"
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