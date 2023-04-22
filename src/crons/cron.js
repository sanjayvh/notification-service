const cron = require('node-cron');
const ticketNotificationModel = require("./../models/ticketNotification.model");
const EmailTransport = require("./../notifier/emailService");

cron.schedule("*/30 * * * * *", async() => {
    const notifications = await ticketNotificationModel.find({
        sentStatus: "UNSENT",
    });

    notifications.forEach(notification => {
        const mailData = {
            from: process.env.CRM_EMAIL,
            to: notification.recipientEmails,
            subject: notification.subject,
            text: notification.content,
        }

        EmailTransport.sendMail(mailData, async (err, info) => {
            if (err) {
                console.log(err.message);
            } else {
                let savedNotification = await ticketNotificationModel.findOne({
                    _id: notification._id
                });
                
                savedNotification.sentStatus = "SENT";
                await savedNotification.save();
            }
        });
    });
});