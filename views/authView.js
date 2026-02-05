// Auth View - Maneja la vista de autenticación
class AuthView {
    constructor() {
        this.loginPanel = document.getElementById('loginPanel');
        this.mainPanel = document.getElementById('mainPanel');
        this.currentUserSpan = document.getElementById('currentUser');
    }

    showLogin() {
        this.loginPanel.style.display = 'block';
        this.mainPanel.style.display = 'none';
    }

    showMain(user) {
        this.loginPanel.style.display = 'none';
        this.mainPanel.style.display = 'block';
        if (this.currentUserSpan) {
            this.currentUserSpan.textContent = user.name || user.username;
        }
    }

    getLoginData() {
        return {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
    }

    showError(message) {
        alert(message);
    }
}
