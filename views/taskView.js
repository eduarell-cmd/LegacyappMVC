// Task View - Maneja la vista de tareas
class TaskView {
    constructor() {
        this.tasksTableBody = document.getElementById('tasksTableBody');
        this.statsText = document.getElementById('statsText');
        this.selectedTaskId = null;
    }

    renderTasks(tasks, projects, users) {
        if (!this.tasksTableBody) return;
        
        this.tasksTableBody.innerHTML = '';
        
        tasks.forEach(task => {
            const row = document.createElement('tr');
            row.onclick = () => this.selectTask(task.id);
            
            const project = projects.find(p => p.id === task.projectId);
            const user = users.find(u => u.id === task.assignedTo);
            
            const statusBadge = this.getStatusBadge(task.status);
            const priorityBadge = this.getPriorityBadge(task.priority);
            
            row.innerHTML = `
                <td>${task.id}</td>
                <td><strong>${task.title}</strong></td>
                <td>${statusBadge}</td>
                <td>${priorityBadge}</td>
                <td>${project ? project.name : 'N/A'}</td>
                <td>${user ? (user.name || user.username) : 'N/A'}</td>
                <td>${task.dueDate || 'N/A'}</td>
            `;
            
            this.tasksTableBody.appendChild(row);
        });
    }

    selectTask(taskId) {
        this.selectedTaskId = taskId;
        // Resaltar fila seleccionada
        const rows = this.tasksTableBody.querySelectorAll('tr');
        rows.forEach(row => row.style.backgroundColor = '');
        rows.forEach(row => {
            if (row.firstChild.textContent == taskId) {
                row.style.backgroundColor = '#ffffcc';
            }
        });
    }

    getSelectedTaskId() {
        return this.selectedTaskId;
    }

    getTaskFormData() {
        return {
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            status: document.getElementById('taskStatus').value,
            priority: document.getElementById('taskPriority').value,
            projectId: parseInt(document.getElementById('taskProject').value) || null,
            assignedTo: parseInt(document.getElementById('taskAssigned').value) || null,
            dueDate: document.getElementById('taskDueDate').value || null,
            hours: parseFloat(document.getElementById('taskHours').value) || null
        };
    }

    populateTaskForm(task) {
        document.getElementById('taskTitle').value = task.title || '';
        document.getElementById('taskDescription').value = task.description || '';
        document.getElementById('taskStatus').value = task.status || 'Pendiente';
        document.getElementById('taskPriority').value = task.priority || 'Baja';
        document.getElementById('taskProject').value = task.projectId || '';
        document.getElementById('taskAssigned').value = task.assignedTo || '';
        document.getElementById('taskDueDate').value = task.dueDate || '';
        document.getElementById('taskHours').value = task.hours || '';
        this.selectedTaskId = task.id;
    }

    clearTaskForm() {
        document.getElementById('taskTitle').value = '';
        document.getElementById('taskDescription').value = '';
        document.getElementById('taskStatus').value = 'Pendiente';
        document.getElementById('taskPriority').value = 'Baja';
        document.getElementById('taskProject').value = '';
        document.getElementById('taskAssigned').value = '';
        document.getElementById('taskDueDate').value = '';
        document.getElementById('taskHours').value = '';
        this.selectedTaskId = null;
        
        // Limpiar selección visual
        if (this.tasksTableBody) {
            const rows = this.tasksTableBody.querySelectorAll('tr');
            rows.forEach(row => row.style.backgroundColor = '');
        }
    }

    populateProjectSelect(projects) {
        const select = document.getElementById('taskProject');
        if (!select) return;
        
        select.innerHTML = '<option value="">Seleccionar...</option>';
        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.name;
            select.appendChild(option);
        });
    }

    populateUserSelect(users) {
        const select = document.getElementById('taskAssigned');
        if (!select) return;
        
        select.innerHTML = '<option value="">Seleccionar...</option>';
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name || user.username;
            select.appendChild(option);
        });
    }

    renderStats(stats) {
        if (!this.statsText) return;
        this.statsText.innerHTML = 
            `<strong>Total:</strong> <span style="color: #6366f1; font-weight: 600;">${stats.total}</span> | ` +
            `<strong>Pendientes:</strong> <span style="color: #f59e0b; font-weight: 600;">${stats.pending}</span> | ` +
            `<strong>En Progreso:</strong> <span style="color: #3b82f6; font-weight: 600;">${stats.inProgress}</span> | ` +
            `<strong>Completadas:</strong> <span style="color: #10b981; font-weight: 600;">${stats.completed}</span> | ` +
            `<strong>Bloqueadas:</strong> <span style="color: #ef4444; font-weight: 600;">${stats.blocked}</span> | ` +
            `<strong>Canceladas:</strong> <span style="color: #64748b; font-weight: 600;">${stats.cancelled}</span>`;
    }

    getStatusBadge(status) {
        const colors = {
            'Pendiente': '#f59e0b',
            'En Progreso': '#3b82f6',
            'Completada': '#10b981',
            'Bloqueada': '#ef4444',
            'Cancelada': '#64748b'
        };
        const color = colors[status] || '#64748b';
        return `<span style="display: inline-block; padding: 4px 12px; background: ${color}15; color: ${color}; border-radius: 12px; font-size: 12px; font-weight: 600;">${status}</span>`;
    }

    getPriorityBadge(priority) {
        const colors = {
            'Baja': '#10b981',
            'Media': '#f59e0b',
            'Alta': '#ef4444',
            'Crítica': '#dc2626'
        };
        const color = colors[priority] || '#64748b';
        return `<span style="display: inline-block; padding: 4px 12px; background: ${color}15; color: ${color}; border-radius: 12px; font-size: 12px; font-weight: 600;">${priority}</span>`;
    }
}
