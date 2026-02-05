// Comment Model - Maneja datos de comentarios
class CommentModel {
    constructor() {
        this.storageKey = 'taskManager_comments';
        this.initDefaultComments();
    }

    initDefaultComments() {
        if (!localStorage.getItem(this.storageKey)) {
            this.saveComments([]);
        }
    }

    getComments() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    saveComments(comments) {
        localStorage.setItem(this.storageKey, JSON.stringify(comments));
    }

    getNextId() {
        const comments = this.getComments();
        return comments.length > 0 ? Math.max(...comments.map(c => c.id)) + 1 : 1;
    }

    addComment(comment) {
        const comments = this.getComments();
        comment.id = this.getNextId();
        comment.createdAt = new Date().toISOString();
        comments.push(comment);
        this.saveComments(comments);
        return comment;
    }

    getCommentsByTaskId(taskId) {
        return this.getComments().filter(c => c.taskId === taskId);
    }

    getAllComments() {
        return this.getComments();
    }
}
