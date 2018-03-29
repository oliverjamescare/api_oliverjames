const Pdfkit = require("pdfkit");
const fs = require("fs");
const randomstring = require("randomstring");
const moment = require("moment");

module.exports = class
{
    constructor()
    {
        this.document = new Pdfkit();
    }

    generatePdf(type, path, data)
    {
        // const fileName = randomstring.generate(32) + ".pdf";
        // this.document.pipe(fs.createWriteStream("public/uploads/" +path + "/" + fileName));

        const fileName = "test" + ".pdf";
        this.document.pipe(fs.createWriteStream("public/" + fileName));
        this.document.font("public/fonts/Roboto-Regular.ttf", "Roboto-Regular");


        //logo
        this.document
            .image("public/images/oliver-james-logo.jpg", { scale: 0.1 })
            .moveDown(2);

        //description
        this.document
            .fontSize(12)
            .text("Please find a summary of your job and the assigned carer attached. This can be kept for your records, but it will be accessible from online account");

        //job details
        this.document
            .moveDown(2)
            .fontSize(18)
            .text("Job details");

        //id
        this.document
            .fontSize(10)
            .moveDown()
            .fillColor("#03c88b")
            .text("Job ID:")
            .moveDown(0.5)
            .fillColor("#4a4a4a")
            .text(data.job._id);

        //start date
        this.document
            .moveDown()
            .fillColor("#03c88b")
            .text("Start:")
            .moveDown(0.5)
            .fillColor("#4a4a4a")
            .text(moment(data.job.start_date).format("YYYY-MM-DD"))

        //time
        this.document
            .moveDown()
            .fillColor("#03c88b")
            .text("Time:")
            .moveDown(0.5)
            .fillColor("#4a4a4a")
            .text(moment(data.job.start_date).format("H:MM A") + " till " + moment(data.job.end_date).format("H:MM A"));

        //address
        this.document
            .moveDown()
            .fillColor("#03c88b")
            .text("Address:")
            .moveDown(0.5)
            .fillColor("#4a4a4a")

            .text("śćź")

        this.document.end();
    }
}