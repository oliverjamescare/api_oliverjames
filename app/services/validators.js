/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const XRegExp = require('xregexp');

//field types
module.exports.email = {
    validator: value => emailRegExp.test(value),
    message: "This is not valid email address."
};

module.exports.alpha = {
    validator: value => XRegExp('^[\\p{L}\\s]*$').test(value),
    message: "{PATH} can contain only alphabetical characters."
};

module.exports.numbers = {
    validator: value => /^[0-9]*$/.test(value),
    message: "{PATH} can contain only numbers."
};

module.exports.alphaNumbers = {
    validator: value => XRegExp('^[\\p{L}\\s0-9]*$').test(value),
    message: "{PATH} can contain only alphabetical characters and numbers."
};

module.exports.integer = {
    validator: Number.isInteger,
    message: "{PATH} can contain only integer value."
};

module.exports.filled = {
	validator: value => value.trim().length,
	message: "{PATH} cannot be empty."
};

module.exports.greaterThan = function (path)
{
    return {
        validator: function (value)
        {
            if(/\./.test(path))
            {
                const fields = path.split(".");
                let fieldValue = 0;
                let field = this;

                fields.forEach(fieldname => {

                    field = field[fieldname];
                    if(Number.isInteger(field))
                        fieldValue = parseInt(field);
                });

                return value >= fieldValue;
            }
        },
        message: "{PATH} cannot be lower than " + path + "."
    };
}

module.exports.password = function (regexp, message)
{
	return {
		validator: function (value) { return (/^\$2/.test(value) && value.length >= 50) ? true : regexp.test(value) },
		message: message
	};
}

//required
module.exports.required_if = function (field, conditionValue)
{
    return [
        function() { return this[field] == conditionValue },
        "{PATH} is required, because field " + field + " is equal " + conditionValue + "."
    ];
}

module.exports.required_if_not = function (field, conditionValue)
{
    return [
        function() { return this[field] != conditionValue },
        "{PATH} is required, because field " + field + " is not equal " + conditionValue + "."
    ];
}

module.exports.required_if_present = function (path)
{
    return [
        function() {

            if(/\./.test(path))
            {
                const fields = path.split(".");
                let required = true;
                let field = this;

                fields.forEach(fieldname => {

                    field = field[fieldname];
                    if(field == undefined)
                        required = false;
                })

                return required;
            }

            return this[path] !== undefined
        },
        "{PATH} is required."
    ];
}

//equals
module.exports.not_equal = function (field)
{
    return {
        validator: function(value)
        {
            let A = (this[field]._id)? this[field]._id.toString() : this[field].toString();
            let B = (value._id)? value._id.toString() : value.toString();

            return A != B;
        },
        message: "{PATH} must be different than " + field + "."
    }
}

//date validators
module.exports.adult = {
    validator: function(value)
    {
        let now = new Date();
        now.setFullYear(now.getFullYear() - 18);

        return !value || now.getTime() >= value.getTime();
    },
    message: "You have to be adult to register."
};

module.exports.futureDate = function(field, message = "{PATH} must be greater than current date.", allowedDelay = 0)
{
    return {
        validator: function (value)
        {
            const validationRequired = this.isNew || (this.initial[field] && value && new Date(this.initial[field]).getTime() != value.getTime()); //validates when object is new or value changed

            //delay handle
            const now = new Date();
            now.setTime(now.getTime() - allowedDelay)

            return validationRequired ? !value || value.getTime() >= now.getTime() : true;
        },
        message: message
    }
};

module.exports.dateMaxDaysForward = function(field, daysForward)
{
    return {
        validator: function (value)
        {
            const forwardDate = new Date();
            forwardDate.setDate(forwardDate.getDate() + daysForward);

            const validationRequired = this.isNew || (this.initial[field] && value && new Date(this.initial[field]).getTime() != value.getTime()); //validates when object is new or value changed
            return validationRequired ? !value || value.getTime() < forwardDate.getTime() : true;
        },
        message: "{PATH} cannot be greater than " + daysForward + " days forward."
    }
};

module.exports.dateGreaterThanDateField = function (field)
{
    return {
        validator: function(value) { return !value || value.getTime() > this[field].getTime() },
        message: "{PATH} must be greater than " + field + "."
    }
}

module.exports.maxDateRangeAccordingToField = function (field, range)
{
    return {
        validator: function(value) { return !value || value.getTime() < (this[field].getTime()  + range) },
        message: "{PATH} has too wide range according to " + field + " field."
    }
}





