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
    return data.image || 'https://www.bing.com/images/search?view=detailV2&ccid=guQqku%2BO&id=EE5D5526D67D4BDBFE24A21714295621698E4E84&thid=OIP.guQqku-OOG-M3YqR6nPq7wHaEC&mediaurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.82e42a92ef8e386f8cdd8a91ea73eaef%3Frik%3DhE6OaSFWKRQXog%26riu%3Dhttp%253a%252f%252fwww.wns.com%252fPortals%252f0%252fImages%252fHeaderBanner%252fdesktop%252f1087%252f53%252ftravel_HD.jpg%26ehk%3DYgCzUQ9TIaahPKhlmdx2Tjge2evZU%252fpeb%252bYbaGf0eNQ%253d%26risl%3D%26pid%3DImgRaw%26r%3D0&exph=1080&expw=1980&q=travel&simid=608006338750920422&FORM=IRPRST&ck=B928652C9ADEC745377B3171404372D0&selectedIndex=1&itb=0&cw=1222&ch=587&ajaxhist=0&ajaxserp=0'; // Fallback image URL
}
