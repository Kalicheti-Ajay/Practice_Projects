const User = require("../models/user");
const {createAudit} = require("../services/auditService")

// async function createUser(req,res) {
//     try {
//         const {name,email,role,experience,password} = req.body;
//         const user = await User.create({name,email,role,experience,password});

//         await createAudit({
//             action: "CREATE",
//             entity: "User",
//             entityId: user._id,
//             performedBy: req.user.userId,
//             details: "User created"
            
//         });

//         res.status(201).json(user);
//     } catch (err) {
//         res.status(400).json({error: err.message});
//     }
// }

async function createUser(req, res) {
    try {
        const {
            name,
            email,
            password,
            role,
            experience
        } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            role,
            experience
        });

        await createAudit({
            action: "CREATE",
            entity: "User",
            entityId: user._id,
            performedBy: user._id,
            details: `User ${user.name} created`
        });

        res.status(201).json(user);

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
}

async function getUsers(req,res) {
    try {
        const users = await User.find();
        if(!users) {
            return res.status(404).json({error: "No users found"});
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

async function getUserById(req,res) {          
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}   

async function updateUser(req,res) {
    try {
        const {name,email,role,experience} = req.body;
        const {id} = req.params;
        
        const user = await User.findByIdAndUpdate(req.params.id,{name,email,role,experience},{returnDocument:"after"});
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }

        await createAudit({
            action: "UPDATE",
            entity: "User",
            entityId: user._id,
            performedBy: user._id,
            details: "User Updated"
            
        });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

async function deleteUser(req,res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }

        await createAudit({
            action: "DELETE",
            entity: "User",
            entityId: user._id,
            performedBy: user._id,
            details: "User deleted"
            
        });

        res.status(200).json({message: "User deleted successfully"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }   
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}