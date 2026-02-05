// Report Controller - Maneja generación de reportes
class ReportController {
    constructor(taskModel, projectModel, userModel, commentModel) {
        this.taskModel = taskModel;
        this.projectModel = projectModel;
        this.userModel = userModel;
        this.commentModel = commentModel;
    }

    generateTasksReport() {
        const tasks = this.taskModel.getTasks();
        const stats = this.taskModel.getStats();
        
        let report = '=== REPORTE DE TAREAS ===\n\n';
        report += `Total de tareas: ${stats.total}\n`;
        report += `Pendientes: ${stats.pending}\n`;
        report += `En Progreso: ${stats.inProgress}\n`;
        report += `Completadas: ${stats.completed}\n`;
        report += `Bloqueadas: ${stats.blocked}\n`;
        report += `Canceladas: ${stats.cancelled}\n\n`;
        report += '=== DETALLE DE TAREAS ===\n\n';
        
        tasks.forEach(task => {
            report += `ID: ${task.id}\n`;
            report += `Título: ${task.title}\n`;
            report += `Estado: ${task.status}\n`;
            report += `Prioridad: ${task.priority}\n`;
            report += `Proyecto ID: ${task.projectId || 'N/A'}\n`;
            report += `Asignado a: ${task.assignedTo || 'N/A'}\n`;
            report += `Vencimiento: ${task.dueDate || 'N/A'}\n`;
            report += `Horas: ${task.hours || 'N/A'}\n`;
            report += '---\n';
        });
        
        return report;
    }

    generateProjectsReport() {
        const projects = this.projectModel.getProjects();
        
        let report = '=== REPORTE DE PROYECTOS ===\n\n';
        report += `Total de proyectos: ${projects.length}\n\n`;
        
        projects.forEach(project => {
            const tasks = this.taskModel.getTasksByProject(project.id);
            report += `ID: ${project.id}\n`;
            report += `Nombre: ${project.name}\n`;
            report += `Descripción: ${project.description}\n`;
            report += `Tareas asociadas: ${tasks.length}\n`;
            report += '---\n';
        });
        
        return report;
    }

    generateUsersReport() {
        const users = this.userModel.getAllUsers();
        
        let report = '=== REPORTE DE USUARIOS ===\n\n';
        report += `Total de usuarios: ${users.length}\n\n`;
        
        users.forEach(user => {
            const tasks = this.taskModel.getTasksByUser(user.id);
            report += `ID: ${user.id}\n`;
            report += `Usuario: ${user.username}\n`;
            report += `Nombre: ${user.name}\n`;
            report += `Tareas asignadas: ${tasks.length}\n`;
            report += '---\n';
        });
        
        return report;
    }

    exportToCSV() {
        const tasks = this.taskModel.getTasks();
        const projects = this.projectModel.getProjects();
        const users = this.userModel.getAllUsers();
        
        let csv = 'TAREAS\n';
        csv += 'ID,Título,Estado,Prioridad,Proyecto ID,Asignado a,Vencimiento,Horas\n';
        tasks.forEach(task => {
            csv += `${task.id},"${task.title}",${task.status},${task.priority},${task.projectId || ''},${task.assignedTo || ''},${task.dueDate || ''},${task.hours || ''}\n`;
        });
        
        csv += '\nPROYECTOS\n';
        csv += 'ID,Nombre,Descripción\n';
        projects.forEach(project => {
            csv += `${project.id},"${project.name}","${project.description}"\n`;
        });
        
        csv += '\nUSUARIOS\n';
        csv += 'ID,Usuario,Nombre\n';
        users.forEach(user => {
            csv += `${user.id},${user.username},"${user.name}"\n`;
        });
        
        return csv;
    }
}
