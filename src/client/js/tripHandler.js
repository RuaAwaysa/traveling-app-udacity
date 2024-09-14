// import { fetchTripData, fetchImage } from './apiCalls';
// import { isValidLocation } from './locationValidator';

// // Function to add a new trip
// export async function addTrip() {
//     const locationInput = document.getElementById('locationInput').value;
//     const dateInput = document.getElementById('dateInput').value;
//     const endDateInput = document.getElementById('endDateInput').value;

//     if (!isValidLocation(locationInput)) {
//         alert('Please enter a valid location.');
//         return;
//     }

//     try {
//         // Fetch trip data and image
//         const tripData = await fetchTripData(locationInput, dateInput);
//         const imageData = await fetchImage(locationInput);

//         // Update UI with fetched data
//         updateUI(tripData, imageData, dateInput, endDateInput);
//         saveTripsToLocalStorage();
//     } catch (error) {
//         console.error('Error adding trip:', error);
//         alert('There was an error adding the trip.');
//     }
// }

// // Function to calculate trip length in days
// function calculateTripLength(startDate, endDate) {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const diffTime = Math.abs(end - start);
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
// }

// // Function to update the UI with trip data
// function updateUI(tripData, imageData, startDate, endDate) {
//     const tripLength = calculateTripLength(startDate, endDate);
//     const tripDetails = document.querySelector('.trip-details');
//     const tripCard = document.createElement('div');
//     tripCard.classList.add('trip-card');

//     tripCard.innerHTML = `
//         <img src="${imageData}" alt="${tripData.location}">
//         <div class="trip-info">
//             <h2>My trip to: ${tripData.location}</h2>
//             <p>Departing: ${startDate}</p>
//             <p>Returning: ${endDate}</p>
//             <p>Length of trip: ${tripLength} days</p>
//             <div class="weather-info">
//                 <img src="media/cloudy.png" alt="Weather Icon" id="weatherIcon" class="icon">
//                 <div>
//                 <p>${tripData.weather.description}</p>
//                 <p>Temperature: ${tripData.weather.temperature}°C</p>
//                 </div>
//             </div>
//             <div class="trip-actions">
//                 <button class="removeTripButton">Remove Trip</button>
//             </div>
//         </div>
//     `;

//     tripDetails.appendChild(tripCard);
//     sortTrips();
//     attachRemoveTripListener(tripCard);
// }

// // Function to sort trips by countdown (earliest trip first)
// function sortTrips() {
//     const tripCards = [...document.querySelectorAll('.trip-card')];
//     tripCards.sort((a, b) => {
//         const dateA = new Date(a.querySelector('p:nth-child(2)').textContent.replace('Departing: ', ''));
//         const dateB = new Date(b.querySelector('p:nth-child(2)').textContent.replace('Departing: ', ''));
//         return dateA - dateB;
//     });

//     const tripDetails = document.querySelector('.trip-details');
//     tripDetails.innerHTML = ''; // Clear current trip list
//     tripCards.forEach(card => {
//         tripDetails.appendChild(card);
//         checkExpiredTrip(card);
//     });
// }

// // Function to check if a trip has expired and style it accordingly
// function checkExpiredTrip(card) {
//     const departingDate = new Date(card.querySelector('p:nth-child(2)').textContent.replace('Departing: ', ''));
//     const now = new Date();
//     if (departingDate < now) {
//         card.classList.add('expired');
//     }
// }

// // Function to handle removing trips
// function attachRemoveTripListener(tripCard) {
//     const removeButton = tripCard.querySelector('.removeTripButton');
//     removeButton.addEventListener('click', function() {
//         tripCard.remove();
//         saveTripsToLocalStorage();
//     });
// }

// // Function to save trips to localStorage
// export function saveTripsToLocalStorage() {
//     const trips = [...document.querySelectorAll('.trip-card')].map(card => {
//         return {
//             location: card.querySelector('h2').textContent.replace('My trip to: ', ''),
//             startDate: card.querySelector('p:nth-child(2)').textContent.replace('Departing: ', ''),
//             endDate: card.querySelector('p:nth-child(3)').textContent.replace('Returning: ', ''),
//             weather: card.querySelector('.weather-info p:nth-child(2)').textContent,
//             temperature: card.querySelector('.weather-info p:nth-child(3)').textContent,
//             image: card.querySelector('img').src
//         };
//     });

//     localStorage.setItem('trips', JSON.stringify(trips));
// }

// // Function to load trips from localStorage on page load
// function loadTripsFromLocalStorage() {
//     const storedTrips = JSON.parse(localStorage.getItem('trips'));
//     if (storedTrips) {
//         storedTrips.forEach(trip => {
//             const tripData = {
//                 location: trip.location,
//                 weather: {
//                     description: trip.weather,
//                     temperature: trip.temperature.replace('Temperature: ', '').replace('°C', '')
//                 }
//             };
//             updateUI(tripData, trip.image, trip.startDate, trip.endDate);
//         });
//     }
// }

