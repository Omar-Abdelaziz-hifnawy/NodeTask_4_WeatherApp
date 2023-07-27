const express = require("express");
const hbs = require("hbs");
const path = require("path");

const geocode = require('./weather units/geocode');
const forecast = require('./weather units/forecast');

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname , '../views')
const publicDirectoryPath = path.join(__dirname , '../public') 

const partialsPath = path.join(__dirname , '../views/partials')
hbs.registerPartials(partialsPath)

app.set('view engine' , 'hbs')
app.set('views' , viewsPath)

app.use(express.static(publicDirectoryPath))

app.get ('/check-weather', (req,res) => {
  res.render('check-weather')
})

app.get ('/' , (req , res) => {
  res.render('index')
})


app.get('/weather' , (req,res) => {
  geocode(req.query.address , (error, {latitude , longitude , location, country} = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, dataForecast) => {
      if (error) {
        return res.send({ error });
      }
      
      const { temperature , preceipProbability , summary ,country} = dataForecast;
      console.log('Location:', location);
      console.log('Contry:', country);
      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);
      console.log('Current temperature:', temperature, '°C');
      console.log('Weather summary:', summary);

      res.send({ location, country, latitude, longitude, temperature, preceipProbability, summary });
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});