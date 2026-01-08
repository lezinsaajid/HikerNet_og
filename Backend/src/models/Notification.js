import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        type: {
            type: String,
            enum: ["like", "comment", "follow", "sos", "system"],
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        read: {
            type: Boolean,
            default: false,
        },
        relatedId: {
            type: mongoose.Schema.Types.ObjectId, // Could be Post ID, Trek ID, etc.
        }
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
