/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mailer = require('express-mailer');
var config = process.env;

module.exports.configure = function(app)
{
    mailer.extend(app, getConfig());
    return app;
}

function getConfig()
{
    var mailConfig = {
        from: config.MAIL_FROM + "<" + config.MAIL_FROM_ADDRESS + ">",
        host: config.MAIL_HOST || "localhost",
        secureConnection: false,
        port: parseInt(config.MAIL_PORT),
        transportMethod: config.MAIL_METHOD
    };
    
    if(config.MAIL_USER)
    {
        mailConfig.auth = {
            user: config.MAIL_USER,
            pass: config.MAIL_PASSWORD
        }
    }
    
    return mailConfig;
}

