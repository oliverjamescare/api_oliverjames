
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
}
