/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const JWT = require('jsonwebtoken');
const UserModel = require("./../models/User");
const User = UserModel.schema;
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

        //checking if token is assigned to user
        user: (callback) => {
            User.findOne({ "access_token.token": token }, (error, user) => {

                if(!user && !res.headersSent)
                    return res.status(401).json(Utils.parseStringError("Access Denied", "user"));

                //blocked account and unblocking handle
                if (!res.headersSent && (user.status == UserModel.statuses.BLOCKED || user.status == UserModel.statuses.BANNED))
                    return res.status(403).json(Utils.parseStringError("Blocked account", "user"));

	            //inactive account
	            if (!res.headersSent && user.status != UserModel.statuses.ACTIVE)
		            return res.status(403).json(Utils.parseStringError("Inactive account", "user"));

                callback(null, user)
            });
        }
    }, (error, result) => {
        if(!res.headersSent)
        {
            req.user = result.user;
            next();
        }
    });
}

    
        

    
