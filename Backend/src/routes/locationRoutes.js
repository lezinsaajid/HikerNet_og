import express from "express";
import fetch from 'node-fetch'; // Native fetch in Node 18+

const router = express.Router();
const NOMINATIM_BASE = "https://nominatim.openstreetmap.org";

// Helper for Nominatim request (requires User-Agent)
const fetchNominatim = async (url) => {
    const response = await fetch(url, {
        headers: {
            "User-Agent": "Hikernet-App/1.0 (contact@hikernet.com)" // Replace with real info in prod
        }
    });
    if (!response.ok) throw new Error("Nominatim API Error");
    return await response.json();
};

// Reverse Geocoding (Get address from lat/lon)
router.get("/reverse", async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) return res.status(400).json({ message: "Lat/Lon required" });

        const url = `${NOMINATIM_BASE}/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
        const data = await fetchNominatim(url);

        res.json(data);
    } catch (error) {
        console.error("Geocoding error:", error);
        res.status(500).json({ message: "Error in reverse geocoding" });
    }
});

// Search (Get lat/lon from query)
router.get("/search", async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ message: "Query required" });

        const url = `${NOMINATIM_BASE}/search?format=json&q=${encodeURIComponent(q)}`;
        const data = await fetchNominatim(url);

        res.json(data);
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ message: "Error in location search" });
    }
});

export default router;
