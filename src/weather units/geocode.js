const request = require('request');

const geocode = (address, callback) => {
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw`;

  request({ url: geocodeUrl, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect Geocode Service', undefined);
    } else if (response.body.message || response.body.features.length === 0) {
      callback('Unable to find location. Please try again with a different search term.', undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

