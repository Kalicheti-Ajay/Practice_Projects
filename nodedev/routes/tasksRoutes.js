const express = require("express");
const authenticateToken = require("../middleware/middleware");
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/taskController");
const router = express.Router();
router.post("/",authenticateToken,createTask);
router.get("/",authenticateToken,getTasks);
router.get("/:id",authenticateToken,getTaskById);
router.put("/:id",authenticateToken,updateTask);
router.delete("/:id",authenticateToken,deleteTask);

module.exports = router;