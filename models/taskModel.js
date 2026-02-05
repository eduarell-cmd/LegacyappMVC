// Task Model - Maneja datos de tareas con MongoDB (URL relativa = mismo origen)
class TaskModel {
    constructor() {
        this.apiUrl = '/api/tasks';
    }

    async getTasks() {
        try {
            const response = await fetch(this.apiUrl);
            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Error al obtener tareas:', error);
            return [];
        }
    }

    async addTask(task) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            });
            
            if (response.ok) {
                return await response.json();
            }
            return null;
        } catch (error) {
            console.error('Error al agregar tarea:', error);
            return null;
        }
    }

    async updateTask(id, updates) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updates)
            });
            
            if (response.ok) {
                return await response.json();
            }
            return null;
        } catch (error) {
            console.error('Error al actualizar tarea:', error);
            return null;
        }
    }

    async deleteTask(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: 'DELETE'
            });
            return response.ok;
        } catch (error) {
            console.error('Error al eliminar tarea:', error);
            return false;
        }
    }

    async getTaskById(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`);
            if (response.ok) {
                return await response.json();
            }
            return null;
        } catch (error) {
            console.error('Error al obtener tarea:', error);
            return null;
        }
    }

    async searchTasks(filters) {
        try {
            const response = await fetch(`${this.apiUrl}/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filters)
            });
            
            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Error al buscar tareas:', error);
            return [];
        }
    }

    async getTasksByProject(projectId) {
        try {
            const response = await fetch(`${this.apiUrl}/project/${projectId}`);
            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Error al obtener tareas por proyecto:', error);
            return [];
        }
    }

    async getTasksByUser(userId) {
        try {
            const response = await fetch(`${this.apiUrl}/user/${userId}`);
            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Error al obtener tareas por usuario:', error);
            return [];
        }
    }

    async getStats() {
        try {
            const response = await fetch(`${this.apiUrl}/stats/summary`);
            if (response.ok) {
                return await response.json();
            }
            return {
                total: 0,
                pending: 0,
                inProgress: 0,
                completed: 0,
                blocked: 0,
                cancelled: 0
            };
        } catch (error) {
            console.error('Error al obtener estadísticas:', error);
            return {
                total: 0,
                pending: 0,
                inProgress: 0,
                completed: 0,
                blocked: 0,
                cancelled: 0
            };
        }
    }
}
