const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Create a new instance of the app for testing
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Define your routes in the test file or import them if they are in a separate file
app.post('/getTripData', (req, res) => {
  // Mock your endpoint logic here or import the real logic
  if (req.body.location === 'London') {
    res.status(200).json({
      location: 'London',
      weather: {
        description: 'Clear',
        temperature: 20,
      },
    });
  } else {
    res.status(404).json({ error: 'Location not found' });
  }
});

describe('GET /getTripData', () => {
  it('should return location and weather data for a valid request', async () => {
    const response = await request(app)
      .post('/getTripData')
      .send({ location: 'London' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('location');
    expect(response.body).toHaveProperty('weather');
    expect(response.body.weather).toHaveProperty('description');
    expect(response.body.weather).toHaveProperty('temperature');
  });

  it('should return a 404 error for an invalid location', async () => {
    const response = await request(app)
      .post('/getTripData')
      .send({ location: 'InvalidLocation' });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Location not found');
  });
});
