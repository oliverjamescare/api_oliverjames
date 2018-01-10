/**
 * @api {post} /accounts/:accountId/activities Add activity
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/activities   
 * @apiVersion 0.3.1
 * @apiName Add activity
 * @apiGroup Activity
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} name Activity name.
 *
 * @apiSuccess (Success 201){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
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
 *                   "field": "name",
 *                   "message": "Name field is required."
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
 * @api {delete} /accounts/:accountId/activities/:activityId Delete activity
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/activities/:activityId 
 * @apiVersion 0.3.1  
 * @apiName Delete activity 
 * @apiGroup Activity
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} activityId Account id.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status" : true
 *     }
 *  
 *      
 * @apiError NotFound Activity not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Activity not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "activity",
 *                   "message": "Activity not found."
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
 * @api {get} /accounts/:accountId/activities Get account activities
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/activities   
 * @apiVersion 0.3.1
 * @apiName Get account activities 
 * @apiGroup Activity
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} filter acvite(default), disabled, both
 * 
 * @apiSuccess (Success 200){Boolean} results Activities assigned to account.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "activities": [
            {
                "_id": "59c11de18b893a0830dcd51e",
                "name": "Example activity",
                "active": true
            }
        ]
 *      
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
 * @api {put} /accounts/:accountId/activities/:activityId Update activity
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/activities/:activityId  
 * @apiVersion 0.3.1 
 * @apiName Update activity 
 * @apiGroup Activity
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} activityId Activity id.
 * @apiParam {Boolean} active Active status
 * 
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "status": true
 *     }
 *      
 *      
 * @apiError NotFound Activity not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Activity not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "activity",
 *                   "message": "Activity not found."
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