module.exports.general_guidance = function (required = false)
{
	let guidanceConfig = {
		superior_contact: {
			type: String,
			maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ],
			default: null
		},
		report_contact: {
			type: String,
			maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ],
			default: null
		},
		emergency_guidance: {
			type: String,
			maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ],
			default: null
		},
		notes_for_carers: {
			type: String,
			maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ],
			default: null
		},
		parking: {
			type: String,
			maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ],
			default: null
		},
		floor_plan: {
			type: String,
			maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ],
			default: null
		}
	};

	if (required)
		Object.keys(guidanceConfig).forEach(property => guidanceConfig[ property ][ "required" ] = [ true, "{PATH} field is required." ]);

	return guidanceConfig;
}



