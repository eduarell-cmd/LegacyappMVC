// Notification Model - Maneja notificaciones con MongoDB (URL relativa = mismo origen)
class NotificationModel {
    constructor() {
        this.apiUrl = '/api/notifications';
    }

    async getNotifications() {
        try {
            const response = await fetch(this.apiUrl);
            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Error al obtener notificaciones:', error);
            return [];
        }
    }

    async addNotification(notification) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: notification.userId,
                    message: notification.message,
                    type: notification.type || 'other'
                })
            });
            
            if (response.ok) {
                return await response.json();
            }
            return null;
        } catch (error) {
            console.error('Error al agregar notificación:', error);
            return null;
        }
    }

    async getNotificationsByUserId(userId) {
        try {
            const response = await fetch(`${this.apiUrl}/user/${userId}`);
            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Error al obtener notificaciones por usuario:', error);
            return [];
        }
    }

    async markAsRead(userId) {
        try {
            const response = await fetch(`${this.apiUrl}/user/${userId}/read`, {
                method: 'PUT'
            });
            return response.ok;
        } catch (error) {
            console.error('Error al marcar notificaciones como leídas:', error);
            return false;
        }
    }

    async getUnreadCount(userId) {
        try {
            const response = await fetch(`${this.apiUrl}/user/${userId}/unread`);
            if (response.ok) {
                const data = await response.json();
                return data.count || 0;
            }
            return 0;
        } catch (error) {
            console.error('Error al obtener conteo de no leídas:', error);
            return 0;
        }
    }
}
