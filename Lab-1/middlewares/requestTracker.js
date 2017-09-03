/*
 * @Author : Puneet Sharma 
 * @Copyright (c) 2017, Stevens Institute of Technology 
 * @Created: 2017-09-03
 */

let requests={};

function stripTrailingSlash(str) {
    if (str.endsWith('/')) {
        return str.slice(0, -1);
    }
    return str;
}
let trackRequest = (req, res, next) => {
   
    let url = stripTrailingSlash(req.originalUrl);
    if (!requests[url]) {
        requests[url] = 0;
    }
    requests[url]++;
    console.log(`Number of hits at ${url} = ${requests[url]}`);
    console.log();
    next();
};

module.exports = trackRequest;