/**
 * @api {post} /user/accounts Add account
 * @apiSampleRequest http://35.167.196.64:8100/api/user/accounts   
 * @apiVersion 0.3.1
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
 *       "_id" : "59ad2b468069a619f49345b7"
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

/**
 * @api {delete} /user/accounts/:id Delete account
 * @apiSampleRequest http://35.167.196.64:8100/api/user/accounts/:id  
 * @apiVersion 0.3.1 
 * @apiName Delete account 
 * @apiGroup Account
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} id Account id.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
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
 * @apiError PermissionDenied You have no permission to remove this account.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 You have no permission to remove this account
 *     {
 *          "errors": [
 *              {
 *                   "field": "account",
 *                   "message": "You have no permission to remove this account."
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
 * @api {post} /accounts/:accountId/users Add user
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/users  
 * @apiVersion 0.3.1 
 * @apiName Add user 
 * @apiGroup Account
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} email Email address.
 * @apiParam {String} message Message to user. Max 200 characters.
 *
 * @apiSuccess (Success 201){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "status" : true,
 *       "message" : "User added"
 *     }
 *      
 * @apiError NotAcceptable Wrong parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "email",
 *                   "message": "Email field is required."
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
 * @api {delete} /accounts/:accountId/users/:userId Delete user
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/users/:userId  
 * @apiVersion 0.3.1 
 * @apiName Delete user 
 * @apiGroup Account
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} userId User id.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status" : true
 *     }
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
 * @api {get} /accounts/:accountId/users Get account users
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/users   
 * @apiVersion 0.3.1
 * @apiName Get account users 
 * @apiGroup Account
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {Number} page Page number
 * 
 * @apiSuccess (Success 200){Boolean} results Users assigned to account.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "results": [
            {
                "_id": "59c0519032bcff1a68ad2fe9",
                "first_name": "Test",
                "surname": "Test",
                "login_time": "2017-09-18T23:05:14.229Z",
                "permissions": {
                    "admin": true,
                    "project_viewer": "view",
                    "data_segmenter": false,
                    "resource_manager": false,
                    "my_work": false
                },
                "department": {
                    "_id": "59c11de18b893a0830dcd51e",
                    "name": "Test department"
                }
            },
            {
                "_id": "59c0519a32bcff1a68ad2feb",
                "first_name": "Test",
                "surname": "Test",
                "login_time": "2017-09-18T23:05:14.229Z",
                "permissions": {
                    "admin": false,
                    "project_viewer": "none",
                    "data_segmenter": false,
                    "resource_manager": false,
                    "my_work": false
                },
                "department": null
            }
        ],
        "pages": 1,
        "total": 2
 *     }
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
 * @api {put} /accounts/:accountId/users/:userId Update user
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/users/:userId
 * @apiVersion 0.3.1   
 * @apiName Update user 
 * @apiGroup Account
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} userId User id.
 * @apiParam {String} department Department id.
 * @apiParam {Object} permissions {"admin": false, "project_viewer": "none", "data_segmenter": false, "resource_manager": false, "my_work": false} project_viewer options: full, view, none.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status" : true
 *     }
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
 * @api {get} /accounts/:accountId Account settings
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId  
 * @apiVersion 0.3.1
 * @apiName Account settings
 * @apiGroup Account
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * 
 * @apiSuccess (Success 200){Boolean} account Account details.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
        "_id": "59c1179faa1e3a1cec6edb3a",
        "timezone": "UTC+01:00",
        "name": "New account",
        "standard_working_hours": {
            "monday": {
                "is_working": false,
                "start_time": 30,
                "end_time": 180
            },
            "tuesday": {
                "is_working": false,
                "start_time": null,
                "end_time": null
            },
            "wednesday": {
                "is_working": false,
                "start_time": null,
                "end_time": null
            },
            "thursday": {
                "is_working": false,
                "start_time": null,
                "end_time": null
            },
            "friday": {
                "is_working": false,
                "start_time": null,
                "end_time": null
            },
            "saturday": {
                "is_working": false,
                "start_time": null,
                "end_time": null
            },
            "sunday": {
                "is_working": false,
                "start_time": null,
                "end_time": null
            }
        }
    }
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
 * @api {put} /accounts/:accountId Update account
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId  
 * @apiVersion 0.3.1
 * @apiName Update account
 * @apiGroup Account
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} timezone Timezone string.
 * @apiParam {String} name Account name.
 * @apiParam {Object} standard_working_hours {"monday": {"is_working": false,"start_time": 30,"end_time": 180},"tuesday": {"is_working": false,"start_time": null,"end_time": null},"wednesday": {"is_working": false,"start_time": null,"end_time": null},"thursday": {"is_working": false,"start_time": null,"end_time": null},"friday": {"is_working": false,"start_time": null,"end_time": null},"saturday": {"is_working": false,"start_time": null,"end_time": null},"sunday": {"is_working": false,"start_time": null,"end_time": null}}.
 * 
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "status": true
 *     }
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