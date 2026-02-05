// History Controller - Maneja lógica de historial
class HistoryController {
    constructor(historyModel, taskModel, userModel) {
        this.historyModel = historyModel;
        this.taskModel = taskModel;
        this.userModel = userModel;
    }

    getHistoryByTaskId(taskId) {
        const history = this.historyModel.getHistoryByTaskId(taskId);
        return this.enrichHistory(history);
    }

    getAllHistory() {
        const history = this.historyModel.getAllHistory();
        return this.enrichHistory(history);
    }

    enrichHistory(history) {
        return history.map(entry => {
            const task = this.taskModel.getTaskById(entry.taskId);
            const user = this.userModel.getUserById(entry.userId);
            return {
                ...entry,
                taskTitle: task ? task.title : 'Tarea eliminada',
                userName: user ? (user.name || user.username) : 'Usuario desconocido'
            };
        });
    }
}
