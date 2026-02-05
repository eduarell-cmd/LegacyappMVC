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
function login() {
    const credentials = authView.getLoginData();
    const result = authController.login(credentials.username, credentials.password);
    
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

function loadTabData(tabName) {
    const user = authController.getCurrentUser();
    if (!user) return;
    
    switch(tabName) {
        case 'tasks':
            loadTasks();
            break;
        case 'projects':
            loadProjects();
            break;
        case 'comments':
            // No cargar automáticamente
            break;
        case 'history':
            // No cargar automáticamente
            break;
        case 'notifications':
            loadNotifications();
            break;
        case 'search':
            loadSearchProjects();
            break;
        case 'reports':
            // No cargar automáticamente
            break;
    }
}

// Funciones de Tareas
function loadTasks() {
    const user = authController.getCurrentUser();
    if (!user) return;
    
    const tasks = taskController.getAllTasks();
    const projects = projectController.getAllProjects();
    const users = userModel.getAllUsers();
    const stats = taskController.getStats();
    
    taskView.renderTasks(tasks, projects, users);
    taskView.renderStats(stats);
    taskView.populateProjectSelect(projects);
    taskView.populateUserSelect(users);
}

function addTask() {
    const user = authController.getCurrentUser();
    if (!user) return;
    
    const taskData = taskView.getTaskFormData();
    if (!taskData.title) {
        alert('El título es requerido');
        return;
    }
    
    taskController.addTask(taskData, user);
    loadTasks();
    taskView.clearTaskForm();
}

function updateTask() {
    const user = authController.getCurrentUser();
    if (!user) return;
    
    const taskId = taskView.getSelectedTaskId();
    if (!taskId) {
        alert('Selecciona una tarea primero');
        return;
    }
    
    const taskData = taskView.getTaskFormData();
    const result = taskController.updateTask(taskId, taskData, user);
    
    if (result.success) {
        loadTasks();
        taskView.clearTaskForm();
    } else {
        alert(result.message);
    }
}

function deleteTask() {
    const user = authController.getCurrentUser();
    if (!user) return;
    
    const taskId = taskView.getSelectedTaskId();
    if (!taskId) {
        alert('Selecciona una tarea primero');
        return;
    }
    
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
        const result = taskController.deleteTask(taskId, user);
        if (result.success) {
            loadTasks();
            taskView.clearTaskForm();
        }
    }
}

function clearTaskForm() {
    taskView.clearTaskForm();
}

// Funciones de Proyectos
function loadProjects() {
    const projects = projectController.getAllProjects();
    projectView.renderProjects(projects);
}

function addProject() {
    const projectData = projectView.getProjectFormData();
    if (!projectData.name) {
        alert('El nombre es requerido');
        return;
    }
    
    projectController.addProject(projectData);
    loadProjects();
    projectView.clearProjectForm();
}

function updateProject() {
    const projectId = projectView.getSelectedProjectId();
    if (!projectId) {
        alert('Selecciona un proyecto primero');
        return;
    }
    
    const projectData = projectView.getProjectFormData();
    const result = projectController.updateProject(projectId, projectData);
    
    if (result.success) {
        loadProjects();
        projectView.clearProjectForm();
        // Recargar tareas también para actualizar selects
        if (currentTab === 'tasks') {
            loadTasks();
        }
    } else {
        alert(result.message);
    }
}

function deleteProject() {
    const projectId = projectView.getSelectedProjectId();
    if (!projectId) {
        alert('Selecciona un proyecto primero');
        return;
    }
    
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
        const result = projectController.deleteProject(projectId);
        if (result.success) {
            loadProjects();
            projectView.clearProjectForm();
            // Recargar tareas también
            if (currentTab === 'tasks') {
                loadTasks();
            }
        }
    }
}

// Funciones de Comentarios
function addComment() {
    const user = authController.getCurrentUser();
    if (!user) return;
    
    const commentData = commentView.getCommentFormData();
    if (!commentData.taskId || !commentData.text) {
        alert('ID de tarea y comentario son requeridos');
        return;
    }
    
    const result = commentController.addComment(commentData, user);
    if (result.success) {
        commentView.clearCommentForm();
        loadComments();
    } else {
        alert(result.message);
    }
}

function loadComments() {
    const taskId = parseInt(document.getElementById('commentTaskId').value);
    if (!taskId) {
        alert('Ingresa un ID de tarea');
        return;
    }
    
    const comments = commentController.getCommentsByTaskId(taskId);
    commentView.renderComments(comments);
}

// Funciones de Historial
function loadHistory() {
    const taskId = parseInt(document.getElementById('historyTaskId').value);
    if (!taskId) {
        alert('Ingresa un ID de tarea');
        return;
    }
    
    const history = historyController.getHistoryByTaskId(taskId);
    historyView.renderHistory(history);
}

function loadAllHistory() {
    const history = historyController.getAllHistory();
    historyView.renderHistory(history);
}

// Funciones de Notificaciones
function loadNotifications() {
    const user = authController.getCurrentUser();
    if (!user) return;
    
    const notifications = notificationController.getNotificationsByUserId(user.id);
    notificationView.renderNotifications(notifications);
}

function markNotificationsRead() {
    const user = authController.getCurrentUser();
    if (!user) return;
    
    notificationController.markAsRead(user.id);
    loadNotifications();
}

// Funciones de Búsqueda
function loadSearchProjects() {
    const projects = searchController.getAllProjects();
    searchView.populateProjectSelect(projects);
}

function searchTasks() {
    const filters = searchView.getSearchFilters();
    const results = searchController.searchTasks(filters);
    const projects = searchController.getAllProjects();
    searchView.renderSearchResults(results, projects);
}

// Funciones de Reportes
function generateReport(type) {
    let report = '';
    
    switch(type) {
        case 'tasks':
            report = reportController.generateTasksReport();
            break;
        case 'projects':
            report = reportController.generateProjectsReport();
            break;
        case 'users':
            report = reportController.generateUsersReport();
            break;
        default:
            report = 'Tipo de reporte no válido';
    }
    
    reportView.renderReport(report);
}

function exportCSV() {
    const csv = reportController.exportToCSV();
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
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Manejar clics en filas de tareas para cargar datos en el formulario
document.addEventListener('click', function(e) {
    if (e.target.closest('#tasksTableBody tr')) {
        const row = e.target.closest('tr');
        const taskId = parseInt(row.firstChild.textContent);
        const task = taskController.getTask(taskId);
        if (task) {
            taskView.populateTaskForm(task);
        }
    }
    
    if (e.target.closest('#projectsTableBody tr')) {
        const row = e.target.closest('tr');
        const projectId = parseInt(row.firstChild.textContent);
        const project = projectController.getProject(projectId);
        if (project) {
            projectView.populateProjectForm(project);
        }
    }
});
