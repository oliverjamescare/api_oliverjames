
/**
 * @api {post} /login Login
 * @apiSampleRequest /login
 * @apiVersion 0.0.1
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiParam {String} email Email address. Required with password.
 * @apiParam {String} password User password. Required with email.
 *
 * @apiSuccess (Success 200){String} token Access token.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
                "_id": "5a5de32f5bb5952104a5d156",
                "email": "test.test@test.com",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTY3ODgyMTQsImRhdGEiOnsiX2lkIjoiNWE1ZGUzMmY1YmI1OTUyMTA0YTVkMTU2IiwiZW1haWwiOiJhZHJpYW4ubWFzbGVyekByZWFkeTRzLnBsIn0sImlhdCI6MTUxNjE4MzQxNH0.ny_lRr-1SO8LXyJWtGxS1DqZJaV-nbXoSYwbf5rCA2o"
                "first_name": "Test",
                "middle_name": "Test",
                "surname": "Test"
            }
 *     }
 *
 * @apiError AuthorizationFailed Authorization failed.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Authorization failed
 *     {
 *          "errors": [
 *              {
 *                   "field": "auth",
 *                   "message": "Authorization failed"
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
