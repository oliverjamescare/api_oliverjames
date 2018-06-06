
/**
 * @api {get} /exports/{collection} Get export
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Get export
 * @apiGroup Exports
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} collection Collection name. Available data collections: jobs, carers, care_homes, admins, waiting_list, notifications, settings, job_withdrawals,
 * @apiParam {String} [from] Date from in format YYYY-MM-DD
 * @apiParam {String} [to] Date to in format YYYY-MM-DD
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
 * @apiError WrongParameters Wrong parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "collection",
 *                   "message": "Invalid collection type"
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