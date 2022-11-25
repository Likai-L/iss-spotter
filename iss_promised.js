const request = require("request-promise-native");
const fetchMyIP = () => {
  return request("https://api.ipify.org?format=json");
};

const fetchMyCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude} = JSON.parse(body);
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchMyCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const timestamps = JSON.parse(body).response;
      return timestamps;
    }
    );
};

const printPassTimes = (passTimes) => {
  for (let passTime of passTimes) {
    const date = new Date(passTime.risetime * 1000);
    console.log(`Next pass at ${date} for ${passTime.duration} seconds!`);
  }
};

module.exports = { fetchMyIP, fetchMyCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation, printPassTimes };