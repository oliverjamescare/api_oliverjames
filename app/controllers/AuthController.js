var JWT = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
var randomstring = require("randomstring");
var Utils = require('./../services/utils');
var config = process.env;

var User = require("./../models/User").schema;

module.exports = {
    register: function(req, res)
    { 
        var user = new User({
            email: req.body.email,
            password: req.body.password,
            first_name: req.body.first_name,
            surname: req.body.surname,
            country: req.body.country,
            job_title: req.body.job_title
        });
        
        //validation
        user.validate().then(() => {

            //sending response
            res.status(201).json({ status: true });

            //hashing password and creating access token
            bcrypt
                .hash(user.password, null, null, (error, hash) => {
                    user.password = hash;
                    user.access_token = JWT.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * config.TOKEN_EXPIRATION_DAYS), 
                        data: user 
                    }, config.SECRET_AUTH);
                    
                //email confirmation
                var emailConfirmation = {
                    token: randomstring.generate(128),
                    email: user.email
                };

                user.email_confirmations.push(emailConfirmation);
                
                //sending email
                req.app.mailer.send(__dirname + "/../../views/emails/confirmation-email", {
                    to: user.email,
                    subject: "Email confirmation",
                    user: user,
                    emailConfirmation: emailConfirmation,
                    config: config
                }, (error) => console.log(error) );
                
                //saving user
                user.save().catch(error => console.log(error));
                
                //handling account invitations
                Account.find({invited_emails: user.email}).then(accounts => {
                    
                    accounts.forEach(account => {
                        AccountMember.create({user: user._id, account: account._id}, (error, member) => {
                            
                            account.invited_emails.splice(account.invited_emails.indxOf(user.email),1); //removing invitation
                            account.members.push(member);
                            account.save().catch(error => console.log(error)); //saving  account
                            
                            user.membered_accounts.push(member)
                            user.save().catch(error => console.log(error));
                        });
                    });
                });
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