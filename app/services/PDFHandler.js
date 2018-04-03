//core
const fs = require("fs");
const randomstring = require("randomstring");
const moment = require("moment");
const pdf = require('html-pdf');
const jade = require('jade');

//settings
const pdfTemplatesPath = __dirname + "/../../views/pdf/";
const pdfOutputPath = __dirname + "/../../public/";

module.exports = class
{
    constructor(req)
    {
        this.req = req;
    }

    generatePdf(type, path, data)
    {
        // const fileName = randomstring.generate(32) + ".pdf";
        // this.document.pipe(fs.createWriteStream("public/uploads/" +path + "/" + fileName));


        data.assets = (assetPath) => (this.req.secure ? "https://" : "http://") + this.req.headers.host + assetPath;
        data.moment = moment;

        jade.renderFile(pdfTemplatesPath + "job-acceptance.jade", data, (error, html) => {
            if(error)
                console.log(error);

            if(html)
            {
                const options = {
                    format: 'Letter',
                    border: "40px"
                };

                pdf.create(html, options).toFile(pdfOutputPath + "test.pdf", (error, res) => {

                    console.log('PDF completed!')
                });
            }
        });


    }
}