/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//models
const JobModel = require("../../models/Job");
const Job = JobModel.schema;
const User = require("../../models/User").schema;
const Admin = require("../../models/Admin").schema;
const CareHomeWaitingUser = require("../../models/CareHomeWaitingUser").schema;
const Notification = require("../../models/Notification").schema;
const Setting = require("../../models/Setting").schema;
const JobWithdrawal = require("../../models/JobWithdrawal").schema;

//services
const Utils = require("../../services/utils");
const Json2csvParser = require('json2csv').Parser;

module.exports = {
    exportData: async function(req, res)
    {
        const type = req.params.collection;
        const types = ["jobs", "carers", "care_homes", "admins", "waiting_list", "notifications", "settings", "job_withdrawals"];

        //checking types
        if(!types.includes(type))
            return res.status(406).json(Utils.parseStringError("Invalid collection type", "collection"));

        //time params and query
        let from = !isNaN(Date.parse(req.query.from))? new Date(req.query.from) : !isNaN(parseInt(req.query.from))? new Date(parseInt(req.query.from)) : false;
        let to = !isNaN(Date.parse(req.query.to)) ? new Date(req.query.to) : !isNaN(parseInt(req.query.to))? new Date(parseInt(req.query.to)) : false;

        if(from)
            from.setHours(0,0,0,0);
        if(to)
            to.setHours(23,59,59,999);

        if(from && to)
        {

            if(from.getTime() > to.getTime())
            {
                const temp = from;
                to = from;
                from = temp;
            }
        }

        const query = {};
        if(from)
            query["$and"] = [ { created: { $gte: from } } ];
        if(to)
            query["$and"] ? query.$and.push({ created: { $lte: to }}) : query["$and"] = [ { created: { $lte: to } } ]

        //csv
        const filename = type.replace(/_/g, '-') + ".csv";
        let csv = null;
        const options = {
            withBOM: true
        }

        switch (type)
        {
            case "jobs":
            {
                const data = await Job.find(query).lean().exec();
                const fields = [
                    //basic
                    { label: "Job id", value: "_id" }, { label: "Start date", value: "start_date"}, { label: "End date", value: "end_date"},
                    { label: "Care home id", value: "care_home"}, { label: "Manual booking enabled", value: "manual_booking"},
                    { label: "Booking id", value: "group"}, { label: "Role", value: "role"}, { label: "Gender preference", value: "gender_preference"},
                    { label: "Notes", value: "notes"}, { label: "Status", value: "status" }, { label: "Created date", value: "created" },

                    //general guidance
                    { label: "General guidance - parking", value: "general_guidance.parking"}, { label: "General guidance - notes for carers", value: "general_guidance.notes_for_carers"},
                    { label: "General guidance - emergency guidance", value: "general_guidance.emergency_guidance"}, { label: "General guidance - report contact", value: "general_guidance.report_contact"},
                    { label: "General guidance - superior contact", value: "general_guidance.superior_contact"},

                    //pricing
                    { label: "Percent charge", value: "percent_charge"},
                    { label: "Manual booking pricing", value: "booking_pricing.manual_booking_pricing"}, { label: "Commission percent", value: "booking_pricing.app_commission"},
                    { label: "Carer max to deduct", value: "booking_pricing.max_to_deduct"},
                    ...getFullPricing("Job pricing","booking_pricing"),

                    //cost
                    { label: "Job cost", value: "cost.job_cost"}, { label: "Job manual booking cost", value: "cost.manual_booking_cost"}, { label: "Job total cost", value: "cost.total_cost"},

                    //charge
                    { label: "Charge - care home deductions", value: "charge.deductions"}, { label: "Charge - job cost", value: "charge.job_cost"}, { label: "Charge - manual booking cost", value: "charge.manual_booking_cost"},
                    { label: "Charge - total cost", value: "charge.total_cost"}, { label: "Charge - net cost", value: "charge.net_cost"}, { label: "Charge - charging date", value: "charge.charge_date"},

                    //carer assignment
                    { label: "Carer - projected income", value: "assignment.projected_income"}, { label: "Assigned carer id", value: "assignment.carer"}, { label: "Carer - assignment date", value: "assignment.created"},

                    //summary sheet
                    { label: "Summary sheet - name", value: "assignment.summary_sheet.name"}, { label: "Summary sheet - position", value: "assignment.summary_sheet.position"}, { label: "Summary sheet - notes", value: "assignment.summary_sheet.notes"}, { label: "Summary sheet - date", value: "assignment.summary_sheet.created"},
                    { label: "Summary sheet - edited start date", value: "assignment.summary_sheet.start_date"}, { label: "Summary sheet - edited end date", value: "assignment.summary_sheet.end_date"}, { label: "Summary sheet - voluntary deduction", value: "assignment.summary_sheet.voluntary_deduction"},

                    //payment
                    { label: "Payment - debit date", value: "assignment.payment.debit_date"}, { label: "Payment - transaction commission", value: "assignment.payment.transaction_charge"}, { label: "Payment - Oliver James commission", value: "assignment.payment.application_fee"}, { label: "Payment - carer deductions", value: "assignment.payment.deductions"},
                    { label: "Payment - job income", value: "assignment.payment.job_income" }, { label: "Payment - job net income", value: "assignment.payment.net_income" }, { label: "Payment - status", value: "assignment.payment.status" }, { label: "Payment - payment date", value: "assignment.payment.payment_date" },

                    //review
                    { label: "Review - rate", value: "assignment.review.rate"}, { label: "Review - description", value: "assignment.review.description"}, { label: "Review - status", value: "assignment.review.status"}, { label: "Review - date posted", value: "assignment.review.created"},

                    //challenge
                    { label: "Challenge - description", value: "assignment.challenge.description"}, { label: "Challenge - admin response", value: "assignment.challenge.response"}, { label: "Challenge - status", value: "assignment.challenge.status"}, { label: "Challenge - date", value: "assignment.challenge.created"},

                    //Notifications
                    { label: "Priority carer id", value: "priority_carers"},
                    { label: "Scheduled notification - user id", value: "notifications.user"}, { label: "Scheduled notification - time", value: "notifications.time"},
                    { label: "Scheduled notification - bucket", value: "notifications.bucket"}, { label: "Scheduled notification - status", value: "notifications.status"},

                ];

                options["unwind"] = ["priority_carers", "notifications"];

                const parser = new Json2csvParser({ fields, ...options });
                csv = parser.parse(data);

                break;
            }

            case "carers":
            {
                query["carer"] = { $exists: true };
                const data = await User.find(query).lean().exec();

                const fields = [
                    //user
                    { label: "Carer id", value: "_id" }, { label: "Email", value: "email" },
                    { label: "Is email verified", value: "email_verified" }, { label: "Phone number", value: "phone_number" },  { label: "Activation date", value: "activation_date" },
                    { label: "Banned until date", value: "banned_until" }, { label: "Carer notes", value: "notes" },
                    { label: "Account status", value: "status" },{ label: "Role", value: "roles" }, { label: "Created date", value: "created" },

                    //carer
                    { label: "First name", value: "carer.first_name" }, { label: "Middle names", value: "carer.middle_name" }, { label: "Surname", value: "carer.surname" },
                    { label: "Date of birth", value: "carer.date_of_birth" }, { label: "Gender", value: "carer.gender" }, { label: "Max jobs distance", value: "carer.max_job_distance" },
                    { label: "Is created by admin", value: "carer.created_by_admin" }, { label: "Eligible role", value: "carer.eligible_roles" },

                    //Q&A form
                    { label: "Criminal record - answer index", value: "carer.criminal_record.value" }, { label: "Criminal record - answer text", value: "carer.criminal_record.text" },
                    { label: "Physical issues - answer index", value: "carer.physical_issues.value" }, { label: "Engaging in moving - answer index", value: "carer.engaging_in_moving.value" }, { label: "Engaging in moving - answer text", value: "carer.engaging_in_moving.text" },
                    { label: "Personal care for resident - answer index", value: "carer.personal_care_for_resident.value" }, { label: "When you are late - answer index", value: "carer.you_are_late.value" },
                    { label: "If you find fallen resident - answer index", value: "carer.find_fallen_resident.value" }, { label: "Serve lunch meals - answer index", value: "carer.serve_lunch_meals.value" },

                    //Training record
                    { label: "Training record - qualification", value: "carer.training_record.qualifications" }, { label: "Training record - safeguarding date", value: "carer.training_record.safeguarding" },
                    { label: "Training record - manual handling people date", value: "carer.training_record.manual_handling_people" }, { label: "Training record - medication management date", value: "carer.training_record.medication_management" },
                    { label: "Training record - infection control date", value: "carer.training_record.infection_control" }, { label: "Training record - first aid and basic life support date", value: "carer.training_record.first_aid_and_basic_life_support" },
                    { label: "Training record - first aid awareness date", value: "carer.training_record.first_aid_awareness" }, { label: "Training record - H&S date", value: "carer.training_record.h_and_s" }, { label: "Training record - dementia date", value: "carer.training_record.dementia" },
                    { label: "Training record - fire safety date", value: "carer.training_record.fire_safety" }, { label: "Training record - other", value: "carer.training_record.other" },

                    //care experience
                    { label: "Joining care experience - years", value: "carer.joining_care_experience.years" }, { label: "Joining care experience - months", value: "carer.joining_care_experience.months" },
                    { label: "Care experience - years", value: "carer.care_experience.years" }, { label: "Care experience - months", value: "carer.care_experience.months" },

                    //reviews
                    { label: "Reviews - count", value: "carer.reviews.count" }, { label: "Reviews - average", value: "carer.reviews.average" },

                    //DBS
                    { label: "DBS - date", value: "carer.dbs.dbs_date" }, { label: "DBS - ref number", value: "carer.dbs.ref_number" },  { label: "DBS - status", value: "carer.dbs.status" },

                    //References
                    { label: "Reference - name", value: "carer.reference.references.name" }, { label: "Reference - type", value: "carer.reference.references.type" },

                    //Payments
                    { label: "Stripe connect id", value: "carer.payment_system.account_id" }, { label: "Payment system - bank number", value: "carer.payment_system.bank_number" },
                    { label: "Deduction - description", value: "carer.deductions.description" }, { label: "Deduction - amount", value: "carer.deductions.amount" },
                    { label: "Deduction - job id", value: "carer.deductions.job" }, { label: "Deduction - status", value: "carer.deductions.status" },
                    { label: "Deduction - date created", value: "carer.deductions.created" },

                    //Silent notifications
                    { label: "Notifications config - from minutes offset", value: "carer.silent_notifications_settings.from" }, { label: "Notifications config - to minutes offset", value: "carer.silent_notifications_settings.to" },
                    { label: "Notifications config - monday", value: "carer.silent_notifications_settings.days.monday" }, { label: "Notifications config - tuesday", value: "carer.silent_notifications_settings.days.tuesday" },
                    { label: "Notifications config - wednesday", value: "carer.silent_notifications_settings.days.wednesday" }, { label: "Notifications config - thursday", value: "carer.silent_notifications_settings.days.thursday" },
                    { label: "Notifications config - friday", value: "carer.silent_notifications_settings.days.friday" }, { label: "Notifications config - saturday", value: "carer.silent_notifications_settings.days.saturday" },
                    { label: "Notifications config - sunday", value: "carer.silent_notifications_settings.days.sunday" },

                    //address
                    { label: "Address - postcode", value: "address.postal_code" }, { label: "Address - company", value: "address.company" }, { label: "Address - line 1", value: "address.address_line_1" },
                    { label: "Address - line 2", value: "address.address_line_2" }, { label: "Address - city", value: "address.city" }, { label: "Address - latitude", value: "address.location.coordinates[0]" },  { label: "Address - longitude", value: "address.location.coordinates[1]" },
                ];

                options["unwind"] = ["roles", "carer.eligible_roles", "carer.training_record.qualifications", "carer.reference.references", "carer.deductions"];
                const parser = new Json2csvParser({ fields, ...options });
                csv = parser.parse(data);

                break;
            }

            case "care_homes":
            {
                query["care_home"] = { $exists: true };
                const data = await User.find(query).lean().exec();

                const fields = [
                    //user
                    { label: "Care home id", value: "_id" }, { label: "Email", value: "email" }, { label: "Is email verified", value: "email_verified" },
                    { label: "Phone number", value: "phone_number" }, { label: "Banned until date", value: "banned_until" },
                    { label: "Care home notes", value: "notes" }, { label: "Account status", value: "status" },
                    { label: "Role", value: "roles" }, { label: "Created date", value: "created" },

                    //care home
                    { label: "Care service name", value: "care_home.care_service_name" }, { label: "Type of home", value: "care_home.type_of_home" },
                    { label: "Name", value: "care_home.name" }, { label: "Name", value: "care_home.name" },
                    { label: "Blocked carer id", value: "care_home.blocked_carers" },

                    //general guidance
                    { label: "Gender preference", value: "care_home.gender_preference"},
                    { label: "General guidance - parking", value: "care_home.general_guidance.parking"}, { label: "General guidance - notes for carers", value: "care_home.general_guidance.notes_for_carers"},
                    { label: "General guidance - emergency guidance", value: "care_home.general_guidance.emergency_guidance"}, { label: "General guidance - report contact", value: "care_home.general_guidance.report_contact"},
                    { label: "General guidance - superior contact", value: "care_home.general_guidance.superior_contact"},

                    //Payments
                    { label: "Stripe customer id", value: "care_home.payment_system.customer_id" }, { label: "Payment system - card number", value: "care_home.payment_system.card_number" },
                    { label: "Credit - description", value: "care_home.credits.description" }, { label: "Credit - amount", value: "care_home.credits.amount" },
                    { label: "Credit - job id", value: "care_home.credits.job" }, { label: "Credit - status", value: "care_home.credits.status" },
                    { label: "Credit - date created", value: "care_home.credits.created" },

                    //address
                    { label: "Address - postcode", value: "address.postal_code" }, { label: "Address - company", value: "address.company" }, { label: "Address - line 1", value: "address.address_line_1" },
                    { label: "Address - line 2", value: "address.address_line_2" }, { label: "Address - city", value: "address.city" }, { label: "Address - latitude", value: "address.location.coordinates[0]" },  { label: "Address - longitude", value: "address.location.coordinates[1]" },
                ];

                options["unwind"] = ["roles", "care_home.blocked_carers", "care_home.credits" ];
                const parser = new Json2csvParser({ fields, ...options });
                csv = parser.parse(data);

                break;
            }

            case "admins":
            {
                const data = await Admin.find(query).lean().exec();
                const fields = [
                    { label: "Admin id", value: "_id" }, { label: "Email", value: "email" },
                    { label: "First name", value: "first_name" }, { label: "Surname", value: "surname" },
                    { label: "Role", value: "roles" }, { label: "Created date", value: "created" },
                ];

                options["unwind"] = ["roles"];
                const parser = new Json2csvParser({ fields, ...options });
                csv = parser.parse(data);

                break;
            }

            case "waiting_list":
            {
                const data = await CareHomeWaitingUser.find(query).lean().exec();
                const fields = [
                    { label: "Email", value: "email" }, { label: "Name", value: "name" }, { label: "Created date", value: "created" },

                    //address
                    { label: "Address - postcode", value: "address.postal_code" }, { label: "Address - company", value: "address.company" }, { label: "Address - line 1", value: "address.address_line_1" },
                    { label: "Address - line 2", value: "address.address_line_2" }, { label: "Address - city", value: "address.city" }, { label: "Address - latitude", value: "address.location.coordinates[0]" },  { label: "Address - longitude", value: "address.location.coordinates[1]" },
                ];

                const parser = new Json2csvParser({ fields, ...options });
                csv = parser.parse(data);

                break;
            }

            case "notifications":
            {
                const data = await Notification.find(query).lean().exec();
                const fields = [
                    { label: "Title", value: "title" }, { label: "Description", value: "description" },
                    { label: "Carer id", value: "carer" }, { label: "Job id", value: "job" },
                    { label: "Status", value: "status" },
                    { label: "Created date", value: "created" },
                ];

                const parser = new Json2csvParser({ fields, ...options });
                csv = parser.parse(data);

                break;
            }

            case "settings":
            {
                const data = await Setting.find({}).lean().exec();
                let fields = [
                    { label: "Type", value: "type" },

                    //Notifications
                    ...getNotifications("Notifications", "notifications"),

                    //General commission
                    { label: "General commission - manual booking pricing", value: "general_commission.manual_booking_pricing" },
                    { label: "General commission - carer max to deduct", value: "general_commission.max_to_deduct" },
                    { label: "General commission - Oliver James commission", value: "general_commission.app_commission" },

                    //General pricing
                    { label: "General price matrix - role", value: "general_price_matrix.role" },
                    ...getFullPricing("General price matrix", "general_price_matrix"),

                    //Special pricing
                    { label: "Special price matrix - role", value: "general_price_matrix.role" },
                    { label: "Special price matrix - date", value: "general_price_matrix.date" },
                    ...getSpecialPricing("Special price matrix", "special_price_matrix"),
                ];

                const parser = new Json2csvParser({ fields, ...options });
                csv = parser.parse(data);

                break;
            }

            case "job_withdrawals":
            {
                const data = await JobWithdrawal.find(query).lean().exec();
                let fields = [
                    { label: "Carer id", value: "carer" }, { label: "Job id", value: "job" },
                    { label: "Message", value: "message" },
                    { label: "Created date", value: "created" },
                ];

                const parser = new Json2csvParser({ fields, ...options });
                csv = parser.parse(data);

                break;
            }
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);

        res.send(csv)
    }
}

