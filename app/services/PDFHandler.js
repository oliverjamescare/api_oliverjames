const Pdfkit = require("pdfkit");
const fs = require("fs");
const randomstring = require("randomstring");
const moment = require("moment");
const jadepdf = require('jade-pdf-redline');

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
        this.document.font("public/fonts/Roboto-Regular.ttf");

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
            .text("Job details")
            .fontSize(10);

        const documentJobData = [
            {
                label: "Job ID:",
                value: data.job._id
            },
            {
                label: "Start:",
                value: moment(data.job.start_date).format("YYYY-MM-DD")
            },
            {
                label: "Time:",
                value: moment(data.job.start_date).format("h:mm A") + " till " + moment(data.job.end_date).format("h:mm A")
            },
            {
                label: "Role:",
                value: data.job.role
            },
            {
                label: "Gender preference:",
                value: data.job.gender_preference
            },
            {
                label: "Care home:",
                value: data.job.author.care_home.care_service_name
            },
            {
                label: "Phone:",
                value: data.job.author.phone_number
            },
            {
                label: "Care home:",
                value: data.job.author.care_home.care_service_name
            },
            {
                label: "Address:",
                value: function()
                {
                    const address = data.job.author.address;
                    return (address.company ? address.company + ", " : "")
                        + address.address_line_1 + ", "
                        + (address.address_line_2 ? address.address_line_2 + ", " : "")
                        + address.city + ", "
                        + address.postal_code;
                }()
            },
            {
                label: "Who to speak to if calling the service:",
                value: data.job.general_guidance.superior_contact
            },
            {
                label: "Where to report to on arrival:",
                value: data.job.general_guidance.report_contact
            },
            {
                label: "In event of fire:",
                value: data.job.general_guidance.emergency_guidance
            },
            {
                label: "Parking:",
                value: data.job.general_guidance.parking
            },
            {
                label: "Notes for carers:",
                value: data.job.notes
            }
        ];

        this.generateItems(documentJobData);

        //carer details
        this.document
            .moveDown(2)
            .fontSize(18)
            .fillColor("#000")
            .text("Carer details");

        this.document
            .moveDown()
            .fillColor("#000")
            .fontSize(10)
            .text(data.job.carer.carer.first_name + " " + data.job.carer.carer.surname);

        //star
        this.document
            .translate(this.document.x - 5, this.document.y)
            .scale(0.05)
            .fillColor("#03c88b")
            .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
            .fill("non-zero")
            .restore()
            .moveDown(2)
            .fillColor("#4a4a4a")
            .text(data.job.carer.carer.reviews.average + " from " + data.job.carer.carer.reviews.count + " reviews",40,50, { continued: "yes"});


        this.document.end();

    }

    generateItems(data)
    {

        data.forEach(item => {
            this.document
                .moveDown()
                .fillColor("#03c88b")
                .text(item.label)
                .moveDown(0.5)
                .fillColor("#4a4a4a")
                .text(item.value);
        });

    }
}