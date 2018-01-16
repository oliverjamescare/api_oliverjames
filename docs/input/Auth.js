/** 
 * @api {post} /register Register
 * @apiSampleRequest /register
 * @apiVersion 0.0.1
 * @apiName Register 
 * @apiGroup Auth
 *
 * @apiParam {String} email Valid email address.
 * @apiParam {String} password Min 8 characters, RegExp = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,}$/.
 * @apiParam {String} phone_number Phone number. Only numbers and min 6 characters.
 *
 * @apiParam {String} [first_name] For carer registration - Carer first name. Only alpha characters. Max 100 characters.
 * @apiParam {String} [surname] For carer registration - Carer surname. Only alpha characters. Max 100 characters.
 * @apiParam {String} [middle_name] For carer registration - Carer middle names (optional). Only alpha characters. Max 100 characters.
 * @apiParam {String} [date_of_birth] For carer registration - e.g. 1900-04-05. Correct Date format. Carer has to be adult.
 * @apiParam {String} [eligible_roles] For carer registration - roles which carer is interested in as parsed into string array e.g. ["Carer", "Senior Carer"]. Available values: Carer, Senior Carer.
 * @apiParam {File} [cv] For carer registration - file with CV. Max 10MB. Available formats: pdf, doc, docx.
 * @apiParam {Number} [criminal_record_value] For carer registration - Q&A value: Available values: 0 - Yes, 1 - No.
 * @apiParam {String} [criminal_record_text] For carer registration - Q&A text. Fully optional. Explaination of Yes answer.
 * @apiParam {Number} [physical_issues_value] For carer registration - Q&A value: Available values: 0 - Yes, 1 - No.
 * @apiParam {Number} [engaging_in_moving_value] For carer registration - Q&A value: Available values: 0 - Yes, 1 - No.
 * @apiParam {String} [engaging_in_moving_text] For carer registration - Q&A text. Fully optional. Explaination of Yes answer.
 * @apiParam {Number} [personal_care_for_resident_value] For carer registration - Q&A value: Available values: 0 - Cream them, lower body, upper body face, dress them, 1 - Face, upper body, lower body, creams, dress them, 2 - Face, lower body, upper body, dress them, creams, 3 - I'm not sure .
 * @apiParam {Number} [you_are_late_value] For carer registration - Q&A value: Available values: 0 - I͛d accept I͛m going to be late and focus on getting there ASAP to minimise delay , 1 - I'd take 2 minutes to call the client and let them know I͛m running late, 2 - 15 minutes is too long. I'd call them and advise them to find someone else to cover the shift , 3 - I'm not sure .
 * @apiParam {Number} [find_fallen_resident_value] For carer registration - Q&A value: Available values: 0 - Help the resident get up. Maintain their dignity. Then ring the emergency bell, 1 - Ring the emergency bell. Comfort the resident but not move them. Wait for other carers, 2 - Check for injuries. If they say they are fine, help them up by myself. Make a note to tell care team when I see them.
 * @apiParam {Number} [serve_lunch_meals_value] For carer registration - Q&A value: Available values: 0 - This isn't right – can someone please stay with me this time, 1 - Where can I find the care plans – I will check each one to be safe and sure, 2 - Who are the residents with swallowing or choking risks. Should I be aware of any other issues before I serve – like diabetic meals?
 *
 * @apiParam {String} [care_service_name] For care home registration - Care home name.
 * @apiParam {String} [name] For care home registration - Care home owner name.
 * @apiParam {String} [type_of_home] For care home registration - Type of home. Available types: Residential, Nursing, Learning disabilit, Supported living
 *
 * @apiParam {String} [location_id] Location Id.
 * @apiParam {String} [postal_code] Postal code - required when location Id is not present.
 * @apiParam {String} [address_line_1] First line of address string - required when location Id is not present.
 * @apiParam {String} [address_line_2] Second line of address string - fully optional.
 * @apiParam {String} [city] City - required when location Id is not present.

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
