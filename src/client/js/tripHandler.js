import { fetchTripData, fetchImage } from './apiCalls';
import { isValidLocation } from './locationValidator';

const form = document.querySelector('.add-trip-form');

export async function addTrip() {
    const locationInput = document.getElementById('locationInput').value;
    const dateInput = document.getElementById('dateInput').value;

    if (!isValidLocation(locationInput)) {
        alert('Please enter a valid location.');
        return;
    }

    try {
        // Fetch trip data
        const tripData = await fetchTripData(locationInput, dateInput);
        const imageData = await fetchImage(locationInput);

        // Update the UI with the fetched data
        updateUI(tripData, imageData ,dateInput);
    } catch (error) {
        console.error('Error adding trip:', error);
        alert('There was an error adding the trip.');
    }
}

function updateUI(tripData, imageData,date) {
    // Example of how to update the UI
    const tripDetails = document.querySelector('.trip-details');
    const tripCard = document.createElement('div');
    tripCard.classList.add('trip-card');

    tripCard.innerHTML = `
        <img src="${imageData}" alt="${location}">
        <div class="trip-info">
            <h2>My trip to: ${tripData.location}</h2>
            <p>Departing: ${date}</p>
            <div class="weather-info">
                <img src="media/cloudy.png" alt="Weather Icon" id="weatherIcon" class="icon" >
                <div>
                <p>${tripData.weather.description}</p>
                <p>Temperature: ${tripData.weather.temperature}°C</p>
                </div>
                
            </div>
            <div class="trip-actions">
                        <button>Save Trip</button>
                        <button>Remove Trip</button>
            </div>
        </div>
    `;

    tripDetails.appendChild(tripCard);
}

