const Project = require("../models/projects");
const { createAudit } = require("../services/auditService");

async function createProject(req, res) {
    try {
        const {
            projectName,
            managerId,
            ownerId,
            createdBy,
            updatedBy
        } = req.body;

        const project = await Project.create({
            projectName,
            managerId,
            ownerId,
            createdBy,
            updatedBy
        });

        await createAudit({
            action: "CREATE",
            entity: "Project",
            entityId: project._id,
            performedBy: req.user.userId,
            details: "Project created"
        });

        res.status(201).json(project);

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
}


async function getProjects(req, res) {
    try {
        const projects = await Project.find();

        if (projects.length === 0) {
            return res.status(404).json({
                error: "No projects found"
            });
        }

        res.status(200).json(projects);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}


async function getProjectById(req, res) {
    try {
        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                error: "Project not found"
            });
        }

        res.status(200).json(project);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}


// async function updateProject(req, res) {
//     try {
//         const { id } = req.params;

//         const {
//             projectName,
//             managerId,
//             ownerId,
//             createdBy,
//             updatedBy
//         } = req.body;

//         const project = await Project.findByIdAndUpdate(
//             id,
//             {
//                 projectName,
//                 managerId,
//                 ownerId,
//                 createdBy,
//                 updatedBy
//             },
//             {
//                 returnDocument: "after"
//             }
//         );

//         if (!project) {
//             return res.status(404).json({
//                 error: "Project not found"
//             });
//         }

//         res.status(200).json(project);

//     } catch (err) {
//         res.status(500).json({
//             error: err.message
//         });
//     }
// }

async function updateProject(req, res) {
    try {
        const { id } = req.params;

        const {
            projectName,
            managerId,
            ownerId,
            createdBy,
            updatedBy
        } = req.body;

        const project = await Project.findById(id);

        if(req.user.userId == project.managerId) {
            
            const project = await Project.findByIdAndUpdate(
            id,
            {
                projectName,
                managerId,
                ownerId,
                createdBy,
                updatedBy
            },
            {
                returnDocument: "after"
            }
        );

        if (!project) {
            return res.status(404).json({
                error: "Project not found"
            });
        }

        await createAudit({
            action: "UPDATE",
            entity: "Project",
            entityId: project._id,
            performedBy: req.user.userId,
            details: "Project updated"
        });

        res.status(200).json(project);
    }else{
        res.status(403).json({
            message: "Project can't be updated, you don't have permissions to the delete current record"
        });
    }

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}


// async function deleteProject(req, res) {
//     try {
//         const { id } = req.params;

//         const project = await Project.findByIdAndDelete(id);

//         if (!project) {
//             return res.status(404).json({
//                 error: "Project not found"
//             });
//         }

//         res.status(200).json({
//             message: "Project deleted successfully"
//         });

//     } catch (err) {
//         res.status(500).json({
//             error: err.message
//         });
//     }
// }

async function deleteProject(req, res) {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                error: "Project not found"
            });
        }

        if (project.ownerId == req.user.userId) {
            const project = await Project.findByIdAndDelete(id);

            await createAudit({
            action: "DELETE",
            entity: "Project",
            entityId: project._id,
            performedBy: req.user.userId,
            details: "Project deleted"
        });
        }
        else {
            res.status(403).json({
            message: "Project can't be deleted, you dont have permissions to the delete current record"
        });
        }

        res.status(200).json({
            message: "Project deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}


module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
};