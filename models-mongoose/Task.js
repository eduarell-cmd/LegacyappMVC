// Modelo de Tarea con Mongoose
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Pendiente', 'En Progreso', 'Completada', 'Bloqueada', 'Cancelada'],
        default: 'Pendiente'
    },
    priority: {
        type: String,
        enum: ['Baja', 'Media', 'Alta', 'Crítica'],
        default: 'Media'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dueDate: {
        type: Date
    },
    estimatedHours: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
