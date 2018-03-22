const request = require('request');
const config = process.env;

const pcaRetreiveEndpoint = "https://services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json.ws?";
const googleEndpoint = "https://maps.googleapis.com/maps/api/place/textsearch/json?";

module.exports = {

    getCustomLocation(data)
    {
        return new Promise(resolve => {

            if(!data)
                resolve();

            const query = (data.company ? data.company + ", " : "")
                + data.address_line_1 + ", "
                + (data.address_line_2 ? data.address_line_2 + ", " : "")
                + data.city + ", "
                + data.postal_code;

            //GOOGLE
            const googleParams = {
                key: config.GOOGLE_KEY,
                query: query
            };
            const googleUrl = googleEndpoint + encodeUrlParams(googleParams);

            let address = {
                postal_code: data.postal_code,
                city: data.city,
                company: data.company ? data.company : null,
                address_line_1: data.address_line_1,
                address_line_2: data.address_line_2 ? data.address_line_2 : null
            };

            if(address.postal_code && address.city && address.address_line_1)
            {
                request.get(googleUrl, { json: true }, (error, response, body) => {

                    if(body["status"] == "OK" && body["results"].length)
                    {
                        address["location"] = {
                            type: "Point",
                            coordinates: [
                                body["results"][0]["geometry"]["location"]["lat"],
                                body["results"][0]["geometry"]["location"]["lng"]
                            ],
                        };
                    }
                    resolve(address);
                });
            }
            else
                resolve(address);

        });
    }
}

function encodeUrlParams(params)
{
    return Object.keys(params)
        .map((param) => encodeURIComponent(param) + "=" + encodeURIComponent(params[param]))
        .join("&");
}