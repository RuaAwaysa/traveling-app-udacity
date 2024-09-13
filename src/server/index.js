var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const aylien = require('aylien_textapi');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'))

// API's URL
const GEONAMES_API = 'http://api.geonames.org/searchJSON';
const WEATHERBIT_API = 'https://api.weatherbit.io/v2.0/forecast/daily';
const PIXABAY_API = 'https://pixabay.com/api/';

// Set up the API keys
const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
// Variables for url and api key
console.log("directory name"+__dirname);
// console.log(process.env)
console.log(process.env.GEONAMES_USERNAME);
console.log(process.env.WEATHERBIT_API_KEY);
console.log(process.env.PIXABAY_API_KEY);
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    })

// POST Route
// POST route to handle trip data from the client
app.post('/trip', async (req, res) => {
    const { location, date } = req.body;
  
    try {
      // 1. Get the latitude and longitude from Geonames API
      const geonamesResponse = await axios.get(GEONAMES_API, {
        params: {
          q: location,
          maxRows: 1,
          username: GEONAMES_USERNAME,
        },
      });
  
      const { lat, lng } = geonamesResponse.data.geonames[0];
  
      // 2. Get the weather data from Weatherbit API using the coordinates
      const weatherbitResponse = await axios.get(WEATHERBIT_API, {
        params: {
          lat: lat,
          lon: lng,
          key: WEATHERBIT_API_KEY,
        },
      });
  
      const weatherData = weatherbitResponse.data;
  
      // 3. Get an image from Pixabay API
      const pixabayResponse = await axios.get(PIXABAY_API, {
        params: {
          q: location,
          key: PIXABAY_API_KEY,
          image_type: 'photo',
        },
      });
  
      const imageUrl = pixabayResponse.data.hits.length > 0 
        ? pixabayResponse.data.hits[0].webformatURL 
        : 'https://via.placeholder.com/400';
  
      // 4. Send the data back to the client
      res.json({
        location,
        date,
        weather: weatherData,
        image: imageUrl,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching trip data.' });
    }
  });

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});