const validators = require('./../../services/validators');

module.exports = {
    postal_code: {
        type: String,
        required: [true, "{PATH} field is required."],
        validate: validators.alphaNumbers,
        maxlength: [30,"{PATH} can't be longer than {MAXLENGTH} characters."]
    },
    address: {
        type: String,
        required: [true, "{PATH} field is required."],
        validate: validators.alphaNumbers,
        maxlength: [100,"{PATH} can't be longer than {MAXLENGTH} characters."]
    },
    city: {
        type: String,
        required: [true, "{PATH} field is required."],
        validate: validators.alpha,
        maxlength: [50,"{PATH} can't be longer than {MAXLENGTH} characters."]
    },
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: [Number]
    }
};