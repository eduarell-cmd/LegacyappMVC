// App Principal - Coordinador MVC
// Inicializa modelos, controladores y vistas, y maneja eventos

// Inicializar modelos
const userModel = new UserModel();
const taskModel = new TaskModel();
const projectModel = new ProjectModel();
const commentModel = new CommentModel();
const historyModel = new HistoryModel();
const notificationModel = new NotificationModel();

// Inicializar controladores
const authController = new AuthController(userModel);
const taskController = new TaskController(taskModel, historyModel, notificationModel);
const projectController = new ProjectController(projectModel);
const commentController = new CommentController(commentModel, taskModel, historyModel);
const historyController = new HistoryController(historyModel, taskModel, userModel);
const notificationController = new NotificationController(notificationModel);
const searchController = new SearchController(taskModel, projectModel);
const reportController = new ReportController(taskModel, projectModel, userModel, commentModel);

// Inicializar vistas
const authView = new AuthView();
const taskView = new TaskView();
const projectView = new ProjectView();
const commentView = new CommentView();
const historyView = new HistoryView();
const notificationView = new NotificationView();
const searchView = new SearchView();
const reportView = new ReportView();

// Estado de la aplicación
let currentTab = 'tasks';

// Funciones globales para eventos del HTML
async function login() {
    const credentials = authView.getLoginData();
    const result = await authController.login(credentials.username, credentials.password);

    if (result.success) {
        authView.showMain(result.user);
        initializeApp();
    } else {
        authView.showError(result.message);
    }
}

function logout() {
    authController.logout();
    authView.showLogin();
    currentTab = 'tasks';
}

function showTab(tabName) {
    // Ocultar todas las pestañas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Ocultar todos los botones activos
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });

    // Mostrar pestaña seleccionada
    const tabContent = document.getElementById(tabName + 'Tab');
    if (tabContent) {
        tabContent.classList.add('active');
    }

    // Activar botón
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(btn => {
        if (btn.textContent.trim() === getTabName(tabName)) {
            btn.classList.add('active');
        }
    });

    currentTab = tabName;

    // Cargar datos según la pestaña
    loadTabData(tabName);
}

function getTabName(tabName) {
    const names = {
        'tasks': 'Tareas',
        'projects': 'Proyectos',
        'comments': 'Comentarios',
        'history': 'Historial',
        'notifications': 'Notificaciones',
        'search': 'Búsqueda',
        'reports': 'Reportes'
    };
    return names[tabName] || tabName;
}

async function loadTabData(tabName) {
    const user = authController.getCurrentUser();
    if (!user) return;

    switch (tabName) {
        case 'tasks':
            await loadTasks();
            break;
        case 'projects':
            await loadProjects();
            break;
        case 'comments':
            // No cargar automáticamente
            break;
        case 'history':
            // No cargar automáticamente
            break;
        case 'notifications':
            await loadNotifications();
            break;
        case 'search':
            await loadSearchProjects();
            break;
        case 'reports':
            // No cargar automáticamente
            break;
    }
}

// Funciones de Tareas
async function loadTasks() {
    const user = authController.getCurrentUser();
    if (!user) return;

    const tasks = await taskController.getAllTasks();
    const projects = await projectController.getAllProjects();
    const users = await userModel.getAllUsers();
    const stats = await taskController.getStats();

    taskView.renderTasks(tasks, projects, users);
    taskView.renderStats(stats);
    taskView.populateProjectSelect(projects);
    taskView.populateUserSelect(users);
}

async function addTask() {
    const user = authController.getCurrentUser();
    if (!user) return;

    const taskData = taskView.getTaskFormData();
    if (!taskData.title) {
        alert('El título es requerido');
        return;
    }

    const task = await taskController.addTask(taskData, user);
    if (task) {
        alert('Tarea agregada exitosamente');
        await loadTasks();
        taskView.clearTaskForm();
    } else {
        alert('Error al agregar la tarea');
    }
}

async function updateTask() {
    const user = authController.getCurrentUser();
    if (!user) return;

    const taskId = taskView.getSelectedTaskId();
    if (!taskId) {
        alert('Selecciona una tarea primero');
        return;
    }

    const taskData = taskView.getTaskFormData();
    const result = await taskController.updateTask(taskId, taskData, user);

    if (result.success) {
        alert('Tarea actualizada exitosamente');
        await loadTasks();
        taskView.clearTaskForm();
    } else {
        alert(result.message);
    }
}

async function deleteTask() {
    const user = authController.getCurrentUser();
    if (!user) return;

    const taskId = taskView.getSelectedTaskId();
    if (!taskId) {
        alert('Selecciona una tarea primero');
        return;
    }

    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
        const result = await taskController.deleteTask(taskId, user);
        if (result.success) {
            alert('Tarea eliminada exitosamente');
            await loadTasks();
            taskView.clearTaskForm();
        }
    }
}

// Funciones para acciones directas desde la tabla
async function editTaskFromRow(taskId) {
    const task = await taskController.getTask(taskId);
    if (task) {
        taskView.populateTaskForm(task);
        // Scroll al formulario
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    }
}

async function deleteTaskFromRow(taskId) {
    const user = authController.getCurrentUser();
    if (!user) return;

    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
        const result = await taskController.deleteTask(taskId, user);
        if (result.success) {
            alert('Tarea eliminada exitosamente');
            await loadTasks();
            if (taskView.getSelectedTaskId() === taskId) {
                taskView.clearTaskForm();
            }
        }
    }
}

function clearTaskForm() {
    taskView.clearTaskForm();
}

// Funciones de Proyectos
async function loadProjects() {
    const projects = await projectController.getAllProjects();
    projectView.renderProjects(projects);
}

