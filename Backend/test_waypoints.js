// import fetch from 'node-fetch'; 

const BASE_URL = 'http://localhost:3000/api';
let token = '', trekId = '';

async function register() {
    console.log("1. Registering User...");
    const randomSuffix = Math.floor(Math.random() * 100000);
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: `pin_master_${randomSuffix}`,
            email: `pm_${randomSuffix}@test.com`,
            password: 'password123'
        })
    });
    const data = await res.json();
    if (res.ok) {
        token = data.token;
        console.log(`   Registered ${data.user.username}`);
    } else {
        console.log("   Registration failed:", data.message);
    }
}

async function startTrek() {
    console.log("2. Starting Trek...");
    const res = await fetch(`${BASE_URL}/treks/start`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: "Photo Mapping Hike" })
    });
    const data = await res.json();
    trekId = data._id;
    console.log("   Trek started:", trekId);
}

async function addWaypoint() {
    console.log("3. Adding Waypoint (Pin)...");
    const res = await fetch(`${BASE_URL}/treks/update/${trekId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            waypoints: [
                {
                    latitude: 35.6895,
                    longitude: 139.6917,
                    title: "Beautiful Sunset",
                    description: "Took a break here to watch the sun go down.",
                    images: ["https://example.com/sunset.jpg"]
                }
            ]
        })
    });
    const data = await res.json();
    if (data.waypoints && data.waypoints.length > 0) {
        console.log("   Waypoint added successfully. Title:", data.waypoints[0].title);
    } else {
        console.error("   Failed to add waypoint");
    }
}

async function verifyTrek() {
    console.log("4. Verifying Trek Data...");
    const res = await fetch(`${BASE_URL}/treks/${trekId}`);
    const data = await res.json();
    if (data.waypoints && data.waypoints.length === 1) {
        console.log("   Trek has 1 waypoint verified.");
    } else {
        console.error("   Verification failed");
    }
}

async function run() {
    try {
        await register();
        if (token) {
            await startTrek();
            await addWaypoint();
            await verifyTrek();
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

run();
