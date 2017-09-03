/*
 * @Author : Puneet Sharma 
 * @Copyright (c) 2017, Stevens Institute of Technology 
 * @Created: 2017-09-03
 */

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./middlewares/logger");
const tracker = require("./middlewares/requestTracker");
let app = express();
let configRoutes = require("./routes");

app.use(bodyParser.json());
app.use(logger);
app.use(tracker);
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});