async function addProject() {
    const projectData = projectView.getProjectFormData();
    if (!projectData.name) {
        alert('El nombre es requerido');
        return;
    }

    const project = await projectController.addProject(projectData);
    if (project) {
        alert('Proyecto agregado exitosamente');
        await loadProjects();
        projectView.clearProjectForm();
    } else {
        alert('Error al agregar el proyecto');
    }
}

async function updateProject() {
    const projectId = projectView.getSelectedProjectId();
    if (!projectId) {
        alert('Selecciona un proyecto primero');
        return;
    }

    const projectData = projectView.getProjectFormData();
    const result = await projectController.updateProject(projectId, projectData);

    if (result.success) {
        alert('Proyecto actualizado exitosamente');
        await loadProjects();
        projectView.clearProjectForm();
        // Recargar tareas también para actualizar selects
        if (currentTab === 'tasks') {
            await loadTasks();
        }
    } else {
        alert(result.message);
    }
}

async function deleteProject() {
    const projectId = projectView.getSelectedProjectId();
    if (!projectId) {
        alert('Selecciona un proyecto primero');
        return;
    }

    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
        const result = await projectController.deleteProject(projectId);
        if (result.success) {
            alert('Proyecto eliminado exitosamente');
            await loadProjects();
            projectView.clearProjectForm();
            // Recargar tareas también
            if (currentTab === 'tasks') {
                await loadTasks();
            }
        }
    }
}

// Funciones para acciones directas desde la tabla de proyectos
async function editProjectFromRow(projectId) {
    const project = await projectController.getProject(projectId);
    if (project) {
        projectView.populateProjectForm(project);
        // Scroll al formulario
        document.querySelector('#projectsTab .form-section').scrollIntoView({ behavior: 'smooth' });
    }
}

async function deleteProjectFromRow(projectId) {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
        const result = await projectController.deleteProject(projectId);
        if (result.success) {
            alert('Proyecto eliminado exitosamente');
            await loadProjects();
            if (projectView.getSelectedProjectId() === projectId) {
                projectView.clearProjectForm();
            }
            // Recargar tareas también
            if (currentTab === 'tasks') {
                await loadTasks();
            }
        }
    }
}

function clearProjectForm() {
    projectView.clearProjectForm();
}

// Funciones de Comentarios
async function addComment() {
    const user = authController.getCurrentUser();
    if (!user) return;

    const commentData = commentView.getCommentFormData();
    if (!commentData.taskId || !commentData.text) {
        alert('ID de tarea y comentario son requeridos');
        return;
    }

    const result = await commentController.addComment(commentData, user);
    if (result.success) {
        commentView.clearCommentForm();
        await loadComments();
    } else {
        alert(result.message);
    }
}

async function loadComments() {
    const taskId = document.getElementById('commentTaskId').value;
    if (!taskId) {
        alert('Ingresa un ID de tarea');
        return;
    }

    const comments = await commentController.getCommentsByTaskId(taskId);
    commentView.renderComments(comments);
}

// Funciones de Historial
async function loadHistory() {
    const taskId = document.getElementById('historyTaskId').value;
    if (!taskId) {
        alert('Ingresa un ID de tarea');
        return;
    }

    const history = await historyController.getHistoryByTaskId(taskId);
    historyView.renderHistory(history);
}

async function loadAllHistory() {
    const history = await historyController.getAllHistory();
    historyView.renderHistory(history);
}

// Funciones de Notificaciones
async function loadNotifications() {
    const user = authController.getCurrentUser();
    if (!user) return;

    const userId = user._id || user.id;
    const notifications = await notificationController.getNotificationsByUserId(userId);
    notificationView.renderNotifications(notifications);
}

async function markNotificationsRead() {
    const user = authController.getCurrentUser();
    if (!user) return;

    const userId = user._id || user.id;
    await notificationController.markAsRead(userId);
    await loadNotifications();
}

// Funciones de Búsqueda
async function loadSearchProjects() {
    const projects = await searchController.getAllProjects();
    searchView.populateProjectSelect(projects);
}

async function searchTasks() {
    const filters = searchView.getSearchFilters();
    const results = await searchController.searchTasks(filters);
    const projects = await searchController.getAllProjects();
    searchView.renderSearchResults(results, projects);
}

// Funciones de Reportes
async function generateReport(type) {
    let report = '';

    switch (type) {
        case 'tasks':
            report = await reportController.generateTasksReport();
            break;
        case 'projects':
            report = await reportController.generateProjectsReport();
            break;
        case 'users':
            report = await reportController.generateUsersReport();
            break;
        default:
            report = 'Tipo de reporte no válido';
    }

    reportView.renderReport(report);
}

async function exportCSV() {
    const csv = await reportController.exportToCSV();
    reportView.downloadCSV(csv, 'task_manager_report.csv');
}

// Inicialización
function initializeApp() {
    // Verificar si hay usuario autenticado
    const user = authController.getCurrentUser();
    if (user) {
        authView.showMain(user);
        loadTabData(currentTab);
    } else {
        authView.showLogin();
    }
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

// Manejar clics en filas de tareas para cargar datos en el formulario
document.addEventListener('click', async function (e) {
    if (e.target.closest('#tasksTableBody tr')) {
        const row = e.target.closest('tr');
        const taskId = row.firstChild.textContent;
        const task = await taskController.getTask(taskId);
        if (task) {
            taskView.populateTaskForm(task);
        }
    }

    if (e.target.closest('#projectsTableBody tr')) {
        const row = e.target.closest('tr');
        const projectId = row.firstChild.textContent;
        const project = await projectController.getProject(projectId);
        if (project) {
            projectView.populateProjectForm(project);
        }
    }
});
