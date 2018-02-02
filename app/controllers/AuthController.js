//core
const bcrypt = require('bcrypt-nodejs');

//services
const Utils = require('./../services/utils');
const locationHandler = require('../services/locationHandler');
const fileHandler = require("../services/fileHandler");

//models
const User = require("./../models/User").schema;
const CareHomeWaitingUser = require("./../models/CareHomeWaitingUser").schema;
const config = process.env;

//custom
const validators = require('./../services/validators');
const paths = require('./../../config/paths');

module.exports = {
    register: function (req, res)
    {
        //cv upload
        const uploader = fileHandler(req, res);
        uploader.singleUpload("cv", "users", [
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/pdf"
        ], 10, (req) => req.body.first_name && req.body.surname) //only if this is carer registration request
            .then(() => locationHandler.getCustomLocation(req))
            .then((address) =>
            {

                //user
                let user = new User({
                    email: req.body.email,
                    password: req.body.password,
                    phone_number: req.body.phone_number
                });

                //care home
                if (req.body.care_service_name && req.body.type_of_home && req.body.name)
                {
                    user.set({
                        care_home: {
                            care_service_name: req.body.care_service_name,
                            type_of_home: req.body.type_of_home,
                            name: req.body.name,
                            address: address
                        }
                    });

                    user.roles.push("CARE_HOME");
                }

                //carer
                else if (req.body.first_name && req.body.surname)
                {
                    try
                    {
                        var eligibleRoles = JSON.parse(req.body.eligible_roles)
                    }
                    catch (error)
                    {
                        var eligibleRoles = []
                    }

                    user.set({
                        carer: {
                            first_name: req.body.first_name,
                            surname: req.body.surname,
                            middle_name: req.body.middle_name,
                            date_of_birth: req.body.date_of_birth,
                            address: address,
                            cv: req.file ? req.file.path : null,
                            q_a_form: {
                                criminal_record: {
                                    value: req.body[ "criminal_record_value" ],
                                    text: req.body[ "criminal_record_text" ]
                                },
                                physical_issues: {
                                    value: req.body[ "physical_issues_value" ],
                                },
                                engaging_in_moving: {
                                    value: req.body[ "engaging_in_moving_value" ],
                                    text: req.body[ "engaging_in_moving_text" ]
                                },
                                personal_care_for_resident: {
                                    value: req.body[ "personal_care_for_resident_value" ],
                                },
                                you_are_late: {
                                    value: req.body[ "you_are_late_value" ],
                                },
                                find_fallen_resident: {
                                    value: req.body[ "find_fallen_resident_value" ],
                                },
                                serve_lunch_meals: {
                                    value: req.body[ "serve_lunch_meals_value" ],
                                },
                            }
                        }
                    });

                    user.roles.push("CARER");
                    eligibleRoles.forEach(role => user.carer.eligible_roles.push(role));
                }
                else
                    return res.status(406).json(Utils.parseStringError("You have to provide all carer or care home fields", "user_type"))

                user
                    .validate()
                    .then(() =>
                    {

                        //sending response
                        res.status(201).json({ status: true });

                        //hashing password, sending email verification and saving user
                        bcrypt.hash(user.password, null, null, (error, hash) =>
                        {
                            user.addEmailConfirmationHandle(user.email, req.app.mailer);
                            user.password = hash;

                            user.save().catch(error => console.log(error));
                        });
                    })
                    .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
            });
    },

    addUserToCareHomeWaitingList: function (req, res)
    {
        locationHandler.getCustomLocation(req)
            .then((address) => {
                let waitingUser = new CareHomeWaitingUser({
                    name: req.body.name,
                    email: req.body.email,
                    address: address
                });

                waitingUser
                    .save()
                    .then(() => res.status(201).json({ status: true }))
                    .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
            })
    },

    login: function (req, res)
    {
        const userTypes = [ "carer", "care_home" ];
        let query = {};
        userTypes.indexOf(req.body[ "userType" ]) != -1 ? query[ req.body[ "userType" ] ] = { $exists: true } : query[ "carer" ] = { $exists: true };

        //login with credentials and refresh token handle
        if (req.body.email && req.body.password)
            query[ "email" ] = req.body.email;
        else if (req.body.refresh_token)
            query[ "access_token.refresh_token" ] = req.body.refresh_token;
        else
            return res.status(401).json(Utils.parseStringError("Authorization failed", "auth"));

        User.findOne(query, (error, user) =>
        {

            //user not found
            if (!user)
                return res.status(401).json(Utils.parseStringError("Authorization failed", "auth"));

            //blocked account and unblocking handle
            if (!user.blockingHandle())
                return res.status(403).json(Utils.parseStringError("Blocked account", "user"));

            //refresh token login
            if (query[ "access_token.refresh_token" ])
            {
                //generating tokens, updating user and sending response
                user.generateAccessTokens();
                user.save().catch(error => console.log(error));

                return res.json({ user: prepareLoginResponse(user) });
            }
            //password verification
            else
            {
                console.log("pw");
                bcrypt.compare(req.body.password, user.password, (error, status) =>
                {

                    //wrong password
                    if (!status)
                        return res.status(401).json(Utils.parseStringError("Authorization failed", "auth"));

                    //generating tokens, updating user and sending response
                    user.generateAccessTokens();
                    user.save().catch(error => console.log(error));

                    return res.json({ user: prepareLoginResponse(user) });
                });
            }
        });
    },

    remindPassword: function (req, res)
    {
        User.findOne({ "email": req.body.email }, (error, user) =>
        {

            //user not found
            if (!user)
                return res.status(404).json(Utils.parseStringError("User not found", "user"));

            //sending response
            res.json({ status: true });

            user.addPasswordRemindHandle(req.app.mailer);
            user.save().catch(error => console.log(error));
        });
    },

    remindPasswordChange: function (req, res)
    {
        User.findOne({ "password_resets.token": req.body.token }, (error, user) =>
        {
            //user not found
            if (!user)
                return res.status(404).json(Utils.parseStringError("User not found", "user"));

            const passwordReset = user.password_resets.find((password_reset) => password_reset.token == req.body.token);

            //checking expiration
            if (passwordReset.expiration < new Date())
                return res.status(410).json(Utils.parseStringError("Token expired", "token"));

            user.password = req.body.password;
            user.validate()
                .then(() =>
                {

                    //sending response
                    res.json({ status: true });

                    //hashing password and removing password resetes
                    bcrypt.hash(user.password, null, null, (error, hash) =>
                    {
                        user.set({ password: hash, password_resets: [] });
                        user.save().catch(error => console.log(error));
                    });
                })
                .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
        });
    }
}

function prepareLoginResponse(user)
{
    let response = {
        _id: user._id,
        email: user.email,
        access_token: user.access_token
    };

    if (user.carer)
    {
        response[ "carer" ] = {
            first_name: user.carer.first_name,
            middle_name: user.carer.middle_name,
            surname: user.carer.surname,
        };
    }
    else if (user.care_home)
    {
        response[ "care_home" ] = {
            name: user.care_home.name,
            care_service_name: user.care_home.care_service_name,
        };
    }

    return response;
}