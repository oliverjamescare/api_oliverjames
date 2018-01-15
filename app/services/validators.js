/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const XRegExp = require('xregexp');

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

module.exports.adult = {
    validator: function(value)
    {
        let now = new Date();
        now.setFullYear(now.getFullYear() - 18);

        return !value || now.getTime() >= value.getTime();
    },
    message: "You have to be adult to register."
};


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
        "{PATH} is required, because field " + field + " is equal " + conditionValue + "."
    ];
}

module.exports.required_if_present = function (field)
{
    return [
        function() { return this[field] !== undefined },
        "{PATH} is required."
    ];
}

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

// module.exports.futureDate = {
//     validator: value => !value || value.getTime() >= new Date().getTime(),
//     message: "{PATH} must be greater than current date"
// };
//
// module.exports.futureDate = function (id)
// {
//     return {
//         validator: function(value)
//         {
//             return !value || value.getTime() >= new Date().getTime() || this[id]
//         },
//         message: "{PATH} must be greater than current date"
//     }
// }




