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
module.exports.paginate = function(model, params, request)
{
    var page = parseInt(request.query.page) > 0 ? parseInt(request.query.page) : 1;
    var results = parseInt(request.query.results) > 0 ? parseInt(request.query.results) : 10;
    
    params.options.limit = results;
    params.options.page = page;
    
    return model.paginate(params.query, params.options);
}


module.exports.parsePaginatedResults = function(paginatorResponse)
{
    return {
        results: paginatorResponse.docs,
        pages: paginatorResponse.pages,
        total: paginatorResponse.total
    }
}