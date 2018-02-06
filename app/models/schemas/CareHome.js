const mongoose = require('mongoose');
const validators = require('./../../services/validators');
const Address = require('./Address');
const GeneralGuidance = require('./GeneralGuidance');

const homeTypes = [
    "Residential",
    "Nursing",
    "Learning disabilit",
    "Supported living"
];

module.exports.schema = mongoose.Schema({
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
    address: Address.address,
    blocked_carers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    general_guidance: GeneralGuidance.general_guidance(),

    //references
    jobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
        }
    ],
});