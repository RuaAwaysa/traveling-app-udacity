# traveling-app-udacity
The Travel Planner App is a comprehensive web application designed to help users plan their trips by providing weather forecasts, location images, and additional information based on user input. This project integrates multiple APIs, including Geonames, Weatherbit, and Pixabay, and utilizes modern web development practices with Webpack, Express, and service workers.

## **Table of Contents**

1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Technologies Used](#technologies-used)
6. [Development](#development)
7. [Testing](#testing)
8. [License](#license)

## **Project Structure**

```bash
src/
│
├── client/
│   ├── views/
│   │   └── index.html                # Main HTML file
│   ├── styles/              
│   │   └── styles.scss               # Main SCSS file
│   ├── js/
│   │   └── __test/                  # Main JavaScript file
│   │       ├── server.test.js  # Tests for express server
│   │       └── testUrlChecker.spec.js   # Tests for js trip functionality
│   │   ├── dateValidation.js             # Validates the entered Date to Ensure that no expired Date 
|   │   ├── apiCalls.js             
|   │   ├── locationValidator.js            
│   │   └── __test__/                 # Test files for Jest
│   │       ├── server.test.js       # Tests for src/server/index.js
│   │       └── testUrlChecker.spec.js   # Tests for js functionality
│   └── index.js                      # Entry point for Webpack, imports all JS and SCSS files
│
├── server/
│   └── index.js                      # Express server setup and API route handling
│
├── .babelrc                          # Babel configuration
├── .env                              # Environment variables (API keys)
├── webpack.dev.js                    # Webpack configuration for development
├── webpack.prod.js                   # Webpack configuration for production
├── package.json                      # Project dependencies and scripts
└── README.md                         # Project README file (this file)
```

## **Features**

- **Trip Planning:** Enter a location and start date and end date to get weather forecasts and an image of the destination.
- **Weather Forecasts:** Uses Weatherbit API for current and future weather data.
- **Location Images:** Retrieves images from the Pixabay API based on the entered location.
- **functionality to display the length of the trip.
- **Local Storage:** Saves user data to persist information across page reloads.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Service Workers:** Ensures offline capabilities for a seamless user experience.

## **Installation**

### **Prerequisites**

- Node.js (v14 or above)
- npm (v7 or above)
- A GEONAMES Username 
- A Weatherbit API Key
- A Pixabay API Key

### **Setup**

1. **Clone the Repository**
   ```bash
    git clone https://github.com/RuaAwaysa/traveling-app-udacity.git.git
    cd traveling-app-udacity
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory and add GeoNames Username ,Weatherbit API Key and A Pixabay API Key
     ```
     GEONAMES_USERNAME=Your GeoNames UserName
     WEATHERBIT_API_KEY= Your WEATHERBIT Api Key
     PIXABAY_API_KEY=Your PIXABAY Api Key

     ```

4. **Build the Project**
   - For development:
     ```bash
     npm run build-dev
     ```
   - For production:
     ```bash
     npm run build-prod
     ```

## **Usage**

1. **Start the Server**
   ```bash
   npm run start
   ```
   The application will be available at \`http://localhost:8000\`.

2. **Evaluate an Article**
   - Open the application in your browser.
   - Enter the URL of a news article you want to analyze in the input field.
   - Click "Submit" to receive the sentiment and subjectivity results.

## **Technologies Used**

- **Frontend**: HTML, SCSS, JavaScript
- **Backend**: Node.js, Express
- **API**: GeoNames API , WeatherBit Api , Pixabay Api 
- **Build Tools**: Webpack, Babel
- **Testing**: Jest

## **Development**

### **File Structure**

- **SCSS**: The styles are organized into multiple SCSS files (\`styles.scss\`) and imported into \`styles.scss\`.
- **JavaScript**: The core logic for handling form submissions for add Trip is in \`tripHandler.js\` and \`ApiCalls.js\`.
- **Server**: The server code in \`index.js\` sets up an Express server and handles the POST request to Get the weather Forcast and the location Image.

### **Service Workers**

- The project uses Workbox to generate service workers that enable offline functionality. The service worker is registered in the main \`index.html\` file.

## **Testing**

- The project includes unit tests written with Jest. The test files are located in `src/client/js/__test__/`.
- To run the tests, use the following command:
  ```bash
  npm run test
  ```

## **License**

The project is licensed under the MIT License. See the LICENSE file for details.