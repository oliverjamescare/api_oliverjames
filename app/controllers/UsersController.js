/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const bcrypt = require('bcrypt-nodejs');
const randomstring = require("randomstring");
const config = process.env;

//custom
const User = require("./../models/User").schema;
const Utils = require('./../services/utils');
const fileHandler = require("../services/fileHandler");
const locationHandler = require('../services/locationHandler');

module.exports = {

    checkUniqueness: async function(req, res)
    {
        if(req.query.email)
            res.json({ exists: Boolean(await User.findOne({ email: req.query.email }))});
        else if(req.query.phone_number)
            res.json({ exists: Boolean(await User.findOne({ phone_number: req.query.phone_number }))});
        else
            return res.status(406).json(Utils.parseStringError("Invalid param", "user"));
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
        //general user properties
        let user = {
            _id: req.user._id,
            email: req.user.email,
            phone_number: req.user.phone_number,
            email_verified: req.user.email_verified,
            address: req.user.address
        };

        //carer properties
        if(req.user.carer)
        {
            user["carer"] = {
                first_name: req.user.carer.first_name,
                surname: req.user.carer.surname,
                middle_name: req.user.carer.middle_name,
                profile_image: req.user.carer.profile_image,
                max_job_distance: req.user.carer.max_job_distance,
                eligible_roles: req.user.carer.eligible_roles
            }

            if(user["carer"].profile_image)
            {
                let link = user["carer"].profile_image.substr(user["carer"].profile_image.indexOf("\\") + 1).replace(/\\/g,"/");
                user["carer"].profile_image = `http://${req.headers.host}/${link}`;
            }
        }

        //care home properties
        if(req.user.care_home)
        {
            user["care_home"] = {
                name: req.user.care_home.name,
                care_service_name: req.user.care_home.care_service_name,
                type_of_home: req.user.care_home.type_of_home,
                general_guidance: req.user.care_home.general_guidance,
                blocked_carers: req.user.care_home.blocked_carers
            }

            user["care_home"] = User.parseCareHome(user["care_home"], req);
        }

        return res.json(user);
    },

    changePassword: function(req, res)
    {
        bcrypt.compare(req.body["old_password"], req.user.password, (error, status) =>
        {
            //wrong password
            if (!status)
                return res.status(406).json(Utils.parseStringError("Wrong old password", "password"));

            req.user.password = req.body["new_password"];
            req.user
                .validate()
                .then(() => {

                    //sending response
                    res.status(200).json({ status: true });

                    //hashing password and saving user
                    bcrypt.hash(req.user.password, null, null, (error, hash) => {
                        req.user.password = hash;
                        req.user.save().catch(error => console.log(error));
                    });
                })
                .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
        });
    },

    updateProfileImage: function(req, res)
    {
        //profile image upload
        const uploader = fileHandler(req, res);
        uploader.singleUpload("profile_image", "users", [
            "image/jpeg",
            "image/jpg",
            "image/png"
        ], 5).then(() => {

           //saving new profile image
           if(req.file)
           {
               req.user.carer.profile_image =  req.file.path;
               req.user.save().catch(error => console.log(error));
           }

           //sending response
           res.json({ status: true });
        });
    },

    changeEmail: function (req, res)
    {
        const email = req.user.email;
        req.user.email = req.body.email;
        req.user.email_verified = false;

        req.user
            .validate()
            .then(() => {

                //sending response
                res.json({ status: true });

                //sending verification and saving user
                if(req.user.email != email)
                {
                    req.user.addEmailConfirmationHandle(req.user.email, req.app.mailer);
                    req.user.save().catch(error => console.log(error));
                }
            })
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },

    resendEmailVerification: function (req, res)
    {
        if(req.user.email_verified)
            return res.status(409).json(Utils.parseStringError("This email is already verified", "email"));

        //sending response
        res.json({ status: true });

        //sending verification and saving user
        req.user.addEmailConfirmationHandle(req.user.email, req.app.mailer);
        req.user.save().catch(error => console.log(error));
    },

    updateCarerDetails: function(req, res)
    {
        locationHandler.getCustomLocation(req)
            .then(address => {

                //updating values
                try
                {
                    var eligibleRoles = JSON.parse(req.body.eligible_roles);
                }
                catch (error)
                {
                    var eligibleRoles = []
                }

                req.user.phone_number = req.body.phone_number || req.user.phone_number;
                req.user.carer.max_job_distance = req.body.max_job_distance || req.user.carer.max_job_distance;
                req.user.carer.eligible_roles = eligibleRoles.length ? eligibleRoles : req.user.carer.eligible_roles;

                if(req.body.address_line_1 && req.body.city && req.body.postal_code) //if required fields are not present then don't update address
                    req.user.address = address;

                //saving user and sending response
                req.user
                    .save()
                    .then(user => res.json({ status: true }))
                    .catch(error => console.log(error));
            })
    }
}

