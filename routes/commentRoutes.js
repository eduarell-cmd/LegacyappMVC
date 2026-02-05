// Rutas de Comentarios
const express = require('express');
const router = express.Router();
const Comment = require('../models-mongoose/Comment');

// Obtener todos los comentarios
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate('userId', 'name username')
            .populate('taskId', 'title')
            .sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener comentarios por tarea
router.get('/task/:taskId', async (req, res) => {
    try {
        const comments = await Comment.find({ taskId: req.params.taskId })
            .populate('userId', 'name username')
            .sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener comentario por ID
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
            .populate('userId', 'name username')
            .populate('taskId', 'title');
        if (!comment) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear comentario
router.post('/', async (req, res) => {
    try {
        const comment = new Comment(req.body);
        const savedComment = await comment.save();
        const populatedComment = await Comment.findById(savedComment._id)
            .populate('userId', 'name username')
            .populate('taskId', 'title');
        res.status(201).json(populatedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar comentario
router.put('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        .populate('userId', 'name username')
        .populate('taskId', 'title');
        
        if (!comment) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        res.json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar comentario
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        res.json({ message: 'Comentario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
