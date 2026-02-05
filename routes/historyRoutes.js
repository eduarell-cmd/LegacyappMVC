// Rutas de Historial
const express = require('express');
const router = express.Router();
const History = require('../models-mongoose/History');

// Obtener todo el historial
router.get('/', async (req, res) => {
    try {
        const history = await History.find()
            .populate('userId', 'name username')
            .populate('taskId', 'title')
            .sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener historial por tarea
router.get('/task/:taskId', async (req, res) => {
    try {
        const history = await History.find({ taskId: req.params.taskId })
            .populate('userId', 'name username')
            .sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener entrada de historial por ID
router.get('/:id', async (req, res) => {
    try {
        const historyEntry = await History.findById(req.params.id)
            .populate('userId', 'name username')
            .populate('taskId', 'title');
        if (!historyEntry) {
            return res.status(404).json({ message: 'Entrada de historial no encontrada' });
        }
        res.json(historyEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear entrada de historial
router.post('/', async (req, res) => {
    try {
        const historyEntry = new History(req.body);
        const savedEntry = await historyEntry.save();
        const populatedEntry = await History.findById(savedEntry._id)
            .populate('userId', 'name username')
            .populate('taskId', 'title');
        res.status(201).json(populatedEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
