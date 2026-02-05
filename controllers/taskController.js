// Task Controller - Maneja lógica de tareas
class TaskController {
    constructor(taskModel, historyModel, notificationModel) {
        this.taskModel = taskModel;
        this.historyModel = historyModel;
        this.notificationModel = notificationModel;
    }

    async addTask(taskData, currentUser) {
        // Convertir IDs de string a ObjectId si es necesario
        if (taskData.projectId && typeof taskData.projectId === 'string') {
            // Mantener como string, MongoDB lo manejará
        }
        if (taskData.assignedTo && typeof taskData.assignedTo === 'string') {
            // Mantener como string
        }
        if (currentUser && currentUser._id) {
            taskData.createdBy = currentUser._id;
        } else if (currentUser && currentUser.id) {
            taskData.createdBy = currentUser.id;
        }

        const task = await this.taskModel.addTask(taskData);
        if (!task) {
            return null;
        }

        const taskId = task._id || task.id;
        const userId = currentUser._id || currentUser.id;
        
        // Registrar en historial
        await this.historyModel.addHistoryEntry({
            taskId: taskId,
            userId: userId,
            action: 'CREAR',
            description: `Tarea "${task.title}" creada`,
            oldValue: null,
            newValue: JSON.stringify(task)
        });

        // Notificar si hay asignado
        if (task.assignedTo) {
            await this.notificationModel.addNotification({
                userId: task.assignedTo,
                type: 'task_assigned',
                message: `Nueva tarea asignada: ${task.title}`
            });
        }

        return task;
    }

    async updateTask(id, updates, currentUser) {
        const oldTask = await this.taskModel.getTaskById(id);
        if (!oldTask) {
            return { success: false, message: 'Tarea no encontrada' };
        }

        const updatedTask = await this.taskModel.updateTask(id, updates);
        if (!updatedTask) {
            return { success: false, message: 'Error al actualizar tarea' };
        }

        const taskId = id;
        const userId = currentUser._id || currentUser.id;
        
        // Registrar cambios en historial
        Object.keys(updates).forEach(key => {
            if (updates[key] !== oldTask[key]) {
                this.historyModel.addHistoryEntry({
                    taskId: taskId,
                    userId: userId,
                    action: 'ACTUALIZAR',
                    description: `Campo "${key}" actualizado`,
                    oldValue: String(oldTask[key]),
                    newValue: String(updates[key])
                });
            }
        });

        // Notificar si cambió el asignado
        if (updates.assignedTo && updates.assignedTo !== oldTask.assignedTo) {
            await this.notificationModel.addNotification({
                userId: updates.assignedTo,
                type: 'task_assigned',
                message: `Tarea asignada: ${updatedTask.title}`
            });
        }

        return { success: true, task: updatedTask };
    }

    async deleteTask(id, currentUser) {
        const task = await this.taskModel.getTaskById(id);
        if (!task) {
            return { success: false, message: 'Tarea no encontrada' };
        }

        const deleted = await this.taskModel.deleteTask(id);
        
        if (deleted) {
            const userId = currentUser._id || currentUser.id;
            // Registrar en historial
            await this.historyModel.addHistoryEntry({
                taskId: id,
                userId: userId,
                action: 'ELIMINAR',
                description: `Tarea "${task.title}" eliminada`,
                oldValue: JSON.stringify(task),
                newValue: null
            });
        }

        return { success: deleted };
    }

    async getTask(id) {
        return await this.taskModel.getTaskById(id);
    }

    async getAllTasks() {
        return await this.taskModel.getTasks();
    }

    async getStats() {
        return await this.taskModel.getStats();
    }
}
