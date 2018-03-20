/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const ObjectId = require('mongoose').Types.ObjectId;

//custom
const UserModel = require("../../models/User");
const User = UserModel.schema;
const Utils = require("../../services/utils");
const fileHandler = require("../../services/fileHandler");

module.exports = {
	getCarers: async function(req, res)
	{
		//params
		const sort = req.query.sort;
        const search = req.query.search || "";
        const pattern = new RegExp("^.*" + search + ".*$");


		const query = {
			carer: { $exists: true },
			$or:[
                { 'carer.first_name': { $regex: pattern, $options: "xi" } },
				{'carer.surname': { $regex: pattern, $options: "xi" } }
            ]
		};

		//search by id
		if(ObjectId.isValid(search))
		    query.$or.push({ _id: search });

        const options = {
            select: {
            	activation_date: 1,
				status: 1,
				banned_until: 1,
				notes: 1,
            	'carer.first_name': 1,
            	'carer.surname': 1,
            	'carer.surname': 1,
				'carer.date_of_birth': 1,
				'carer.reviews': 1,
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
                options["sort"] = { 'carer.first_name': 1 };
                break
            }
            case "name_desc":
            {
                options["sort"] = { 'carer.first_name': -1 };
                break
            }
            case "date_of_birth_asc":
            {
                options["sort"] = { 'carer.date_of_birth': 1 };
                break
            }
            case "date_of_birth_desc":
            {
                options["sort"] = { 'carer.date_of_birth': -1 };
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
            case "rating_asc":
            {
                options["sort"] = { 'carer.reviews.average': 1 };
                break
            }
            case "rating_desc":
            {
                options["sort"] = { 'carer.reviews.average': -1 };
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
		const carers = await Utils.paginate(User, { query: query, options: options }, req);
        let paginated = Utils.parsePaginatedResults(carers);
        paginated.results.map(user => User.parse(user, req));

        res.json(paginated);
	},
	
	getCarer: async function (req, res)
    {
		const user = await User.findOne(
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
					notes: 1,
					status: 1,
                    banned_until: 1
				}
			).lean();

		//user not found
		if(!user)
            return res.status(404).json(Utils.parseStringError("User not found", "user"));

        res.json(User.parse(user, req));
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

		//updating carer
        user.set({
			status: body.status || user.status,
			notes: body.notes || user.notes,
			banned_until: body.banned_until || user.banned_until
		});

        user.carer.set({
            first_name: carer.first_name || user.carer.first_name,
            surname: carer.surname || user.carer.surname,
            middle_name: carer.middle_name || user.carer.middle_name,
            date_of_birth: carer.date_of_birth || user.carer.date_of_birth,
            reference: {
                references: carer.reference.references || user.carer.reference.references
            },
            dbs: {
                status: carer.dbs.status || user.carer.dbs.status,
                ref_number: carer.dbs.ref_number || user.carer.dbs.ref_number,
                dbs_date: carer.dbs.dbs_date || user.carer.dbs.dbs_date
            },
            joining_care_experience: carer.joining_care_experience || user.carer.joining_care_experience,
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
            },
            eligible_roles: carer.eligible_roles || user.carer.eligible_roles
        })

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
    }
}
