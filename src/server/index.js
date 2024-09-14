const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

// API Endpoints and Keys
const GEONAMES_API = 'http://api.geonames.org/searchJSON';
const WEATHERBIT_API = 'https://api.weatherbit.io/v2.0/forecast/daily';
const PIXABAY_API = 'https://pixabay.com/api/';

const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

// GET route for homepage
app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

// POST route for getting weather and location data
app.post('/getTripData', async (req, res) => {
    const { location } = req.body; // The location input from the user

    try {
        // 1. Geonames API request to get latitude and longitude
        const geoResponse = await axios.get(`${GEONAMES_API}?q=${location}&maxRows=1&username=${GEONAMES_USERNAME}`);
        const geoData = geoResponse.data.geonames[0];

        if (!geoData) {
            return res.status(404).json({ error: 'Location not found' });
        }

        const { lat, lng, countryName } = geoData;

        // 2. Weatherbit API request using latitude and longitude
        const weatherResponse = await axios.get(`${WEATHERBIT_API}?lat=${lat}&lon=${lng}&key=${WEATHERBIT_API_KEY}`);
        const weatherData = weatherResponse.data.data[0]; // Get the first weather forecast object

        // Send the location and weather data back to the client
        res.json({
            location: `${geoData.name}, ${countryName}`,
            weather: {
                description: weatherData.weather.description,
                temperature: weatherData.temp,
            },
        });
    } catch (error) {
        console.error('Error fetching trip data:', error);
        res.status(500).json({ error: 'Error fetching trip data' });
    }
});

// GET route for getting image based on location
app.get('/getImage', async (req, res) => {
    const { location } = req.query; // The location input from the user

    try {
        // 3. Pixabay API request to get image based on location or country
        const imageResponse = await axios.get(`${PIXABAY_API}?key=${PIXABAY_API_KEY}&q=${location}&image_type=photo&category=places`);
        const imageData = imageResponse.data.hits.length > 0 ? imageResponse.data.hits[0].webformatURL : '';

        // Send the image URL back to the client
        res.json({
            image: imageData || 'No image found', // Fallback if no image found
        });
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).json({ error: 'Error fetching image' });
    }
});

// Start the server on port 8000
app.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});
