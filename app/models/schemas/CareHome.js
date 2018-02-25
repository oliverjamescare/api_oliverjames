const mongoose = require('mongoose');
const validators = require('./../../services/validators');
const GeneralGuidance = require('./GeneralGuidance');

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

module.exports.schema = schema;