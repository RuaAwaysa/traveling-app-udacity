const SERVER_URL = 'http://localhost:8000';

export async function fetchTripData(location, date) {
    const response = await fetch(`${SERVER_URL}/getTripData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location, date }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch trip data');
    }

    return response.json();
}

export async function fetchImage(location) {
    const response = await fetch(`${SERVER_URL}/getImage?location=${location}`);

    if (!response.ok) {
        throw new Error('Failed to fetch image');
    }

    const data = await response.json();
    return data.image || 'https://pixabay.com/photos/nature-landscape-mountains-4351471/'; // Fallback image URL
}
