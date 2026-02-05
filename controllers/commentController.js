// Comment Controller - Maneja lógica de comentarios
class CommentController {
    constructor(commentModel, taskModel, historyModel) {
        this.commentModel = commentModel;
        this.taskModel = taskModel;
        this.historyModel = historyModel;
    }

    async addComment(commentData, currentUser) {
        // Verificar que la tarea existe
        const task = await this.taskModel.getTaskById(commentData.taskId);
        if (!task) {
            return { success: false, message: 'Tarea no encontrada' };
        }

        commentData.userId = currentUser._id || currentUser.id;
        const comment = await this.commentModel.addComment(commentData);
        if (!comment) {
            return { success: false, message: 'Error al agregar comentario' };
        }

        // Registrar en historial
        await this.historyModel.addHistoryEntry({
            taskId: commentData.taskId,
            userId: currentUser._id || currentUser.id,
            action: 'COMENTARIO',
            description: `Comentario agregado: ${commentData.text.substring(0, 50)}...`,
            oldValue: null,
            newValue: commentData.text
        });

        return { success: true, comment };
    }

    async getCommentsByTaskId(taskId) {
        return await this.commentModel.getCommentsByTaskId(taskId);
    }

    async getAllComments() {
        return await this.commentModel.getAllComments();
    }
}
