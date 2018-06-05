/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//core
const ObjectId = require('mongoose').Types.ObjectId;
const async = require("async");
const randomstring = require('randomstring');

//models
const JobModel = require("../../models/Job");
const Job = JobModel.schema;
const User = require("../../models/User").schema;
const ReviewSchema = require("../../models/schemas/Review");
const ChallengeSchema = require("../../models/schemas/Challenge");
const Setting = require('./../../models/Setting').schema;

//services
const Utils = require("../../services/utils");
const fileHandler = require("../../services/fileHandler");
const QueuesHandler = require('../../services/QueuesHandler');
const JobsHandler = require('../../services/JobsHandler');
const PaymentsHandler = require('../../services/PaymentsHandler');

const Json2csvParser = require('json2csv').Parser;

module.exports = {
    exportData: async function(req, res)
    {
        const type = req.params.type;
        const types = ["jobs", "carers", "care_homes", "admins", "waiting_list", "notifications", "settings", "job_withdrawals"];

        //checking types
        if(!types.includes(type))
            return res.status(406).json(Utils.parseStringError("Invalid collection type", "type"));

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
        const filename = type.replace(/_/g, ' ') + ".csv";
        let csv = null;

        switch (type)
        {
            case "jobs":
            {
                const data = await Job.find(query).lean().exec();
                const fields = [
                    //basic
                    { label: "Job id", value: "_id" }, { label: "Start date", value: "start_date"}, { label: "End date", value: "end_date"},
                    { label: "Care home id", value: "care_home"}, { label: "Manual booking", value: "manual_booking"},
                    { label: "Role", value: "role"}, { label: "Gender preference", value: "gender_preference"}, { label: "Notes", value: "notes"},

                    //general guidance
                    { label: "General guidance parking", value: "general_guidance.parking"}, { label: "General guidance notes for carers", value: "general_guidance.notes_for_carers"},
                    { label: "General guidance emergency guidance", value: "general_guidance.emergency_guidance"}, { label: "General guidance report contact", value: "general_guidance.report_contact"},
                    { label: "General guidance superior contact", value: "general_guidance.superior_contact"},

                    //pricing
                    { label: "Percent charge", value: "percent_charge"},
                    { label: "Manual booking pricing", value: "booking_pricing.manual_booking_pricing"}, { label: "Commission %", value: "booking_pricing.app_commission"},
                    { label: "Carer max to deduct", value: "booking_pricing.max_to_deduct"}, { label: "Hourly pricing", value: "booking_pricing.pricing"},

                    //cost
                    { label: "Job cost", value: "cost.job_cost"}, { label: "Job manual booking cost", value: "cost.manual_booking_cost"}, { label: "Job total cost", value: "cost.total_cost"},

                    //charge
                    { label: "Charge care home deductions", value: "charge.deductions"}, { label: "Charge job cost", value: "charge.job_cost"}, { label: "Charge manual booking cost", value: "charge.manual_booking_cost"},
                    { label: "Charge total cost", value: "charge.total_cost"}, { label: "Charge net cost", value: "charge.net_cost"}, { label: "Charge date", value: "charge.charge_date"},

                    //carer assignment
                    { label: "Carer projected income", value: "assignment.projected_income"}, { label: "Assigned carer id", value: "assignment.carer"}, { label: "Carer assignment date", value: "assignment.created"},

                    //summary sheet
                    { label: "Summary sheet name", value: "assignment.summary_sheet.name"}, { label: "Summary sheet position", value: "assignment.summary_sheet.position"}, { label: "Summary sheet notes", value: "assignment.summary_sheet.notes"}, { label: "Summary sheet date", value: "assignment.summary_sheet.created"},
                    { label: "Summary sheet edited start date", value: "assignment.summary_sheet.start_date"}, { label: "Summary sheet edited end date", value: "assignment.summary_sheet.end_date"}, { label: "Summary sheet voluntary deduction", value: "assignment.summary_sheet.voluntary_deduction"},

                    //payment
                    { label: "Payment debit date", value: "assignment.payment.debit_date"}, { label: "Payment transaction commission", value: "assignment.payment.transaction_charge"}, { label: "Payment Oliver James commission", value: "assignment.payment.application_fee"}, { label: "Payment carer deductions", value: "assignment.payment.deductions"},
                    { label: "Payment job income", value: "assignment.payment.job_income" }, { label: "Payment job net income", value: "assignment.payment.net_income" }, { label: "Payment status", value: "assignment.payment.status" }, { label: "Payment date", value: "assignment.payment.payment_date" },

                    //review
                    { label: "Review rate", value: "assignment.review.rate"}, { label: "Review description", value: "assignment.review.description"}, { label: "Review status", value: "assignment.review.status"}, { label: "Review date", value: "assignment.review.created"},

                    //challenge
                    { label: "Challenge description", value: "assignment.challenge.description"}, { label: "Challenge admin response", value: "assignment.challenge.response"}, { label: "Challenge status", value: "assignment.challenge.status"}, { label: "Challenge date", value: "assignment.challenge.created"},

                    //

                ];

                const parser = new Json2csvParser({ fields });
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
