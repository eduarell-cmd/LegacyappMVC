// Auth Controller - Maneja autenticación
class AuthController {
    constructor(userModel) {
        this.userModel = userModel;
        this.currentUser = null;
    }

    async login(username, password) {
        console.log('🔐 Intentando login para:', username);
        if (!username || !password) {
            return { success: false, message: 'Usuario y contraseña son requeridos' };
        }
        
        const user = await this.userModel.findUser(username, password);
        console.log('👤 Usuario encontrado:', user ? 'Sí' : 'No');
        
        if (user) {
            // Convertir _id a id (string) para compatibilidad con el resto de la app
            user.id = user._id && typeof user._id === 'object' ? user._id.toString() : (user._id || user.id);
            this.currentUser = user;
            // Guardar usuario actual en sessionStorage
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            console.log('✅ Login exitoso para:', user.name || user.username);
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
