/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const Admin = require("./../models/Admin").schema;
const Utils = require('./../services/utils');

module.exports = function(req, res, next)
{
    //getting token
    const token = req.headers['x-access-token'] || req.query["access-token"] || req.body["access-token"];

    Admin.findOne({ "token": token }, (error, admin) => {

        if(!admin)
            return res.status(401).json(Utils.parseStringError("Access Denied", "admin"));

        req.user = admin;
        next();
    });
}

    
        

    
