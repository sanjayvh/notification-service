const ticketNotificationModel = require("./../models/ticketNotification.model");

exports.acceptNotificationRequest = async (req, res) => {
    const notificationObject = {
        subject: req.body.subject,
        content: req.body.content,
        recipientEmails: req.body.recipientEmails,
        requestor: req.body.requestor,
        ticketId: req.body.ticketId,
    };
    
    try {
        const notification = await ticketNotificationModel.create(notificationObject);
        
        res.status(200).send({
            requestId: notification.requestId,
            status: "Accepted Request"
        });
    } catch (e) {
        console.log("Error while accepting notification request", e.message);
        res.status(500).send({
            requestId: notification.requestId,
            status: "Internal server error seen while accepting notification request: " + e.message
        });
    }
};

exports.getNotificationStatus = async (req, res) => {
    const reqId = req.params.requestId;
    
    try {
        const notification = await ticketNotificationModel.findOne({
            ticketId: reqId
        });
        
        res.status(200).send({
            requestId: notification.requestId,
            subject: notification.subject,
            content: notification.content,
            recipientEmails: notification.recipientEmails,
            sentStatus: notification.sentStatus,
        });
    } catch (e) {
        console.log("Error while getting a notification request", e.message);
        res.status(500).send({
            requestId: notification.requestId,
            status: "Internal server error seen while getting a notification request: " + e.message
        });
        
    }
};