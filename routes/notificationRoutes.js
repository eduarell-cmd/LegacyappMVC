// Rutas de Notificaciones
const express = require('express');
const router = express.Router();
const Notification = require('../models-mongoose/Notification');

// Obtener todas las notificaciones
router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.find()
            .populate('userId', 'name username')
            .sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener notificaciones por usuario
router.get('/user/:userId', async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.userId })
            .sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener conteo de no leídas
router.get('/user/:userId/unread', async (req, res) => {
    try {
        const count = await Notification.countDocuments({
            userId: req.params.userId,
            read: false
        });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener notificación por ID
router.get('/:id', async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id)
            .populate('userId', 'name username');
        if (!notification) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear notificación
router.post('/', async (req, res) => {
    try {
        const notification = new Notification(req.body);
        const savedNotification = await notification.save();
        const populatedNotification = await Notification.findById(savedNotification._id)
            .populate('userId', 'name username');
        res.status(201).json(populatedNotification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Marcar notificaciones como leídas
router.put('/user/:userId/read', async (req, res) => {
    try {
        const result = await Notification.updateMany(
            { userId: req.params.userId, read: false },
            { 
                $set: { 
                    read: true,
                    readAt: new Date()
                }
            }
        );
        res.json({ message: `${result.modifiedCount} notificaciones marcadas como leídas` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar notificación
router.put('/:id', async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        .populate('userId', 'name username');
        
        if (!notification) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }
        res.json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar notificación
router.delete('/:id', async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }
        res.json({ message: 'Notificación eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
