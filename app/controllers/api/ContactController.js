const config = process.env;
const User = require("../../models/User").schema;

module.exports = {
    sendContactMessage: async function (req, res)
    {
        let errors;

        //validation
        req.check("email").notEmpty().withMessage('Email field is required.').isEmail().withMessage('Email field is not a valid email.');
        req.check("name").notEmpty().withMessage('Name is required.').isLength({ max: 50 }).withMessage('Name cannot be longer than 50 characters.');
        req.check("subject").notEmpty().withMessage('Subject is required.').isLength({ max: 100 }).withMessage('Subject cannot be longer than 100 characters.');
        req.check("message").notEmpty().withMessage('Message field is required.').isLength({ max: 200 }).withMessage('Message cannot be longer than 200 characters.');

        if (errors = req.validationErrors())
            return res.status(406).json({ errors: errors });

        //sending response
        res.status(201).json({ status: true });

        //getting user
        const user = await User.findOne({ _id: req.body._id });

        //sending email
        req.app.mailer.send(__dirname + "/../../../views/emails/contact.jade", {
            to: config.CONTACT_EMAIL,
            subject: "Sent via Oliver James contact form - '" + req.body.subject + "'",
        },
        {
            email: req.body.email,
            name: req.body.name,
            message: req.body.message,
            user: user
        }, (error) => console.log(error));
    }
}