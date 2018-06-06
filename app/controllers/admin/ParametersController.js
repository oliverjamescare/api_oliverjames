//modules
const moment = require("moment");

//models
const Setting = require('./../../models/Setting').schema;
const { roles } = require('./../../models/schemas/GeneralPriceMatrix');
const Utils = require("../../services/utils");

module.exports = {
    getCommissionParameters: async function(req, res)
    {
        const settings = await Setting.findOne({ type: "general_commission" }, {
            "general_commission.app_commission": 1,
            "general_commission.max_to_deduct": 1,
            "general_commission.manual_booking_pricing": 1,
        }).exec();

        res.json({ general_commission: settings.general_commission })
    },

    updateCommissionParameters: async function(req, res)
    {
        //updating settings
        const settings = await Setting.findOne({ type: "general_commission" }).exec();
        settings.set({
            general_commission: {
                app_commission: req.body.app_commission || settings.general_commission.app_commission,
                max_to_deduct: req.body.max_to_deduct || settings.general_commission.max_to_deduct,
                manual_booking_pricing: req.body.manual_booking_pricing || settings.general_commission.manual_booking_pricing
            }
        });

        settings
            .save()
            .then(() => res.json({ status: true }))
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },

    getNotificationsParameters: async function(req, res)
    {
        const settings = await Setting.findOne({ type: "notifications" }, {
            "notifications.preferred": 1,
            "notifications.starsFourToFive": 1,
            "notifications.starsThreeToFour": 1,
            "notifications.unrated": 1,
            "notifications.starsTwoToThree": 1,
            "notifications.starsOneToTwo": 1
        }).exec();

        res.json({ notifications: settings.notifications })
    },

    updateNotificationsParameters: async function(req, res)
    {
        //updating settings
        const settings = await Setting.findOne({ type: "notifications" }).exec();
        settings.set({
            notifications: {
                preferred: req.body.preferred || settings.notifications.preferred,
                starsFourToFive: req.body.starsFourToFive || settings.notifications.starsFourToFive,
                starsThreeToFour: req.body.starsThreeToFour || settings.notifications.starsThreeToFour,
                unrated: req.body.unrated || settings.notifications.unrated,
                starsTwoToThree: req.body.starsTwoToThree || settings.notifications.starsTwoToThree,
                starsOneToTwo: req.body.starsOneToTwo || settings.notifications.starsOneToTwo,
            }
        });

        settings.save().then(() => res.json({ status: true })).catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },

    getGeneralPricingRoles: async function(req, res)
    {
        //getting and parsing roles
        const pricingRoles = await Setting.find({ type: "general_price_matrix" }, { "general_price_matrix.role": 1 }).lean().exec();
        const roles = pricingRoles.map(pricingRole => { return { _id: pricingRole._id, role: pricingRole.general_price_matrix.role } });

        //sending response
        res.json({ roles });
    },

    getGeneralPricing: async function(req, res)
    {
        //getting specific role
        const pricingRole = await Setting.findOne({ type: "general_price_matrix", _id: req.params.id }, { "general_price_matrix.role": 1, "general_price_matrix.pricing": 1 })
            .lean()
            .exec()
            .catch(error => console.log("Invalid object id"));

        //not found
        if(!pricingRole)
            return res.status(404).json(Utils.parseStringError("Pricing role not found", "role"));

        //parsing and sending response
        res.json({ _id: pricingRole._id, role: pricingRole.general_price_matrix.role, pricing: pricingRole.general_price_matrix.pricing });
    },

    updateGeneralPricing: async function(req, res)
    {
        //getting specific role
        const pricingRole = await Setting.findOne({ type: "general_price_matrix", _id: req.params.id }).exec().catch(error => console.log("Invalid object id"));

        //not found
        if(!pricingRole)
            return res.status(404).json(Utils.parseStringError("Pricing role not found", "role"));

	    //updating settings
        pricingRole.general_price_matrix.pricing = req.body || pricingRole.general_price_matrix.pricing;
        pricingRole
            .save()
            .then(() => res.json({ status: true }))
            .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },

	getSpecialDates: async function(req, res)
	{
	    //getting dates
		const specialDates = await Setting.find({ type: "special_price_matrix" }, { "special_price_matrix.role": 1, "special_price_matrix.date": 1 }).lean().exec();
		const special_dates = specialDates.map(specialDate => { return { _id: specialDate._id, date: moment(specialDate.special_price_matrix.date).format("YYYY-MM-DD"), role: specialDate.special_price_matrix.role} });

		//sending response
		res.json({ special_dates });

	},

	getPricingSpecialDate: async function(req, res)
	{
	    //getting special date pricing
		const specialDate = await Setting.findOne({ type: "special_price_matrix", _id: req.params.id }, { "special_price_matrix.role": 1, "special_price_matrix.date": 1, "special_price_matrix.pricing": 1, })
            .lean()
            .exec()
            .catch(error => console.log("Invalid object id"));

		//not found
		if(!specialDate)
			return res.status(404).json(Utils.parseStringError("Special date pricing not found", "special_date"));

		//sending response
		res.json({
            _id: specialDate._id,
            date: moment(specialDate.special_price_matrix.date).format("YYYY-MM-DD"),
            role: specialDate.special_price_matrix.role,
            pricing: specialDate.special_price_matrix.pricing,
		});
	},

    addPricingSpecialDate: async function(req, res)
    {
        //preparing date and role
	    const date = !isNaN(Date.parse(req.body.date)) ? new Date(req.body.date) :  false;
	    if(!date)
		    return res.status(406).json(Utils.parseStringError("Invalid date", "date"));
	    else
	        date.setHours(0,0,0,0);

	    if(!Object.values(roles).includes(req.body.role))
		    return res.status(406).json(Utils.parseStringError("Invalid role", "role"));

        //checking if date for this role doesn't exists
	    const exists = await Setting.count({ type: "special_price_matrix", "special_price_matrix.date": date, "special_price_matrix.role": req.body.role });

	    console.log(exists);
	    if(Boolean(exists))
		    return res.status(409).json(Utils.parseStringError("Special date for this day already exists", "special_date"));


        const specialPriceMatrix = new Setting({
            type: "special_price_matrix",
            special_price_matrix: {
                role: req.body.role,
                date: date,
                pricing: req.body.pricing
            }
        });

        //validation and saving special date
	    specialPriceMatrix
		    .save()
		    .then(specialPriceMatrix => res.status(201).json({ status: true, _id: specialPriceMatrix._id }))
		    .catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
    },

	updatePricingSpecialDate: async function(req, res)
	{
		//getting special date pricing
		const specialDate = await Setting.findOne({ type: "special_price_matrix", _id: req.params.id }).exec().catch(error => console.log("Invalid object id"));

		//not found
		if(!specialDate)
			return res.status(404).json(Utils.parseStringError("Special date pricing not found", "special_date"));

		//updating special date pricing
		specialDate.special_price_matrix.pricing = req.body || specialDate.special_price_matrix.pricing;
		specialDate
			.save()
			.then(() => res.json({ status: true }))
			.catch(error => res.status(406).json(Utils.parseValidatorErrors(error)));
	},

	deletePricingSpecialDate: async function(req, res)
	{
		//getting special date pricing
		const specialDate = await Setting.findOne({ type: "special_price_matrix", _id: req.params.id }).exec().catch(error => console.log("Invalid object id"));

		//not found
		if(!specialDate)
			return res.status(404).json(Utils.parseStringError("Special date pricing not found", "special_date"));

		//sending response
		res.json({ status: true });

		//removing special date
		specialDate.remove().catch(error => console.log(error))
	}
}
