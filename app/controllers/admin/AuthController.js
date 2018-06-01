//core
const bcrypt = require('bcrypt-nodejs');

//services
const Utils = require('./../../services/utils');

//models
const Admin = require("./../../models/Admin").schema;

module.exports = {
    login: function (req, res)
    {
	    let query = {};

	    //login with credentials and refresh token handle
	    if (req.body.email && req.body.password)
		    query[ "email" ] = { $regex: new RegExp(req.body.email.toString().toLowerCase()), $options: "xi" }
	    else if (req.body.refresh_token)
		    query[ "access_token.refresh_token" ] = req.body.refresh_token;
	    else
		    return res.status(401).json(Utils.parseStringError("Authorization failed", "auth"));

        Admin.findOne(query, (error, admin) =>
        {
            //admin not found
            if (!admin)
                return res.status(401).json(Utils.parseStringError("Authorization failed", "auth"));

	        //refresh token login
	        if (query[ "access_token.refresh_token" ])
	        {
		        //generating tokens, updating admin and sending response
		        admin.generateAccessTokens();
		        admin.save().catch(error => console.log(error));

		        return res.json(prepareLoginResponse(admin));
	        }
	        //password verification
	        else
	        {
		        bcrypt.compare(req.body.password, admin.password, (error, status) => {

			        //wrong password
			        if (!status)
				        return res.status(401).json(Utils.parseStringError("Authorization failed", "auth"));

			        //generating tokens, updating user and sending response
			        admin.generateAccessTokens();
			        admin.save().catch(error => console.log(error));

			        return res.json(prepareLoginResponse(admin));
		        });
	        }
        });
    }
}


function prepareLoginResponse(admin)
{
	return {
		user: {
            _id: admin._id,
            email: admin.email,
            access_token: admin.access_token,
            first_name: admin.first_name,
            surname: admin.surname,
			role: admin.roles[0]
        }
    }
}