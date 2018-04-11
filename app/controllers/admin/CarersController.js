/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require('bcrypt-nodejs');

//models
const UserModel = require("../../models/User");
const TransactionSchema = require("./../../models/schemas/Transaction");
const User = UserModel.schema;

//services
const Utils = require("../../services/utils");
const fileHandler = require("../../services/fileHandler");
const locationHandler = require('../../services/locationHandler');

module.exports = {
	getCarers: async function(req, res)
	{
		//params
		const sort = req.query.sort;
        const search = req.query.search || "";
        const statusFilter = req.query["status_filter"]
        const pattern = new RegExp("^.*" + search + ".*$");

		const pipeline = [
            {
                $project: {
                    activation_date: 1,
                    status: 1,
                    banned_until: 1,
                    notes: 1,
                    'carer.first_name': 1,
                    'carer.surname': 1,
                    'carer.surname': 1,
                    'carer.date_of_birth': 1,
                    'carer.reviews': 1,
                    'fullname': { $concat: [ '$carer.first_name', " ", '$carer.surname' ] },
                    'confirmed_deductions': {
                        $filter: {
                            input: '$carer.deductions',
                            as: "deduction",
                            cond: {
                                $eq: [ '$$deduction.status', TransactionSchema.transactionStatuses.CONFIRMED ]
                            }
                        }
                    }
                }
            },
            {
                $match: {
                    carer: { $exists: true },
                    $or:[
                        { 'carer.first_name': { $regex: pattern, $options: "xi" } },
                        { 'carer.surname': { $regex: pattern, $options: "xi" } },
                        { 'fullname': { $regex: pattern, $options: "i" } },
                    ],
                }
            },
            {
                $project: {
                    activation_date: 1,
                    status: 1,
                    banned_until: 1,
                    notes: 1,
                    'carer.first_name': 1,
                    'carer.surname': 1,
                    'carer.surname': 1,
                    'carer.date_of_birth': 1,
                    'carer.reviews': 1,
                    'carer.deductions_balance': { $sum: '$confirmed_deductions.amount' }
                }
            },
        ];

		//search by id
		if(ObjectId.isValid(search))
            pipeline[1].$match.$or.push({ _id: ObjectId(search) });

        //status filter
        switch (statusFilter)
        {
            case UserModel.statuses.CREATED:
            {
                pipeline[1].$match["status"] = UserModel.statuses.CREATED;
                break;
            }
            case UserModel.statuses.ACTIVE:
            {
                pipeline[1].$match["status"] = UserModel.statuses.ACTIVE;
                break;
            }
            case UserModel.statuses.BANNED:
            {
                pipeline[1].$match["status"] = UserModel.statuses.BANNED;
                break;
            }
        }

        const options = {};

        //sort
        switch (sort)
		{
            case "id_desc":
            {
                options["sortBy"] = { _id: -1 };
                break
            }
            case "name_asc":
            {
                options["sortBy"] = { 'carer.first_name': 1 };
                break
            }
            case "name_desc":
            {
                options["sortBy"] = { 'carer.first_name': -1 };
                break
            }
            case "date_of_birth_asc":
            {
                options["sortBy"] = { 'carer.date_of_birth': 1 };
                break
            }
            case "date_of_birth_desc":
            {
                options["sortBy"] = { 'carer.date_of_birth': -1 };
                break
            }
            case "activation_date_asc":
            {
                options["sortBy"] = { activation_date: 1 };
                break
            }
            case "activation_date_desc":
            {
                options["sortBy"] = { activation_date: -1 };
                break
            }
            case "rating_asc":
            {
                options["sortBy"] = { 'carer.reviews.average': 1 };
                break
            }
            case "rating_desc":
            {
                options["sortBy"] = { 'carer.reviews.average': -1 };
                break
            }
            case "status_asc":
            {
                options["sortBy"] = { status: 1 };
                break
            }
            case "status_desc":
            {
                options["sortBy"] = { status: -1 };
                break
            }
            case "banned_until_asc":
            {
                options["sortBy"] = { banned_until: 1 };
                break
            }
            case "banned_until_desc":
            {
                options["sortBy"] = { banned_until: -1 };
                break
            }
            case "deductions_balance_asc":
            {
                options["sortBy"] = { 'carer.deductions_balance': 1 };
                break
            }
            case "deductions_balance_desc":
            {
                options["sortBy"] = { 'carer.deductions_balance': -1 };
                break
            }
            default:
			{
				options["sortBy"] = { _id: 1 };
				break;
			}
		}

		//pagination and parsing
		const carers = await Utils.paginate(User, { query: User.aggregate(pipeline), options: options }, req, true);
        let paginated = Utils.parsePaginatedResults(carers);
        paginated.results.map(user => User.parse(user, req));

        res.json(paginated);
	},
	
	getCarer: async function (req, res)
    {
		let user = await User.findOne(
				{ carer: { $exists: true }, _id: req.params.id },
				{
					'carer.first_name': 1,
					'carer.surname': 1,
					'carer.middle_name': 1,
					'carer.training_record': 1,
                    'carer.date_of_birth': 1,
                    'carer.joining_care_experience': 1,
                    'carer.cv_uploads': 1,
					'carer.dbs': 1,
					'carer.reference.references.name': 1,
					'carer.reference.references.type': 1,
					'carer.reference.files': 1,
					'carer.eligible_roles': 1,
                    'carer.deductions.amount': 1,
                    'carer.deductions.description': 1,
                    'carer.deductions.created': 1,
                    'carer.deductions.status': 1,
					notes: 1,
					status: 1,
                    banned_until: 1
				}
			).lean();

		//user not found
		if(!user)
            return res.status(404).json(Utils.parseStringError("User not found", "user"));

		user = User.parse(user, req);
		user.carer["deductions_balance"] = user.carer.deductions.reduce((acumulator, item) => item.status == TransactionSchema.transactionStatuses.CONFIRMED ? acumulator + item.amount : acumulator, 0)

        res.json(user);
    },

	updateCarer: async function(req, res)
	{
		//getting user
        const user = await User.findOne({ carer: { $exists: true }, _id: req.params.id } );

        //user not found
        if(!user)
            return res.status(404).json(Utils.parseStringError("User not found", "user"));

		const body = req.body;
		const carer = req.body.carer;

		//updating user
        user.set({
			status: body.status || user.status,
			notes: body.notes || user.notes,
			banned_until: body.banned_until || user.banned_until
		});

        //carer
        if(carer)
        {
            user.carer.set({
                first_name: carer.first_name || user.carer.first_name,
                surname: carer.surname || user.carer.surname,
                middle_name: carer.middle_name || user.carer.middle_name,
                date_of_birth: carer.date_of_birth || user.carer.date_of_birth,
                joining_care_experience: carer.joining_care_experience || user.carer.joining_care_experience,
                eligible_roles: carer.eligible_roles || user.carer.eligible_roles
            });

            //reference
            if(carer.reference)
            {
                user.carer.set({
                    reference: {
                        references: carer.reference.references || user.carer.reference.references
                    }
                });
            }

            //dbs
            if(carer.dbs)
            {
                user.carer.set({
                    dbs: {
                        status: carer.dbs.status || user.carer.dbs.status,
                        ref_number: carer.dbs.ref_number || user.carer.dbs.ref_number,
                        dbs_date: carer.dbs.dbs_date || user.carer.dbs.dbs_date
                    }
                });
            }

            //training record
            if(carer.training_record)
            {
                user.carer.set({
                    training_record: {
                        other: carer.training_record.other || user.carer.training_record.other,
                        fire_safety: carer.training_record.fire_safety || user.carer.training_record.fire_safety,
                        dementia: carer.training_record.dementia || user.carer.training_record.dementia,
                        h_and_s: carer.training_record.h_and_s || user.carer.training_record.h_and_s,
                        first_aid_awareness: carer.training_record.first_aid_awareness || user.carer.training_record.first_aid_awareness,
                        first_aid_and_basic_life_support: carer.training_record.first_aid_and_basic_life_support || user.carer.training_record.first_aid_and_basic_life_support,
                        infection_control: carer.training_record.infection_control || user.carer.training_record.infection_control,
                        medication_management: carer.training_record.medication_management || user.carer.training_record.medication_management,
                        manual_handling_people: carer.training_record.manual_handling_people || user.carer.training_record.manual_handling_people,
                        safeguarding: carer.training_record.safeguarding || user.carer.training_record.safeguarding,
                        qualifications: carer.training_record.qualifications || user.carer.training_record.qualifications
                    }
                });
            }
        }

        //carer activation
		if(user.status == UserModel.statuses.ACTIVE)
			user.activation_date = user.activation_date || new Date();

		user
            .save()
            .then(() => res.json({ status: true }))
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
	},

    uploadCarerResource: async function(req, res)
    {
        //checking resource
        const resources = [
            "reference",
            "dbs",
            "training_record",
            "cv"
        ];

        if(resources.indexOf(req.params.resource) == -1)
            return res.status(406).json(Utils.parseStringError("Invalid resource", "resource"));

        //getting user
        const user = await User.findOne({ carer: { $exists: true }, _id: req.params.id } );

        //user not found
        if(!user)
            return res.status(404).json(Utils.parseStringError("User not found", "user"));


        //file upload
        const uploader = fileHandler(req, res);
        const filePaths = await uploader.handleMultiFilesUpload("files", "users/" +  user._id,
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

        //saving files
        if(filePaths)
        {
            if(req.params.resource == "cv")
            {
                filePaths.forEach(path => user.carer.cv_uploads.push(path));
                user.save().catch(error => console.log(error));
            }
            else
            {
                filePaths.forEach(path => user.carer[req.params.resource].files.push(path));
                user.save().catch(error => console.log(error));
            }
        }

        res.json({ status: true })
    },

    deleteCarerResourceFile: async function(req, res)
    {
        //checking resource
        const resources = [
            "reference",
            "dbs",
            "training_record",
            "cv"
        ];

        if(resources.indexOf(req.params.resource) == -1)
            return res.status(406).json(Utils.parseStringError("Invalid resource", "resource"));

        //getting user
        const user = await User.findOne({ carer: { $exists: true }, _id: req.params.id } );

        //user not found
        if(!user)
            return res.status(404).json(Utils.parseStringError("User not found", "user"));

        //getting file name
        const handler = fileHandler(req, res);
        const fileName = handler.getFileFromUrl(req.query.file);


        if(req.params.resource == "cv")
        {
            if(user.carer.cv_uploads.indexOf(fileName) == -1)
                return res.status(404).json(Utils.parseStringError("File not found", "file"));
            else
                user.carer.cv_uploads.pull(fileName);
        }
        else
        {
            if(user.carer[req.params.resource].files.indexOf(fileName) == -1)
                return res.status(404).json(Utils.parseStringError("File not found", "file"));
            else
                user.carer[req.params.resource].files.pull(fileName);
        }

        //removing file and saving user
        user.save().catch(error => console.log(error));
        handler.deleteFile(fileName);

        res.json({ status: true })
    },

    addCarer: async function (req, res)
    {
        //getting new user id and preparing address
        const id = mongoose.Types.ObjectId();

        //preparing address
        const address = await locationHandler.getCustomLocation(req.body.address);

        //user
        let user = new User({
            _id: id,
            email: req.body.email,
            password: req.body.password,
            phone_number: req.body.phone_number,
            notes: req.body.notes || null,
            address: address,
            activation_date: new Date(),
            roles: ["CARER"],
            carer: {
                created_by_admin: true
            }
        });


        //carer
        const carer = req.body.carer;
        if(carer)
        {
            user.carer.set({
                first_name: carer.first_name,
                surname: carer.surname,
                middle_name: carer.middle_name || null,
                date_of_birth: carer.date_of_birth,
                eligible_roles: carer.eligible_roles || [],
                joining_care_experience: carer.joining_care_experience
            });

            //reference
            if(carer.reference)
                user.carer.reference.references = carer.reference.references;

            //dbs
            if(carer.dbs)
            {
                user.carer.set({
                    dbs: {
                        status: carer.dbs.status || "Clear",
                        ref_number: carer.dbs.ref_number || null,
                        dbs_date: carer.dbs.dbs_date || null
                    }
                });
            }

            //training record
            if(carer.training_record)
            {
                user.carer.set({
                    training_record: {
                        other: carer.training_record.other || null,
                        fire_safety: carer.training_record.fire_safety || null,
                        dementia: carer.training_record.dementia  || null,
                        h_and_s: carer.training_record.h_and_s || null,
                        first_aid_awareness: carer.training_record.first_aid_awareness || null,
                        first_aid_and_basic_life_support: carer.training_record.first_aid_and_basic_life_support || null,
                        infection_control: carer.training_record.infection_control  || null,
                        medication_management: carer.training_record.medication_management || null,
                        manual_handling_people: carer.training_record.manual_handling_people || null,
                        safeguarding: carer.training_record.safeguarding || null,
                        qualifications: carer.training_record.qualifications || null
                    }
                });
            }
        }

        user
            .validate()
            .then(() => {

                //sending response
                res.status(201).json({ status: true, _id: id });

                //hashing password, sending email verification and saving user
                bcrypt.hash(user.password, null, null, (error, hash) => {
                    user.addEmailConfirmationHandle(user.email, req.app.mailer);
                    user.password = hash;

                    user.save().catch(error => console.log(error));
                });
            })
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },

    addDeduction: async function(req, res)
    {
        //getting user
        const user = await User.findOne({ carer: { $exists: true }, _id: req.params.id } );

        //user not found
        if(!user)
            return res.status(404).json(Utils.parseStringError("User not found", "user"));

        //deduction type handle
        const deductionTypes = ["DEBIT", "CREDIT"]
        const type = req.body.type;

        if(deductionTypes.indexOf(type) == -1)
            return res.status(406).json(Utils.parseStringError("Invalid type", "type"));

        //amount
        const amount = parseFloat(req.body.amount)
        if(amount <= 0 || isNaN(amount))
            return res.status(406).json(Utils.parseStringError("Amount must be greater than 0", "amount"));

        //adding deduction and checking balance
        user.carer.addDeduction(type == "DEBIT" ? - amount : amount, null, req.body.description || " ", TransactionSchema.transactionStatuses.CONFIRMED);
        const balance = user.carer.getDeductionsBalance();
        if(balance < 0)
            return res.status(406).json(Utils.parseStringError("Can't add deduction, because this will cause negative balance", "amount"));

        user
            .save()
            .then(() => res.status(201).json({ status: true }))
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    }
}
