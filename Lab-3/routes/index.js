const path = require("path");
const products = require("../data").products;
const constructorMethod = (app) => {
    app.get("/", (req, res)=>{
       return products.getProducts()
        .then(p=>{
            res.render("home",{pageTitle:"My Super Awsome Products",products:p});
        });        
    });
    app.use("*", (req, res) => {
        res.status(404).sendFile(path.resolve(__dirname,"../views/static/error.html"));
    });
};

module.exports = constructorMethod;