//core
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const randomstring = require("randomstring");
const async = require("async");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/users/'});
const config = process.env;

//services
const Utils = require('./../services/utils');
const locationHandler = require('../services/locationHandler');

//models
const UserModel = require("./../models/User");
const User = UserModel.schema;
const CarerSchema = require("./../models/schemas/Carer");
const eligibleRolesArray = CarerSchema.eligibleRoles;

module.exports = {
    register: function(req, res)
    {
        locationHandler
            .getLocationDetails(req.body.location_id)
            .then((address) => {
                if(!address)
                    return res.status(406).json(Utils.parseStringError("Invalid location", "location"));

                //care home
                if(req.body.care_service_name && req.body.type_of_home && req.body.name)
                {
                    var careHome = {
                        care_service_name: req.body.care_service_name,
                        type_of_home: req.body.type_of_home,
                        name: req.body.type_of_home,
                        address: address
                    }
                }
                //carer
                else if(req.body.first_name && req.body.surname)
                {
                    try { var eligibleRoles = JSON.parse(req.body.eligible_roles).map((role) => eligibleRolesArray.indexOf(role) != -1 ? eligibleRolesArray.indexOf(role) : null ) }
                    catch (error) { var eligibleRoles = [] }

                    var carer = {
                        first_name: req.body.first_name,
                        surname: req.body.surname,
                        middle_name: req.body.middle_name,
                        date_of_birth: req.body.date_of_birth,
                        eligible_roles: eligibleRoles,
                        address: address
                    }
                }

                //care home and carer not present
                if(typeof careHome == 'undefined' && typeof carer == 'undefined')
                    return  res.status(406).json(Utils.parseStringError("You have to provide all carer or care home fields", "user_type"))

                let user = new User({
                    email: req.body.email,
                    password: req.body.password,
                    phone_number: req.body.phone_number
                });

                (typeof careHome !== 'undefined') ? user.set({ care_home: careHome }) : user.set({ carer: carer });

                //console.log(user.carer);
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
                                subject: "Oliver James Email Verification",
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