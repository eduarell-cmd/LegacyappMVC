// History Model - Maneja historial de cambios con MongoDB (URL relativa = mismo origen)
class HistoryModel {
    constructor() {
        this.apiUrl = '/api/history';
    }

    async getHistory() {
        try {
            const response = await fetch(this.apiUrl);
            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Error al obtener historial:', error);
            return [];
        }
    }

    async addHistoryEntry(entry) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskId: entry.taskId,
                    userId: entry.userId,
                    action: entry.action || entry.description || 'Cambio realizado',
                    changes: {
                        description: entry.description,
                        oldValue: entry.oldValue,
                        newValue: entry.newValue
                    }
                })
            });
            
            if (response.ok) {
                return await response.json();
            }
            return null;
        } catch (error) {
            console.error('Error al agregar entrada de historial:', error);
            return null;
        }
    }

    async getHistoryByTaskId(taskId) {
        try {
            const response = await fetch(`${this.apiUrl}/task/${taskId}`);
            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Error al obtener historial por tarea:', error);
            return [];
        }
    }

    async getAllHistory() {
        return await this.getHistory();
    }
}
