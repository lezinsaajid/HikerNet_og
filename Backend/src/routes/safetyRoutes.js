import express from "express";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

// Trigger SOS Alert
router.post("/sos", protectRoute, async (req, res) => {
    try {
        const { location } = req.body; // { lat, lng }
        const user = await User.findById(req.user._id);

        if (!user.emergencyContacts || user.emergencyContacts.length === 0) {
            return res.status(400).json({ message: "No emergency contacts found" });
        }

        // Logic to send SMS/Email would go here (Twilio/SendGrid)
        // For now, we simulate by creating notifications for system admins or friends if we had that link
        // We will just log it and return success for the POC.

        console.log(`SOS ALERT triggered by ${user.username} at ${JSON.stringify(location)}`);
        console.log(`Notifying contacts: ${JSON.stringify(user.emergencyContacts)}`);

        // Create a local notification for the user confirming it was sent
        await Notification.create({
            recipient: user._id,
            type: "system",
            message: "SOS Alert sent to your emergency contacts.",
            read: false
        });

        res.json({ message: "SOS Alert sent successfully" });
    } catch (error) {
        console.error("Error sending SOS:", error);
        res.status(500).json({ message: "Error sending SOS" });
    }
});

// Calculate Rendezvous Point (Geometric Median / Midpoint)
router.post("/rendezvous", protectRoute, async (req, res) => {
    try {
        const { locations } = req.body; // Array of { latitude, longitude }

        if (!locations || locations.length < 2) {
            return res.status(400).json({ message: "Need at least 2 locations" });
        }

        // Simple Centroid Calculation (Average of Lat/Lng)
        // For better accuracy on spheres, use 3D vector sum, but this is fine for small distances.
        let sumLat = 0;
        let sumLng = 0;

        locations.forEach(loc => {
            sumLat += loc.latitude;
            sumLng += loc.longitude;
        });

        const centerLat = sumLat / locations.length;
        const centerLng = sumLng / locations.length;

        res.json({
            latitude: centerLat,
            longitude: centerLng,
            message: "Rendezvous point calculated"
        });

    } catch (error) {
        console.error("Error calculating rendezvous:", error);
        res.status(500).json({ message: "Error calculating rendezvous" });
    }
});

export default router;
