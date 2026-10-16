require("dotenv/config")
const express = require("express")
const mongoose = require("mongoose")
const projectsRoutes = require("./routes/projectsRoutes")
const usersRoutes = require("./routes/usersRoutes")
const tasksRoutes = require("./routes/tasksRoutes")
const authRoutes = require("./routes/authRoutes");
const auditRoutes = require("./routes/auditRoutes");


const app = express();
app.use(express.json());

app.use("/api/projects", projectsRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/audits", auditRoutes);

const  PORT = process.env.PORT || 3000
//const MONGO_URI = process.env.MONGO_DB_URI;

const MONGO_URI = "mongodb://localhost:27017/ProjectManagementDB";

async function main(){
    await mongoose.connect(MONGO_URI).then(()=> {
        console.log("Connected to MongoDB:", MONGO_URI)
        app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`))
    }) 
    .catch((err) => {
        console.error("MongoDB connection error:", err.message)
        process.exit(1)
    })
};


main()






// const express = require("express");
// const mongoose = require("mongoose");
// require("dotenv").config();

// const projectsRoutes = require("./routes/projectsRoutes");
// const tasksRoutes = require("./routes/tasksRoutes");
// const usersRoutes = require("./routes/usersRoutes");
// const authRoutes = require("./routes/authRoutes");

// const app = express();

// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/users", usersRoutes);
// app.use("/api/projects", projectsRoutes);
// app.use("/api/tasks", tasksRoutes);

// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log("Connected to MongoDB");

//         app.listen(process.env.PORT, () => {
//             console.log(
//                 `Server running on http://localhost:${process.env.PORT}`
//             );
//         });
//     })
//     .catch((err) => {
//         console.error("MongoDB connection failed:", err);
//     });




















