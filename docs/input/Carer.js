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
 */

/**
 * @api {put} /carer/availability Carer availability calendar update
 * @apiSampleRequest /carer/availability
 * @apiVersion 0.0.1
 * @apiName Carer availability calendar update
 * @apiGroup Carer
 *
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
 */

/**
 * @api {get} /carer/calendar Carer jobs calendar
 * @apiSampleRequest /carer/calendar
 * @apiVersion 0.0.1
 * @apiName Carer jobs calendar
 * @apiGroup Carer
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
                        }
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
 */
