//core
const moment = require("moment");

module.exports.parseValidatorErrors = function(error)
{
    var errorMessages = [];
    if(error)
    {
        var errors = error.errors;
        for(var key in errors)
        {
            var message = errors[key].message;
            if(message && errors[key].path)
            {
                message = (message.charAt(0).toUpperCase() + message.slice(1)).replace(/_|\./g,' ');
                message = message.slice(0, message.lastIndexOf(" ")) + ".";
                errorMessages.push({
                    field: key,
                    message: message
                })
            }
        }
    }

    return { errors: errorMessages };
}

module.exports.parseStringError = function(message, field = "general")
{
    return {
        errors: [{
            field: field,
            message: message
        }]
    };
    
}

//pagination
module.exports.paginate = function(model, params, request, aggregate = false)
{
    const page = parseInt(request.query.page) > 0 ? parseInt(request.query.page) : 1;
    const results = parseInt(request.query.results) > 0 ? parseInt(request.query.results) : 10;
    
    params.options.limit = results;
    params.options.page = page;
    
    return aggregate ? model.aggregatePaginate(params.query, params.options) : model.paginate(params.query, params.options);
}


module.exports.parsePaginatedResults = function(paginatorResponse)
{
    return {
        results: paginatorResponse.docs || paginatorResponse.data,
        pages: paginatorResponse.pages || paginatorResponse.pageCount,
        total: paginatorResponse.total || paginatorResponse.totalCount
    }
}

module.exports.getDatesRange = function(week = 0)
{
    const today = new Date();
    today.setDate(today.getDate() + (7 * week));

    const startOffset = today.getDay() - 1 > -1 ? today.getDay() - 1 : 6;
    const start = moment(today.getTime()).add( -startOffset, "days").format("YYYY-MM-DD");
    const end = moment(today.getTime()).add((6 - startOffset), "days").format("YYYY-MM-DD");

    return { from: start, to: end };
}