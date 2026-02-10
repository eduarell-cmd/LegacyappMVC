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
            const projectId = getId(project);
            const row = document.createElement('tr');
            row.onclick = () => this.selectProject(projectId);

            const startDate = project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A';
            const endDate = project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A';

            row.innerHTML = `
                <td>${projectId}</td>
                <td><strong>${project.name}</strong></td>
                <td>${project.description || ''}</td>
                <td>${startDate}</td>
                <td>${endDate}</td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        <button onclick="event.stopPropagation(); editProjectFromRow('${projectId}')" style="padding: 4px 8px; background: var(--info); font-size: 12px;">✏️</button>
                        <button onclick="event.stopPropagation(); deleteProjectFromRow('${projectId}')" style="padding: 4px 8px; background: var(--danger); font-size: 12px;">🗑️</button>
                    </div>
                </td>
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
            description: document.getElementById('projectDescription').value,
            startDate: document.getElementById('projectStartDate').value || null,
            endDate: document.getElementById('projectEndDate').value || null
        };
    }

    populateProjectForm(project) {
        document.getElementById('projectName').value = project.name || '';
        document.getElementById('projectDescription').value = project.description || '';

        if (project.startDate) {
            document.getElementById('projectStartDate').value = new Date(project.startDate).toISOString().split('T')[0];
        } else {
            document.getElementById('projectStartDate').value = '';
        }

        if (project.endDate) {
            document.getElementById('projectEndDate').value = new Date(project.endDate).toISOString().split('T')[0];
        } else {
            document.getElementById('projectEndDate').value = '';
        }

        this.selectedProjectId = getId(project);
    }

    clearProjectForm() {
        document.getElementById('projectName').value = '';
        document.getElementById('projectDescription').value = '';
        document.getElementById('projectStartDate').value = '';
        document.getElementById('projectEndDate').value = '';
        this.selectedProjectId = null;

        // Limpiar selección visual
        if (this.projectsTableBody) {
            const rows = this.projectsTableBody.querySelectorAll('tr');
            rows.forEach(row => row.style.backgroundColor = '');
        }
    }
}
