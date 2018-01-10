/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var JWT = require('jsonwebtoken');
var User = require("./../models/User").schema;
var Utils = require('./../services/utils');
var config = process.env;

module.exports = function(options)
{
    return function(req, res, next)
    {
        if(options.skippedRoutes.indexOf(req.url) != -1) //handle of non protected routes
            next();
        else
        {
            
            //getting token
            var token = req.body["access-token"] || req.query["access-token"] || req.headers['x-access-token'];
            
            //token verification
            JWT.verify(token, config.SECRET_AUTH , (error) => {
                //error handle
                if(error)
                {
                    if(error.name == "TokenExpiredError")
                        return res.status(410).json(Utils.parseStringError("Access token expired", "user")); 

                    return res.status(401).json(Utils.parseStringError("Access Denied", "user"));
                }
                
                //checking if token still is assigned to user
                User.findOne({access_token: token}, (error, user) => {
                    
                    if(!user)
                        return res.status(401).json(Utils.parseStringError("Access Denied", "user"));

                    req.user = user;
                    next();
                });
            });
        }
    }
}

    
        

    
