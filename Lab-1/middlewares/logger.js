/*
 * @Author : Puneet Sharma 
 * @Copyright (c) 2017, Stevens Institute of Technology 
 * @Created: 2017-09-03
 */

module.exports = (req, res, next) => {
    console.log("===== New Req =====");
    console.log(`${req.method} at ${req.originalUrl}`);
    console.log("====== Body ======");
    console.log(JSON.stringify(req.body, null, 2));
    console.log("===================");
    console.log();
    next();
};