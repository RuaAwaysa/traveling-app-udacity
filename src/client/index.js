// Import styles
import './styles/styles.scss'
// Import functions from other JS files
import { addTrip } from './js/tripHandler';
import { isValidLocation } from './js/locationValidator';
import { saveTripsToLocalStorage } from './js/tripHandler';
import {setMinDateForDateInputs} from './js/dateValidation'

// Initialize event listeners
document.getElementById('addTripButton').addEventListener('click', addTrip);

// Delegate event listener for removing trips
document.querySelector('.trip-details').addEventListener('click', function(event) {
    if (event.target.classList.contains('removeTripButton')) {
        event.target.closest('.trip-card').remove();
        saveTripsToLocalStorage();
    }
});