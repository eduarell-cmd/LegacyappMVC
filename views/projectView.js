// Project View - Maneja la vista de proyectos
class ProjectView {
    constructor() {
        this.projectsTableBody = document.getElementById('projectsTableBody');
        this.selectedProjectId = null;
    }

    renderProjects(projects) {
        if (!this.projectsTableBody) return;
        
        this.projectsTableBody.innerHTML = '';
        
        projects.forEach(project => {
            const row = document.createElement('tr');
            row.onclick = () => this.selectProject(project.id);
            
            row.innerHTML = `
                <td>${project.id}</td>
                <td>${project.name}</td>
                <td>${project.description || ''}</td>
            `;
            
            this.projectsTableBody.appendChild(row);
        });
    }

    selectProject(projectId) {
        this.selectedProjectId = projectId;
        // Resaltar fila seleccionada
        const rows = this.projectsTableBody.querySelectorAll('tr');
        rows.forEach(row => row.style.backgroundColor = '');
        rows.forEach(row => {
            if (row.firstChild.textContent == projectId) {
                row.style.backgroundColor = '#ffffcc';
            }
        });
    }

    getSelectedProjectId() {
        return this.selectedProjectId;
    }

    getProjectFormData() {
        return {
            name: document.getElementById('projectName').value,
            description: document.getElementById('projectDescription').value
        };
    }

    populateProjectForm(project) {
        document.getElementById('projectName').value = project.name || '';
        document.getElementById('projectDescription').value = project.description || '';
        this.selectedProjectId = project.id;
    }

    clearProjectForm() {
        document.getElementById('projectName').value = '';
        document.getElementById('projectDescription').value = '';
        this.selectedProjectId = null;
        
        // Limpiar selección visual
        if (this.projectsTableBody) {
            const rows = this.projectsTableBody.querySelectorAll('tr');
            rows.forEach(row => row.style.backgroundColor = '');
        }
    }
}
