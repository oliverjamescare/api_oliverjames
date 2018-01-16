//core
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const randomstring = require("randomstring");
const config = process.env;

//services
const Utils = require('./../services/utils');
const locationHandler = require('../services/locationHandler');
const fileHandler = require("../services/fileHandler");

//models
const User = require("./../models/User").schema;
const CarerSchema = require("./../models/schemas/Carer");
const eligibleRolesArray = CarerSchema.eligibleRoles;



module.exports = {
    register: function(req, res)
    {
        //cv upload
        const uploader = fileHandler(req, res);
        uploader.singleUpload("cv", "users", [
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/pdf"
        ], 10, (req) => req.body.first_name && req.body.surname) //only if this is carer registration request
        .then(() => req.body["location_id"]? locationHandler.getLocationById(req, res) : locationHandler.getCustomLocation(req, res))
        .then((address) => {

            //user
            let user = new User({
                email: req.body.email,
                password: req.body.password,
                phone_number: req.body.phone_number
            });

            //care home
            if(req.body.care_service_name && req.body.type_of_home && req.body.name)
            {
                user.set({
                    care_home: {
                        care_service_name: req.body.care_service_name,
                        type_of_home: req.body.type_of_home,
                        name: req.body.name,
                        address: address
                    }
                });
            }

            //carer
            else if(req.body.first_name && req.body.surname)
            {
                try { var eligibleRoles = JSON.parse(req.body.eligible_roles).map((role) => eligibleRolesArray.indexOf(role) != -1 ? eligibleRolesArray.indexOf(role) : null ) }
                catch (error) { var eligibleRoles = [] }

                user.set({
                    carer: {
                        first_name: req.body.first_name,
                        surname: req.body.surname,
                        middle_name: req.body.middle_name,
                        date_of_birth: req.body.date_of_birth,
                        eligible_roles: eligibleRoles,
                        address: address,
                        cv: req.file ? req.file.path : null,
                        q_a_form: {
                            criminal_record: {
                                value: req.body["criminal_record_value"],
                                text: req.body["criminal_record_text"]
                            },
                            physical_issues: {
                                value: req.body["physical_issues_value"],
                            },
                            engaging_in_moving: {
                                value: req.body["engaging_in_moving_value"],
                                text: req.body["engaging_in_moving_text"]
                            },
                            personal_care_for_resident: {
                                value: req.body["personal_care_for_resident_value"],
                            },
                            you_are_late: {
                                value: req.body["you_are_late_value"],
                            },
                            find_fallen_resident: {
                                value: req.body["find_fallen_resident_value"],
                            },
                            serve_lunch_meals: {
                                value: req.body["serve_lunch_meals_value"],
                            },
                        }
                    }
                });
            }
            else
                return res.status(406).json(Utils.parseStringError("You have to provide all carer or care home fields", "user_type"))

            user
                .validate()
                .then(() => {

                    //sending response
                    res.status(201).json({ status: true });

                    //hashing password, sending email verification and saving user
                    bcrypt.hash(user.password, null, null, (error, hash) => {
                        user.addEmailConfirmationHandle(user.email, req.app.mailer);
                        user.password = hash;

                        user.save().catch(error => console.log(error));
                    });
                })
                .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
        });
    },
    
    login: function (req, res)
    {
        const userTypes = ["carer", "care_home"];
        const userType = userTypes.indexOf(req.body.userType) != -1 ? req.body.userType : "carer";

        User.findOne({"email": req.body.email, userType: { $exists: true }}, (error, user) => {
            
            //user not found
            if(!user)
                return res.status(401).json(Utils.parseStringError("Authorization failed", "auth"));
            
            //blocked account and unblocking handle
            if(user.status == UserModel.statuses.BLOCKED)
            {
                if(user.blocked_until.getTime() >= new Date().getTime())
                    return res.status(403).json(Utils.parseStringError("Blocked account", "user"));
                else
                    user.set({ status: UserModel.statuses.CONFIRMED });
            }

            //password verification    
            bcrypt.compare(req.body.password, user.password, (error, status) => {

                //wrong password
                if(!status)
                    return res.status(401).json(Utils.parseStringError("Authorization failed", "auth"));

                //generating tokens, updating user and sending response
                let returnedUser = (({ _id, email, carer, care_home }) => ({ _id, email, carer, care_home }))(user);
                const accessToken = {
                    token: JWT.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * UserModel.accessTokenExpirationDays),
                        data: returnedUser
                    }, config.SECRET_AUTH),
                    refresh_token: randomstring.generate(128)
                };

                returnedUser["access_token"] = accessToken;

                user.save().catch( error =>  console.log(error));
                return res.send({ user: returnedUser });
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
            res.json({ status: true });
            
            //saving password reminder
            const passwordReminder = {
                token: randomstring.generate(128)
            };

            user.password_resets.push(passwordReminder);
            user.save().catch( error =>  console.log(error));

            //sending email
            req.app.mailer.send(__dirname + "/../../views/emails/password-reset", {
                to: user.email,
                subject: "Oliver James - password reset request",
                passwordReminder: passwordReminder,
                config: config
            }, (error) => console.log(error));
        });
    },
    
    remindPasswordChange: function(req, res)
    {
        User.findOne({"password_resets.token": req.body.token }, (error, user) => {

            //user not found
            if(!user)
                return res.status(404).json(Utils.parseStringError("Token not found", "token"));

            const passwordReset = user.password_resets.find((password_reset) => password_reset.token == req.body.token);

            //checking expiration
            if(passwordReset.expiration < new Date())
                return res.status(410).json(Utils.parseStringError("Token expired", "token"));

            user.password = req.body.password;
            user.validate()
                .then(() => {

                    //sending response
                    res.json({ status: true });

                    //hashing password and removing password resetes
                    bcrypt.hash(user.password, null, null, (error, hash) => {
                        user.set({ password: hash, password_resets: []});
                        user.save().catch( error =>  console.log(error));
                    });
                })
                .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
        });
    }
}