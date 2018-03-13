//core
const mongoose = require('mongoose');
const moment = require('moment');

//custom
const validators = require('./../../services/validators');
const transactionSchema = require("./Transaction").schema;

const eligibleRoles = {
	CARER: "Carer",
	SENIOR_CARER: "Senior Carer"
}

const gender = {
    MALE: "Male",
    FEMALE: "Female"
}


//forms
const radioText = function (radioAvailableValues)
{
	return {
		value: {
			type: Number,
			required: [ true, "{PATH} field is required." ],
			min: Math.min.apply(Math, radioAvailableValues),
			max: Math.max.apply(Math, radioAvailableValues),
			validate: validators.integer
		},
		text: {
			type: String,
			default: null
		}
	}
}
const radio = function (radioAvailableValues)
{
	return {
		value: {
			type: Number,
			required: [ true, "{PATH} field is required." ],
			min: Math.min.apply(Math, radioAvailableValues),
			max: Math.max.apply(Math, radioAvailableValues),
			validate: validators.integer
		}
	}
}

//availablility
const shifts = {
	am_shift: {
		type: Boolean,
		default: true
	},
	pm_shift: {
		type: Boolean,
		default: true
	},
	night_shift: {
		type: Boolean,
		default: true
	}
}

const daysAvailability = {
	monday: shifts,
	tuesday: shifts,
	wednesday: shifts,
	thursday: shifts,
	friday: shifts,
	saturday: shifts,
	sunday: shifts
}

const shiftsRanges = {
    am_shift: {
    	start: 300,
    	end: 720,
	},
    pm_shift: {
        start: 720,
        end: 1140,
    },
    night_shift: {
        start: 1140,
        end: 300,
    }
}

//training record settings
const qualifications = [
	"Care certificate",
	"QCF / NVQ level 2 in Health & Social Care",
	"QCF / NVQ level 3 in Health & Social Care",
	"QCF / NVQ level 4 in Health & Social Care",
	"QCF / NVQ level 5 in Health & Social Care",
	"Agency carer induction training",
	"Nursing qualification (UK)",
	"Nursing qualification (elsewhere)"
];

const schema = mongoose.Schema({
	first_name: {
		type: String,
		required: [ true, "{PATH} field is required." ],
		validate: validators.alpha,
		maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
	},
	middle_name: {
		type: String,
		validate: validators.alpha,
		maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
	},
	surname: {
		type: String,
		required: [ true, "{PATH} field is required." ],
		validate: validators.alpha,
		maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
	},
	date_of_birth: {
		type: Date,
		required: [ true, "{PATH} field is required." ],
		validate: validators.adult
	},
	profile_image: {
		type: String,
		default: null
	},
    gender: {
        type: String,
        enum: Object.values(gender).concat([null]),
        default: null
    },
	max_job_distance: {
		type: Number,
		default: 5
	},
	cv_uploads: [
        {
            type: String,
            required: [ true, "{PATH} field is required." ]
        }
	],
	eligible_roles: [
		{
			type: String,
			required: [ true, "{PATH} field is required." ],
			enum: Object.values(eligibleRoles)
		}
	],
	q_a_form: {
		criminal_record: radioText([ 0, 1 ]),
		physical_issues: radio([ 0, 1 ]),
		engaging_in_moving: radioText([ 0, 1 ]),
		personal_care_for_resident: radio([ 0, 1, 2, 3 ]),
		you_are_late: radio([ 0, 1, 2, 3 ]),
		find_fallen_resident: radio([ 0, 1, 2 ]),
		serve_lunch_meals: radio([ 0, 1, 2 ])
	},
	availability: {
		general: daysAvailability,
		special_weeks: [
			{
				from: {
					type: String,
					required: [ true, "{PATH} field is required." ]
				},
				to: {
					type: String,
					required: [ true, "{PATH} field is required." ]
				},
				days: daysAvailability
			}
		]
	},
	training_record: {
		qualifications: [
			{
				type: String,
				enum: qualifications
			}
		],
		safeguarding: {
			type: Date,
			default: null
		},
        manual_handling_people: {
            type: Date,
            default: null
        },
        medication_management: {
            type: Date,
            default: null
        },
		infection_control: {
            type: Date,
            default: null
        },
        first_aid_and_basic_life_support: {
            type: Date,
            default: null
		},
        first_aid_awareness: {
            type: Date,
            default: null
		},
		h_and_s: {
            type: Date,
            default: null
		},
		dementia: {
            type: Date,
            default: null
		},
		fire_safety: {
            type: Date,
            default: null
		},
        other: {
            type: String,
            default: null
        },
        photos: [
        	{
            	type: String,
            	required: [ true, "{PATH} field is required." ]
        	}
        ]
	},
	joining_care_experience: {
		years: {
			type: Number,
			validate: validators.integer,
			min: [1, 'Minimum one year of experience is required.'],
			default: 1
		},
		months:
		{
			type: Number,
            validate: validators.integer,
            min: [0, 'Number of months can\'t be lower than 0. '],
            max: [11, 'Number of months can\'t be greater than 11. '],
			default: 0
		}
	},
	dbs: {
		dbs_date: {
			type: Date,
			default: null
		},
		ref_number: {
			type: String,
            maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ],
			default: null
		},
		status: {
			type: String,
			enum: [ "Clear", "Minor issues - approved" ],
			default: "Clear"
		},
        photos: [
            {
                type: String,
                required: [ true, "{PATH} field is required." ]
            }
        ]
	},
	reference: {
		references: [
            {
                name: {
                    type: String,
                    required: [ true, "{PATH} field is required." ],
                    maxlength: [ 100, "{PATH} can't be longer than {MAXLENGTH} characters." ]
                },
                type: {
                    type: String,
                    required: [ true, "{PATH} field is required." ],
                    enum: [ "Professional", "Personal" ]
                }
            }
        ],
        photos: [
            {
                type: String,
                required: [ true, "{PATH} field is required." ]
            }
        ]
	},
    jobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: [ true, "{PATH} field is required." ]
        }
    ],
	job_declines: [
		{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: [ true, "{PATH} field is required." ]
		}
	],
    job_withdrawals: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job_withdrawal",
            required: [ true, "{PATH} field is required." ]
        }
    ],
	payment_system: {
		account_id: {
			type: String,
			default: null
		},
		bank_number: {
			type: String,
			default: null
		}
	},
	transactions: [ transactionSchema ],
	silent_notifications_settings: {
		from: {
			type: Number,
            validate: validators.integer,
            min: [0, "{PATH} cannot be lower than {MIN}."],
            max: [1440, "{PATH} cannot be greater than {MAX}."],
			default: 0
		},
        to: {
            type: Number,
            validate: [ validators.integer, validators.greaterThan("silent_notifications_settings.from")],
            min: [0, "{PATH} cannot be lower than {MIN}."],
            max: [1440, "{PATH} cannot be greater than {MAX}."],
            default: 0
        },
		days: {
			monday: {
				type: Boolean,
				default: false
			},
            tuesday: {
                type: Boolean,
                default: false
            },
            wednesday: {
                type: Boolean,
                default: false
            },
            thursday: {
                type: Boolean,
                default: false
            },
            friday: {
                type: Boolean,
                default: false
            },
            saturday: {
                type: Boolean,
                default: false
            },
            sunday: {
                type: Boolean,
                default: false
            }
		}
	}
});

