
/**
 * @api {put} /user/confirm-email Confirm email
 * @apiSampleRequest /user/confirm-email
 * @apiVersion 0.0.1
 * @apiName Confirm email
 * @apiGroup User
 * 
 * @apiParam {String} token Email confirm token.
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
 *                   "field": "email",
 *                   "message": "This email cannot be confirmed from this link."
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
 * @api {get} /user/uniqueness Check uniqueness
 * @apiSampleRequest /user/uniqueness
 * @apiVersion 0.0.1
 * @apiName Check uniqueness
 * @apiGroup User
 *
 * @apiParam {String} [email] Email to check is already used.
 * @apiParam {String} [phone_number] Phone number to check is already used.
 *
 * @apiSuccess (Success 200){Boolean} exists Status of existance.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "exists" : false
 *     }
 *
 * @apiError NotAcceptable Wrong parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Invalid param."
 *              }
 *          ]
 *      }
 */

/**
 * @api {get} /user/profile User profile
 * @apiSampleRequest /user/profile
 * @apiVersion 0.0.1
 * @apiName User profile
 * @apiGroup User
 *
 * @apiHeader {String} X-access-token Access token
 *
 * @apiSuccess (Success 200){Object} user User properties.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "_id": "5a6b1413599b6f3c8c7eaa8b",
            "email": "test.test@test.com",
            "phone_number": "9876543211",
            "email_verified": false,
            "address": {
                "postal_code": "Ex8 2el",
                "city": "Exmouth",
                "address_line_1": "Elwyn Rd, Exmouth EX8 2E",
                "location": {
                    "coordinates": [
                        50.7583820,
                        19.005533
                    ],
                    "type": "Point"
                },
                "address_line_2": null,
                "company": null,
                "link": "https://www.google.com/maps/search/?api=1&query=50.7583820,19.005533"
            },
            "carer": {
                "first_name": "Test",
                "surname": "Test",
                "middle_name": "Test",
                "profile_image": "http://localhost:8000/uploads/users/1519038810982test.jpg",
                "max_job_distance": 15,
                "gender": "Male",
                "eligible_roles": [
                    "Carer",
                    "Senior Carer"
                ],
                "payment_system": {
                    "bank_number": "**** **** **** 3737"
                }
            },
            "care_home": {
                "name": "Test Test",
                "care_service_name": "Test care home",
                "type_of_home": "Nursing",
                "general_guidance": {
                    "superior_contact": "asd",
                    "report_contact": "asd",
                    "emergency_guidance": "sd",
                    "notes_for_carers": "s",
                    "parking": "test",
                    "floor_plan": "http://localhost:8000/uploads/users/151808246323012. test.docx"
                },
                "gender_preference": "No preference",
                "blocked_carers": [
                    {
                        "_id": "5a6b1413599b6f3c8c7eaa8b",
                        "carer": {
                            "first_name": "Test",
                            "surname": "Test"
                    }
                ],
                "payment_system": {
                    "card_number": "**** **** **** 3737"
                }
            }
        }
 *
 * @apiError AccessDenied Access Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Access Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access Denied"
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
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */

/**
 * @api {put} /user/password Change password
 * @apiSampleRequest /user/password
 * @apiVersion 0.0.1
 * @apiName Change password
 * @apiGroup User
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} old_password Old password.
 * @apiParam {String} new_password New password.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "status": true
 *     }
 *
 * @apiError WrongParameters Wrong parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong Parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "password",
 *                   "message": "Wrong password"
 *              }
 *          ]
 *      }
 *
 * @apiError AccessDenied Access Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Access Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access Denied"
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
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */

/**
 * @api {put} /user/profile-image Change profile image
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Change profile image
 * @apiGroup User
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {File} profile_image Profile image file. Avaliable mime types: image/png, image/jpeg. Max file size 5MB.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "status": true
 *     }
 *
 * @apiError AccessDenied Access Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Access Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access Denied"
 *              }
 *          ]
 *      }
 *
 * @apiError PermissionDenied Permission Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Permission Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Permission Denied"
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
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */

/**
 * @api {put} /user/email Change email
 * @apiSampleRequest /user/email
 * @apiVersion 0.0.1
 * @apiName Change email
 * @apiGroup User
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} email New email.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "status": true
 *     }
 *
 *
 * @apiError WrongParameters Wrong parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong Parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "email",
 *                   "message": "This email has already been taken"
 *              }
 *          ]
 *      }
 *
 * @apiError AccessDenied Access Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Access Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access Denied"
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
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */

