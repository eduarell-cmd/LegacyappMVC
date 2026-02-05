// Notification View - Maneja la vista de notificaciones
class NotificationView {
    constructor() {
        this.notificationsArea = document.getElementById('notificationsArea');
    }

    renderNotifications(notifications) {
        if (!this.notificationsArea) return;
        
        if (notifications.length === 0) {
            this.notificationsArea.value = 'No hay notificaciones.';
            return;
        }
        
        let text = '';
        notifications.forEach(notif => {
            const date = new Date(notif.createdAt).toLocaleString();
            const status = notif.read ? '[LEÍDA]' : '[NUEVA]';
            text += `${status} [${date}]\n`;
            text += `${notif.message}\n`;
            text += '---\n\n';
        });
        
        this.notificationsArea.value = text;
    }
}
