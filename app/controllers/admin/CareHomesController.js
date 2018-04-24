//core
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require('bcrypt-nodejs');

//models
const UserModel = require("../../models/User");
const CareHomeWaitingUser = require("../../models/CareHomeWaitingUser").schema;
const TransactionSchema = require("./../../models/schemas/Transaction");
const User = UserModel.schema;
const CareHomeSchema = require("./../../models/schemas/CareHome");

//services
const Utils = require("../../services/utils");
const fileHandler = require("../../services/fileHandler");
const locationHandler = require('../../services/locationHandler');

module.exports = {
	getCareHomes: async function(req, res)
	{
		//params
        const sort = req.query.sort;
        const search = req.query.search || "";
        const statusFilter = req.query["status_filter"];
        const pattern = new RegExp("^.*" + search + ".*$");

        const pipeline = [
            {
                $project: {
                    activation_date: 1,
                    status: 1,
                    banned_until: 1,
                    notes: 1,
                    address: 1,
                    'care_home.name': 1,
                    'care_home.care_service_name': 1,
                    'confirmed_credits': {
                        $filter: {
                            input: '$care_home.credits',
                            as: "credit",
                            cond: {
                                $eq: [ '$$credit.status', TransactionSchema.transactionStatuses.CONFIRMED ]
                            }
                        }
                    }
                }
            },
            {
                $match: {
                    care_home: { $exists: true },
                    $or:[
                        { 'care_home.name': { $regex: pattern, $options: "xi" } },
                        { 'care_home.care_service_name': { $regex: pattern, $options: "xi" } },
                        { 'address.postal_code': { $regex: pattern, $options: "xi" } }
                    ],
                }
            },
            {
                $project: {
                    activation_date: 1,
                    status: 1,
                    banned_until: 1,
                    notes: 1,
                    address: 1,
                    'care_home.name': 1,
                    'care_home.care_service_name': 1,
                    'care_home.credits_balance': { $sum: '$confirmed_credits.amount' }
                }
            },
        ];

        //search by id
        if(ObjectId.isValid(search))
            pipeline[1].$match.$or.push({ _id: ObjectId(search) });

        //status filter
        switch (statusFilter)
        {
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
                options["sortBy"] = { 'care_home.name': 1 };
                break
            }
            case "name_desc":
            {
                options["sortBy"] = { 'care_home.name': -1 };
                break
            }
            case "care_service_name_asc":
            {
                options["sortBy"] = { 'care_home.care_service_name': 1 };
                break
            }
            case "care_service_name_desc":
            {
                options["sortBy"] = { 'care_home.care_service_name': -1 };
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
            case "credits_balance_asc":
            {
                options["sortBy"] = { 'care_home.credits_balance': 1 };
                break
            }
            case "credits_balance_desc":
            {
                options["sortBy"] = { 'care_home.credits_balance': -1 };
                break
            }
            default:
			{
				options["sort"] = { _id: 1 };
				break;
			}
        }

		//pagination and parsing
		const careHomes = await Utils.paginate(User, { query: User.aggregate(pipeline), options: options }, req, true);
        let paginated = Utils.parsePaginatedResults(careHomes);
        paginated.results.map(user => User.parse(user, req));

        res.json(paginated);
    },

    getCareHome: async function(req, res)
    {
        let user = await User.findOne(
                { care_home: { $exists: true }, _id: req.params.id },
                {
                    'care_home.name': 1,
                    'care_home.care_service_name': 1,
                    'care_home.type_of_home': 1,
                    'care_home.credits.amount': 1,
                    'care_home.credits.description': 1,
                    'care_home.credits.created': 1,
                    'care_home.credits.status': 1,
                    'care_home.gender_preference': 1,
                    'care_home.general_guidance': 1,
	                'care_home.payment_system.card_number': 1,
                    notes: 1,
                    status: 1,
                    banned_until: 1,
                    email: 1,
                    phone_number: 1,
                    email_verified: 1,
                    activation_date: 1,
                    address: 1
                }
            )
            .populate({ path: "care_home.blocked_carers", select: { "carer.first_name": 1, "carer.surname": 1 } })
            .lean()
            .exec();

        //user not found
        if(!user)
            return res.status(404).json(Utils.parseStringError("User not found", "user"));

        user = User.parse(user, req);
        user.care_home["credits_balance"] = user.care_home.credits.reduce((acumulator, item) => item.status == TransactionSchema.transactionStatuses.CONFIRMED ? acumulator + item.amount : acumulator, 0)

        res.json(user)
    },

    updateCareHome: async function(req, res)
    {
        //getting user
        const user = await User.findOne({ care_home: { $exists: true }, _id: req.params.id } );

        //user not found
        if(!user)
            return res.status(404).json(Utils.parseStringError("User not found", "user"));

        //floor plan upload
        const uploader = fileHandler(req, res);
        const filePath = await uploader.handleSingleUpload("floor_plan", "users/" + user._id , {
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
        const body = req.body;

        //updating user
        user.set({
            status: body.status || user.status,
            notes: body.notes || user.notes,
            banned_until: body.banned_until || user.banned_until
        });

        //updating care home
        user.care_home.set({
            care_service_name: body.care_service_name || user.care_home.care_service_name,
            type_of_home: body.type_of_home || user.care_home.type_of_home,
            name: body.name || user.care_home.name,
            gender_preference: body.gender_preference || user.care_home.gender_preference,
            general_guidance: {
                superior_contact: body.superior_contact || user.care_home.general_guidance.superior_contact,
                report_contact: body.report_contact || user.care_home.general_guidance.report_contact,
                emergency_guidance: body.emergency_guidance || user.care_home.general_guidance.emergency_guidance,
                notes_for_carers: body.notes_for_carers || user.care_home.general_guidance.notes_for_carers,
                parking: body.parking || user.care_home.general_guidance.parking,
                floor_plan: filePath || user.care_home.general_guidance.floor_plan
            }
        });

        //updating address
        const address = await locationHandler.getCustomLocation(body);
        if(body.address_line_1 && body.city && body.postal_code && address.location) //if required fields are not present then don't update address
            user.address = address;

        user.save()
            .then(() => res.json({status: true}))
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)))
    },

    addCareHome: async function (req, res)
    {
        //getting new user id and preparing address
        const id = mongoose.Types.ObjectId();

        //floor plan upload
        const uploader = fileHandler(req, res);
        const filePath = await uploader.handleSingleUpload("floor_plan", "users/" + id , {
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

        const body = req.body;

        //preparing address
        const address = await locationHandler.getCustomLocation(body);
        if(!address || !address.location)
            return res.status(406).json(Utils.parseStringError("Unable to find address", "address"));

        //user
        let user = new User({
            _id: id,
            email: req.body.email ? req.body.email.toString().toLowerCase() : null,
            password: body.password,
            phone_number: body.phone_number,
            notes: body.notes || null,
            address: address,
            activation_date: new Date(),
            roles: ["CARE_HOME"]
        })

        //care home
        user.set({
            care_home: {
                care_service_name: body.care_service_name ,
                type_of_home: body.type_of_home ,
                name: body.name,
                gender_preference: body.gender_preference || CareHomeSchema.genderPreferences.NO_PREFERENCE ,
                general_guidance: {
                    superior_contact: body.superior_contact || null,
                    report_contact: body.report_contact || null,
                    emergency_guidance: body.emergency_guidance || null,
                    notes_for_carers: body.notes_for_carers || null,
                    parking: body.parking || null,
                    floor_plan: filePath || null
                }
            }
        });

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

    addCredits: async function(req, res)
    {
        //getting user
        const user = await User.findOne({ care_home: { $exists: true }, _id: req.params.id } );

        //user not found
        if(!user)
            return res.status(404).json(Utils.parseStringError("User not found", "user"));

        //credit type handle
        const creditTypes = ["DEBIT", "CREDIT"]
        const type = req.body.type;

        if(creditTypes.indexOf(type) == -1)
            return res.status(406).json(Utils.parseStringError("Invalid type", "type"));

        //amount
        const amount = parseFloat(req.body.amount)
        if(amount <= 0 || isNaN(amount))
            return res.status(406).json(Utils.parseStringError("Amount must be greater than 0", "amount"));

        //adding deduction and checking balance
        user.care_home.addCredits(type == "DEBIT" ? - amount : amount, null, req.body.description || " ", TransactionSchema.transactionStatuses.CONFIRMED);
        const balance = user.care_home.getCreditsBalance();
        if(balance < 0)
            return res.status(406).json(Utils.parseStringError("Can't add credits, because this will cause negative balance", "amount"));

        user
            .save()
            .then(() => res.status(201).json({ status: true }))
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },

    getCareHomesWaitingList: async function(req, res)
    {
        const options = {
            select: { name: 1, email: 1, address: 1, created: 1 },
            lean: true,
            leanWithId: false
        };

        //pagination and parsing
        const waitingList = await Utils.paginate(CareHomeWaitingUser, { query: {}, options: options }, req);
        let paginated = Utils.parsePaginatedResults(waitingList);
        paginated.results.map(user => CareHomeWaitingUser.parse(user, req));

        res.json(paginated);
    },

    deleteCareHomesWaitingUser: async function(req, res)
    {
        //getting user
        const user = await CareHomeWaitingUser.findOne({  _id: req.params.id } );

        //user not found
        if(!user)
            return res.status(404).json(Utils.parseStringError("User not found", "user"));

        //sending response
        res.json({ status: true });

        //removing user from waiting list
        user.remove();
    }
}