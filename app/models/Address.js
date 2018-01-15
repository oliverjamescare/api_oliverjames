const mongoose = require('mongoose');
const validators = require('../services/validators');

const schema = mongoose.Schema({
    pca_address_id: String,
    postal_code: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        validate: validators.alphaNumbers,
        maxlength: [ 30, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
    address_line_1: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        validate: validators.alphaNumbers,
        maxlength: [ 30, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
    address_line_2: {
        type: String,
        validate: validators.alphaNumbers,
        maxlength: [ 30, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
    city: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        validate: validators.alpha,
        maxlength: [ 50, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: [ Number ]
    }
});

module.exports.schema = mongoose.model("Address", schema);
