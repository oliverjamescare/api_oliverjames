
const NOTIFICATIONS = {
    NEW_JOBS: {
        title: "New job(s) available!",
        description: ["New job(s) available that you may be interested in"],
        inputs: []
    },
    JOB_CANCELLED: {
        title: "Cancelled job!",
        description: ["A job you accepted has been cancelled"],
        inputs: []
    },
    JOB_MODIFIED: {
        title: "Modified job!",
        description: ["A job you accepted has been modified by the client"],
        inputs: []
    },
    REVIEW_PUBLISHED: {
        title: "New review published!",
        description: ["New review published. Your average rating is now "," out of 5"],
        inputs: ["average"]
    },
    PAYMENT_PROCESSED: {
        title: "Payment scheduled!",
        description: ["Payment of £", " for your job at ", " on ", " has been scheduled. You should receive payment shortly" ],
        inputs: ["amount", "care_service_name", "date"]
    },

}

module.exports = {
    prepare
}