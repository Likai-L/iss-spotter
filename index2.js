const { nextISSTimesForMyLocation, printPassTimes } = require("./iss_promised");

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("Error occured: ", error.message);
  });