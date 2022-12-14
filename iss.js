const request = require("request");

const fetchMyIp = (callback) => {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIp = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // parse the returned body for convenient use
    const geoInfo = JSON.parse(body);
    // handling invalid ip by checking the success status in the returned body
    if (!geoInfo.success) {
      const msg = `Success status: ${geoInfo.success}. Server message says: ${geoInfo.message} when fetching for IP ${geoInfo.ip}`;
      callback(Error(msg), null);
      return;
    }
    // extract coordinates from parsed body to a new object
    // const geoCoords = {};
    // geoCoords.latitude = geoInfo.latitude;
    // geoCoords.longitude = geoInfo.longitude;
    // use object shorthand syntax:
    const { latitude, longitude } = geoInfo;
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS fly over times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const parsedBody = JSON.parse(body);
    const flyOverTimes = parsedBody.response;
    callback(null, flyOverTimes);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIp((error, ip) => {
    if (error) {
      console.log("Error occured when fetching IP:", error);
      return;
    }
    fetchCoordsByIp(ip, (error, coords) => {
      if (error) {
        console.log("Error occured when fetching Geo Coordinates:", error);
        return;
      }
      fetchISSFlyOverTimes(coords, callback);
    });
  });
};

module.exports = {
  fetchMyIp,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};