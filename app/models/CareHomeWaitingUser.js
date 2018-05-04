//core
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate');

//custom
const validators = require('./../services/validators');
const User = require('./User').schema;
const addressSchema = require("./schemas/Address").address;

const schema = mongoose.Schema({
    email: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        validate: [
            validators.email,
            {
                isAsync: true,
                validator: function (value, callback)
                {
                    User.findOne({ email: value }, (error, result) => callback(result ? false : true ));
                },
                message: "The {PATH} has already been taken."
            }
        ],
        unique: true
    },
    address: addressSchema,
    name: {
        type: String,
        required: [ true, "{PATH} field is required." ],
        validate: validators.alpha,
        maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    }
}, { usePushEach: true });

//middlewares
schema.pre("save", function (next)
{
	//dates handle
	if (this.isNew)
		this.created = new Date();

    this.updated = new Date();
    if(!this.address.location.coordinates.length)
        this.address.location = undefined;

    next();
});

//statics
schema.statics.parse = function(user, req)
{
    //address link
    if(user.address && user.address.location)
        user.address.link = `https://www.google.com/maps/search/?api=1&query=${user.address.location.coordinates[0]},${user.address.location.coordinates[1]}`;

    //dates
    if(user.created)
        user.created = user.created.getTime();

    return user;
}

schema.plugin(uniqueValidator, { message: 'The {PATH} has already been added.' });
schema.plugin(mongoosePaginate);

module.exports.schema = mongoose.model("care_home_waiting_user", schema);