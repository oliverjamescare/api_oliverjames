const mongoose = require('mongoose');
const validators = require('./../../services/validators');

const eligibleRoles = [
    "Carer",
    "Senior Carer"
];

//forms
const radioText = function(radioAvailableValues)
{
    return {
        value: {
            type: Number,
            required: [true, "{PATH} field is required."],
            min: Math.min.apply(Math, radioAvailableValues),
            max: Math.max.apply(Math, radioAvailableValues),
            validate: validators.integer
        },
        text: {
            type: String,
            default: null
        }
    }
}
const radio = function(radioAvailableValues)
{
    return {
        value: {
            type: Number,
            required: [true, "{PATH} field is required."],
            min: Math.min.apply(Math, radioAvailableValues),
            max: Math.max.apply(Math, radioAvailableValues),
            validate: validators.integer
        }
    }
}

module.exports.schema =  mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "{PATH} field is required."],
        validate: validators.alpha,
        maxlength: [100,"{PATH} can't be longer than {MAXLENGTH} characters."]
    },
    middle_name: {
        type: String,
        validate: validators.alpha,
        maxlength: [100,"{PATH} can't be longer than {MAXLENGTH} characters."]
    },
    surname: {
        type: String,
        required: [true, "{PATH} field is required."],
        validate: validators.alpha,
        maxlength: [100,"{PATH} can't be longer than {MAXLENGTH} characters."]
    },
    date_of_birth: {
        type: Date,
        required: [true, "{PATH} field is required."],
        validate: validators.adult
    },
    profile_image: {
        type: String,
        default: null
    },
    joining_care_experiance: {
        type: Number,
        default: 1 // this means more than one year
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: [ true, "{PATH} field is required." ]
    },
    cv: {
        type: String,
        required: [true, "{PATH} field is required."]
    },
    eligible_roles: [{
        type: Number,
        required: [true, "{PATH} field is required."],
        enum: Object.keys(eligibleRoles).map(role => parseInt(role)),
        unique: true
    }],
    q_a_form: {
        criminal_record: radioText([0,1]),
        physical_issues: radio([0,1]),
        engaging_in_moving: radioText([0,1]),
        personal_care_for_resident: radio([0,1,2,3]),
        you_are_late: radio([0,1,2,3]),
        find_fallen_resident: radio([0,1,2]),
        serve_lunch_meals: radio([0,1,2])
    }
});

module.exports.eligibleRoles = eligibleRoles;