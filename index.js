const { nextISSTimesForMyLocation } = require("./iss");


nextISSTimesForMyLocation((error, flyOverTimes) => {
  if (error) {
    console.log("Error occured when fetching ISS fly over times:", error);
    return;
  }
  console.log("ISS fly over times at my location:", flyOverTimes);
  for (let timestamp of flyOverTimes) {
    const date = new Date(timestamp.risetime * 1000);
    console.log(`Next pass at ${date} for ${timestamp.duration} seconds!`);
  }
});