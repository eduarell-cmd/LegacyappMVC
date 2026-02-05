// Notification Controller - Maneja lógica de notificaciones
class NotificationController {
    constructor(notificationModel) {
        this.notificationModel = notificationModel;
    }

    async getNotificationsByUserId(userId) {
        const notifications = await this.notificationModel.getNotificationsByUserId(userId);
        return notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    async markAsRead(userId) {
        await this.notificationModel.markAsRead(userId);
        return { success: true };
    }

    async getUnreadCount(userId) {
        return await this.notificationModel.getUnreadCount(userId);
    }
}
