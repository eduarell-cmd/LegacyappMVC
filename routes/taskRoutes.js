// Rutas de Tareas
const express = require('express');
const router = express.Router();
const Task = require('../models-mongoose/Task');

// Obtener todas las tareas
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate('projectId', 'name')
            .populate('assignedTo', 'name username')
            .populate('createdBy', 'name username');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener tarea por ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('projectId', 'name')
            .populate('assignedTo', 'name username')
            .populate('createdBy', 'name username');
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Buscar tareas con filtros
router.post('/search', async (req, res) => {
    try {
        const { text, status, priority, projectId } = req.body;
        let query = {};

        if (text) {
            query.$or = [
                { title: { $regex: text, $options: 'i' } },
                { description: { $regex: text, $options: 'i' } }
            ];
        }
        if (status) query.status = status;
        if (priority) query.priority = priority;
        if (projectId && projectId !== '0') query.projectId = projectId;

        const tasks = await Task.find(query)
            .populate('projectId', 'name')
            .populate('assignedTo', 'name username');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener tareas por proyecto
router.get('/project/:projectId', async (req, res) => {
    try {
        const tasks = await Task.find({ projectId: req.params.projectId })
            .populate('assignedTo', 'name username');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener tareas por usuario
router.get('/user/:userId', async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.params.userId })
            .populate('projectId', 'name');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener estadísticas
router.get('/stats/summary', async (req, res) => {
    try {
        const total = await Task.countDocuments();
        const pending = await Task.countDocuments({ status: 'Pendiente' });
        const inProgress = await Task.countDocuments({ status: 'En Progreso' });
        const completed = await Task.countDocuments({ status: 'Completada' });
        const blocked = await Task.countDocuments({ status: 'Bloqueada' });
        const cancelled = await Task.countDocuments({ status: 'Cancelada' });

        res.json({
            total,
            pending,
            inProgress,
            completed,
            blocked,
            cancelled
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear tarea
router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        const populatedTask = await Task.findById(savedTask._id)
            .populate('projectId', 'name')
            .populate('assignedTo', 'name username')
            .populate('createdBy', 'name username');
        res.status(201).json(populatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar tarea
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        .populate('projectId', 'name')
        .populate('assignedTo', 'name username')
        .populate('createdBy', 'name username');
        
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar tarea
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json({ message: 'Tarea eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
