// User Model - Maneja datos de usuarios con MongoDB (URL relativa = mismo origen)
class UserModel {
    constructor() {
        this.apiUrl = '/api/users';
    }

    async findUser(username, password) {
        try {
            const response = await fetch(`${this.apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            } else {
                console.error('Error en login:', data.message || 'Error desconocido');
                return null;
            }
        } catch (error) {
            console.error('Error al buscar usuario:', error);
            alert('Error de conexión. Asegúrate de que el servidor esté corriendo en http://localhost:3000');
            return null;
        }
    }

    async getUserById(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`);
            if (response.ok) {
                return await response.json();
            }
            return null;
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            return null;
        }
    }

    async getAllUsers() {
        try {
            const response = await fetch(this.apiUrl);
            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            return [];
        }
    }
}
