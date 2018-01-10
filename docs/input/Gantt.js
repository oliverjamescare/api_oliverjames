/** 
 * @api {get} /accounts/:accountId/projects/:projectId Project Gantt
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId
 * @apiVersion 0.3.1
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
 *                      "id": "59e616503d693b3f6ccc7d99",
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
 * @api {post} /accounts/:accountId/projects/:projectId/task Add task
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId/task  
 * @apiVersion 0.3.1
 * @apiName Add task (action, actionWindow, Window)
 * @apiGroup Gantt
 * 
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} projectId Project id.
 * @apiParam {String} type_task Task type. Available options: action(default), action_window, window. 
 * @apiParam {String} text Task name.
 * @apiParam {Number} [index] Gantt index.
 * @apiParam {Date} start_date Date of start task. Timestamp in miliseconds.
 * @apiParam {Number} duration Task duration which represents number of quarters eg 3 = 45 min. Default 0. In case of action window this represents duration between start date and planned end date
 * @apiParam {Number} [action_window_duration] Task duration which represents number of quarters eg 3 = 45 min between planned end date and final end date. Default 0.
 * @apiParam {String} [parent] Parent window task id.  Default null.
 * @apiParam {String} description Task description.
 * @apiParam {String} [assigned_to] User id to which this task is assigned to.
 * @apiParam {String} [activity_type] Activity type to which this task is assigned to.
 *   
 *
 * @apiSuccess (Success 201){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "status" : true,   
 *       "taskId": "59e896bec181ba408ab46679"
 *     }
 *      
 * @apiError NotAcceptable Wrong parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "text",
 *                   "message": "Text field is required."
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
 * @api {delete} /accounts/:accountId/projects/:projectId/task/:taskId Delete task
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId/task/:taskId    
 * @apiVersion 0.3.1
 * @apiName Delete task 
 * @apiGroup Gantt
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} projectId Account id.
 * @apiParam {String} taskId
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status" : true
 *     }
 *  
 *      
 * @apiError NotFound Project not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Project not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "task",
 *                   "message": "Task not found."
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
 * @api {put} /accounts/:accountId/projects/:projectId/task/:taskId Update task
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId/task/:taskId  
 * @apiVersion 0.3.1 
 * @apiName Update task 
 * @apiGroup Gantt
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} projectId Project id.
 * @apiParam {String} type_task Task type. Available options: action(default), action_window, window. 
 * @apiParam {String} text Text task.
 * @apiParam {Date} start_date Date of start task.
 * @apiParam {Number} progress Progres task.
 * @apiParam {Number} duration Duration.
 * @apiParam {String} description Description task.
 * @apiParam {String} assigned_to User id.
 * @apiParam {String} activity_type Activity type.
 * @apiParam {Date} end_date Date of end task.
 * @apiParam {Number} action_window_duration expected duration for type action_window 
 * 
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "status": true  
 *     }
 *       
 *      
 * @apiError NotFound Project not found. 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Project not found
 *     { 
 *          "errors": [
 *              {
 *                   "field": "task",
 *                   "message": "Task not found."
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
 * @api {post} /accounts/:accountId/projects/:projectId/link Add link
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId/link
 * @apiVersion 0.3.1
 * @apiName Add link
 * @apiGroup Gantt
 * 
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} projectId Project id.
 * @apiParam {String} source Source task id.
 * @apiParam {String} target Target task id.
 * @apiParam {Number} type Type of link. Available options: 0 (finish to start (default)), 1 (start to start), 2 (finish to finish), 3 (start to finish). 
 *   
 *
 * @apiSuccess (Success 201){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "status" : true, 
 *       "linkId": "59e896bec181ba408ab46679"   
 *     }
 *      
 * @apiError NotAcceptable Wrong parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "source",
 *                   "message": "Source field is required."
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
 * @api {delete} /accounts/:accountId/projects/:projectId/link/:linkId Delete link
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId/link/:linkId    
 * @apiVersion 0.3.1
 * @apiName Delete link 
 * @apiGroup Gantt
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} projectId Account id.
 * @apiParam {String} linkId
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status" : true
 *     }
 *  
 *      
 * @apiError NotFound Link not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Link not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "link",
 *                   "message": "link not found."
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
 * @api {put} /accounts/:accountId/projects/:projectId/link/:linkId Update link
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId/link/:linkId   
 * @apiVersion 0.3.1
 * @apiName Update link
 * @apiGroup Gantt
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} projectId Project id.
 * @apiParam {String} source Source task id.
 * @apiParam {String} target Target task id.
 * @apiParam {Number} type Type of link. Available options: 0 (finish to start (default)), 1 (start to start), 2 (finish to finish), 3 (start to finish). 
 * 
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "status": true  
 *     }
 *       
 *      
 * @apiError NotFound Link not found. 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Link not found
 *     { 
 *          "errors": [
 *              {
 *                   "field": "link",
 *                   "message": "Link not found."
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