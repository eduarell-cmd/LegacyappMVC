// Project Model - Maneja datos de proyectos con MongoDB (URL relativa = mismo origen)
class ProjectModel {
    constructor() {
        this.apiUrl = '/api/projects';
    }

    async getProjects() {
        try {
            const response = await fetch(this.apiUrl);
            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Error al obtener proyectos:', error);
            return [];
        }
    }

    async addProject(project) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(project)
            });
            
            if (response.ok) {
                return await response.json();
            }
            return null;
        } catch (error) {
            console.error('Error al agregar proyecto:', error);
            return null;
        }
    }

    async updateProject(id, updates) {
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
            console.error('Error al actualizar proyecto:', error);
            return null;
        }
    }

    async deleteProject(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: 'DELETE'
            });
            return response.ok;
        } catch (error) {
            console.error('Error al eliminar proyecto:', error);
            return false;
        }
    }

    async getProjectById(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`);
            if (response.ok) {
                return await response.json();
            }
            return null;
        } catch (error) {
            console.error('Error al obtener proyecto:', error);
            return null;
        }
    }
}
