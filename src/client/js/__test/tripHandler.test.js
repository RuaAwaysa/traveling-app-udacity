// import { addTrip } from '../src/client/js/tripHandler';
// import { fetchTripData, fetchImage } from '../apiCalls';
// import { isValidLocation } from '../locationValidator';

// // Mock fetchTripData and fetchImage functions
// jest.mock('../apiCalls', () => ({
//     fetchTripData: jest.fn(),
//     fetchImage: jest.fn(),
// }));

// // Mock isValidLocation function
// jest.mock('../locationValidator', () => ({
//     isValidLocation: jest.fn(),
// }));

// describe('Client-side JavaScript', () => {
//     beforeEach(() => {
//         document.body.innerHTML = `
//             <input type="text" id="locationInput" value="Paris">
//             <input type="date" id="dateInput" value="2024-09-01">
//             <input type="date" id="endDateInput" value="2024-09-10">
//             <button id="addTripButton">Add Trip</button>
//             <div class="trip-details"></div>
//         `;

//         isValidLocation.mockReturnValue(true);
//     });

//     it('should add a trip and update the UI', async () => {
//         fetchTripData.mockResolvedValue({
//             location: 'Paris, France',
//             weather: {
//                 description: 'Sunny',
//                 temperature: 25,
//             },
//         });

//         fetchImage.mockResolvedValue('https://example.com/image.jpg');

//         await addTrip();

//         const tripDetails = document.querySelector('.trip-details');
//         expect(tripDetails.children.length).toBe(1);
//         const tripCard = tripDetails.querySelector('.trip-card');
//         expect(tripCard).toBeInTheDocument();
//         expect(tripCard.innerHTML).toContain('My trip to: Paris, France');
//         expect(tripCard.innerHTML).toContain('Departing: 2024-09-01');
//         expect(tripCard.innerHTML).toContain('Returning: 2024-09-10');
//         expect(tripCard.innerHTML).toContain('Length of trip: 9 days');
//         expect(tripCard.querySelector('img').src).toBe('https://example.com/image.jpg');
//     });
// });
