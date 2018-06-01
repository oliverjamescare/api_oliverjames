
/**
 * @api {get} /parameters/commission Get commission parameters
 * @apiSampleRequest /parameters/commission
 * @apiVersion 0.0.1
 * @apiName Get commission parameters
 * @apiGroup Parameters
 *
 * @apiHeader {String} X-access-token Access token
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "general_commission": {
 *              "manual_booking_pricing": 1,
 *              "max_to_deduct": 3,
 *              "app_commission": 7
 *          }
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
 * @api {put} /parameters/commission Update commission parameters
 * @apiSampleRequest /parameters/commission
 * @apiVersion 0.0.1
 * @apiName Update commission parameters
 * @apiGroup Parameters
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {Number} [manual_booking_pricing] Manual booking pricing. Min 0.
 * @apiParam {Number} [max_to_deduct] Carer max to deduct in %. Min 0. Max 100.
 * @apiParam {Number} [app_commission] Oliver James commission in %. Min 0. Max 100.
 *
 * @apiSuccess {Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "status": true
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
 *                   "field": "app_commission",
 *                   "message": "App commission cannot be lower than 0."
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
 * @api {get} /parameters/notifications Get notifications parameters
 * @apiSampleRequest /parameters/notifications
 * @apiVersion 0.0.1
 * @apiName Get notifications parameters
 * @apiGroup Parameters
 *
 * @apiHeader {String} X-access-token Access token
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
     {
         "notifications": {
             "preferred": {
                 "lessThanFourHours": 0,
                 "betweenFourAndTwelveHours": 0,
                 "betweenTwelveAndTwentyFourHours": 0,
                 "moreThanTwentyFourHours": 0
             },
             "starsFourToFive": {
                 "lessThanFourHours": 0,
                 "betweenFourAndTwelveHours": 5,
                 "betweenTwelveAndTwentyFourHours": 30,
                 "moreThanTwentyFourHours": 60
             },
             "starsThreeToFour": {
                 "lessThanFourHours": 0,
                 "betweenFourAndTwelveHours": 5,
                 "betweenTwelveAndTwentyFourHours": 30,
                 "moreThanTwentyFourHours": 30
             },
             "unrated": {
                 "lessThanFourHours": 15,
                 "betweenFourAndTwelveHours": 35,
                 "betweenTwelveAndTwentyFourHours": 60,
                 "moreThanTwentyFourHours": 60
             },
             "starsTwoToThree": {
                 "lessThanFourHours": 10,
                 "betweenFourAndTwelveHours": 15,
                 "betweenTwelveAndTwentyFourHours": 30,
                 "moreThanTwentyFourHours": 30
             },
             "starsOneToTwo": {
                 "lessThanFourHours": 5,
                 "betweenFourAndTwelveHours": 15,
                 "betweenTwelveAndTwentyFourHours": 15,
                 "moreThanTwentyFourHours": 15
             }
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
 * @api {put} /parameters/notifications Update notifications parameters
 * @apiSampleRequest /parameters/notifications
 * @apiVersion 0.0.1
 * @apiName Update notifications parameters
 * @apiGroup Parameters
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParamExample {json} Request-Example:
    {
         "preferred": {
             "lessThanFourHours": 0,
             "betweenFourAndTwelveHours": 0,
             "betweenTwelveAndTwentyFourHours": 0,
             "moreThanTwentyFourHours": 0
         },
         "starsFourToFive": {
             "lessThanFourHours": 0,
             "betweenFourAndTwelveHours": 5,
             "betweenTwelveAndTwentyFourHours": 30,
             "moreThanTwentyFourHours": 60
         },
         "starsThreeToFour": {
             "lessThanFourHours": 0,
             "betweenFourAndTwelveHours": 5,
             "betweenTwelveAndTwentyFourHours": 30,
             "moreThanTwentyFourHours": 30
         },
         "unrated": {
             "lessThanFourHours": 15,
             "betweenFourAndTwelveHours": 35,
             "betweenTwelveAndTwentyFourHours": 60,
             "moreThanTwentyFourHours": 60
         },
         "starsTwoToThree": {
             "lessThanFourHours": 10,
             "betweenFourAndTwelveHours": 15,
             "betweenTwelveAndTwentyFourHours": 30,
             "moreThanTwentyFourHours": 30
         },
         "starsOneToTwo": {
             "lessThanFourHours": 5,
             "betweenFourAndTwelveHours": 15,
             "betweenTwelveAndTwentyFourHours": 15,
             "moreThanTwentyFourHours": 15
         }
    }
 *
 * @apiSuccess {Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "status": true
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
 *                   "field": "lessThanFourHours",
 *                   "message": "lessThanFourHours cannot be lower than 0."
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
 * @api {get} /parameters/pricing/roles Get general pricing roles
 * @apiSampleRequest /parameters/pricing/roles
 * @apiVersion 0.0.1
 * @apiName Get general pricing roles
 * @apiGroup Parameters
 *
 * @apiHeader {String} X-access-token Access token
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
     {
         "roles": [
            {
                "_id": "5b0ebfdef6da3a40883c98b4",
                "role": "Carer"
            },
            {
                "_id": "5b0ebfdef6da3a40883c98b6",
                "role": "Senior Carer"
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
 * @api {get} /parameters/pricing/roles/:id Get general pricing
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Get general pricing
 * @apiGroup Parameters
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Pricing role id.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
     {
        "_id": "5b0ebfdef6da3a40883c98b4",
        "role": "Carer",
        "pricing": {
            "hour_23_0": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_22_23": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_21_22": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_20_21": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_19_20": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_18_19": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_17_18": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_16_17": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_15_16": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_14_15": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_13_14": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_12_13": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_11_12": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_10_11": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_9_10": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_8_9": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_7_8": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_6_7": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_5_6": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_4_5": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_3_4": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_2_3": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_1_2": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            },
            "hour_0_1": {
                "sunday_price": 11.5,
                "saturday_price": 11.5,
                "friday_price": 11.5,
                "thursday_price": 11.5,
                "wednesday_price": 11.5,
                "tuesday_price": 11.5,
                "monday_price": 11.5
            }
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
 * @apiError NotFound Not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "role",
 *                   "message": "Pricing role not found"
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
 * @api {put} /parameters/pricing/roles/:id Update general pricing
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Update general pricing
 * @apiGroup Parameters
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Pricing role id.
 * @apiParamExample {json} Request-Example:
     {
        "hour_23_0": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_22_23": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_21_22": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_20_21": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_19_20": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_18_19": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_17_18": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_16_17": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_15_16": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_14_15": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_13_14": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_12_13": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_11_12": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_10_11": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_9_10": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_8_9": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_7_8": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_6_7": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_5_6": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_4_5": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_3_4": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_2_3": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_1_2": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        },
        "hour_0_1": {
            "sunday_price": 11.5,
            "saturday_price": 11.5,
            "friday_price": 11.5,
            "thursday_price": 11.5,
            "wednesday_price": 11.5,
            "tuesday_price": 11.5,
            "monday_price": 11.5
        }
     }
 *
 * @apiSuccess {Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "status": true
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
 * @apiError NotFound Not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "role",
 *                   "message": "Pricing role not found"
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
 *                   "field": "sunday_price",
 *                   "message": "Sunday price cannot be lower than 0."
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