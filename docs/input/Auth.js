/** 
 * @api {post} /register Register
 * @apiSampleRequest http://35.167.196.64:8100/api/register    
 * @apiVersion 0.3.1
 * @apiName Register 
 * @apiGroup Auth
 *
 * @apiParam {String} email Valid email address.
 * @apiParam {String} password Min 8 characters, RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&\^\(\)])[A-Za-z\d$@$!%*#?&\^\(\)]{8,}$/.
 * @apiParam {String} country Country name,  max length: 50.
 * @apiParam {String} job_title Job title, max length: 50.
 * @apiParam {String} first_name First name. Only alpha characters, max length: 50.
 * @apiParam {String} surname Surname. Only alpha characters, max length: 50.
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
 *                   "field": "email",
 *                   "message": "The email has already been taken."
 *              }
 *          ]
 *      }
 */

/**
 * @api {post} /login Login
 * @apiSampleRequest http://35.167.196.64:8100/api/login    
 * @apiVersion 0.3.1
 * @apiName Login 
 * @apiGroup Auth
 *
 * @apiParam {String} email Email address.
 * @apiParam {String} password User password.
 *
 * @apiSuccess (Success 200){String} token Access token.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDQ3ODExNzksImRhdGEiOnsiX2lkIjoiNTlhN2QwOWJjOTNiYTYwNmYwMDI5NzQ0IiwiYWNjZXNzX3Rva2VuIjoiIiwiZW1haWwiOiJhZHJpYW4ubWFzbGVyekByZWFkeTRzLnBsbCIsInBhc3N3b3JkIjoiJDJhJDEwJDZqOGFkZU94c213azVYVDdBZm01ck9VQjF3dFpnd2hUYnVac1h3SVpMdFdjNGJ4M0x0RW5tIiwiY291bnRyeSI6IlBvbGFuZCIsImpvYl90aXRsZSI6IlByb2dyYW1tZXIiLCJmaXJzdF9uYW1lIjoiQWRyaWFuIiwic3VybmFtZSI6Ik1hxZtsZXJ6IiwiX192IjowLCJ1cGRhdGVkIjoiMjAxNy0wOC0zMVQwOTowMjowMy4zMzBaIiwiY3JlYXRlZCI6IjIwMTctMDgtMzFUMDk6MDI6MDMuMzMwWiIsInBhc3N3b3JkX3Jlc2V0cyI6W119LCJpYXQiOjE1MDQxNzYzNzl9.30rt445vUkUrZfnkbIQHhfENgrdXlrdZw2RcYU0mgII",
 *       "admin" : false  
 *     }
 *
 * @apiError WrongPassword Wrong password.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong password
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Wrong password"
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
 * @apiError BlockedAccount Blocked account.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Blocked account
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Blocked account"
 *              }
 *          ]
 *      }
 */

/**
 * @api {post} /password/remind Forgot password
 * @apiSampleRequest http://35.167.196.64:8100/api/password/remind    
 * @apiVersion 0.3.1
 * @apiName Forgot password 
 * @apiGroup Auth
 *
 * @apiParam {String} email Email address.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status" : true
 *     }
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
 */


/**
 * @api {put} /password/remind/change Forgot password change
 * @apiSampleRequest http://35.167.196.64:8100/api/password/remind/change    
 * @apiVersion 0.3.1
 * @apiName Forgot password change 
 * @apiGroup Auth
 *
 * @apiParam {String} password New password.
 * @apiParam {String} token Password remind token.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status" : true
 *     }
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
 * @apiError NotAcceptable Password field is required.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Password field is required
 *     {
 *          "errors": [
 *              {
 *                   "field": "password",
 *                   "message": "Password field is required"
 *              }
 *          ]
 *      }
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
