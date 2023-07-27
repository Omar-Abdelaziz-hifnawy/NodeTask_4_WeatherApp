const weatherForm = document.querySelector('#weatherForm');
const search = document.querySelector('#searchInput');

const locationWeb = document.querySelector('#location');
const countryWeb = document.querySelector('#country'); 
const temperatureWeb = document.querySelector('#temperature');
const summaryWeb = document.querySelector('#summary');
const precipProbabilityWeb = document.querySelector('#precipProbability');
const latitudeWeb = document.querySelector('#latitude');
const longitudeWeb = document.querySelector('#longitude');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = search.value;
  fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        locationWeb.textContent = '';
        countryWeb.textContent = '';
        latitudeWeb.textContent = '';
        longitudeWeb.textContent = '';
        temperatureWeb.textContent = '';
        summaryWeb.textContent = '';
        precipProbabilityWeb.textContent = '';
        document.querySelector('#errorText').textContent = data.error;
      } else {
        locationWeb.textContent = "Location: " + data.location;
        countryWeb.textContent = "Country: " + data.country; 
        latitudeWeb.textContent = "latitude: " + data.latitude; 
        longitudeWeb.textContent = "longitude: " + data.longitude; 
        temperatureWeb.textContent = "Temperature: " + data.temperature + "°C";
        summaryWeb.textContent = "Summary: " + data.summary;
        precipProbabilityWeb.textContent = "Precipitation Probability: " + data.precipProbability;
      }
    });
  });
});
