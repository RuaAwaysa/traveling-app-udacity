import { addTrip, saveTripsToLocalStorage } from '../tripHandler';
import { fetchTripData, fetchImage } from '../apiCalls';
import { isValidLocation } from '../locationValidator';

jest.mock('../apiCalls');
jest.mock('../locationValidator');

describe('addTrip function', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="locationInput" value="London" />
      <input id="dateInput" value="2024-09-16" />
      <input id="endDateInput" value="2024-09-17" />
      <div class="trip-details"></div>
    `;
    fetchTripData.mockResolvedValue({ location: 'London', weather: { description: 'Few clouds', temperature: '14.8' } });
    fetchImage.mockResolvedValue('https://pixabay.com/get/g0bb5d31fa6432e98419fb93a0…a266cb53b49e16f335f25a9bcd6377c6341723270_640.jpg');
    isValidLocation.mockReturnValue(true);
  });

  it('should call fetchTripData and fetchImage, and update the UI', async () => {
    await addTrip();
    expect(fetchTripData).toHaveBeenCalledWith('London', '2024-09-16');
    expect(fetchImage).toHaveBeenCalledWith('London');
    const tripDetails = document.querySelector('.trip-details');
    expect(tripDetails.children.length).toBe(1);
  });

  it('should handle invalid location', async () => {
    isValidLocation.mockReturnValue(false);
    global.alert = jest.fn(); // Mock alert

    await addTrip();
    expect(global.alert).toHaveBeenCalledWith('Please enter a valid location.');
  });
});

describe('saveTripsToLocalStorage function', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="trip-card">
        <h2>My trip to: London</h2>
        <p>Departing: 2024-09-16</p>
        <p>Returning: 2024-09-17</p>
        <div class="weather-info">
          <p>Few clouds</p>
          <p>Temperature: 14.8°C</p>
        </div>
        <img src="https://pixabay.com/get/g0bb5d31fa6432e98419fb93a0…a266cb53b49e16f335f25a9bcd6377c6341723270_640.jpg" alt="London" />
      </div>
    `;
  });

  it('should save trip details to localStorage', () => {
    saveTripsToLocalStorage();
    const trips = JSON.parse(localStorage.getItem('trips'));
    expect(trips).toHaveLength(1);
    expect(trips[0]).toHaveProperty('location', 'London');
  });
});
