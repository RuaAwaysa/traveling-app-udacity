// Import styles
import './styles/styles.scss'
// Import functions from other JS files
import { addTrip } from './js/tripHandler';
import { isValidLocation } from './js/locationValidator';
// Initialize event listeners
document.getElementById('addTripButton').addEventListener('click', addTrip);
