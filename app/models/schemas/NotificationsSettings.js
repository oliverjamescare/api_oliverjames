//core
const mongoose = require('mongoose');

const dayBounds = {
    moreThanTwentyFourHours: {
        type: Number,
        required: [ true, "{PATH} field is required." ],
        min: [0, "{PATH} cannot be lower than {MIN}."],
    },
    betweenTwelveAndTwentyFourHours: {
        type: Number,
        required: [ true, "{PATH} field is required." ],
        min: [0, "{PATH} cannot be lower than {MIN}."],
    },
    betweenFourAndTwelveHours: {
        type: Number,
        required: [ true, "{PATH} field is required." ],
        min: [0, "{PATH} cannot be lower than {MIN}."],
    },
    lessThanFourHours: {
        type: Number,
        required: [ true, "{PATH} field is required." ],
        min: [0, "{PATH} cannot be lower than {MIN}."],
    },
}

const schema = mongoose.Schema({
    preferred: dayBounds,
    starsFourToFive: dayBounds,
    starsThreeToFour: dayBounds,
    unrated: dayBounds,
    starsTwoToThree: dayBounds,
    starsOneToTwo: dayBounds,
});

module.exports = { schema };