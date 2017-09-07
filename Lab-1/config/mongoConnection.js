const mongoClient = require("mongodb").MongoClient;

const settings = {
    mongoConfig: {
        serverUrl: "mongodb://localhost:27017/",
        database: "Sharma-Puneet-CS554-Lab1"
    }
};

let fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
let connection;

let connectDb = () => {
    if (!connection) {
        connection = mongoClient.connect(fullMongoUrl)
            .then((db) => {
                return db;
            });
    }

    return connection;
};

module.exports = connectDb;