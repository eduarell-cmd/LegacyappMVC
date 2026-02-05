// Task Model - Maneja datos de tareas
class TaskModel {
    constructor() {
        this.storageKey = 'taskManager_tasks';
        this.initDefaultTasks();
    }

    initDefaultTasks() {
        if (!localStorage.getItem(this.storageKey)) {
            this.saveTasks([]);
        }
    }

    getTasks() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    saveTasks(tasks) {
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }

    getNextId() {
        const tasks = this.getTasks();
        return tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    }

    addTask(task) {
        const tasks = this.getTasks();
        task.id = this.getNextId();
        task.createdAt = new Date().toISOString();
        task.updatedAt = new Date().toISOString();
        tasks.push(task);
        this.saveTasks(tasks);
        return task;
    }

    updateTask(id, updates) {
        const tasks = this.getTasks();
        const index = tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date().toISOString() };
            this.saveTasks(tasks);
            return tasks[index];
        }
        return null;
    }

    deleteTask(id) {
        const tasks = this.getTasks();
        const filtered = tasks.filter(t => t.id !== id);
        this.saveTasks(filtered);
        return filtered.length < tasks.length;
    }

    getTaskById(id) {
        const tasks = this.getTasks();
        return tasks.find(t => t.id === id);
    }

    searchTasks(filters) {
        let tasks = this.getTasks();
        
        if (filters.text) {
            const text = filters.text.toLowerCase();
            tasks = tasks.filter(t => 
                t.title.toLowerCase().includes(text) ||
                (t.description && t.description.toLowerCase().includes(text))
            );
        }
        
        if (filters.status) {
            tasks = tasks.filter(t => t.status === filters.status);
        }
        
        if (filters.priority) {
            tasks = tasks.filter(t => t.priority === filters.priority);
        }
        
        if (filters.projectId && filters.projectId !== 0) {
            tasks = tasks.filter(t => t.projectId === filters.projectId);
        }
        
        return tasks;
    }

    getTasksByProject(projectId) {
        return this.getTasks().filter(t => t.projectId === projectId);
    }

    getTasksByUser(userId) {
        return this.getTasks().filter(t => t.assignedTo === userId);
    }

    getStats() {
        const tasks = this.getTasks();
        return {
            total: tasks.length,
            pending: tasks.filter(t => t.status === 'Pendiente').length,
            inProgress: tasks.filter(t => t.status === 'En Progreso').length,
            completed: tasks.filter(t => t.status === 'Completada').length,
            blocked: tasks.filter(t => t.status === 'Bloqueada').length,
            cancelled: tasks.filter(t => t.status === 'Cancelada').length
        };
    }
}
