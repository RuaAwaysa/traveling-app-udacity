// // Function to set the minimum date for date inputs
// export function setMinDateForDateInputs() {
//     const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
//     const dateInput = document.getElementById('dateInput');
//     const endDateInput = document.getElementById('endDateInput');

//     dateInput.setAttribute('min', today); // Set minimum date for departing input
//     endDateInput.setAttribute('min', today); // Set minimum date for returning input

//     // If returning date is before departing date, set it as departing date
//     dateInput.addEventListener('change', function() {
//         const departDate = dateInput.value;
//         if (endDateInput.value < departDate && endDateInput.value !== '') {
//             endDateInput.value = departDate;
//         }
//         endDateInput.setAttribute('min', departDate);
//     });

//     endDateInput.addEventListener('change', function() {
//         const departDate = dateInput.value;
//         if (endDateInput.value < departDate) {
//             endDateInput.value = departDate;
//         }
//     });
// }
// // Call the function to set min dates
// document.addEventListener('DOMContentLoaded', setMinDateForDateInputs);

// Function to set the minimum date for date inputs
export function setMinDateForDateInputs() {
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const dateInput = document.getElementById('dateInput');
    const endDateInput = document.getElementById('endDateInput');

    dateInput.setAttribute('min', today); // Set minimum date for departing input
    endDateInput.setAttribute('min', today); // Set minimum date for returning input

    // If returning date is before departing date, set it as departing date
    dateInput.addEventListener('change', function() {
        const departDate = dateInput.value;
        if (endDateInput.value < departDate && endDateInput.value !== '') {
            endDateInput.value = departDate;
        }
        endDateInput.setAttribute('min', departDate);
    });

    endDateInput.addEventListener('change', function() {
        const departDate = dateInput.value;
        if (endDateInput.value < departDate) {
            endDateInput.value = departDate;
        }
    });
}

// Call the function to set min dates
document.addEventListener('DOMContentLoaded', setMinDateForDateInputs);
