/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const bcrypt = require('bcrypt-nodejs');

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

    profile: async function(req, res)
    {
        //general user properties
        let user = {
            _id: req.user._id,
            email: req.user.email,
            phone_number: req.user.phone_number,
            email_verified: req.user.email_verified,
            address: req.user.address.toObject()
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
        }

        //care home properties
        if(req.user.care_home)
        {
	        await req.user.populate({ path: "care_home.blocked_carers", select: { "carer.first_name": 1, "carer.surname": 1 } }).execPopulate();

            user["care_home"] = {
                name: req.user.care_home.name,
                care_service_name: req.user.care_home.care_service_name,
                type_of_home: req.user.care_home.type_of_home,
                general_guidance: req.user.care_home.general_guidance,
                gender_preference: req.user.care_home.gender_preference,
                blocked_carers: req.user.care_home.blocked_carers
            }
        }

        return res.json(User.parse(user, req));
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

    updateProfileImage: async function(req, res)
    {
        //profile image upload
        const uploader = fileHandler(req, res);
        const filePath = await uploader.handleSingleUpload("profile_image", "users/" +  req.user._id, { allowedMimeTypes: [ "image/jpeg", "image/jpg", "image/png" ], fileToRemove: req.user.carer.profile_image });

        //saving new profile image
	    req.user.carer.profile_image =  filePath || req.user.carer.profile_image;;
	    req.user.save().catch(error => console.log(error));

		//sending response
		res.json({ status: true });
    },

    changeEmail: function (req, res)
    {
        const email = req.user.email;
        req.user.email = req.body.email;

        req.user
            .validate()
            .then(() => {

                //sending response
                res.json({ status: true });

                //sending verification and saving user
                if(req.user.email != email)
                {
                    req.user.email_verified = false;
                    req.user.addEmailConfirmationHandle(req.user.email, req.app.mailer);
                    req.user.save().catch(error => console.log(error));
                }
            })
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },

    resendEmailVerification: function (req, res)
    {
        if(req.user.email_verified)
            return res.status(409).json(Utils.parseStringError("This email has already been verified", "email"));

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
                    .then(() => res.json({ status: true }))
	                .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
            })
    },

	updateCareHomeDetails: async function(req, res)
	{
		//floor plan upload
		const uploader = fileHandler(req, res);
		const filePath = await uploader.handleSingleUpload("floor_plan", "users/" +  req.user._id,
            {
	            allowedMimeTypes: [
		            "application/msword",
		            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		            "application/pdf",
		            "image/png",
		            "image/jpg",
		            "image/jpeg",
	            ],
	            maxFileSize: 10
            });

	    //address handle
	    const address = await locationHandler.getCustomLocation(req);

		//updating values
		req.user.phone_number = req.body.phone_number || req.user.phone_number;
		req.user.care_home.name = req.body.name || req.user.care_home.name;
		req.user.care_home.care_service_name = req.body.care_service_name || req.user.care_home.care_service_name;
		req.user.care_home.type_of_home = req.body.type_of_home || req.user.care_home.type_of_home;
		req.user.care_home.gender_preference = req.body.gender_preference || req.user.care_home.gender_preference;

		//general guidance
		req.user.care_home.general_guidance.superior_contact = req.body.superior_contact || req.user.care_home.general_guidance.superior_contact;
		req.user.care_home.general_guidance.report_contact = req.body.report_contact || req.user.care_home.general_guidance.report_contact;
		req.user.care_home.general_guidance.emergency_guidance = req.body.emergency_guidance || req.user.care_home.general_guidance.emergency_guidance;
		req.user.care_home.general_guidance.notes_for_carers = req.body.notes_for_carers || req.user.care_home.general_guidance.notes_for_carers;
		req.user.care_home.general_guidance.parking = req.body.parking || req.user.care_home.general_guidance.parking;
		req.user.care_home.general_guidance.floor_plan = filePath || req.user.care_home.general_guidance.floor_plan;


		if(req.body.address_line_1 && req.body.city && req.body.postal_code) //if required fields are not present then don't update address
			req.user.address = address;

		//saving user and sending response
		req.user
			.save()
			.then(() => res.json({ status: true }))
			.catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
	},
}

