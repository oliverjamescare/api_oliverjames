module.exports.address = {
    postal_code: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        maxlength: [ 30, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
    company: {
        type: String,
        maxlength: [ 50, "{PATH} can't be longer than {MAXLENGTH} characters." ],
        default: ""
    },
    address_line_1: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        maxlength: [ 50, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
    address_line_2: {
        type: String,
        maxlength: [ 50, "{PATH} can't be longer than {MAXLENGTH} characters." ],
        default: ""
    },
    city: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        maxlength: [ 50, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: [ Number ]
    }
}