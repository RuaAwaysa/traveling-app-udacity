// const request = require('supertest');
// const express = require('express');
// const app = require('../src/server/index.js'); // Adjust the path if necessary

// describe('Server API Endpoints', () => {
//     it('should fetch trip data successfully', async () => {
//         const response = await request(app)
//             .post('/getTripData')
//             .send({ location: 'Paris' });

//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('location');
//         expect(response.body).toHaveProperty('weather');
//         expect(response.body.weather).toHaveProperty('description');
//         expect(response.body.weather).toHaveProperty('temperature');
//     });

//     it('should fetch image successfully', async () => {
//         const response = await request(app)
//             .get('/getImage')
//             .query({ location: 'Paris' });

//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('image');
//     });
// });
