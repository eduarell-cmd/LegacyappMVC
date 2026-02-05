// User Model - Maneja datos de usuarios
class UserModel {
    constructor() {
        this.storageKey = 'taskManager_users';
        this.initDefaultUsers();
    }

    initDefaultUsers() {
        if (!localStorage.getItem(this.storageKey)) {
            const defaultUsers = [
                { id: 1, username: 'admin', password: 'admin', name: 'Administrador' },
                { id: 2, username: 'user1', password: 'user1', name: 'Usuario 1' },
                { id: 3, username: 'user2', password: 'user2', name: 'Usuario 2' }
            ];
            this.saveUsers(defaultUsers);
        }
    }

    getUsers() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    saveUsers(users) {
        localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    findUser(username, password) {
        const users = this.getUsers();
        return users.find(u => u.username === username && u.password === password);
    }

    getUserById(id) {
        const users = this.getUsers();
        return users.find(u => u.id === id);
    }

    getAllUsers() {
        return this.getUsers();
    }
}
