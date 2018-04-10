//core
const mongoose = require('mongoose');

//custom
const validators = require('./../../services/validators');
const GeneralGuidance = require('./GeneralGuidance');
const Transaction = require("./Transaction");
const config = process.env;

//settings
const homeTypes = [
    "Residential",
    "Nursing",
    "Learning disabilit",
    "Supported living"
];

const genderPreferences = {
	MALE: "Male",
	FEMALE: "Female",
	NO_PREFERENCE: "No preference"
}

const schema = mongoose.Schema({
    care_service_name: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        validate: validators.alpha,
        maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
    type_of_home: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        enum: homeTypes
    },
    name: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        validate: validators.alpha,
        maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
    blocked_carers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    general_guidance: GeneralGuidance.general_guidance(),
	gender_preference: {
		type: String,
		enum: Object.values(genderPreferences),
		default: genderPreferences.NO_PREFERENCE
	},

    //references
    jobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
        }
    ],
    payment_system: {
        customer_id: {
            type: String,
            default: null
        },
        card_number: {
            type: String,
            default: null
        }
    },
    credits: [ Transaction.schema ]

});

//methods
schema.methods.hasValidGeneralGuidance = function()
{
	let valid = false;
	if(this.general_guidance)
	{
		valid = true;
		Object.keys(this.general_guidance).forEach(property => {
			if(!this.general_guidance[property])
				valid = false;
		});
	}

	return valid;
}

//credits methods
schema.methods.getCreditsBalance = function()
{
    let balance = 0;
    this.credits.forEach(creditTransaction => balance += creditTransaction.status == Transaction.transactionStatuses.CONFIRMED ? creditTransaction.amount : 0);

    return balance;
}

schema.methods.addCredits = function(amount, job = null, description = null, status = Transaction.transactionStatuses.PENDING)
{
    let balance = this.getCreditsBalance();
    let addingCreditsAllowed = true;

    //protecting against duplicated credit for single job
    if(job)
    {
        let transaction = this.credits.find(creditTransaction => creditTransaction.job && job._id.toString() == creditTransaction.job.toString());
        if(transaction)
            addingCreditsAllowed = false;
    }

    if(addingCreditsAllowed)
    {
        let creditedAmount = job ? Math.min(amount, balance) : amount;
        if(creditedAmount > 0)
        {
            this.credits.push({
                amount: job ? - creditedAmount : creditedAmount, //if job exists than this is reducer
                job: job || null,
                description: description || "Credits used for Job ID: " + job._id,
                status: status
            });
        }

    }
}

schema.methods.sendRegisterConfirmation = function(mailer)
{
    const care_home = this;

    //sending email
    mailer.send(__dirname + "/../../../views/emails/care-home-registered.jade", {
        to: config.CONTACT_EMAIL,
        subject: care_home.care_service_name + " has signed up",
    },
    {
        care_home: care_home
    },(error) => console.log(error));
}

module.exports.schema = schema;