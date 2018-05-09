/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const nodemailer = require('nodemailer');
const jade = require("jade");
const config = process.env;

module.exports.configure = function(app)
{
    app.mailer = prepareMailer();
}

module.exports.getMailer = function()
{
    return prepareMailer();
}

function prepareMailer()
{
    const config = getConfig();
    const transporter = nodemailer.createTransport(config);

    return {
        send: function(templatePath, mailData, templateData = {}, callback)
        {
            jade.renderFile(templatePath, templateData, (error, html) => {
                if(error && callback)
                    callback(error, null);
                else if(html)
                {
                    const mailOptions = Object.assign({ from: config.from, html }, mailData);
                    transporter.sendMail(mailOptions, callback);
                }
            })
        }
    }
}
function getConfig()
{
    const mailConfig = {
        from: config.MAIL_FROM + "<" + config.MAIL_FROM_ADDRESS + ">",
        service: "gmail"
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

