module.exports.general_guidance = function (required = false)
{
	let guidanceConfig = {
		superior_contact: {
			type: String,
			maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ],
			default: ""
		},
		report_contact: {
			type: String,
			maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ],
			default: ""
		},
		emergency_guidance: {
			type: String,
			maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ],
			default: ""
		},
		notes_for_carers: {
			type: String,
			maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ],
			default: ""
		},
		parking: {
			type: String,
			maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ],
			default: ""
		},
		floor_plan: {
			type: String,
			maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ],
			default: ""
		}
	};

	if (required)
		Object.keys(guidanceConfig).forEach(property => guidanceConfig[ property ][ "required" ] = [ true, "{PATH} field is required." ]);

	return guidanceConfig;
}



