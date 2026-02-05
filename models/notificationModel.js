// Notification Model - Maneja notificaciones
class NotificationModel {
    constructor() {
        this.storageKey = 'taskManager_notifications';
        this.initDefaultNotifications();
    }

    initDefaultNotifications() {
        if (!localStorage.getItem(this.storageKey)) {
            this.saveNotifications([]);
        }
    }

    getNotifications() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    saveNotifications(notifications) {
        localStorage.setItem(this.storageKey, JSON.stringify(notifications));
    }

    getNextId() {
        const notifications = this.getNotifications();
        return notifications.length > 0 ? Math.max(...notifications.map(n => n.id)) + 1 : 1;
    }

    addNotification(notification) {
        const notifications = this.getNotifications();
        notification.id = this.getNextId();
        notification.createdAt = new Date().toISOString();
        notification.read = false;
        notifications.push(notification);
        this.saveNotifications(notifications);
        return notification;
    }

    getNotificationsByUserId(userId) {
        return this.getNotifications().filter(n => n.userId === userId);
    }

    markAsRead(userId) {
        const notifications = this.getNotifications();
        notifications.forEach(n => {
            if (n.userId === userId && !n.read) {
                n.read = true;
                n.readAt = new Date().toISOString();
            }
        });
        this.saveNotifications(notifications);
    }

    getUnreadCount(userId) {
        return this.getNotificationsByUserId(userId).filter(n => !n.read).length;
    }
}
