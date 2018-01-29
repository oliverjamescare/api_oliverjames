/** 
 * @api {post} /contact Send contact message
 * @apiSampleRequest /contact
 * @apiVersion 0.0.1
 * @apiName Send contact email
 * @apiGroup Contact
 *
 * @apiParam {String} email Valid email address.
 * @apiParam {String} name Sender name. Max 50 characters.
 * @apiParam {String} subject Message subject. Max 100 characters.
 * @apiParam {String} message Message content. Max 200 characters.
 * @apiParam {String} [_id] User id.

 * @apiSuccess (Success 201){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "status" : true,
 *     }
 *
 * @apiError NotAcceptable Wrong parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "email",
 *                   "message": "The email is required."
 *              }
 *          ]
 *      }
 */
