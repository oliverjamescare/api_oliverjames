//core
const fs = require("fs");
const randomstring = require("randomstring");
const moment = require("moment");
const pdf = require('html-pdf');
const jade = require('jade');
const async = require('async');

//settings
const pdfTemplatesPath = __dirname + "/../../views/pdf/";
const pdfOutputPath = __dirname + "/../../public/uploads/";
const types = {
    JOB_ACCEPTANCE: "job-acceptance",
    CARER_REGISTRATION_DETAILS: "registration-carer-details",
    CARER_REGISTRATION_QUESTIONNAIRE: "registration-carer-q-a",
}


module.exports = class
{
    constructor(req)
    {
        this.req = req;
    }

    generatePdf(type, path, data)
    {
        this.provideTools(data);

        return new Promise((resolve, reject) => {
            if(Object.keys(types).indexOf(type) != -1)
            {
                const fileName = types[type] + randomstring.generate(16) + ".pdf";

                async.waterfall([
                    (callback) => jade.renderFile(pdfTemplatesPath + types[type] + ".jade", data, (error, html) => callback(null, html)),
                    (html, callback) => {
                        if(html)
                        {
                            const options = {
                                format: 'Letter',
                                border: "40px"
                            };

                            pdf.create(html, options).toFile(pdfOutputPath + path + "/" + fileName, (error, result) => callback(null, path + "/" + fileName));
                        }
                        else
                            callback("Invalid html");
                    }
                ], (error, results) => error ? reject(error) : resolve(results))
            }
            else
                reject("Invalid type");
        });

    }

    provideTools(data)
    {
        data.assets = (assetPath) => (this.req.secure ? "https://" : "http://") + this.req.headers.host + assetPath;
        data.moment = moment;
    }
}