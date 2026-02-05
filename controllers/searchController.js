// Search Controller - Maneja búsqueda de tareas
class SearchController {
    constructor(taskModel, projectModel) {
        this.taskModel = taskModel;
        this.projectModel = projectModel;
    }

    async searchTasks(filters) {
        return await this.taskModel.searchTasks(filters);
    }

    async getAllProjects() {
        return await this.projectModel.getProjects();
    }
}