// // Load saved trips from localStorage when the page loads
// document.addEventListener('DOMContentLoaded', loadTripsFromLocalStorage);
import { fetchTripData, fetchImage } from './apiCalls';
import { isValidLocation } from './locationValidator';

// Function to add a new trip
export async function addTrip() {
    const locationInput = document.getElementById('locationInput').value;
    const dateInput = document.getElementById('dateInput').value;
    const endDateInput = document.getElementById('endDateInput').value;

    if (!isValidLocation(locationInput)) {
        alert('Please enter a valid location.');
        return;
    }

    try {
        // Fetch trip data and image
        const tripData = await fetchTripData(locationInput, dateInput);
        const imageData = await fetchImage(locationInput);

        // Update UI with fetched data
        updateUI(tripData, imageData, dateInput, endDateInput);
        saveTripsToLocalStorage();
    } catch (error) {
        console.error('Error adding trip:', error);
        alert('There was an error adding the trip.');
    }
}

// Function to calculate trip length in days
function calculateTripLength(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
}

// Function to update the UI with trip data
function updateUI(tripData, imageData, startDate, endDate) {
    const tripLength = calculateTripLength(startDate, endDate);
    const tripDetails = document.querySelector('.trip-details');
    const tripCard = document.createElement('div');
    tripCard.classList.add('trip-card');

    tripCard.innerHTML = `
        <img src="${imageData}" alt="${tripData.location}">
        <div class="trip-info">
            <h2>My trip to: ${tripData.location}</h2>
            <p>Departing: ${startDate}</p>
            <p>Returning: ${endDate}</p>
            <p>Length of trip: ${tripLength} days</p>
            <div class="weather-info">
                <img src="media/cloudy.png" alt="Weather Icon" id="weatherIcon" class="icon">
                    <p>${tripData.weather.description}</p>
                    <p>Temperature: ${tripData.weather.temperature}°C</p>
            </div>
            <div class="trip-actions">
                <button class="removeTripButton">Remove Trip</button>
            </div>
        </div>
    `;

    tripDetails.appendChild(tripCard);
    sortTrips();
    attachRemoveTripListener(tripCard);
}

// Function to sort trips by countdown (earliest trip first)
function sortTrips() {
    const tripCards = [...document.querySelectorAll('.trip-card')];
    tripCards.sort((a, b) => {
        const dateA = new Date(a.querySelector('p:nth-child(2)')?.textContent.replace('Departing: ', ''));
        const dateB = new Date(b.querySelector('p:nth-child(2)')?.textContent.replace('Departing: ', ''));
        return (dateA || 0) - (dateB || 0);
    });

    const tripDetails = document.querySelector('.trip-details');
    tripDetails.innerHTML = ''; // Clear current trip list
    tripCards.forEach(card => {
        tripDetails.appendChild(card);
        checkExpiredTrip(card);
    });
}

// Function to check if a trip has expired and style it accordingly
function checkExpiredTrip(card) {
    const departingDate = new Date(card.querySelector('p:nth-child(2)')?.textContent.replace('Departing: ', ''));
    const now = new Date();
    if (departingDate < now) {
        card.classList.add('expired');
    }
}

// Function to handle removing trips
function attachRemoveTripListener(tripCard) {
    const removeButton = tripCard.querySelector('.removeTripButton');
    removeButton?.addEventListener('click', function() {
        tripCard.remove();
        saveTripsToLocalStorage();
    });
}

// Function to save trips to localStorage
export function saveTripsToLocalStorage() {
    const trips = [...document.querySelectorAll('.trip-card')].map(card => {
        const heading = card.querySelector('h2');
        const startDate = card.querySelector('p:nth-child(2)');
        const endDate = card.querySelector('p:nth-child(3)');
        const weatherInfo = card.querySelector('.weather-info');
        const weatherDesc = weatherInfo ? weatherInfo.querySelector('p:nth-child(2)') : null;
        const temp = weatherInfo ? weatherInfo.querySelector('p:nth-child(3)') : null;

        return {
            location: heading ? heading.textContent.replace('My trip to: ', '') : '',
            startDate: startDate ? startDate.textContent.replace('Departing: ', '') : '',
            endDate: endDate ? endDate.textContent.replace('Returning: ', '') : '',
            weather: weatherDesc ? weatherDesc.textContent : '',
            temperature: temp ? temp.textContent : '',
            image: card.querySelector('img') ? card.querySelector('img').src : ''
        };
    });

    localStorage.setItem('trips', JSON.stringify(trips));
}

// Function to load trips from localStorage on page load
function loadTripsFromLocalStorage() {
    const storedTrips = JSON.parse(localStorage.getItem('trips'));
    if (storedTrips) {
        storedTrips.forEach(trip => {
            const tripData = {
                location: trip.location,
                weather: {
                    description: trip.weather,
                    temperature: trip.temperature.replace('Temperature: ', '').replace('°C', '')
                }
            };
            updateUI(tripData, trip.image, trip.startDate, trip.endDate);
        });
    }
}

// Load saved trips from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTripsFromLocalStorage);
