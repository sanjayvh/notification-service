const mongoose = require('mongoose');

const ticketNotificationSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    ticketId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    recipientEmails: {
        type: [String],
        required: true,
    },
    sentStatus: {
        type: String,
        required: true,
        default: "UNSENT",
    },
    requestor: {
        type: String,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    }
});

module.exports = mongoose.model("ticket_notification", ticketNotificationSchema);