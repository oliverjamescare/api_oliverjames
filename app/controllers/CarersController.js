/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const User = require("./../models/User").schema;
const locationHandler = require('../services/locationHandler');

module.exports = {
    checkCarersNearArea: function (req, res)
    {
        locationHandler.getCustomLocation(req)
            .then((address) => {
                if (!address.location || !address.location.coordinates.length)
                    return res.json({ exists: false });

                //finding carers near area
                User.aggregate([
                    {
                        $geoNear: {
                            near: address.location.coordinates,
                            distanceField: "distance",
                            distanceMultiplier: 3963.2,
                            limit: 1,
                            spherical: true,
                            query: {
                                carer: { $exists: true }
                            }
                        }
                    },
                    {
                        $project: {
                            "carer.max_job_distance": 1,
                            "distance": 1,
                            "distanceArea": { "$subtract": [ "$carer.max_job_distance", "$distance" ] },
                        }
                    },
                    {
                        $match: { "distanceArea": { $gte: 0 } }
                    }
                ]).then((results) => res.json({ exists: Boolean(results.length) }));
            });
    }
}

