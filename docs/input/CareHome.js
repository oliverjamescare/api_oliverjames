
/**
 * @api {get} /care-home/calendar Care home jobs calendar
 * @apiSampleRequest /care-home/calendar
 * @apiVersion 0.0.1
 * @apiName Care home jobs calendar
 * @apiGroup Care Home
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
    {
        "calendar": [
            {
                "day": "2018-02-12",
                "jobs": [
                    {
                        "_id": "5a814b8deb5cee1dc0720128",
                        "start_date": 1518422931942,
                        "end_date": 1518425101942,
                        "role": "Senior Carer",
                        "author": {
                            "_id": "5a71b2834f1f26305c6abf2a",
                            "care_home": {
                                "care_service_name": "Test care home",
                                "type_of_home": "Nursing",
                                "name": "Test Test"
                            },
                            "email": "test.test@test.com",
                            "phone_number": "123456788777",
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
                                "company": null
                            }
                        }
                    }
                ]
            },
            {
                "day": "2018-02-13",
                "jobs": []
            }
        ]
    }
 *
 */
