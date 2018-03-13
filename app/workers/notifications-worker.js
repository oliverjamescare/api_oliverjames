const QueuesHandler = require('./../services/QueuesHandler');
const config = {
    queue: "notifications",
    exchange: "notifications"
};

//Notifications listener
QueuesHandler.subscribe((data) => {

    console.log("Sending notifications", data);

}, config);