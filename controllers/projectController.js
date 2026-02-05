// Project Controller - Maneja lógica de proyectos
class ProjectController {
    constructor(projectModel) {
        this.projectModel = projectModel;
    }

    async addProject(projectData) {
        return await this.projectModel.addProject(projectData);
    }

    async updateProject(id, updates) {
        const project = await this.projectModel.updateProject(id, updates);
        if (!project) {
            return { success: false, message: 'Proyecto no encontrado' };
        }
        return { success: true, project };
    }

    async deleteProject(id) {
        const deleted = await this.projectModel.deleteProject(id);
        return { success: deleted };
    }

    async getProject(id) {
        return await this.projectModel.getProjectById(id);
    }

    async getAllProjects() {
        return await this.projectModel.getProjects();
    }
}
