// Search View - Maneja la vista de búsqueda
class SearchView {
    constructor() {
        this.searchTableBody = document.getElementById('searchTableBody');
    }

    renderSearchResults(tasks, projects) {
        if (!this.searchTableBody) return;
        
        this.searchTableBody.innerHTML = '';
        
        if (tasks.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="5" style="text-align: center;">No se encontraron tareas</td>';
            this.searchTableBody.appendChild(row);
            return;
        }
        
        tasks.forEach(task => {
            const row = document.createElement('tr');
            const project = projects.find(p => p.id === task.projectId);
            
            const statusBadge = this.getStatusBadge(task.status);
            const priorityBadge = this.getPriorityBadge(task.priority);
            
            row.innerHTML = `
                <td>${task.id}</td>
                <td><strong>${task.title}</strong></td>
                <td>${statusBadge}</td>
                <td>${priorityBadge}</td>
                <td>${project ? project.name : 'N/A'}</td>
            `;
            
            this.searchTableBody.appendChild(row);
        });
    }

    getSearchFilters() {
        return {
            text: document.getElementById('searchText').value,
            status: document.getElementById('searchStatus').value,
            priority: document.getElementById('searchPriority').value,
            projectId: parseInt(document.getElementById('searchProject').value) || 0
        };
    }

    populateProjectSelect(projects) {
        const select = document.getElementById('searchProject');
        if (!select) return;
        
        select.innerHTML = '<option value="0">Todos</option>';
        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.name;
            select.appendChild(option);
        });
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
