const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=dfc81ece8ea24d8ba7a181549231607&q=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (!body.current || !body.current.condition) {
      callback('Unable to fetch weather data. Please try again later.', undefined);
    } else {
      const { temp_c: temperature, precip_mm: precipProbability, condition } = body.current;
      const { country } = body.location; 
      const location = `${body.location.name}, ${country}`;
      callback(undefined, {
        temperature,
        precipProbability,
        summary: condition.text,
        location,
        country, 
      });
    }
  });
};

module.exports = forecast;
