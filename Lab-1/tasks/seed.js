/*
 * @Author : Puneet Sharma 
 * @Copyright (c) 2017, Stevens Institute of Technology 
 * @Created: 2017-09-03
 */

const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const tasks = data.tasks;

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then(() => {
        return tasks
            .addTask("Make lab", "Make the first lab for CS-554. Maybe talk about dinosaurs in it, or something", 1)
            .then(() => {
                return tasks.addTask("Using the seed", "We use the seed to have some initial data so we can just focus on servers this week", 1);
            })
            .then(() => {
                return tasks.addTask("Using routes", "The purpose of today is to simply look at some GET routes", 0.5);
            });
    }).then(() => {
        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});