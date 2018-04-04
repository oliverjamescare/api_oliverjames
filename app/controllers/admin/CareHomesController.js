//core
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require('bcrypt-nodejs');

//models
const UserModel = require("../../models/User");
const User = UserModel.schema;

//services
const Utils = require("../../services/utils");
const fileHandler = require("../../services/fileHandler");

module.exports = {
	getCareHomes: async function(req, res)
	{
		//params
		const sort = req.query.sort;
        const search = req.query.search || "";
        const pattern = new RegExp("^.*" + search + ".*$");

        const query = {
            care_home: { $exists: true },
            $or:[{'care_home.name': { $regex: pattern, $options: "xi" } }]
        };

		//search by id
		if(ObjectId.isValid(search)){
            query.$or.push({ _id: search });
        }

        const options = {
            select: {
            	activation_date: 1,
				status: 1,
				banned_until: 1,
                notes: 1,
                created: 1,
                address: 1,
            	'care_home.name': 1,
            	'care_home.care_service_name': 1
			},
			lean: true,
			leanWithId: false
        };

        //sort
        switch (sort)
		{
            case "id_desc":
            {
                options["sort"] = { _id: -1 };
                break
            }
            case "name_asc":
            {
                options["sort"] = { 'care_home.name': 1 };
                break
            }
            case "name_desc":
            {
                options["sort"] = { 'care_home.name': -1 };
                break
            }
            case "care_service_name":
            {
                options["sort"] = { 'care_home.care_service_name': 1 };
                break
            }
            case "care_service_name":
            {
                options["sort"] = { 'care_home.care_service_name': -1 };
                break
            }
            case "activation_date_asc":
            {
                options["sort"] = { activation_date: 1 };
                break
            }
            case "activation_date_desc":
            {
                options["sort"] = { activation_date: -1 };
                break
            }
            case "status_asc":
            {
                options["sort"] = { status: 1 };
                break
            }
            case "status_desc":
            {
                options["sort"] = { status: -1 };
                break
            }
            case "banned_until_asc":
            {
                options["sort"] = { banned_until: 1 };
                break
            }
            case "banned_until_desc":
            {
                options["sort"] = { banned_until: -1 };
                break
            }
            default:
			{
				options["sort"] = { _id: 1 };
				break;
			}
        }

		//pagination and parsing
		const carehomes = await Utils.paginate(User, { query: query, options: options }, req);
        let paginated = Utils.parsePaginatedResults(carehomes);
        paginated.results.map(user => User.parse(user, req));

        res.json(carehomes);
    },

    getCareHome: async function(req, res)
    {
        const careHome = await User.find(
            { care_home: { $exists: true }, _id: req.params.id }
        ).select('-care_home.jobs')
        .exec();
        res.json(careHome)
    },

    updateCareHome: async function(req, res)
    {
        //getting user
        const user = await User.findOne({ care_home: { $exists: true }, _id: req.params.id } );

        //user not found
        if(!user)
            return res.status(404).json(Utils.parseStringError("User not found", "user"));

        //file upload
        const uploader = fileHandler(req, res);
        const filePath = await uploader.handleSingleUpload("file", "users" + user._id , {
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

        user.care_home.set({
            care_service_name: body.care_service_name || user.care_service_name,
            type_of_home: body.type_of_home || user.type_of_home,
            name: body.name || user.name
        })

        user.care_home.set({
            general_guidance: {
                superior_contact: body.superior_contact || user.care_home.superior_contact,
                report_contact: body.report_contact || user.report_contact.report_contact,
                emergency_guidance: body.emergency_guidance || user.care_home.emergency_guidance,
                notes_for_carers: body.notes_for_carers || user.care_home.notes_for_carers,
                parking: body.parking || user.care_home.parking,
                floor_plan: filePath || user.care_home.general_guidance.floor_plan
            }
        })

        user.save()
        .then(() => res.json({status: true}))
        .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)))
    },

    addCarer: async function (req, res)
    {
        //getting new user id and preparing address
        const id = mongoose.Types.ObjectId();

        //cv upload
        const uploader = fileHandler(req, res);
        const filePath = await uploader.handleSingleUpload("file", "users" + user._id , {
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
        const address = await locationHandler.getCustomLocation(body.address);

        //user
        let user = new User({
            _id: id,
            email: body.email,
            password: body.password,
            phone_number: body.phone_number,
            notes: body.notes || null,
            address: address,
            activation_date: new Date(),
            roles: ["CARE_HOME"],
            banned_until: null
        })

        user.care_home.set({
            care_service_name: body.care_service_name ,
            type_of_home: body.type_of_home ,
            name: body.name,
            gender_preference: body.gender_preference
        })

        user.care_home.set({
            general_guidance: {
                superior_contact: body.superior_contact,
                report_contact: body.report_contact,
                emergency_guidance: body.emergency_guidance,
                notes_for_carers: body.notes_for_carers,
                parking: body.parking,
                floor_plan: filePath
            }
        })



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
    }

}