// import fetch from 'node-fetch'; // Native fetch available in Node 18+

const BASE_URL = 'http://localhost:3000/api';
let token = '';
let userId = '';
let trekId = '';

async function registerUser() {
    console.log("1. Registering User...");
    const randomSuffix = Math.floor(Math.random() * 10000);
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: `trekker${randomSuffix}`,
            email: `trekker${randomSuffix}@test.com`,
            password: 'password123'
        })
    });
    const data = await res.json();
    if (res.ok) {
        token = data.token;
        userId = data.user.id;
        console.log("   Success:", data.user.username);
    } else {
        console.error("   Failed:", data.message);
        // Try login if user exists
        if (data.message.includes("already exists")) {
            await loginUser(`trekker${randomSuffix}@test.com`);
        }
    }
}

async function loginUser(email) {
    // ... implementation not needed if random suffix works, but good for robustness
}

async function startTrek() {
    console.log("2. Starting Trek...");
    const res = await fetch(`${BASE_URL}/treks/start`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: "Morning Hike",
            location: "Blue Hills",
            description: "A nice morning walk"
        })
    });
    const data = await res.json();
    if (res.ok) {
        trekId = data._id;
        console.log("   Success: Trek started with ID", trekId);
    } else {
        console.error("   Failed:", data.message);
    }
}

async function updateTrek() {
    console.log("3. Updating Trek...");
    const res = await fetch(`${BASE_URL}/treks/update/${trekId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            coordinates: [
                { latitude: 10.1, longitude: 20.1, altitude: 100 },
                { latitude: 10.2, longitude: 20.2, altitude: 110 }
            ],
            stats: { distance: 500, duration: 300 }
        })
    });
    const data = await res.json();
    if (res.ok) {
        console.log("   Success: Trek updated, points count:", data.coordinates.length);
    } else {
        console.error("   Failed:", data.message);
    }
}

async function getTrek() {
    console.log("4. Fetching Trek...");
    const res = await fetch(`${BASE_URL}/treks/${trekId}`, {
        method: 'GET'
    });
    const data = await res.json();
    if (res.ok) {
        console.log("   Success: Retrieved trek:", data.name);
        console.log("   Data verification: Distance =", data.stats.distance);
    } else {
        console.error("   Failed:", data.message);
    }
}

async function run() {
    try {
        await registerUser();
        if (token) {
            await startTrek();
        }
        if (trekId) {
            await updateTrek();
            await getTrek();
        }
    } catch (e) {
        console.error("Error connecting to server. Is it running?", e.message);
    }
}

run();
