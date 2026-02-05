// Modelo de Historial con Mongoose
const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        required: true
    },
    changes: {
        type: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('History', historySchema);
