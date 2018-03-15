exports.up = function(next)
{

  this.model("Setting").schema.create({
      type: "notifications",
      value: {
          preferred: {
              moreThanTwentyFourHours: 0,
              betweenTwelveAndTwentyFourHours: 0,
              betweenFourAndSixHours: 0,
              lessThanFourHours: 0
          },
          starsFourToFive: {
              moreThanTwentyFourHours: 60,
              betweenTwelveAndTwentyFourHours: 30,
              betweenFourAndSixHours: 5,
              lessThanFourHours: 0
          },
          starsThreeToFour: {
              moreThanTwentyFourHours: 30,
              betweenTwelveAndTwentyFourHours: 30,
              betweenFourAndSixHours: 5,
              lessThanFourHours: 0
          },
          unrated: {
              moreThanTwentyFourHours: 60,
              betweenTwelveAndTwentyFourHours: 60,
              betweenFourAndSixHours: 35,
              lessThanFourHours: 15
          },
          starsTwoToThree: {
              moreThanTwentyFourHours: 30,
              betweenTwelveAndTwentyFourHours: 30,
              betweenFourAndSixHours: 15,
              lessThanFourHours: 10
          },
          starsOneToTwo: {
              moreThanTwentyFourHours: 15,
              betweenTwelveAndTwentyFourHours: 15,
              betweenFourAndSixHours: 15,
              lessThanFourHours: 5
          }
      }
  }, () => {

    console.log("Done!")
    next();
  })
};

exports.down = function(next) {
  next();
};