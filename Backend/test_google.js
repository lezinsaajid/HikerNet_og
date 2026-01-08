const BASE_URL = 'http://localhost:3000/api';

async function testGoogleAuthEndpoint() {
    console.log("Testing Google Auth Endpoint (Expect Error without real token)...");

    // Test with missing token
    const resMissing = await fetch(`${BASE_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    });
    console.log("   Missing Token Response:", resMissing.status); // Expect 400

    // Test with fake token
    const resFake = await fetch(`${BASE_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: "fake_token" })
    });
    console.log("   Fake Token Response:", resFake.status); // Expect 400 (Invalid Google Token)

    const data = await resFake.json();
    console.log("   Message:", data.message);
}

testGoogleAuthEndpoint();
