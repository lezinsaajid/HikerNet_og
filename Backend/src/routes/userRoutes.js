import express from "express";
import User from "../models/User.js";
import Trek from "../models/Trek.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

// Get user profile with social stats
router.get("/profile/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Error fetching user profile" });
    }
});

// Follow / Unfollow user
router.post("/follow/:id", protectRoute, async (req, res) => {
    try {
        if (req.params.id === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if (!userToFollow || !currentUser) return res.status(404).json({ message: "User not found" });

        const isFollowing = currentUser.following.includes(req.params.id);

        if (isFollowing) {
            // Unfollow
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: req.params.id } });
            await User.findByIdAndUpdate(req.params.id, { $pull: { followers: req.user._id } });
            res.json({ message: "Unfollowed user" });
        } else {
            // Follow
            await User.findByIdAndUpdate(req.user._id, { $push: { following: req.params.id } });
            await User.findByIdAndUpdate(req.params.id, { $push: { followers: req.user._id } });
            res.json({ message: "Followed user" });
        }
    } catch (error) {
        console.error("Error in follow/unfollow:", error);
        res.status(500).json({ message: "Error in follow/unfollow" });
    }
});

// Get suggested users (simple implementation: users not followed)
router.get("/suggested", protectRoute, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id);
        const users = await User.find({
            _id: { $ne: req.user._id, $nin: currentUser.following },
        })
            .select("username profileImage bio")
            .limit(10);

        res.json(users);
    } catch (error) {
        console.error("Error fetching suggested users:", error);
        res.status(500).json({ message: "Error fetching suggested users" });
    }
});

// Leaderboard: Top hikers based on distance
router.get("/leaderboard", async (req, res) => {
    try {
        const leaderboard = await Trek.aggregate([
            { $match: { status: "completed" } }, // Only count completed treks
            {
                $group: {
                    _id: "$user",
                    totalDistance: { $sum: "$stats.distance" },
                    totalDuration: { $sum: "$stats.duration" },
                    totalElevation: { $sum: "$stats.elevationGain" },
                    treksCount: { $sum: 1 },
                },
            },
            { $sort: { totalDistance: -1 } }, // Sort by distance descending
            { $limit: 20 }, // Top 20
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "userDetails",
                },
            },
            { $unwind: "$userDetails" },
            {
                $project: {
                    _id: 1,
                    totalDistance: 1,
                    totalDuration: 1,
                    totalElevation: 1,
                    treksCount: 1,
                    username: "$userDetails.username",
                    profileImage: "$userDetails.profileImage",
                },
            },
        ]);

        res.json(leaderboard);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ message: "Error fetching leaderboard" });
    }
});

export default router;
