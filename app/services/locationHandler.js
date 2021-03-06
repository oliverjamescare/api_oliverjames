const request = require('request');
const config = process.env;

const pcaRetreiveEndpoint = "https://services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json.ws?";
const pcaFindEndpoint = "https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.00/json.ws?";
const googleEndpoint = "https://maps.googleapis.com/maps/api/place/textsearch/json?";

module.exports = {

    getCustomLocation: function(data)
    {
        return new Promise(resolve => {

            if(!data)
                resolve();

            const query = //(data.company ? data.company + ", " : "")
                data.address_line_1 + ", "
                + (data.address_line_2 ? data.address_line_2 + ", " : "")
                + data.city + ", "
                + data.postal_code;

            console.log(query)
            //GOOGLE
            let googleParams = {
                key: config.GOOGLE_KEY,
                query: query
            };
            let googleUrl = googleEndpoint + encodeUrlParams(googleParams);

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
	                console.log("Full address fetch", body)

                    if(body["status"] == "OK" && body["results"].length)
                    {
                        address["location"] = {
                            type: "Point",
                            coordinates: [
                                body["results"][0]["geometry"]["location"]["lat"],
                                body["results"][0]["geometry"]["location"]["lng"]
                            ],
                        };
                        resolve(address);
                    }
                    else //getting only by postcode
                    {
	                    //GOOGLE
	                    googleParams = {
		                    key: config.GOOGLE_KEY,
		                    query: data.postal_code
	                    };
	                    googleUrl = googleEndpoint + encodeUrlParams(googleParams);

	                    request.get(googleUrl, { json: true }, (error, response, body) => {
		                    console.log("Postcode fetch", body)

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

                });
            }
            else
                resolve(address);

        });
    },

    searchAddresses: function (data)
    {
        return new Promise(resolve => {

            if(!data.search)
                return resolve([]);

            //preparing params
            const params = {
                Key: config.PCA_KEY,
                Text: data.search,
                Countries: "GB",
                Limit: 10,
                Language: "en-gb"
            };

            if(data.container)
                params["Container"] = data.container;

            request.get(pcaFindEndpoint + encodeUrlParams(params), { json: true }, (error, response, body) => resolve(body));
        });

    },

    getAddressDetails: function (id)
    {
        return new Promise(resolve => {

            //preparing params
            const params = {
                Key: config.PCA_KEY,
                Id: id
            };

            request.get(pcaRetreiveEndpoint + encodeUrlParams(params), { json: true }, (error, response, body) => resolve(body));
        });
    }
}

function encodeUrlParams(params)
{
    return Object.keys(params)
        .map((param) => encodeURIComponent(param) + "=" + encodeURIComponent(params[param]))
        .join("&");
}