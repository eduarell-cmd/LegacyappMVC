// Auth Controller - Maneja autenticación
class AuthController {
    constructor(userModel) {
        this.userModel = userModel;
        this.currentUser = null;
    }

    login(username, password) {
        const user = this.userModel.findUser(username, password);
        if (user) {
            this.currentUser = user;
            // Guardar usuario actual en sessionStorage
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, message: 'Usuario o contraseña incorrectos' };
    }

    logout() {
        this.currentUser = null;
        sessionStorage.removeItem('currentUser');
    }

    getCurrentUser() {
        if (!this.currentUser) {
            const stored = sessionStorage.getItem('currentUser');
            if (stored) {
                this.currentUser = JSON.parse(stored);
            }
        }
        return this.currentUser;
    }

    isAuthenticated() {
        return this.getCurrentUser() !== null;
    }
}
