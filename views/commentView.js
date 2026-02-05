// Comment View - Maneja la vista de comentarios
class CommentView {
    constructor() {
        this.commentsArea = document.getElementById('commentsArea');
    }

    renderComments(comments) {
        if (!this.commentsArea) return;
        
        if (comments.length === 0) {
            this.commentsArea.value = 'No hay comentarios para esta tarea.';
            return;
        }
        
        let text = '';
        comments.forEach(comment => {
            const date = new Date(comment.createdAt).toLocaleString();
            const userName = comment.userId?.name || comment.userId?.username || comment.userName || 'Usuario';
            text += `[${date}] ${userName}:\n`;
            text += `${comment.text}\n`;
            text += '---\n\n';
        });
        
        this.commentsArea.value = text;
    }

    getCommentFormData() {
        return {
            taskId: document.getElementById('commentTaskId').value,
            text: document.getElementById('commentText').value
        };
    }

    clearCommentForm() {
        document.getElementById('commentTaskId').value = '';
        document.getElementById('commentText').value = '';
    }
}
