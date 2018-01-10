/**
 * @api {post} /accounts/:accountId/projects/:projectId/comment Add comment
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/projects/:clientId   
 * @apiVersion 0.3.1 
 * @apiName Add comment 
 * @apiGroup Comment
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} userId User id.
 * @apiParam {String} projectId Project id
 * @apiParam {String} taskId Task id. Default: null.
 * @apiParam {String} comment Comment content
 *
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
 *                   "field": "comment",
 *                   "message": "Comment field is required."
 *              }
 *          ]
 *      }
 *      
 * @apiError NotFound Account not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Account not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "account",
 *                   "message": "Account not found."
 *              }
 *          ]
 *      }
 *      
 * @apiError PermissionDenied Permission denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Permission denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "permission",
 *                   "message": "Permission denied."
 *              }
 *          ]
 *      }
 *      
 * @apiError AccessDenied Access denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Access denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access denied." 
 *              }
 *          ]
 *      }
 * @apiError ExpiredToken Access token expired.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 410 Access token expired
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access token expired."
 *              }
 *          ]
 *      }
 */

 /** 
 * @api {get} /accounts/:accountId/projects/:projectId/task/:taskId/comment Task comments
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId/task/:taskId/comment
 * @apiVersion 0.3.1 
 * @apiName Task Comments
 * @apiGroup Comment
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} projectId Project id.
 * @apiParam {String} taskId Task id.
 * 
 * @apiSuccess (Success 200){Object} project Project details response.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *      {
 *          "comments": [
 *               {
 *                  "_id": "5a016ad238b3f11af5fdbfa3",
 *                  "comment": "lorem impusa",
 *                  "author": {
 *                      "_id": "59c3a476302d2c327aa2702f",
 *                      "first_name": "Dominik",
 *                      "surname": "Dziuban"
 *                  }, 
 *                  "sub_comments": [
 *                      {
 *                          "_id": "5a016af438b3f11af5fdbfa4",
 *                          "comment": "lorem impusa sub",
 *                          "author": {
 *                              "_id": "59c3a476302d2c327aa2702f",
 *                              "first_name": "Dominik",
 *                              "surname": "Dziuban"
 *                          }
 *                          "created": "2017-11-07T08:09:39.936Z"
 *                      }
 *                  ],
 *                  "created": "2017-11-07T08:09:39.936Z" 
 *               }
 *      }
 *
 * @apiError AccessDenied Access denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Access denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access denied."
 *              }
 *          ]
 *      }
 * @apiError ExpiredToken Access token expired.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 410 Access token expired
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access token expired."
 *              }
 *          ]
 *      }
 */