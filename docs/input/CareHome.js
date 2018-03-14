
/**
 * @api {get} /care-home/calendar Care home jobs calendar
 * @apiSampleRequest /care-home/calendar
 * @apiVersion 0.0.1
 * @apiName Care home jobs calendar
 * @apiGroup Care Home

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
                                "company": null,
                                "link": "https://www.google.com/maps/search/?api=1&query=50.7583820,19.005533"
                            }
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
 * @api {get} /care-home/carers/search Carers search
 * @apiSampleRequest /care-home/carers/search
 * @apiVersion 0.0.1
 * @apiName Carers search
 * @apiGroup Care Home
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} [search] Search string
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 {
     "carers": [
        {
            "_id": "5a6b1413599b6f3c8c7eaa8b",
            "carer": {
                "surname": "Test",
                "first_name": "Test"
            }
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
 * @api {get} /care-home/my-jobs Care home my jobs
 * @apiSampleRequest /care-home/my-jobs
 * @apiVersion 0.0.1
 * @apiName Care home my jobs
 * @apiGroup Care Home
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
 *                          "surname": "Test",
 *                          "first_name": "Test",
 *                          "care_experience": {
 *                              "months": 2,
 *                              "years": 1
 *                          },
 *                          "reviews": {
 *                              "average": 5,
 *                              "count": 1
 *                          }
 *                      },
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
 * @api {post} /care-home/carers/:id/block Add carer to blocked
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Add carer to blocked
 * @apiGroup Care Home
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Carer id.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "status": true
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
 * @api {delete} /care-home/carers/:id/block Remove carer from blocked
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Remove carer from blocked
 * @apiGroup Care Home
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Carer id.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
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