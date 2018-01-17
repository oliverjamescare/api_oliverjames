
/**
 * @api {put} /user/confirm-email Confirm email
 * @apiSampleRequest /user/confirm-email
 * @apiVersion 0.0.1
 * @apiName Confirm email
 * @apiGroup User
 * 
 * @apiParam {String} token Email confirm token.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status" : true
 *     }
 *
 * @apiError NotAcceptable Wrong parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "email",
 *                   "message": "This email cannot be confirmed from this link."
 *              }
 *          ]
 *      }
 *      
 * @apiError NotFound User not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 User not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "User not found"
 *              }
 *          ]
 *      }
 * @apiError ExpiredToken Token expired.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 410 Token expired
 *     {
 *          "errors": [
 *              {
 *                   "field": "token",
 *                   "message": "Token expired"
 *              }
 *          ]
 *      }
 */

/**
 * @api {get} /user/uniqueness Check uniqueness
 * @apiSampleRequest /user/uniqueness
 * @apiVersion 0.0.1
 * @apiName Check uniqueness
 * @apiGroup User
 *
 * @apiParam {String} [email] Email to check is already used.
 * @apiParam {String} [phone_number] Phone number to check is already used.
 *
 * @apiSuccess (Success 200){Boolean} exists Status of existance.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "exists" : false
 *     }
 *
 * @apiError NotAcceptable Wrong parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Invalid param."
 *              }
 *          ]
 *      }
 */

