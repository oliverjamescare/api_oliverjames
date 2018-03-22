/**
 * @api {get} /home General overview
 * @apiSampleRequest /home
 * @apiVersion 0.0.1
 * @apiName General overview
 * @apiGroup Admin
 *
 * @apiHeader {String} X-access-token Access token

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
     {
        "failed_payments": 1,
        "challenged_jobs": 0,
        "pending_reviews": 1,
        "booked_in_24_jobs": 2,
        "waiting_list": 0,
        "in_progress_carers": 2
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
 */