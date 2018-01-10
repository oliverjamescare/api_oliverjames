/** 
 * @api {get} /user/profile Profile
 * @apiSampleRequest http://35.167.196.64:8100/api/user/profile    
 * @apiVersion 0.3.1 
 * @apiName Profile 
 * @apiGroup User
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiSuccess (Success 200){Object} user User profile response.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *      "_id": "59a72a83a2050214841f5f77",
 *      "email": "test@test.com",
 *      "country": "Poland",
 *      "job_title": "Programmer",
 *      "first_name": "Test",
 *      "surname": "Test",
 *      "owned_accounts": [
 *          {
 *              "_id": "59ac8b6fcd83e006583773da",
 *              "name": "Test account 3",
 *              "members_amount": 0
 *          }
 *      ],
 *      "membered_accounts": [
 *          {
 *              "account": {
 *                  "_id": "59bf7b76ed930d2b94eb3a0b",
 *                  "name": "test"
 *              },
 *              "permissions": {
                        "admin" : true,
                        "project_viewer" : "view",
                        "data_segmenter" : false,
                        "resource_manager" : false,
                        "my_work" : false 
                }
 *          }
 *      ]
 *  }
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
 * @api {put} /user/profile Update profile
 * @apiSampleRequest http://35.167.196.64:8100/api/user/profile    
 * @apiVersion 0.3.1 
 * @apiName Update profile
 * @apiGroup User
 * 
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} email Email address.
 * @apiParam {String} job_title Job title, max length: 50.
 * @apiParam {String} first_name First name. Only alpha characters, max length: 50.
 * @apiParam {String} surname Surname. Only alpha characters, max length: 50.
 *
 * @apiSuccess (Success 200){String} status Operation status.
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
 *                   "message": "The email has already been taken."
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
 * @api {put} /user/email Restore email
 * @apiSampleRequest http://35.167.196.64:8100/api/user/email  
 * @apiVersion 0.3.1   
 * @apiName Restore email
 * @apiGroup User
 * 
 * @apiParam {String} token Email restore token.
 *
 * @apiSuccess (Success 200){String} status Operation status.
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
 *                   "message": "The email has already been taken."
 *              }
 *          ]
 *      }
 *      
 * @apiError NotFound Token not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Token not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "token",
 *                   "message": "Token not found"
 *              }
 *          ]
 *      }
 *      
 *      
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
 * @api {put} /user/confirm-email Confirm email
 * @apiSampleRequest http://35.167.196.64:8100/api/user/confirm-email  
 * @apiVersion 0.3.1   
 * @apiName Confirm email
 * @apiGroup User
 * 
 * @apiParam {String} token Email confirm token.
 *
 * @apiSuccess (Success 200){String} status Operation status.
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
 * @apiError NotFound Token not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Token not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "token",
 *                   "message": "Token not found"
 *              }
 *          ]
 *      }
 */

/**
 * @api {put} /user/password Change password
 * @apiSampleRequest http://35.167.196.64:8100/api/user/password   
 * @apiVersion 0.3.1 
 * @apiName Change password 
 * @apiGroup User
 * 
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} old_password Old password.
 * @apiParam {String} new_password New password.
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
 *                   "field": "password",
 *                   "message": "Password field is required."
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
 * @api {get} /admin/users All users
 * @apiSampleRequest http://35.167.196.64:8100/api/admin/users  
 * @apiVersion 0.3.1 
 * @apiName All users 
 * @apiGroup User
 * 
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} sort Available options: first_name(default) - ascending by first name, surname - ascending by surname, email - ascending by email, login_time - descending by login time.
 * @apiParam {Number} page Page number
 *
 * @apiSuccess (Success 200){Boolean} results Users list.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "results": [
 *          {
 *              "_id": "59ba77cae925bf384ca1d100",
 *              "email": "test.test@test.com",
 *              "country": "United States",
 *              "job_title": "Programmer",
 *              "first_name": "Test",
 *              "surname": "Test",
 *              "membered_accounts": [],
 *              "owned_accounts": [
 *                  {
 *                      "_id": "59bf7b76ed930d2b94eb3a0b",
 *                      "name": "test 2",
 *                      "members_amount": 1
 *                  }
 *              ],
 *              "login_time": "2017-09-14T15:38:19.095Z"
 *          }
 *       ],
 *       "pages": 1,
 *       "total": 2
 *     }
 *      
 * @apiError PeermissionDenied Permission denied.
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
 * @api {put} /admin/users/:userId Update user
 * @apiSampleRequest http://35.167.196.64:8100/api/admin/users/:userId  
 * @apiVersion 0.3.1 
 * @apiName Update user 
 * @apiGroup User
 * 
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} userId User id
 * @apiParam {String} email User first name
 * @apiParam {String} first_name User first name
 * @apiParam {String} surname User surname
 * @apiParam {String} job_title User job name
 * @apiParam {String} country User country
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status" : true
 *     }
 *      
 * @apiError PeermissionDenied Permission denied.
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
 * @apiError NotFound User not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "User not found"
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
