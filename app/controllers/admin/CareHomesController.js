//core
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require('bcrypt-nodejs');

//models
const UserModel = require("../../models/User");
const User = UserModel.schema;

//services
const Utils = require("../../services/utils");

module.exports = {
	getCareHomes: async function(req, res)
	{
		//params
		const sort = req.query.sort;
        const search = req.query.search || "";
        const statusFilter = req.query["status_filter"]
        const pattern = new RegExp("^.*" + search + ".*$");


		const query = {
			care_home: { $exists: true }
		};

		//search by id
		if(ObjectId.isValid(search))
		    query.$or.push({ _id: search });


		//status filter
		switch (statusFilter)
        {
            case UserModel.statuses.CREATED:
            {
                query["status"] = UserModel.statuses.CREATED;
                break;
            }
            case UserModel.statuses.ACTIVE:
            {
                query["status"] = UserModel.statuses.ACTIVE;
                break;
            }
            case UserModel.statuses.BANNED:
            {
                query["status"] = UserModel.statuses.BANNED;
                break;
            }
        }

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
		const carehomes = await Utils.paginate(User, { query: query, options: options }, req);
        let paginated = Utils.parsePaginatedResults(carehomes);
        paginated.results.map(user => User.parse(user, req));

        res.json(paginated);
    }
}