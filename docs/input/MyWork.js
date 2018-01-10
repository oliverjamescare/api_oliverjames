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
 * @api {post} /accounts/:accountId/mywork My work
 * @apiSampleRequest http://35.167.196.64:8100/api/accounts/:accountId/mywork
 * @apiVersion 0.3.1 
 * @apiName My work
 * @apiGroup MyWork
 *
 * @apiHeader {String} X-access-token Access token.
 * @apiParam {String} accountId Account id.
 * @apiParam {String} [skipWeekends] Skipps weekend dates. Available options: 0(default) - with weekends, 1 - without weekends
 *
 * @apiSuccess (Success 201){Boolean} status Operation status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "results": [
 *            {
 *                "date": "2017-12-13",
 *                "tasks": [
 *                    {
 *                        "_id": "5a3053cb8722e51fb8353b83",
 *                        "project": {
 *                            "_id": "5a2fe8b960c2a52c846c2795",
 *                            "name": "Mac book",
 *                            "client": {
 *                                "_id": "5a2fdd14224b240e2046bab6",
 *                                "name": "Apple"
 *                            },
 *                            "isPinned": true
 *                        },
 *                        "activity_type": {
 *                            "_id": "5a2fdc4c224b240e2046bab1",
 *                            "name": "Copywritting"
 *                        },
 *                        "description": "test",
 *                        "type_task": "action",
 *                        "color": "green",
 *                        "real_progress": 0,
 *                        "planned_end_date": null,
 *                        "end_date": 1513153800000,
 *                        "start_date": 1513148400000
 *                    }
 *                ]
 *            }
 *       ]
 *     ]
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
