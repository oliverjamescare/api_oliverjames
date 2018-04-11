/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const bcrypt = require('bcrypt-nodejs');

//custom
const User = require("../../models/User").schema;
const Utils = require('../../services/utils');
const PaymentsHandler = require('../../services/PaymentsHandler');
const fileHandler = require("../../services/fileHandler");

module.exports = {

    updateCard: function (req, res)
    {
        //validation
        let errors;
        req.check("token").notEmpty().withMessage('Token field is required.');

        if(errors = req.validationErrors())
            return res.status(406).json({ errors: errors });

        //create / update request
        const paymentsHandler = new PaymentsHandler();
        const customerRequest = !req.user.care_home.payment_system.customer_id ? paymentsHandler.createCustomer(req.body.token, req.user) : paymentsHandler.updateCustomer(req.body.token, req.user);

        customerRequest
            .then(customer => {

            //sending response
            res.json({ status: true });

            //saving user
            req.user.care_home.set({
                payment_system: {
                    customer_id: customer.id,
                    card_number: customer["sources"]["data"] && customer["sources"]["data"][0] && customer["sources"]["data"][0]["object"] == "card" ? "**** **** **** "+ customer["sources"]["data"][0]["last4"] : null
                }
            });

            req.user.save().catch(error => console.log(error));
        })
        .catch(error => res.status(406).json(Utils.parseStringError(error.message, error.param )));

    },

    updateBankDetails: async function (req, res)
    {
        //validation
        let errors;
        req.check("token").notEmpty().withMessage('Token field is required.');

        if(errors = req.validationErrors())
            return res.status(406).json({ errors: errors });

        // //identity document upload
        // const uploader = fileHandler(req, res);
        // const filePath = await uploader.handleSingleUpload("identity_document", "users/" + req.user._id , { allowedMimeTypes: [ "image/png", "image/jpg", "image/jpeg"] });

        //create / update request
        const paymentsHandler = new PaymentsHandler();
        const accountRequest = !req.user.carer.payment_system.account_id ? paymentsHandler.createCustomAccount(req.body.token, req.user, req.connection.remoteAddress) : paymentsHandler.updateCustomAccount(req.body.token, req.user, req.connection.remoteAddress);

        accountRequest
            .then(account => {

                //sending response
                res.json({ status: true });

                //saving user
                req.user.carer.set({
                    payment_system: {
                        account_id: account.id,
                        bank_number: account["external_accounts"]["data"] && account["external_accounts"]["data"][0] && account["external_accounts"]["data"][0]["object"] == "bank_account" ? "**** **** **** "+ account["external_accounts"]["data"][0]["last4"] : null,
                        // verification: account["legal_entity"]["verification"]
                    }
                });

                req.user.save().catch(error => console.log(error));
            })
            .catch(error => res.status(406).json(Utils.parseStringError(error.message, error.param )));
    }
}

