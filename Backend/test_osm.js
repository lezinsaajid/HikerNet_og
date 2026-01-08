const BASE_URL = 'http://localhost:3000/api';

async function testOSM() {
    console.log("Testing OpenStreetMap (Nominatim) endpoints...");

    // 1. Search
    console.log("1. Searching for 'Eiffel Tower'...");
    try {
        const resSearch = await fetch(`${BASE_URL}/location/search?q=Eiffel Tower`);
        const dataSearch = await resSearch.json();
        if (Array.isArray(dataSearch) && dataSearch.length > 0) {
            console.log("   Found:", dataSearch[0].display_name);
        } else {
            console.log("   Search returned empty (might be rate limited or network issue)", dataSearch);
        }
    } catch (e) {
        console.error("   Search Error:", e.message);
    }

    // 2. Reverse
    console.log("2. Reverse Geocoding (Lat: 48.858, Lon: 2.294)...");
    try {
        const resReverse = await fetch(`${BASE_URL}/location/reverse?lat=48.8584&lon=2.2945`);
        const dataReverse = await resReverse.json();
        if (dataReverse.display_name) {
            console.log("   Address:", dataReverse.display_name);
        } else {
            console.log("   Reverse returned invalid data", dataReverse);
        }
    } catch (e) {
        console.error("   Reverse Error:", e.message);
    }
}

testOSM();
