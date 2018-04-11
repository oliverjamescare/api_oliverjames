/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const JWT = require('jsonwebtoken');
const config = process.env;
const async = require('async');

//custom
const User = require("./../models/User").schema;
const Admin = require("./../models/Admin").schema;
const Utils = require('./../services/utils');

module.exports = function(req, res, next)
{
    //getting token
    const token = req.headers['x-access-token'] || req.query["access-token"] || req.body["access-token"];
    if(!token)
        return res.status(401).json(Utils.parseStringError("Access Denied", "user"));

    async.parallel({
        //token verification
        token: (callback) => {
            JWT.verify(token, config.SECRET_AUTH , (error) => callback(null, error));
        },

        //checking if token is assigned to user
        user: (callback) => {
            User.findOne({ "access_token.token": token }, (error, user) => callback(null, user));
        },
        //checking if token is assigned to admin
        admin: (callback) => {
            Admin.findOne({ "token": token }, (error, admin) => callback(null, admin));
        }
    }, (error, result) => {
        if((result.user && !result.token) || result.admin)
            next();
        else
            return res.status(401).json(Utils.parseStringError("Access Denied", "user"));
    });
}

    
        

    
