//core
const bcrypt = require('bcrypt-nodejs');

//services
const Utils = require('./../../services/utils');

//models
const Admin = require("./../../models/Admin").schema;

module.exports = {
    login: function (req, res)
    {
        Admin.findOne({ email: req.body.email }, (error, admin) =>
        {
            //admin not found
            if (!admin)
                return res.status(401).json(Utils.parseStringError("Authorization failed", "auth"));

            bcrypt.compare(req.body.password, admin.password, (error, status) =>
            {
                //wrong password
                if (!status)
                    return res.status(401).json(Utils.parseStringError("Authorization failed", "auth"));

                //generating tokens, updating user and sending response
                admin.generateAccessTokens();
                admin.save().catch(error => console.log(error));

                return res.json({
                        user:
                        {
                            _id: admin._id,
                            email: admin.email,
                            token: admin.token,
                            first_name: admin.first_name,
                            surname: admin.surname
                        }
                    });
            });
        });
    }
}