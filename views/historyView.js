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
            const date = new Date(entry.timestamp).toLocaleString();
            text += `[${date}] ${entry.userName || 'Usuario'} - ${entry.action}\n`;
            text += `Tarea: ${entry.taskTitle || 'N/A'} (ID: ${entry.taskId})\n`;
            text += `Descripción: ${entry.description}\n`;
            if (entry.oldValue) {
                text += `Valor anterior: ${entry.oldValue}\n`;
            }
            if (entry.newValue) {
                text += `Valor nuevo: ${entry.newValue}\n`;
            }
            text += '---\n\n';
        });
        
        this.historyArea.value = text;
    }
}
