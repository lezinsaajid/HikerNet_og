import express from "express";
import Notification from "../models/Notification.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

// Get User Notifications
router.get("/", protectRoute, async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user._id })
            .sort({ createdAt: -1 })
            .populate("sender", "username profileImage");

        res.json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Error fetching notifications" });
    }
});

// Mark as Read
router.put("/:id/read", protectRoute, async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { read: true });
        res.json({ message: "Notification marked as read" });
    } catch (error) {
        console.error("Error updating notification:", error);
        res.status(500).json({ message: "Error updating notification" });
    }
});

export default router;
