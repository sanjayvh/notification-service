const ticketNotificationModel = require("./../models/ticketNotification.model");

exports.acceptNotificationRequest = async (req, res) => {
    const notificationObject = {
        subject: req.body.subject,
        content: req.body.content,
        recipientEmails: req.body.recipientEmails,
        requestor: req.body.requestor,
        ticketId: req.body.ticketId,
    };
    
    let notification;
    
    try {
        notification = await ticketNotificationModel.create(notificationObject);
        
        res.status(200).send({
            ticketId: notification.ticketId,
            status: "Accepted Request"
        });
    } catch (e) {
        console.log("Error while accepting notification request", e.message);
        res.status(500).send({
            ticketId: notification.ticketId,
            status: "Internal server error seen while accepting notification request: " + e.message
        });
    }
};

exports.getNotificationStatus = async (req, res) => {
    const reqId = req.params.ticketId;
    
    let notification;

    try {
        notification = await ticketNotificationModel.findOne({
            ticketId: reqId
        });
        
        if (notification) {
            res.status(200).send({
                ticketId: notification.ticketId,
                subject: notification.subject,
                content: notification.content,
                recipientEmails: notification.recipientEmails,
                sentStatus: notification.sentStatus,
            });
        } else {
            throw new Error("No such ticket Id found");
        }
    } catch (e) {
        console.log("Error while getting a notification request:", e.message);
        res.status(500).send({
            ticketId: req.params.ticketId,
            status: "Internal server error seen while getting a notification request: " + e.message
        });
    }
};