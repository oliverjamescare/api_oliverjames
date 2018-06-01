/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const Admin = require("./../models/Admin").schema;
const JWT = require('jsonwebtoken');
const Utils = require('./../services/utils');
const config = process.env;
const async = require('async');

module.exports = function(req, res, next)
{
    //getting token
    const token = req.headers['x-access-token'] || req.query["access-token"] || req.body["access-token"];

	async.parallel({

		//token verification
		token: (callback) => {
			JWT.verify(token, config.SECRET_AUTH , (error) => {
				//error handle
				if(error && !res.headersSent)
				{
					if(error.name == "TokenExpiredError")
						return res.status(410).json(Utils.parseStringError("Access token expired", "user"));

					return res.status(401).json(Utils.parseStringError("Access Denied", "user"));
				}

				callback(null);
			});
		},

		//checking if token is assigned to admin
		admin: (callback) => {
			Admin.findOne({ "access_token.token": token }, (error, admin) => {

				if(!admin && !res.headersSent)
					return res.status(401).json(Utils.parseStringError("Access Denied", "user"));

				callback(null, admin)
			});
		}
	}, (error, result) => {

		if(!res.headersSent)
		{
			req.user = result.admin;
			next();
		}
	});
}

    
        

    
