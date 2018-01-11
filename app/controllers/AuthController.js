const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const randomstring = require("randomstring");
const async = require("async");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/users/'});
const config = process.env;

const Utils = require('./../services/utils');
const GoogleHandler = require('./../services/googleHandler');
const User = require("./../models/User").schema;

module.exports = {
    register: function(req, res)
    {

        GoogleHandler.findPlacesByPostCode(req.body.postal_code);
        return res.status(201).json({ status: true });
        //care home
        if(req.body.care_service_name)
        {
            const careHome = {
                care_service_name: req.body.care_service_name,
                type_of_home: req.body.type_of_home,
                name: req.body.type_of_home,
            }
        }

        let user = new User({
            email: req.body.email,
            password: req.body.password,
            access_token: {
                token: randomstring.generate(128)
            },
            phone_number: req.body.phone_number
        });



        console.log(user);

        user.validate().then(() => {
            //sending response
            res.status(201).json({ status: true });

            async.parallel({
                passwordHash: (callback) => {
                    bcrypt.hash(user.password, null, null, (error, hash) => callback(null, hash));
                },
                emailConfirmation: (callback) => {

                    const emailConfirmation = {
                        token: randomstring.generate(128),
                        email: user.email
                    };

                    //sending email
                    req.app.mailer.send(__dirname + "/../../views/emails/confirmation-email", {
                        to: user.email,
                        subject: "Email confirmation",
                        user: user,
                        emailConfirmation: emailConfirmation,
                        config: config
                    }, (error) => console.log(error));

                    callback(null, emailConfirmation);
                }
            }, (error, results) => {

                //saving user
                user.password = results.passwordHash;
                user.email_confirmations.push(results.emailConfirmation);

                user.save().catch(error => console.log(error));
            });

        }).catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
        

    },
    
    login: function (req, res)
    {
        User.findOne({"email": req.body.email}, (error, user) => {
            
            //user not found
            if(!user)
                return res.status(404).json(Utils.parseStringError("User not found", "user"));
            
            //blocked account
            if(user.blocked_until > new Date() && user.failed_login_attempts >= 5)
                return res.status(403).json(Utils.parseStringError("Blocked account", "user"));

            //password verification    
            bcrypt.compare(req.body.password, user.password, (error, status) => {

                //wrong password
                if(!status)
                {
                    user.failed_login_attempts = ++user.failed_login_attempts; //falied logins incremetation
                    if(user.failed_login_attempts == 5) //blocking account
                    {
                        var blockedTime = new Date();
                        blockedTime.setHours(blockedTime.getHours() + 1);
                        user.blocked_until = blockedTime;
                    }

                    user.save().catch( error =>  console.log(error));
                    return res.status(406).json(Utils.parseStringError("Wrong password", "user"));
                }


                //token refresh, reset of blocked account and login time update
                user.access_token = "";
                user.failed_login_attempts = 0;
                user.login_time = new Date();
                
                user.access_token = JWT.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * config.TOKEN_EXPIRATION_DAYS), 
                    data: user 
                }, config.SECRET_AUTH);

                user.save().catch( error =>  console.log(error));
                return res.send({ token: user.access_token, admin: user.global_admin });
            });
        });
    },
    
    remindPassword: function(req, res)
    {
        User.findOne({"email": req.body.email}, (error, user) => {

            //user not found
            if(!user)
                return res.status(404).json(Utils.parseStringError("User not found", "user"));

            //sending response
            res.json({status: true});
            
            //creating password reminder    
            var expiration = new Date();
            expiration.setDate(expiration.getDate() + 7);

            var passwordReminder = {
                token: randomstring.generate(128),
                expiration: expiration
            };
            
            //saving reminder
            user.password_resets.push(passwordReminder);
            user.save();

            //sending email
            req.app.mailer.send(__dirname + "/../../views/emails/password-reset", {
                to: user.email,
                subject: "Password reset",
                user: user,
                passwordReminder: passwordReminder,
                config: config
            }, (error) => console.log(error) );
            
        });
    },
    
    remindPasswordChange: function(req, res)
    {
        User.findOne({"password_resets.token": req.body.token }, (error, user) => {

            //user not found
            if(!user)
                return res.status(404).json(Utils.parseStringError("Token not found", "token"));

            var passwordReset = user.password_resets.find((password_reset) => {
                if(password_reset.token == req.body.token)
                    return password_reset;
            });

            //token expired
            if(passwordReset.expiration < new Date())
                return res.status(410).json(Utils.parseStringError("Token expired", "token"));

            user.password = req.body.password;
            user.validate()
                .then(() => {
                    
                    //sending response
                    res.json({status: true});

                    //hashing password and removing password resetes
                    bcrypt.hash(user.password, null, null, (error, hash) => {
                        user.password = hash;
                        user.failed_login_attempts = 0;
                        user.password_resets = [];
                        user.save().catch( error =>  console.log(error));
                    });

                    //sending email
                    req.app.mailer.send(__dirname + "/../../views/emails/password-change-success", {
                        to: user.email,
                        subject: "Password reset success",
                        user: user
                    }, (error) => console.log(error) );
                })
                .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
        });
    }
}