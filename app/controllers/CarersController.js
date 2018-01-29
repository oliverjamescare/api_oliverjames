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
            .then((address) =>
            {
                let exists = Boolean(address.location.coordinates.length);
                if (!exists)
                    return res.json({ exists: false });

                console.log(address.location);
                User.aggregate([
                    {
                        $project: { a: 1, b: 1 }
                    }
                ]);

            });

        ;
    }
}

