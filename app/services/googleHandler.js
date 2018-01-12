const endpoint = "https://maps.googleapis.com/maps/api/place/textsearch/json?"
const request = require('request');
const config = process.env;

module.exports = {
    findPlacesByPostCode: function(postcode)
    {
        let params = {
            key: config.GOOGLE_KEY,
            query: postcode
        };

        const url = endpoint + encodeUrlParams(params)
        console.log(url);

        request.get(url, { json: true }, (error, response, body) => {

            console.log(body);
        });
    }
}

function encodeUrlParams(params)
{
    return Object.keys(params)
        .map((param) => encodeURIComponent(param) + "=" + encodeURIComponent(params[param]))
        .join("&");
}