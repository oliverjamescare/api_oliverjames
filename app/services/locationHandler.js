const request = require('request');
const config = process.env;
const async = require("async");

const pcaRetreiveEndpoint = "https://services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json.ws?";
const googleEndpoint = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
const Address = require("./../models/Address").schema;
const Utils = require('./../services/utils');

module.exports = {
    getLocationById: function(req, res)
    {
        return new Promise((resolve, reject) => {

            async.waterfall([
                (callback) => {
                    Address.findOne({ pca_address_id: req.body["location_id"] }, (error, address) => (address)? resolve(address) : callback(null));
                },
                (callback) =>
                {
                    //PCA
                    const pcaParams = {
                        key: config.PCA_KEY,
                        id: req.body["location_id"]
                    };

                    const pcaUrl = pcaRetreiveEndpoint + encodeUrlParams(pcaParams);
                    request.get(pcaUrl, { json: true }, (error, response, body) => {
                        (body[0]["Error"])? resolve(false) : callback (null, body)
                    });
                },
                (result) =>
                {
                    //GOOGLE
                    const googleParams = {
                        key: config.GOOGLE_KEY,
                        query: result[0]["Label"].replace(/\n/g," ")
                    };
                    const googleUrl = googleEndpoint + encodeUrlParams(googleParams);

                    request.get(googleUrl, { json: true }, (error, response, body) => {

                        let address = new Address({
                            pca_address_id: result[0]["Id"],
                            postal_code: result[0]["PostalCode"],
                            city: result[0]["City"],
                            address_line_1: result[0]["Company"] || result[0]["Line1"],
                            address_line_2: result[0]["Company"] ? result[0]["Line1"] : result[0]["Line2"]
                        });

                        if(body["status"] == "OK" && body["results"].length)
                        {
                            address.set({
                                location: {
                                    coordinates: [
                                        body["results"][0]["geometry"]["location"]["lat"],
                                        body["results"][0]["geometry"]["location"]["lng"]
                                    ]
                                }
                            });
                        }

                        //saving new address
                        address.save()
                            .then((address) => resolve(address))
                            .catch(() => res.status(406).json(Utils.parseStringError("Invalid location", "location")));
                    });
                }
            ], () => {} );
        });
    },

    getCustomLocation(req, res)
    {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (callback) => {
                    Address.findOne(
                        { address_line_1: req.body.address_line_1, address_line_2: req.body.address_line_2, city: req.body.city, postal_code: req.body.postal_code },
                        (error, address) => (address)? resolve(address) : callback(null)
                    );
                },
                () =>
                {
                    //GOOGLE
                    const googleParams = {
                        key: config.GOOGLE_KEY,
                        query: req.body.address_line_1 + ", " + req.body.address_line_2 + ", " + req.body.city + ", " + req.body.postal_code
                    };
                    const googleUrl = googleEndpoint + encodeUrlParams(googleParams);

                    request.get(googleUrl, { json: true }, (error, response, body) => {

                        let address = new Address({
                            postal_code: req.body.postal_code,
                            city: req.body.city,
                            address_line_1: req.body.address_line_1,
                            address_line_2: req.body.address_line_2
                        });

                        if(body["status"] == "OK" && body["results"].length)
                        {
                            address.set({
                                location: {
                                    coordinates: [
                                        body["results"][0]["geometry"]["location"]["lat"],
                                        body["results"][0]["geometry"]["location"]["lng"]
                                    ]
                                }
                            });
                        }

                        //saving new address
                        address
                            .save()
                            .then((address) => resolve(address))
                            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
                    });
                }
            ], () => {} );
        });
    }
}

function encodeUrlParams(params)
{
    return Object.keys(params)
        .map((param) => encodeURIComponent(param) + "=" + encodeURIComponent(params[param]))
        .join("&");
}