
/**
 * @api {post} /login Login
 * @apiSampleRequest /login
 * @apiVersion 0.0.1
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiParam {String} [email] Email address. Required with password.
 * @apiParam {String} [password] Admin password. Required with email.
 * @apiParam {String} [refresh_token] Refresh token required to auto-login.
 *
 * @apiSuccess (Success 200){String} token Access token.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "user": {
 *              "_id": "5a5de32f5bb5952104a5d156",
 *              "email": "test.test@test.com",
 *              "access_token": {
 *                  "refresh_token": "IFx5O1usx1c5QTp0kh9PPGhwT307G6VymmXG6ovKqVmbNbI29CrZ28bEQ2kegZMdzJCDYqTy1cAws0xcEpEfmtClV4tnSSxlXEQ7rnsQEsNHfBTysc7x2H4GML0e7GyF",
 *                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Mjg0NDgwMDYsImRhdGEiOnsiX2lkIjoiNWE3NDdkM2ZiYTMzNTc0N2EwNDczZDg4IiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNTI3ODQzMjA2fQ.wTyqgnFQGo437q57LNXQZxXgLirlDNL4rbaeTv44z9c"
 *              },
 *              "first_name": "Test",
 *              "middle_name": "Test",
 *              "surname": "Test"
 *          }
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
 */
