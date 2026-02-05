// History Model - Maneja historial de cambios
class HistoryModel {
    constructor() {
        this.storageKey = 'taskManager_history';
        this.initDefaultHistory();
    }

    initDefaultHistory() {
        if (!localStorage.getItem(this.storageKey)) {
            this.saveHistory([]);
        }
    }

    getHistory() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    saveHistory(history) {
        localStorage.setItem(this.storageKey, JSON.stringify(history));
    }

    getNextId() {
        const history = this.getHistory();
        return history.length > 0 ? Math.max(...history.map(h => h.id)) + 1 : 1;
    }

    addHistoryEntry(entry) {
        const history = this.getHistory();
        entry.id = this.getNextId();
        entry.timestamp = new Date().toISOString();
        history.push(entry);
        this.saveHistory(history);
        return entry;
    }

    getHistoryByTaskId(taskId) {
        return this.getHistory().filter(h => h.taskId === taskId);
    }

    getAllHistory() {
        return this.getHistory().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
}
