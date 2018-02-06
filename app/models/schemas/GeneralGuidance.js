module.exports.general_guidance = function(required = false)
{
    let guidanceConfig =  {
        superior_contact: {
            type: String,
            maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
        },
        report_contact: {
            type: String,
            maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
        },
        emergency_guidance: {
            type: String,
            maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
        },
        notes_for_carers: {
            type: String,
            maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
        },
        parking: {
            type: String,
            maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
        },
        floor_plan: {
            type: String,
            maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
        }
    };

    if(required)
        Object.keys(guidanceConfig).forEach(property => guidanceConfig[property]["required"] = [ true, "{PATH} field is required." ]);

    return guidanceConfig;
}



