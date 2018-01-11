const endpoint = "https://maps.googleapis.com/maps/api/place/radarsearch/json?"
const request = require('request');
const config = process.env;

module.exports = {
    findPlacesByPostCode: function(postcode)
    {
        let params = {
            key: config.GOOGLE_KEY,
            location: "51.4871288,-0.1977504",
            radius: 5000,
            type: "museum"
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