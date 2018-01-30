/** 
 * @api {get} /carers/nearby Checks carers near point
 * @apiSampleRequest /carers/nearby
 * @apiVersion 0.0.1
 * @apiName Checks carers near point
 * @apiGroup Carer
 *
 * @apiParam {String} postal_code Postal code.
 * @apiParam {String} [company] Company name.
 * @apiParam {String} address_line_1 First line of address string.
 * @apiParam {String} [address_line_2] Second line of address string.
 * @apiParam {String} city City.

 * @apiSuccess (Success 200){Boolean} exists Existance status.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "exists" : true,
 *     }
 *
 */
