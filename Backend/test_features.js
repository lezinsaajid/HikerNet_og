// import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/api';
let token = '', userId = '', trekId = '';

async function register() {
    console.log("1. Registering User...");
    const randomSuffix = Math.floor(Math.random() * 100000);
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: `feature_tester_${randomSuffix}`,
            email: `ft_${randomSuffix}@test.com`,
            password: 'password123'
        })
    });
    const data = await res.json();
    if (res.ok) {
        token = data.token;
        userId = data.user.id;
        console.log(`   Registered ${data.user.username}`);
    } else {
        console.log("   Registration failed:", data.message);
    }
}

async function createTrekAndComplete() {
    console.log("2. Creating & Completing Trek...");
    // Start
    const startRes = await fetch(`${BASE_URL}/treks/start`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: "Epic Journey" })
    });
    const startData = await startRes.json();
    trekId = startData._id;

    // Complete
    await fetch(`${BASE_URL}/treks/update/${trekId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            status: "completed",
            stats: { distance: 15000, duration: 4000, elevationGain: 500 }
        })
    });
    console.log("   Trek completed (15km)");
}

async function createStoryWithTrek() {
    console.log("3. Creating Story with Trek...");
    const res = await fetch(`${BASE_URL}/stories/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            media: "https://example.com/story.jpg",
            type: "image",
            trekId: trekId
        })
    });
    const data = await res.json();
    console.log("   Story created with ID:", data._id);
}

async function checkLeaderboard() {
    console.log("4. Checking Leaderboard...");
    const res = await fetch(`${BASE_URL}/users/leaderboard`, {
        method: 'GET'
    });
    const data = await res.json();
    console.log(`   Leaderboard has ${data.length} entries`);
    const me = data.find(u => u._id === userId);
    if (me) {
        console.log(`   I am on the leaderboard! Distance: ${me.totalDistance}`);
    } else {
        console.log("   I am not on the leaderboard (might need more users/treks)");
    }
}

async function run() {
    try {
        await register();
        if (token) {
            await createTrekAndComplete();
            await createStoryWithTrek();
            await checkLeaderboard();
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

run();
