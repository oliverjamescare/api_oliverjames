/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const bcrypt = require('bcrypt-nodejs');
const randomstring = require("randomstring");
const User = require("./../models/User").schema;
const Utils = require('./../services/utils');
const config = process.env;

module.exports = {

    checkUniqueness: function(req, res)
    {
        const paramValue = req.query.email || req.query.phone_number;
        const paramKey = req.query.email ? "email" : req.query.phone_number ? "phone_number" : null;

        if(!paramKey)
            return res.status(406).json(Utils.parseStringError("Invalid param", "user"));

        User.findOne({ paramKey: paramValue }, (error, user) => res.json({ exists: Boolean(user) }));
    },

    confirmEmail: function(req, res)
    {
        User.findOne({"email_confirmations.token": req.body.token}, (error, user) => {

            //user not found
            if(!user)
                return res.status(404).json(Utils.parseStringError("User not found", "user"));

            //getting email confirmation
            const emailConfirmation = user.email_confirmations.find((email_confirmation) => email_confirmation.token == req.body.token);

            //checking expiration
            if(emailConfirmation.expiration < new Date())
                return res.status(410).json(Utils.parseStringError("Token expired", "token"));

            //different emails
            if(emailConfirmation.email != user.email)
                return res.status(406).json(Utils.parseStringError("This email cannot be confirmed from this link", "email"));

            //response and updating user
            res.send({ status: true });

            user.set({ email_confirmations: [], email_verified: true });
            user.save().catch(error => console.log(error));
        });
    },

    profile: function(req, res)
    {
        User.findOne({"_id": req.user._id}, {"email": 1, "first_name": 1, "surname": 1, "owned_accounts": 1, "membered_accounts":1,  "job_title": 1, "country": 1})
            .populate("owned_accounts",{"name":1, "members": 1})
            .populate({
                path: "membered_accounts",
                select: {permissions: 1, _id: 0, account: 1},
                populate: {
                    path: "account",
                    select: {name: 1}
                }
            })
            .lean()
            .then(user => {
                //parsing owned accounts
                user.owned_accounts.map((account) => {
                   account['members_amount'] = account.members.length;
                   delete account.members;
                });

                //sending reponse
                res.json(user);
            }).catch(err => console.log(err));
    },

    updateProfile: function(req, res)
    {
        var user = req.user;
        var beginingEmail = user.email;

        //setting values
        user.set({
            first_name: (req.body.first_name)? req.body.first_name : user.first_name,
            surname: (req.body.surname)? req.body.surname : user.surname,
            job_title: (req.body.job_title)? req.body.job_title : user.job_title,
            email: (req.body.email)? req.body.email : user.email
        });

        user.validate()
            .then(() => {

                //sending response
                res.send({ status: true });

                //if email changed then create email revert
                if(beginingEmail != user.email)
                {
                    var expiration = new Date();
                    expiration.setDate(expiration.getDate() + 2);

                    //email restore
                    var emailRestore = {
                        email: beginingEmail,
                        token:   randomstring.generate(128),
                        expiration: expiration
                    };
                    user.email_restores.push(emailRestore);

                    //sending email
                    req.app.mailer.send(__dirname + "/../../views/emails/email-restore", {
                        to: beginingEmail,
                        subject: "Email restore",
                        user: user,
                        email_restore: emailRestore,
                        config: config
                    }, (error) => console.log(error) );

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
                }

                //updating object
                user.save().catch( error =>  console.log(error));

            })
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },

    restoreEmail: function(req, res)
    {
        User.findOne({"email_restores.token": req.body.token}, (error, user) => {

            //user not found
            if(!user)
                return res.status(404).json(Utils.parseStringError("Token not found", "token"));

            //getting email restore
            var emailRestore = user.email_restores.find((email_restore) => {
                if(email_restore.token == req.body.token)
                    return email_restore;
            });

            //token expired
            if(emailRestore.expiration < new Date())
                return res.status(410).json(Utils.parseStringError("Token expired", "token"));


            //removing expired email restores and current one
            user.email_restores.forEach((email_restore) => {
                if(email_restore.token == req.body.token || email_restore.expiration < new Date())
                    user.email_restores.pull(email_restore._id);
            });

            //validation and restoring email
            user.email = emailRestore.email;
            user.save()
                .then(() => res.send({ status: true }))
                .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
        });
    },


    changePassword: function(req, res)
    {
        var user = req.user; 
    
        //checking old password
        bcrypt.compare(req.body.old_password, user.password, (error, status) => {

            if(!status)
                return res.status(406).json(Utils.parseStringError("Wrong old password", "user"));

            //validation and saving new password
            user.password = req.body.new_password;
            user.validate()
                .then(() => {
                    //sending response
                    res.send({ status: true });

                    //hashing password
                    bcrypt.hash(user.password, null, null, (error, hash) => {
                        user.password = hash;
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
    },
    
    getAllUsers: function(req, res)
    {
        //checking for global admin permissions
        if(!req.user.global_admin)
            return res.status(403).json(Utils.parseStringError("Permission denied", "permission"));
        
        var options = {
            select: "first_name surname email login_time job_title country owned_accounts membered_accounts",
            populate: [
                {path: "owned_accounts", select: "name members"}, 
                {
                    path: "membered_accounts",
                    select: {permissions: 1, _id: 0, account: 1},
                    populate: {
                        path: "account",
                        select: {name: 1}
                    }
                }
            ],
            lean: true,
            leanWithId: false
        };

        //sort
        switch(req.query.sort)
        {
            case "surname":
            {
                options.sort = {"surname" : 1};
                break;
            }
            case "email":
            {
                options.sort = {"email" : 1};
                break;
            }
            case "login_time":
            {
                options.sort = {"login_time" : -1};
                break;
            }
            default:
            {
                options.sort = {"first_name" : 1};
                break;
            }
        }

        //pagination and parsing
        Utils.paginate(User, {options: options, query: {}}, req)
            .then(results => {
                var paginated = Utils.parsePaginatedResults(results);

                paginated.results.map((user) => {
                    if(user.owned_accounts)
                    {
                        user.owned_accounts.map((account) => {
                            account['members_amount'] = account.members.length;
                            delete account.members;
                        });
                    }
                    
                });
                
                res.json(paginated);
            });
    },
    
    updateUser: function(req, res)
    {
        //checking for global admin permissions
        if(!req.user.global_admin)
            return res.status(403).json(Utils.parseStringError("Permission denied", "permission"));
        
        User.findOne({"_id": req.params.userId}, (error, user) => {
            
            //user not found
            if(!user)
                return res.status(404).json(Utils.parseStringError("User not found", "user"));
            
            
            var beginningEmail = user.email;
            var beginningPassword = user.password;
            
            //updating 
            user.set({
                first_name: req.body.first_name || user.first_name,
                surname: req.body.surname || user.surname,
                job_title: req.body.job_title || user.job_title,
                email: req.body.email || user.email,
                country: req.body.country || user.country,
                password: req.body.password || user.password
            });
            
            user.validate()
                .then(() => {
                    
                    //sending response
                    res.json({status: true});
                    
                    //changing email handle
                    if(user.email != beginningEmail)
                    {
                        
                        var confirmation = user.email_confirmations.filter(confirmation => confirmation.email == user.email).pop();
                        if(confirmation)
                            user.email_confirmations.id(confirmation._id).status = true;
                        else
                        {
                            //email confirmation
                            var emailConfirmation = {
                                token: randomstring.generate(128),
                                email: user.email,
                                status: true
                            };

                            user.email_confirmations.push(emailConfirmation);
                        }
                    }
                    
                    if(user.password  == beginningPassword)
                        user.save().catch(error => console.log(error));
                    else
                    {
                        //hashing password
                        bcrypt.hash(user.password, null, null, (error, hash) => {
                            user.password = hash;
                            user.save().catch(error =>  console.log(error));
                        });
                    }
                })
                .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
        });
    }
}

