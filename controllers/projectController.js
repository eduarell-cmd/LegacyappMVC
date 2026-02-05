// Project Controller - Maneja lógica de proyectos
class ProjectController {
    constructor(projectModel) {
        this.projectModel = projectModel;
    }

    addProject(projectData) {
        return this.projectModel.addProject(projectData);
    }

    updateProject(id, updates) {
        const project = this.projectModel.updateProject(id, updates);
        if (!project) {
            return { success: false, message: 'Proyecto no encontrado' };
        }
        return { success: true, project };
    }

    deleteProject(id) {
        const deleted = this.projectModel.deleteProject(id);
        return { success: deleted };
    }

    getProject(id) {
        return this.projectModel.getProjectById(id);
    }

    getAllProjects() {
        return this.projectModel.getProjects();
    }
}
