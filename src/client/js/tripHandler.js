// // Fetch trip data from the server
// async function fetchTripData(location) {
//     try {
//         const response = await fetch('/getTripData', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ location }),
//         });

//         if (!response.ok) {
//             throw new Error('Error fetching trip data');
//         }

//         return await response.json();
//     } catch (error) {
//         console.error(error);
//         alert('Failed to fetch trip data');
//     }
// }

// // Fetch image from the server
// async function fetchImage(location) {
//     try {
//         const response = await fetch(`/getImage?location=${encodeURIComponent(location)}`);

//         if (!response.ok) {
//             throw new Error('Error fetching image');
//         }

//         return await response.json();
//     } catch (error) {
//         console.error(error);
//         alert('Failed to fetch image');
//     }
// }

// // Add trip to the page
// async function addTrip() {
//     const location = document.getElementById('locationInput').value.trim();

//     if (!location) {
//         alert('Please enter a location');
//         return;
//     }

//     // Fetch trip data
//     const tripData = await fetchTripData(location);
//     if (!tripData) return; // Exit if trip data couldn't be fetched

//     // Update the DOM with location and weather data
//     document.querySelector('.trip-info h2').innerText = `My trip to: ${tripData.location}`;
//     document.querySelector('.weather-info p').innerText = `Weather: ${tripData.weather.description}, ${tripData.weather.temperature}°C`;

//     // Fetch and display image
//     const imageData = await fetchImage(location);
//     if (imageData && imageData.image) {
//         document.getElementById('locationImage').src = imageData.image;
//     } else {
//         document.getElementById('locationImage').src = 'default-image.jpg'; // Use a default image or placeholder
//     }
// }

// // Attach the addTrip function to the "Add Trip" button
// document.querySelector('button').addEventListener('click', addTrip);
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
        updateUI(tripData, imageData);
    } catch (error) {
        console.error('Error adding trip:', error);
        alert('There was an error adding the trip.');
    }
}

function updateUI(tripData, imageData) {
    // Example of how to update the UI
    const tripDetails = document.querySelector('.trip-details');
    const tripCard = document.createElement('div');
    tripCard.classList.add('trip-card');

    tripCard.innerHTML = `
        <img src="${imageData}" alt="Location Image">
        <div class="trip-info">
            <h2>My trip to: ${tripData.location}</h2>
            <p>Departing: ${tripData.date}</p>
            <div class="weather-info">
                <img src="src/client/media/${tripData.weather.icon}.png" alt="Weather Icon">
                <p>${tripData.weather.description}</p>
                <p>Temperature: ${tripData.weather.temperature}°C</p>
            </div>
        </div>
    `;

    tripDetails.appendChild(tripCard);
}

