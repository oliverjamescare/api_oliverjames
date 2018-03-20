
/**
 * @api {get} /jobs Jobs list
 * @apiSampleRequest /jobs
 * @apiVersion 0.0.1
 * @apiName Jobs list
 * @apiGroup Job
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} [search] Sear,ch string.
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

