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
                    { label: "Job id", value: "_id" }, { label: "Start date", value: "start_date"}, { label: "End date", value: "end_date"},
                    { label: "Care home id", value: "care_home"}, { label: "Manual booking", value: "manual_booking"}, { label: "Percent charge", value: "percent_charge"},
                    { label: "Manual booking pricing", value: "booking_pricing.manual_booking_pricing"}, { label: "Commission %", value: "booking_pricing.app_commission"},
                    { label: "Carer max to deduct", value: "booking_pricing.max_to_deduct"}, { label: "Hourly pricing", value: "booking_pricing.pricing"},
                    { label: "Job cost", value: "cost.job_cost"}, { label: "Job manual booking cost", value: "cost.manual_booking_cost"}, { label: "Job total cost", value: "cost.total_cost"},
                    { label: "Charge care home deductions", value: "charge.deductions"}, { label: "Charge job cost", value: "charge.job_cost"}, { label: "Charge manual booking cost", value: "charge.manual_booking_cost"},
                    { label: "Charge total cost", value: "charge.total_cost"}, { label: "Charge net cost", value: "charge.net_cost"}, { label: "Charge date", value: "charge.charge_date"},
                    { label: "Carer projected income", value: "assignment.projected_income"}, { label: "Assigned carer id", value: "assignment.carer"}, { label: "Carer assignment date", value: "assignment.created"},

                    { label: "Summary sheet name", value: "summary_sheet.name"}, { label: "Summary sheet position", value: "summary_sheet.position"}, { label: "Summary sheet notes", value: "assignment.created"},
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
