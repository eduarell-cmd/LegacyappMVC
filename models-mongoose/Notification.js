// Modelo de Notificación con Mongoose
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['task_assigned', 'task_updated', 'task_completed', 'comment_added', 'other'],
        default: 'other'
    },
    read: {
        type: Boolean,
        default: false
    },
    readAt: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);
