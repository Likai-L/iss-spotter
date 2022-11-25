const { fetchMyIp, fetchCoordsByIp } = require("./iss");

fetchMyIp((error, ip) => {
  if (error) {
    console.log("Error when fetching IP:", error);
    return;
  }
  console.log("Returned IP:", ip);
  fetchCoordsByIp(ip, (error, coords) => {
    if (error) {
      console.log("Error when fetching Geo Coordinates:", error);
      return;
    }
    console.log("My coordinates:", coords);
  });
});