function getFullPricing(prefixLabel = "", prefixValue = "")
{
    const days = {
        monday_price: "monday",
        tuesday_price: "tuesday",
        wednesday_price: "wednesday",
        thursday_price: "thursday",
        friday_price: "friday",
        saturday_price: "saturday",
        sunday_price: "sunday",
    };

    const hours = {
        hour_0_1: "hours 0 to 1",
        hour_1_2: "hours 1 to 2",
        hour_2_3: "hours 2 to 3",
        hour_3_4: "hours 3 to 4",
        hour_4_5: "hours 4 to 5",
        hour_5_6: "hours 5 to 6",
        hour_6_7: "hours 6 to 7",
        hour_7_8: "hours 7 to 8",
        hour_8_9: "hours 8 to 9",
        hour_9_10: "hours 9 to 10",
        hour_10_11: "hours 10 to 11",
        hour_11_12: "hours 11 to 12",
        hour_12_13: "hours 12 to 13",
        hour_13_14: "hours 13 to 14",
        hour_14_15: "hours 14 to 15",
        hour_15_16: "hours 15 to 16",
        hour_16_17: "hours 16 to 17",
        hour_17_18: "hours 17 to 18",
        hour_18_19: "hours 18 to 19",
        hour_19_20: "hours 19 to 20",
        hour_20_21: "hours 20 to 21",
        hour_21_22: "hours 21 to 22",
        hour_22_23: "hours 22 to 23",
        hour_23_0: "hours 23 to 0",
    }

    //parsing
    const results = [];
    Object.keys(hours).forEach(hourKey => {

        Object.keys(days).forEach(dayKey => {
            results.push({ label: prefixLabel + " - pricing - " + hours[hourKey] + " - " + days[dayKey], value: prefixValue + "." + "pricing." + hourKey + "." + dayKey })
        });
    });

    return results;
}

