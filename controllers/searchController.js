// Search Controller - Maneja búsqueda de tareas
class SearchController {
    constructor(taskModel, projectModel) {
        this.taskModel = taskModel;
        this.projectModel = projectModel;
    }

    searchTasks(filters) {
        return this.taskModel.searchTasks(filters);
    }

    getAllProjects() {
        return this.projectModel.getProjects();
    }
}
