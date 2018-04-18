
//loading config
require('dotenv').config();
require("./../../config/database");

//core
const async = require('async');
const mailer = require("./../../config/mailer").getMailer();

//services
const QueuesHandler = require('./../services/QueuesHandler');
const PaymentsHandler = require('./../services/PaymentsHandler');
const PDFHandler = require('../services/PDFHandler');

//models
const User = require("./../models/User").schema;
const JobModel = require("./../models/Job")
const Job = JobModel.schema;

//queues config
const config = {
    queue: "payments",
    exchange: "payments"
};

//Payments listener
QueuesHandler.subscribe(data => {

    console.log("Payment request");
    Job.findOne({ _id: data.job_id }).then(job => {
        async.parallel({
            care_home: (callback) => User.findOne({ _id: job.care_home }, (error, careHome) => callback(null, careHome)),
            carer: (callback) => User.findOne({ _id: job.assignment.carer }, (error, carer) => callback(null, carer)),
        }, (errors, results) => {

            if(results)
            {
                const handler = new PaymentsHandler();
                handler.processPayment(job, results.carer, results.care_home)
                    .then(resolve => {

                        const job = resolve.job;
                        const carer = resolve.carer;
                        const careHome = resolve.careHome;

                        //updating carer and care home deductions and credits
                        carer.save().catch(error => console.log(error));
                        careHome.save().catch(error => console.log(error));

                        job
                            .save()
                            .then(job => {

                                //payments notification
                                QueuesHandler.publish({ carer_id: carer._id, job_id: job._id, care_home_id: careHome._id, type: "PAYMENT_PROCESSED" }, { exchange: "notifications", queue: "notifications" })

                                //generating pdfs
                                const pdfHandler = new PDFHandler();
                                async.parallel({
                                    carerInvoice: (callback) => pdfHandler.generatePdf("CARER_INVOICE", "jobs/" + job._id, { job: job, carer: carer, care_home: careHome }).then(pdfPath => callback(null, pdfPath)).catch(error => callback(error)),
                                    careHomeInvoice: (callback) => pdfHandler.generatePdf("CARE_HOME_INVOICE", "jobs/" + job._id, { job: job, carer: carer, care_home: careHome }).then(pdfPath => callback(null, pdfPath)).catch(error => callback(error)),
                                    commissionConfirmation: (callback) => pdfHandler.generatePdf("COMMISSION_CONFIRMATION", "jobs/" + job._id, { job: job, carer: carer, care_home: careHome }).then(pdfPath => callback(null, pdfPath)).catch(error => callback(error)),
                                }, (errors, results) => {

                                    if(!errors)
                                    {
                                        job.charge.invoice = results.careHomeInvoice;
                                        job.assignment.payment.invoice = results.carerInvoice;
                                        job.assignment.payment.commission_confirmation = results.commissionConfirmation;

                                        //sending emails and updating job
                                        job.sendJobPaymentEmails(mailer, careHome, carer);
                                        job.save().catch(error => console.log(error));
                                    }
                                })
                            })
                            .catch(error => console.log(error));
                    })
                    .catch(error => {

                        console.log(error);
                        job.status = JobModel.statuses.PAYMENT_REJECTED;
                        job.save().catch(error => console.log(error))
                    });
            }
        });
    });
}, config);