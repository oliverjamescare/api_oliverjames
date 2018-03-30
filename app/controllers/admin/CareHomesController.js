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
    }
}