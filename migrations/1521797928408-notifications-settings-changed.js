exports.up = function(next) {
    const Setting  = this.model("Setting").schema.update(
        {
            type: "notifications"
        },
        {
            value: {
                preferred: {
                    moreThanTwentyFourHours: 0,
                    betweenTwelveAndTwentyFourHours: 0,
                    betweenFourAndTwelveHours: 0,
                    lessThanFourHours: 0
                },
                starsFourToFive: {
                    moreThanTwentyFourHours: 60,
                    betweenTwelveAndTwentyFourHours: 30,
                    betweenFourAndTwelveHours: 5,
                    lessThanFourHours: 0
                },
                starsThreeToFour: {
                    moreThanTwentyFourHours: 30,
                    betweenTwelveAndTwentyFourHours: 30,
                    betweenFourAndTwelveHours: 5,
                    lessThanFourHours: 0
                },
                unrated: {
                    moreThanTwentyFourHours: 60,
                    betweenTwelveAndTwentyFourHours: 60,
                    betweenFourAndTwelveHours: 35,
                    lessThanFourHours: 15
                },
                starsTwoToThree: {
                    moreThanTwentyFourHours: 30,
                    betweenTwelveAndTwentyFourHours: 30,
                    betweenFourAndTwelveHours: 15,
                    lessThanFourHours: 10
                },
                starsOneToTwo: {
                    moreThanTwentyFourHours: 15,
                    betweenTwelveAndTwentyFourHours: 15,
                    betweenFourAndTwelveHours: 15,
                    lessThanFourHours: 5
                }
            }
        },
        {
            multi: true,
            strict: false
        },(error, numberAffected, raw) => {

            if (error) {
                console.error(error);
            }
            console.log('The number of updated documents was %d', numberAffected);
            console.log('The raw response from Mongo was ', raw);
            next();

        });

};

exports.down = function(next) {
  next();
};