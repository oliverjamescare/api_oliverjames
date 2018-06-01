
/**
 * @api {get} /home General overview
 * @apiSampleRequest /home
 * @apiVersion 0.0.1
 * @apiName General overview
 * @apiGroup Admin
 *
 * @apiHeader {String} X-access-token Access token

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "failed_payments": 1,
 *          "challenged_jobs": 0,
 *          "pending_reviews": 1,
 *          "booked_in_24_jobs": 2,
 *          "waiting_list": 0,
 *          "in_progress_carers": 2
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
 * @api {get} /profile Admin profile
 * @apiSampleRequest /profile
 * @apiVersion 0.0.1
 * @apiName Admin profile
 * @apiGroup Admin
 *
 * @apiHeader {String} X-access-token Access token
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "_id": "5aafa3323a243902b0de7e15",
 *          "email": "test.test@test.com",
 *          "first_name": "Admin",
 *          "surname": "Admin",
 *          "role": "ADMIN"
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
 * @api {put} /profile Update profile
 * @apiSampleRequest /profile
 * @apiVersion 0.0.1
 * @apiName Update profile
 * @apiGroup Admin
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} email Valid email address.
 * @apiParam {String} first_name Admin first name.
 * @apiParam {String} surname Admin surname.

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
 * @apiError WrongParameters Wrong Parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong Parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "email",
 *                   "message": "Email is required."
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
 * @api {put} /password Change password
 * @apiSampleRequest /profile
 * @apiVersion 0.0.1
 * @apiName Change password
 * @apiGroup Admin
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
 * @apiError WrongParameters Wrong Parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong Parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "password",
 *                   "message": "Wrong old password."
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
 * @api {get} /admins Admins list
 * @apiSampleRequest /admins
 * @apiVersion 0.0.1
 * @apiName Admins list
 * @apiGroup Admin
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {Number} [page] Page number.
 * @apiParam {Number} [results] Results per page. Default 10.

 * @apiSuccess (Success 200){Object} results Pagination results.
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "results": [
 *              {
 *                  "_id": "5a747d3fba335747a0473d88",
 *                  "email": "admin@admin.com",
 *                  "first_name": "Admin",
 *                  "surname": "Admin",
 *                  "created": 1517583676679
 *              }
 *          ],
 *          "pages": 1,
 *          "total": 3
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
 * @api {post} /admins Add admin
 * @apiSampleRequest /admins
 * @apiVersion 0.0.1
 * @apiName Add admin
 * @apiGroup Admin
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} email Valid email address.
 * @apiParam {String} password Min 8 characters, RegExp = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,}$/.
 * @apiParam {String} first_name Admin first name.
 * @apiParam {String} surname Admin surname.

 * @apiSuccess (Success 201){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
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
 * @apiError WrongParameters Wrong Parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong Parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "email",
 *                   "message": "Email is required."
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
 * @api {put} /admins/:id Update admin
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Update admin
 * @apiGroup Admin
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Admin id.
 * @apiParam {String} [email] Valid email address.
 * @apiParam {String} [first_name] Admin first name.
 * @apiParam {String} [surname] Admin surname.
 * @apiParam {String} [role] Admin role. Available roles: ADMIN, ADMIN_MANAGER, ADMIN_DIRECTOR(available only when you are director)

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
 * @apiError NotFound Not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "admin",
 *                   "message": "Admin not found."
 *              }
 *          ]
 *      }
 *
 * @apiError WrongParameters Wrong Parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong Parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "email",
 *                   "message": "Email is required."
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
 *                   "message": "Access token expired"
 *              }
 *          ]
 *      }
 */

/**
 * @api {put} /admins/:id/password Update admin password
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Update admin password
 * @apiGroup Admin
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Admin id.
 * @apiParam {String} password Min 8 characters, RegExp = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,}$/.

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

 * @apiError NotFound Not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "admin",
 *                   "message": "Admin not found."
 *              }
 *          ]
 *      }
 *
 * @apiError WrongParameters Wrong Parameters.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Wrong Parameters
 *     {
 *          "errors": [
 *              {
 *                   "field": "password",
 *                   "message": "Password must have at least 8 characters."
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
 * @api {delete} /admins/:id Delete admin
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Delete admin
 * @apiGroup Admin
 *
 * @apiHeader {String} X-access-token Access token
 * @apiParam {String} id Admin id.

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

 * @apiError NotFound Not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not found
 *     {
 *          "errors": [
 *              {
 *                   "field": "admin",
 *                   "message": "Admin not found."
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
