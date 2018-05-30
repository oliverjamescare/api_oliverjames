/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const ObjectId = require('mongoose').Types.ObjectId;
const async = require("async");
const randomstring = require('randomstring');

//models
const Setting = require('./../../models/Setting').schema;

module.exports = {
    getGeneralParameters: async function(req, res)
    {
        
    }
}