/**
 * @api {post} /user/email/verification Resend email verification
 * @apiSampleRequest /user/email/verification
 * @apiVersion 0.0.1
 * @apiName Resend email verification
 * @apiGroup User
 *
 * @apiHeader {String} X-access-token Access token
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "status": true
 *     }
 *
 *
 * @apiError Conflict Email is already confirmed.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 Email is already confirmed
 *     {
 *          "errors": [
 *              {
 *                   "field": "email",
 *                   "message": "Email is already confirmed"
 *              }
 *          ]
 *      }
 *
 * @apiError AccessDenied Access Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Access Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access Denied"
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
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */

/**
 * @api {put} /user/carer Change carer profile
 * @apiSampleRequest /user/carer
 * @apiVersion 0.0.1
 * @apiName Change carer profile
 * @apiGroup User
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {Number} [max_job_distance] Max job distance. Takes part in available jobs algorithm.
 * @apiParam {String} [gender] Gender - Available options: Male, Female.
 * @apiParam {String} [city] City. Required in changing address process.
 * @apiParam {String} [postal_code] Postal code. Required in changing address process.
 * @apiParam {String} [address_line_1] Address first line. Required in changing address process.
 * @apiParam {String} [address_line_2] Address second line.
 * @apiParam {String} [company] Company address name.
 * @apiParam {String} [phone_number] Phone number.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "status": true
 *     }
 *
 * @apiError WrongParameters Wrong parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong Parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "phone_number",
 *                   "message": "This phone number has already been taken"
 *              }
 *          ]
 *      }
 *
 * @apiError AccessDenied Access Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Access Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access Denied"
 *              }
 *          ]
 *      }

 * @apiError PermissionDenied Permission Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Permission Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Permission Denied"
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
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */

/**
 * @api {put} /user/care-home Change care home profile
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Change care home profile
 * @apiGroup User
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} [name] Care home owner name.
 * @apiParam {String} [care_service_name] Care service name.
 * @apiParam {String} [type_of_home] Type of home.
 * @apiParam {String} [superior_contact] General guidance -  If our carer needs to call your service, who should they speak to.
 * @apiParam {String} [report_contact] General guidance -  Where should carer report to upon arrival.
 * @apiParam {String} [emergency_guidance] General guidance -  Carer guidance in event of fire alarm sounding.
 * @apiParam {String} [notes_for_carers] General guidance -  Notes on High risk / complexity residents / any other requests for our carers.
 * @apiParam {String} [parking] General guidance -  Where to park your car.
 * @apiParam {File} [floor_plan] General guidance -  Upload a floorplan of your care home. Max 10MB. Allowed mime types: application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, image/png, image/jpg, image/jpeg
 * @apiParam {String} [city] City. Required in changing address process.
 * @apiParam {String} [postal_code] Postal code. Required in changing address process.
 * @apiParam {String} [address_line_1] Address first line. Required in changing address process.
 * @apiParam {String} [address_line_2] Address second line.
 * @apiParam {String} [company] Company address name.
 * @apiParam {String} [phone_number] Phone number.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "status": true
 *     }
 *
 * @apiError WrongParameters Wrong parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong Parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "phone_number",
 *                   "message": "This phone number has already been taken"
 *              }
 *          ]
 *      }
 *
 * @apiError AccessDenied Access Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Access Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access Denied"
 *              }
 *          ]
 *      }

 * @apiError PermissionDenied Permission Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Permission Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Permission Denied"
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
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */

/**
 * @api {put} /user/notifications/token Update notifications token
 * @apiSampleRequest /user/notifications/token
 * @apiVersion 0.0.1
 * @apiName Update notifications token
 * @apiGroup User
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} [device_id] Device id. Null or not present value clears field.
 * @apiParam {String} [device_token] Device token - Firebase token required for push notifications. Null or not present value clears field.
 *
 * @apiSuccess (Success 200){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "status": true
 *     }
 *
 * @apiError AccessDenied Access Denied.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Access Denied
 *     {
 *          "errors": [
 *              {
 *                   "field": "user",
 *                   "message": "Access Denied"
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
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */
