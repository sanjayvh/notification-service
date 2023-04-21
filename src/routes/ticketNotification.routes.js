const notificationController = require("./../controllers/ticketNotification.controller");

module.exports = function (app) {
    app.post("/notiServ/api/v1/notifications", notificationController.acceptNotificationRequest);
    app.get("/notiServ/api/v1/notifications/:id", notificationController.getNotificationStatus);
}