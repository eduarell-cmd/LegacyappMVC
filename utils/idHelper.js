// Helper para manejar IDs de MongoDB (_id) y compatibilidad con id
function getId(obj) {
    if (!obj) return null;
    return obj._id || obj.id;
}

function getProjectId(task) {
    if (!task || !task.projectId) return null;
    if (typeof task.projectId === 'object') {
        return task.projectId._id || task.projectId.id;
    }
    return task.projectId;
}

function getAssignedToId(task) {
    if (!task || !task.assignedTo) return null;
    if (typeof task.assignedTo === 'object') {
        return task.assignedTo._id || task.assignedTo.id;
    }
    return task.assignedTo;
}

function findById(array, id) {
    if (!array || !id) return null;
    return array.find(item => {
        const itemId = getId(item);
        return itemId === id || String(itemId) === String(id);
    });
}
