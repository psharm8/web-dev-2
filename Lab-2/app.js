/*
 * @Author : Puneet Sharma 
 * @Copyright (c) 2017, Stevens Institute of Technology 
 * @Created: 2017-09-11
 */

const express = require("express");
const pub = express.static(__dirname + '/public');
let app = express();
app.use("/public", pub);
app.get("/", (req, res) => {
    res.sendFile("views/static/index.html", {
        root: __dirname
    });
});
app.use("*", (req, res) => {
    res.status(404).sendFile("views/static/error.html", {
        root: __dirname
    });
});
app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});