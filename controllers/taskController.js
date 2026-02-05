// Task Controller - Maneja lógica de tareas
class TaskController {
    constructor(taskModel, historyModel, notificationModel) {
        this.taskModel = taskModel;
        this.historyModel = historyModel;
        this.notificationModel = notificationModel;
    }

    addTask(taskData, currentUser) {
        const task = this.taskModel.addTask(taskData);
        
        // Registrar en historial
        this.historyModel.addHistoryEntry({
            taskId: task.id,
            userId: currentUser.id,
            action: 'CREAR',
            description: `Tarea "${task.title}" creada`,
            oldValue: null,
            newValue: JSON.stringify(task)
        });

        // Notificar si hay asignado
        if (task.assignedTo) {
            this.notificationModel.addNotification({
                userId: task.assignedTo,
                type: 'TASK_ASSIGNED',
                message: `Nueva tarea asignada: ${task.title}`,
                taskId: task.id
            });
        }

        return task;
    }

    updateTask(id, updates, currentUser) {
        const oldTask = this.taskModel.getTaskById(id);
        if (!oldTask) {
            return { success: false, message: 'Tarea no encontrada' };
        }

        const updatedTask = this.taskModel.updateTask(id, updates);
        
        // Registrar cambios en historial
        Object.keys(updates).forEach(key => {
            if (updates[key] !== oldTask[key]) {
                this.historyModel.addHistoryEntry({
                    taskId: id,
                    userId: currentUser.id,
                    action: 'ACTUALIZAR',
                    description: `Campo "${key}" actualizado`,
                    oldValue: String(oldTask[key]),
                    newValue: String(updates[key])
                });
            }
        });

        // Notificar si cambió el asignado
        if (updates.assignedTo && updates.assignedTo !== oldTask.assignedTo) {
            this.notificationModel.addNotification({
                userId: updates.assignedTo,
                type: 'TASK_ASSIGNED',
                message: `Tarea asignada: ${updatedTask.title}`,
                taskId: id
            });
        }

        return { success: true, task: updatedTask };
    }

    deleteTask(id, currentUser) {
        const task = this.taskModel.getTaskById(id);
        if (!task) {
            return { success: false, message: 'Tarea no encontrada' };
        }

        const deleted = this.taskModel.deleteTask(id);
        
        if (deleted) {
            // Registrar en historial
            this.historyModel.addHistoryEntry({
                taskId: id,
                userId: currentUser.id,
                action: 'ELIMINAR',
                description: `Tarea "${task.title}" eliminada`,
                oldValue: JSON.stringify(task),
                newValue: null
            });
        }

        return { success: deleted };
    }

    getTask(id) {
        return this.taskModel.getTaskById(id);
    }

    getAllTasks() {
        return this.taskModel.getTasks();
    }

    getStats() {
        return this.taskModel.getStats();
    }
}
