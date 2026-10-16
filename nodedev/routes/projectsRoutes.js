// const express = require("express");
// const authenticateToken = require("../middleware/middleware");
// const {
//     createProject,
//     getProjects,
//     getProjectById,
//     updateProject,
//     deleteProject
// } = require("../controllers/projectsController");
// const router = express.Router();
// router.post("/", authenticateToken,createProject);
// router.get("/", authenticateToken,getProjects);
// router.get("/:id", authenticateToken,getProjectById);
// router.put("/:id", authenticateToken,updateProject);
// router.delete("/:id", authenticateToken,deleteProject);

// module.exports = router;

const express = require("express");

const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
} = require("../controllers/projectsController");

const authenticateToken = require("../middleware/middleware");

const router = express.Router();

router.post("/", authenticateToken, createProject);

router.get("/", authenticateToken, getProjects);

router.get("/:id", authenticateToken, getProjectById);

router.put("/:id", authenticateToken, updateProject);

router.delete("/:id", authenticateToken, deleteProject);

module.exports = router;