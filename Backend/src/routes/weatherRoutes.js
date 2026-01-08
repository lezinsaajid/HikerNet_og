import express from "express";
import fetch from 'node-fetch'; // Ensure node-fetch or native fetch is available/used correctly

const router = express.Router();

router.get("/current", async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            return res.status(400).json({ message: "Latitude and Longitude required" });
        }

        const apiKey = process.env.OPENWEATHER_API_KEY;
        if (!apiKey) {
            // Mock response if no API key
            return res.json({
                coord: { lon: Number(lon), lat: Number(lat) },
                weather: [{ main: "Clear", description: "clear sky (mock)" }],
                main: { temp: 285.5, humidity: 70 },
                name: "Mock Location"
            });
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
        res.status(500).json({ message: "Error fetching weather" });
    }
});

export default router;
