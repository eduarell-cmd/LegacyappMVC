// History View - Maneja la vista de historial
class HistoryView {
    constructor() {
        this.historyArea = document.getElementById('historyArea');
    }

    renderHistory(history) {
        if (!this.historyArea) return;
        
        if (history.length === 0) {
            this.historyArea.value = 'No hay historial disponible.';
            return;
        }
        
        let text = '';
        history.forEach(entry => {
            const timestamp = entry.createdAt || entry.timestamp;
            const date = timestamp ? new Date(timestamp).toLocaleString() : 'N/A';
            const userName = entry.userName || entry.userId?.name || entry.userId?.username || 'Usuario';
            const action = entry.action || 'Cambio';
            const taskTitle = entry.taskTitle || entry.taskId?.title || 'N/A';
            const taskId = getId(entry.taskId) || entry.taskId;
            const description = entry.description || entry.changes?.description || '';
            const oldValue = entry.oldValue || entry.changes?.oldValue;
            const newValue = entry.newValue || entry.changes?.newValue;
            
            text += `[${date}] ${userName} - ${action}\n`;
            text += `Tarea: ${taskTitle} (ID: ${taskId})\n`;
            if (description) {
                text += `Descripción: ${description}\n`;
            }
            if (oldValue) {
                text += `Valor anterior: ${oldValue}\n`;
            }
            if (newValue) {
                text += `Valor nuevo: ${newValue}\n`;
            }
            text += '---\n\n';
        });
        
        this.historyArea.value = text;
    }
}
