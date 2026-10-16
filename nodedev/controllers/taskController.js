const Task = require("../models/tasks")
const { createAudit } = require("../services/auditService")

async function createTask(req,res) {
    try {
        const {taskName,projectId,userId} = req.body;
        const task = await Task.create({taskName,projectId,userId});

        await createAudit({
            action: "CREATE",
            entity: "Task",
            entityId: task._id,
            performedBy: req.user.userId,
            details: "Task created"
            
        });

        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}
    

async function getTasks(req,res) {
    try {
        const tasks = await Task.find()
        .populate("projectId", "projectName")
        .populate("userId", "name");

        if(!tasks) {
            return res.status(404).json({error: "No tasks found"});
        }
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

async function getTaskById(req,res) {
    try {
        const {id} = req.params;
        const task = await Task.findById(id);       

        if(!task) {
            return res.status(404).json({error: "Task not found"});
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

async function updateTask(req,res) {
    try {
        const {id} = req.params;
        const {taskName,projectId,userId} = req.body;
        const task = await Task.findByIdAndUpdate(id,{taskName,projectId,userId},{returnDocument:"after"});
        if(!task) {
            return res.status(404).json({error: "Task not found"});
        }

        await createAudit({
            action: "UPDATE",
            entity: "Task",
            entityId: task._id,
            performedBy: req.user.userId,
            details: "Task updated"
            
        });

        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

async function deleteTask(req,res) {
    try {
        const {id} = req.params;
        const task = await Task.findById(id);
        if(!task) {
            return res.status(404).json({error: "Task not found"});
        }
        if(task._id === req.user.userId) {
            const task = await Task.findByIdAndDelete(id);
           
            await createAudit({
                action: "DELETE",
                entity: "Task",
                entityId: task._id,
                performedBy: req.user.userId,
                details: "Task deleted"
                
            });
        }
        else {
            res.status(403).json({message: "Task can't be deleted, You don't have permissons to delete the record"})
        }
        

        res.status(200).json({message: "Task deleted successfully"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
}

