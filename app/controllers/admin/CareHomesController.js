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
        
        // const carehomes  = await User.find(
        //     {
        //         $or: [
        //             { 'care_home': { $exists: true } }
        //         ]
        //     }).select('-care_home.jobs')
        //     .exec();

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

//     "care_home": {
//         "care_service_name": "Michal",
//         "type_of_home": "Residential",
//         "name": "Michal",
//         "_id": "5a93f6cae13b802cf2471ffe",
//         "general_guidance": {
//           "floor_plan": "users/5a93f6cae13b802cf2471ffd/1519654131670michal-hajduga.pdf",
//           "parking": "adadadsad",
//           "notes_for_carers": "dadadasdas",
//           "emergency_guidance": "dasdaddsd",
//           "report_contact": "dasdsadas",
//           "superior_contact": "sdasdas"
//         },
//   }

    updateCareHome: async function(req, res)
    {
        //getting user
        const user = await User.findOne({ care_home: { $exists: true }, _id: req.params.id } );

        //user not found
        if(!user)
            return res.status(404).json(Utils.parseStringError("User not found", "user"));

        //cv upload
        const uploader = fileHandler(req, res);
        const filePath = await uploader.handleSingleUpload("cv", "users/" , {
            allowedMimeTypes: [
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/pdf",
                "image/png",
                "image/jpg",
                "image/jpeg",
            ],
            maxFileSize: 10,
            skipCondition: () => !req.body.first_name || !req.body.surname
        });

        console.log(req.body)
        console.log(req.params)

        const body = req.body;

        user.care_home.set({
            care_service_name: body.care_service_name || user.care_service_name,
            type_of_home: body.type_of_home || user.type_of_home,
            name: body.name || user.name
        })

        user.save()
        .then(() => res.json({status: true}))
        .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)))
    }
}