const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true
        },

        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", taskSchema);









// const mongoose = require("mongoose");
// import { User } from "./User.js";
// import { Project } from "./projects.js";

// const tasksSchema = new mongoose.Schema(

// {
// taskName:{type: String, required: true, trim:true, unique: true},
// taskId:{type: String, required: true, trim:true, unique: true},
// projectId:{type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true, trim:true, unique: true},
// userId:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, trim:true, unique: true},
// }
// )


// const Task = mongoose.model("Task", tasksSchema)

// module.exports = { Task }