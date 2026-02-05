// Notification Controller - Maneja lógica de notificaciones
class NotificationController {
    constructor(notificationModel) {
        this.notificationModel = notificationModel;
    }

    getNotificationsByUserId(userId) {
        return this.notificationModel.getNotificationsByUserId(userId)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    markAsRead(userId) {
        this.notificationModel.markAsRead(userId);
        return { success: true };
    }

    getUnreadCount(userId) {
        return this.notificationModel.getUnreadCount(userId);
    }
}
