/** 
 * @api {get} /accounts/:accountId/projects/:projectId/details Project details
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/projects/details/:projectId
 * @apiVersion 0.3.1 
 * @apiName Project Details 
 * @apiGroup Project
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} projectId Project id.
 * 
 * @apiSuccess (Success 200){Object} project Project details response.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *      {
 *          "project": {
 *              "_id": "59d5713cc6ae357b0de9d87b",
 *              "name": "project",
 *              "client": 
 *                  {
 *                      "_id": "59d22e456007c20f6e6e7a2b",
 *                      "name": "Cliencik"
 *                  },
 *              "members": [
 *                 {
 *                      "_id": "59c3a476302d2c327aa2702f", 
 *                      "first_name": "Dominik", 
 *                      "surname": "Dziuban"
 *                  }
 *              ],
 *              "progress": "0",
 *              "status": "In progress",
 *              "notes": "Test notes"
 *          },
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
 *              }
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
 * @api {post} /accounts/:accountId/projects/:clientId Add project
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/projects/:clientId   
 * @apiVersion 0.3.1 
 * @apiName Add project 
 * @apiGroup Project
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} name Project name.
 * @apiParam {String} clientId Client id
 * @apiParam {Object[]} members Array of Members -> [{"_id": "59c3a476302d2c327aa2702f"}] 
 *
 * @apiSuccess (Success 201){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "status" : true,
 *       "projectId": "59d7847c4b5e3b434c373b3b"      
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
 * @api {delete} /accounts/:accountId/projects/:projectId Delete project
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId   
 * @apiVersion 0.3.1 
 * @apiName Delete project 
 * @apiGroup Project
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} projectId Account id.
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
 *                   "field": "project",
 *                   "message": "Project not found."
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
 * @api {get} /accounts/:accountId/projects/:clientId/list  Get client projects
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/projects/:clientId/list   
 * @apiVersion 0.3.1 
 * @apiName Get client projects 
 * @apiGroup Project
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} clientId Client id.
 * @apiParam {String} sort az(default), za
 * 
 * @apiSuccess (Success 200){Boolean} results Project assigned to client.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "projects": [
 *              {
 *                  "_id": "59d5713cc6ae357b0de9d87b",
 *                  "name": "project"
 *              },
 *              {
 *                  "_id": "59d571e48546f87c049dc07d",
 *                  "name": "project3"
 *              }
 *          ]
 *      }
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
 * @api {put} /accounts/:accountId/projects/:projectId Update project
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId   
 * @apiVersion 0.3.1 
 * @apiName Update project 
 * @apiGroup Project
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} projectId Project id.
 * @apiParam {String} name Name project. 
 * @apiParam {String} notes Notes project.
 * @apiParam {String} status Status project.
 * @apiParam {String} progress Progress project.
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
 *                   "field": "project",
 *                   "message": "Project not found."
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
 * @api {post} /accounts/:accountId/projects/:projectId/pin Pin project
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId
 * @apiVersion 0.3.1 
 * @apiName Pin project 
 * @apiGroup Project
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} projectId Project id.
 *
 * @apiSuccess (Success 201){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "status" : true
 *     }
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
 * @api {get} /accounts/:accountId/projects Get pinned projects
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/projects/ 
 * @apiVersion 0.3.1 
 * @apiName Get pinned projects 
 * @apiGroup Project
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 *
 * 
 * @apiSuccess (Success 200){Boolean} results Project pinned to user.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *           "pinned_projects": [
 *              {
 *                  "_id": "59d5713cc6ae357b0de9d872",
 *                  "name": "project1",
 *                  "client":  { 
 *                      "_id": "59d22e456007c20f6e6e7a2b",
 *                      "name": "Cliencik"
 *                   }
 *              },
 *              {
 *                  "_id": "59d5713cc6ae357b0de9d87b",
 *                  "name": "project2",
 *                  "client":  {
 *                      "_id": "59d22e456007c20f6e6e7a22",
 *                      "name": "Cliencik2"
 *                   }
 *              }
 *          ]
 *      }
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