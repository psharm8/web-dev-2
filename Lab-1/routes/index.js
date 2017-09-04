/*
 * @Author : Puneet Sharma 
 * @Copyright (c) 2017, Stevens Institute of Technology 
 * @Created: 2017-09-03
 */

const taskRoutes = require("./tasks");
const commentsRoutes=require("./comments");
const constructorMethod = (app) => {
    app.use("/api/tasks", commentsRoutes);
    app.use("/api/tasks", taskRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error: "Not found"});
    });
};

module.exports = constructorMethod;