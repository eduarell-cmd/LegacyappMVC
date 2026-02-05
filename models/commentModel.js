// Comment Model - Maneja datos de comentarios con MongoDB (URL relativa = mismo origen)
class CommentModel {
    constructor() {
        this.apiUrl = '/api/comments';
    }

    async getComments() {
        try {
            const response = await fetch(this.apiUrl);
            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Error al obtener comentarios:', error);
            return [];
        }
    }

    async addComment(comment) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comment)
            });
            
            if (response.ok) {
                return await response.json();
            }
            return null;
        } catch (error) {
            console.error('Error al agregar comentario:', error);
            return null;
        }
    }

    async getCommentsByTaskId(taskId) {
        try {
            const response = await fetch(`${this.apiUrl}/task/${taskId}`);
            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Error al obtener comentarios por tarea:', error);
            return [];
        }
    }

    async getAllComments() {
        return await this.getComments();
    }
}
