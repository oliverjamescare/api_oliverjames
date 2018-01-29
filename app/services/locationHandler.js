const request = require('request');
const config = process.env;

const pcaRetreiveEndpoint = "https://services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json.ws?";
const googleEndpoint = "https://maps.googleapis.com/maps/api/place/textsearch/json?";

module.exports = {

    getCustomLocation(req)
    {
        return new Promise((resolve, reject) => {

            const query = (req.body.company || req.query.company ? (req.body.company || req.query.company) + ", " : "")
                + (req.body.address_line_1 || req.query.address_line_1) + ", "
                + (req.body.address_line_2 || req.query.address_line_2 ? (req.body.address_line_2 || req.query.address_line_2) + ", " : "")
                + (req.body.city || req.query.city) + ", "
                + (req.body.postal_code || req.query.postal_code);

            console.log(query);
            //GOOGLE
            const googleParams = {
                key: config.GOOGLE_KEY,
                query: query
            };
            const googleUrl = googleEndpoint + encodeUrlParams(googleParams);

            request.get(googleUrl, { json: true }, (error, response, body) => {

                let address = {
                    postal_code: req.body.postal_code || req.query.postal_code,
                    city: req.body.city || req.query.city,
                    company: req.body.company || req.query.company ? (req.body.company || req.query.company) : null,
                    address_line_1: req.body.address_line_1 || req.query.address_line_1,
                    address_line_2: req.body.address_line_2 || req.query.address_line_2 ? (req.body.address_line_2 || req.query.address_line_2) : null
                };

                if(body["status"] == "OK" && body["results"].length)
                {
                    address["location"] = {
                        coordinates: [
                            body["results"][0]["geometry"]["location"]["lat"],
                            body["results"][0]["geometry"]["location"]["lng"]
                        ]};
                }

                console.log(address);
                resolve(address);
            });
        });
    }
}

function encodeUrlParams(params)
{
    return Object.keys(params)
        .map((param) => encodeURIComponent(param) + "=" + encodeURIComponent(params[param]))
        .join("&");
}