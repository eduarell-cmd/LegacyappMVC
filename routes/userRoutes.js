// Rutas de Usuarios
const express = require('express');
const router = express.Router();
const User = require('../models-mongoose/User');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login - ruta específica antes de /:id
router.post('/login', async (req, res) => {
    try {
        console.log('🔐 POST /api/users/login - Datos recibidos:', { username: req.body.username, password: '***' });
        const { username, password } = req.body;
        if (!username || !password) {
            console.log('❌ Faltan credenciales');
            return res.status(400).json({ message: 'Usuario y contraseña requeridos' });
        }
        const user = await User.findOne({ username, password });
        if (!user) {
            console.log('❌ Usuario no encontrado:', username);
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        const userResponse = user.toObject();
        delete userResponse.password;
        userResponse.id = userResponse._id && typeof userResponse._id === 'object' ? userResponse._id.toString() : (userResponse._id || userResponse.id);
        console.log('✅ Login exitoso para:', userResponse.name || userResponse.username);
        res.json(userResponse);
    } catch (error) {
        console.error('❌ Error en login:', error);
        res.status(500).json({ message: error.message });
    }
});

// Obtener usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear usuario
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        const userResponse = savedUser.toObject();
        delete userResponse.password;
        res.status(201).json(userResponse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
