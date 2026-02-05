// Comment Controller - Maneja lógica de comentarios
class CommentController {
    constructor(commentModel, taskModel, historyModel) {
        this.commentModel = commentModel;
        this.taskModel = taskModel;
        this.historyModel = historyModel;
    }

    addComment(commentData, currentUser) {
        // Verificar que la tarea existe
        const task = this.taskModel.getTaskById(commentData.taskId);
        if (!task) {
            return { success: false, message: 'Tarea no encontrada' };
        }

        commentData.userId = currentUser.id;
        commentData.userName = currentUser.name || currentUser.username;
        const comment = this.commentModel.addComment(commentData);

        // Registrar en historial
        this.historyModel.addHistoryEntry({
            taskId: commentData.taskId,
            userId: currentUser.id,
            action: 'COMENTARIO',
            description: `Comentario agregado: ${commentData.text.substring(0, 50)}...`,
            oldValue: null,
            newValue: commentData.text
        });

        return { success: true, comment };
    }

    getCommentsByTaskId(taskId) {
        return this.commentModel.getCommentsByTaskId(taskId);
    }

    getAllComments() {
        return this.commentModel.getAllComments();
    }
}
