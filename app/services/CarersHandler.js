//core
const async = require("async");

//custom
const JobModel = require("./../models/Job");
const User = require("./../models/User").schema;

module.exports = {
    getAvailableCarersNearby: function (coordinates)
    {
        //finding carers near area
        return User.aggregate([
            {
                $geoNear: {
                    near: coordinates,
                    distanceField: "distance",
                    distanceMultiplier: 3963.2,
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
        ])
    }
}