function getNotifications(prefixLabel = "", prefixValue = "")
{
    const buckets = {
        preferred: "preferred",
        starsFourToFive: "stars four to five",
        starsThreeToFour: "stars three to four",
        unrated: "unrated",
        starsTwoToThree: "stars two to three",
        starsOneToTwo: "stars one to two"
    };

    const timeRanges = {
        lessThanFourHours: "less than four hours",
        betweenFourAndTwelveHours: "between four and twelve hours",
        betweenTwelveAndTwentyFourHours: "between twelve and twenty four hours",
        moreThanTwentyFourHours: "more than twenty four hours"
    }

    //parsing
    const results = [];
    Object.keys(buckets).forEach(bucketKey => {

        Object.keys(timeRanges).forEach(timeRangeKey => {
            results.push({ label: prefixLabel + " - pricing - " + buckets[bucketKey] + " - " + timeRanges[timeRangeKey], value: prefixValue + "." + "pricing." + bucketKey + "." + timeRangeKey })
        });
    });

    return results;
}

function getSpecialPricing(prefixLabel = "", prefixValue = "")
{
    const hours = {
        hour_0_1: "hours 0 to 1",
        hour_1_2: "hours 1 to 2",
        hour_2_3: "hours 2 to 3",
        hour_3_4: "hours 3 to 4",
        hour_4_5: "hours 4 to 5",
        hour_5_6: "hours 5 to 6",
        hour_6_7: "hours 6 to 7",
        hour_7_8: "hours 7 to 8",
        hour_8_9: "hours 8 to 9",
        hour_9_10: "hours 9 to 10",
        hour_10_11: "hours 10 to 11",
        hour_11_12: "hours 11 to 12",
        hour_12_13: "hours 12 to 13",
        hour_13_14: "hours 13 to 14",
        hour_14_15: "hours 14 to 15",
        hour_15_16: "hours 15 to 16",
        hour_16_17: "hours 16 to 17",
        hour_17_18: "hours 17 to 18",
        hour_18_19: "hours 18 to 19",
        hour_19_20: "hours 19 to 20",
        hour_20_21: "hours 20 to 21",
        hour_21_22: "hours 21 to 22",
        hour_22_23: "hours 22 to 23",
        hour_23_0: "hours 23 to 0",
    }

    //parsing
    const results = [];
    Object.keys(hours).forEach(hourKey => {
        results.push({ label: prefixLabel + " - pricing - " + hours[hourKey], value: prefixValue + "." + "pricing." + hourKey })
    });

    return results;
}
