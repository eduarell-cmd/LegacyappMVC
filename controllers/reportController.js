// Report Controller - Maneja generación de reportes
class ReportController {
    constructor(taskModel, projectModel, userModel, commentModel) {
        this.taskModel = taskModel;
        this.projectModel = projectModel;
        this.userModel = userModel;
        this.commentModel = commentModel;
    }

    async generateTasksReport() {
        const tasks = await this.taskModel.getTasks();
        const stats = await this.taskModel.getStats();
        
        let report = '=== REPORTE DE TAREAS ===\n\n';
        report += `Total de tareas: ${stats.total}\n`;
        report += `Pendientes: ${stats.pending}\n`;
        report += `En Progreso: ${stats.inProgress}\n`;
        report += `Completadas: ${stats.completed}\n`;
        report += `Bloqueadas: ${stats.blocked}\n`;
        report += `Canceladas: ${stats.cancelled}\n\n`;
        report += '=== DETALLE DE TAREAS ===\n\n';
        
        tasks.forEach(task => {
            const id = task._id || task.id;
            report += `ID: ${id}\n`;
            report += `Título: ${task.title}\n`;
            report += `Estado: ${task.status}\n`;
            report += `Prioridad: ${task.priority}\n`;
            report += `Proyecto ID: ${task.projectId?._id || task.projectId || 'N/A'}\n`;
            report += `Asignado a: ${task.assignedTo?._id || task.assignedTo || 'N/A'}\n`;
            report += `Vencimiento: ${task.dueDate || 'N/A'}\n`;
            report += `Horas: ${task.estimatedHours || task.hours || 'N/A'}\n`;
            report += '---\n';
        });
        
        return report;
    }

    async generateProjectsReport() {
        const projects = await this.projectModel.getProjects();
        
        let report = '=== REPORTE DE PROYECTOS ===\n\n';
        report += `Total de proyectos: ${projects.length}\n\n`;
        
        for (const project of projects) {
            const projectId = project._id || project.id;
            const tasks = await this.taskModel.getTasksByProject(projectId);
            report += `ID: ${projectId}\n`;
            report += `Nombre: ${project.name}\n`;
            report += `Descripción: ${project.description}\n`;
            report += `Tareas asociadas: ${tasks.length}\n`;
            report += '---\n';
        }
        
        return report;
    }

    async generateUsersReport() {
        const users = await this.userModel.getAllUsers();
        
        let report = '=== REPORTE DE USUARIOS ===\n\n';
        report += `Total de usuarios: ${users.length}\n\n`;
        
        for (const user of users) {
            const userId = user._id || user.id;
            const tasks = await this.taskModel.getTasksByUser(userId);
            report += `ID: ${userId}\n`;
            report += `Usuario: ${user.username}\n`;
            report += `Nombre: ${user.name}\n`;
            report += `Tareas asignadas: ${tasks.length}\n`;
            report += '---\n';
        }
        
        return report;
    }

    async exportToCSV() {
        const tasks = await this.taskModel.getTasks();
        const projects = await this.projectModel.getProjects();
        const users = await this.userModel.getAllUsers();
        
        let csv = 'TAREAS\n';
        csv += 'ID,Título,Estado,Prioridad,Proyecto ID,Asignado a,Vencimiento,Horas\n';
        tasks.forEach(task => {
            const id = task._id || task.id;
            csv += `${id},"${task.title}",${task.status},${task.priority},${task.projectId?._id || task.projectId || ''},${task.assignedTo?._id || task.assignedTo || ''},${task.dueDate || ''},${task.estimatedHours || task.hours || ''}\n`;
        });
        
        csv += '\nPROYECTOS\n';
        csv += 'ID,Nombre,Descripción\n';
        projects.forEach(project => {
            const id = project._id || project.id;
            csv += `${id},"${project.name}","${project.description}"\n`;
        });
        
        csv += '\nUSUARIOS\n';
        csv += 'ID,Usuario,Nombre\n';
        users.forEach(user => {
            const id = user._id || user.id;
            csv += `${id},${user.username},"${user.name}"\n`;
        });
        
        return csv;
    }
}