//methods
schema.methods.checkAvailabilityForDateRange = function(start, end)
{
	let available = true;
	const dayShifts = this.getAllDayShiftsInRange(start, end);
	console.log(dayShifts);

	dayShifts.forEach(dayShift => {
		const availability = this.getAvailabilitySetForDay(new Date(dayShift.day + " 00:00:00"));
		dayShift.shifts.forEach(shift => {
			if(!availability[shift])
				available = false;
		})
	});

	return available;
}

schema.methods.getAllDayShiftsInRange = function(start, end)
{
    let startDay = moment(start.getTime());
    let endDay = moment(end.getTime());
    let startMinutesOffset = (start.getHours() * 60) + start.getMinutes();
    let endMinutesOffset = (end.getHours() * 60) + end.getMinutes();

    let dayShifts = [];

    do
    {
        if(startDay.format("YYYY-MM-DD") == endDay.format("YYYY-MM-DD")) //last day
        {
            if((startMinutesOffset >= 0 && startMinutesOffset < shiftsRanges.night_shift.end) || (endMinutesOffset >= 0 && endMinutesOffset < shiftsRanges.night_shift.end))
            {
                let prevDate = moment(startDay.toDate());
                let day = prevDate.add(-1, "days").format("YYYY-MM-DD");

                if(!dayShifts.find(dayShift => dayShift.day == day))
                {
                    let shifts = [ "night_shift" ];
                    dayShifts.push({ day, shifts })
                }
            }

            let day = startDay.format("YYYY-MM-DD");
            let shifts = [];

            if(startMinutesOffset < shiftsRanges.am_shift.end && endMinutesOffset >= shiftsRanges.am_shift.start)
                shifts.push("am_shift");

            if(startMinutesOffset < shiftsRanges.pm_shift.end && endMinutesOffset >= shiftsRanges.pm_shift.start)
                shifts.push("pm_shift");

            if(startMinutesOffset < 1440 && endMinutesOffset >= shiftsRanges.night_shift.start)
                shifts.push("night_shift");

            if(shifts.length)
                dayShifts.push({ day, shifts });
        }
        else
        {
            if(startMinutesOffset >= 0 && startMinutesOffset < shiftsRanges.night_shift.end)
            {
                let prevDate = moment(startDay.toDate());
                let day = prevDate.add(-1, "days").format("YYYY-MM-DD");

                if(!dayShifts.find(dayShift => dayShift.day == day))
                {
                    let shifts = [ "night_shift" ];
                    dayShifts.push({ day, shifts })
                }
            }

            let day = startDay.format("YYYY-MM-DD");
            let shifts = [];

            if(startMinutesOffset < shiftsRanges.am_shift.end)
                shifts.push("am_shift");

            if(startMinutesOffset < shiftsRanges.pm_shift.end)
                shifts.push("pm_shift");

            if(startMinutesOffset < 1440)
                shifts.push("night_shift");

            if(shifts.length)
                dayShifts.push({ day, shifts });

            startMinutesOffset = 0;
        }
    }
    while(startDay.format("YYYY-MM-DD") != endDay.format("YYYY-MM-DD") && startDay.add(1, "days"));

    return dayShifts;
}

schema.methods.getAvailabilitySetForDay = function(date)
{
	//getting dates range
	const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const startOffset = date.getDay() - 1 > -1 ? date.getDay() - 1 : 6;
    const start = moment(date.getTime()).add( -startOffset, "days").format("YYYY-MM-DD");
    const end = moment(date.getTime()).add((6 - startOffset), "days").format("YYYY-MM-DD");

    const specialWeek = this.availability.special_weeks.find( special_week => special_week.from == start && special_week.to == end);

    //getting day availability set
    return !specialWeek ? this.availability.general[weekdays[startOffset]] : specialWeek.days[weekdays[startOffset]];
}


module.exports = { schema, eligibleRoles, shiftsRanges };
