/**
 * @api {post} /accounts/:accountId/clients Add client
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/clients   
 * @apiVersion 0.3.1  
 * @apiName Add client
 * @apiGroup Client
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} name Client name.
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
 * @api {delete} /accounts/:accountId/clients/:clientId Delete client
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/clients/:clientId  
 * @apiVersion 0.3.1   
 * @apiName Delete client 
 * @apiGroup Client
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} clientId Account id.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status" : true
 *     }
 *  
 *      
 * @apiError NotFound Client not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Client not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "client",
 *                   "message": "Client not found."
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
 * @api {get} /accounts/:accountId/clients Get account clients
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/clients   
 * @apiVersion 0.3.1  
 * @apiName Get account clients 
 * @apiGroup Client
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id. 
 * @apiParam {String} filter acvite(default), disabled, both
 * @apiParam {String} sort az(default), za
 *  
 * @apiSuccess (Success 200){Boolean} results Clients assigned to account.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "clients": [
            {
                "_id": "59c11de18b893a0830dcd51e",
                "name": "New client",
                "project": "0"
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
 * @api {put} /accounts/:accountId/clients/:clientId Update client
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/clients/:clientId   
 * @apiVersion 0.3.1  
 * @apiName Update client 
 * @apiGroup Client
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} clientId Client id.
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
 * @apiError NotFound Client not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Client not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "client",
 *                   "message": "Client not found."
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

