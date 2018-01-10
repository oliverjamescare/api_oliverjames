// ------------------------------------------------------------------------------------------
// General apiDoc documentation blocks and old history blocks.
// ------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------
// Current Success.
// ------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------
// Current Errors.
// ------------------------------------------------------------------------------------------
/**
 * @apiDefine CreateUserError
 * @apiVersion 0.0.0
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNameTooShort Minimum of 5 characters required.
 *
 * @apiErrorExample  Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "UserNameTooShort"
 *     } 
 */


// ------------------------------------------------------------------------------------------
// History.
// ------------------------------------------------------------------------------------------
 
/** 
 * @api {get} /accounts/:accountId/projects/:projectId Project Gantt
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId
 * @apiVersion 0.3.0
 * @apiName Project Gantt 
 * @apiGroup Gantt
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} projectId Project id.
 * 
 * @apiSuccess (Success 200){Object} gantt Project gantt response.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *      {
 *          "data": [
 *              {
 *                  "_id": "59e5aa134f0558095297e2e0",
 *                  "start_date": "2017-10-16 02:00:0",
 *                  "end_date": "2017-10-17 02:00:00",
 *                  "project": "59df4c714fbe2a1ca7665fa2",
 *                  "parent": "0",
 *                  "duration": 24,
 *                  "action_window_duration": 16,
 *                  "action_window_progress": 0, 
 *                  "progress": 0.6,
 *                  "type_task": "action_window",
 *                  "text": "New task",
 *                  "description": "example description",
 *                  "activity_type": "developent", 
 *                  "open": true
 *              }
 *          ],
 *          "collections": {
 *              "links": [
 *                  {
 *                      "_id": "59e616503d693b3f6ccc7d99",
 *                      "type": 0,
 *                      "target": "59e616503d693b3f6ccc7d98",
 *                      "source": "59e5cdabb789e31d6d66c860", 
 *                  }
 *              ] 
 *          }
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
 * @api {post} /user/accounts Add account
 * @apiSampleRequest http://35.167.196.64:8100/api/user/accounts   
 * @apiVersion 0.1.0
 * @apiName Add account 
 * @apiGroup Account
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} name Account name.
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
 *                   "field": "name",
 *                   "message": "Name field is required."
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
