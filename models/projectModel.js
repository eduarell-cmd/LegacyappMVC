// Project Model - Maneja datos de proyectos
class ProjectModel {
    constructor() {
        this.storageKey = 'taskManager_projects';
        this.initDefaultProjects();
    }

    initDefaultProjects() {
        if (!localStorage.getItem(this.storageKey)) {
            const defaultProjects = [
                { id: 1, name: 'Proyecto Demo', description: 'Proyecto de demostración', createdAt: new Date().toISOString() },
                { id: 2, name: 'Proyecto Alpha', description: 'Primer proyecto importante', createdAt: new Date().toISOString() },
                { id: 3, name: 'Proyecto Beta', description: 'Segundo proyecto importante', createdAt: new Date().toISOString() }
            ];
            this.saveProjects(defaultProjects);
        }
    }

    getProjects() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    saveProjects(projects) {
        localStorage.setItem(this.storageKey, JSON.stringify(projects));
    }

    getNextId() {
        const projects = this.getProjects();
        return projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    }

    addProject(project) {
        const projects = this.getProjects();
        project.id = this.getNextId();
        project.createdAt = new Date().toISOString();
        projects.push(project);
        this.saveProjects(projects);
        return project;
    }

    updateProject(id, updates) {
        const projects = this.getProjects();
        const index = projects.findIndex(p => p.id === id);
        if (index !== -1) {
            projects[index] = { ...projects[index], ...updates };
            this.saveProjects(projects);
            return projects[index];
        }
        return null;
    }

    deleteProject(id) {
        const projects = this.getProjects();
        const filtered = projects.filter(p => p.id !== id);
        this.saveProjects(filtered);
        return filtered.length < projects.length;
    }

    getProjectById(id) {
        const projects = this.getProjects();
        return projects.find(p => p.id === id);
    }
}
