// History Controller - Maneja lógica de historial
class HistoryController {
    constructor(historyModel, taskModel, userModel) {
        this.historyModel = historyModel;
        this.taskModel = taskModel;
        this.userModel = userModel;
    }

    async getHistoryByTaskId(taskId) {
        const history = await this.historyModel.getHistoryByTaskId(taskId);
        return await this.enrichHistory(history);
    }

    async getAllHistory() {
        const history = await this.historyModel.getAllHistory();
        return await this.enrichHistory(history);
    }

    async enrichHistory(history) {
        const enriched = await Promise.all(history.map(async (entry) => {
            const taskId = entry.taskId?._id || entry.taskId;
            const userId = entry.userId?._id || entry.userId;
            
            const task = taskId ? await this.taskModel.getTaskById(taskId) : null;
            const user = userId ? await this.userModel.getUserById(userId) : null;
            
            return {
                ...entry,
                taskTitle: task ? task.title : (entry.taskId?.title || 'Tarea eliminada'),
                userName: user ? (user.name || user.username) : (entry.userId?.name || entry.userId?.username || 'Usuario desconocido')
            };
        }));
        return enriched;
    }
}
