/*
 * @Author : Puneet Sharma 
 * @Copyright (c) 2017, Stevens Institute of Technology 
 * @Created: 2017-09-03
 */

const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const uuid = require("node-uuid");

let exportedMethods = {
    getAllTasks(skip, take) {
        return tasks().then(collection => {
            return collection.find().skip(skip).limit(Math.min(take, 100)).toArray();
        });
    },
    getTaskById(id) {
        if (!id) {
            return Promise.reject("You must provide the id of the Task.");
        }
        return tasks().then((collection) => {
            return collection.findOne({
                    _id: id
                })
                .then(task => {
                    if (!task) {
                        throw "Task not found";
                    }
                    return task;
                });
        });
    },
    addTask(title, description, hoursEstimated) {
        if (!title) {
            return Promise.reject("You must provide a title to the task.");
        }

        if (!description) {
            return Promise.reject("You must provide a description to the task.");
        }

        if (isNaN(hoursEstimated) || hoursEstimated <= 0) {
            return Promise.reject("Estimated hours should be a number greater than zero.");
        }
        return tasks().then(collection => {
            const nr = {
                _id: uuid.v4(),
                title: title,
                description: description,
                hoursEstimated: hoursEstimated,
                completed: false,
                comments: []
            };
            return collection.insertOne(nr).then(insertInfo => {
                return insertInfo.insertedId;
            }).then(id => {
                return this.getTaskById(id);
            });
        });
    },
    addCommentToTask(id, name, comment) {
        if (!id) {
            return Promise.reject("You must provide a task id.");
        }
        if (!comment) {
            return Promise.reject("No comment provided.");
        }
        if (!name) {
            return Promise.reject("No name provided.");
        }

        return tasks().then(collection => {
            let commentObj = {
                _id: uuid.v4(),
                name: name,
                comment: comment
            };
            return collection.updateOne({
                    _id: id
                }, {
                    $addToSet: {
                        "comments": commentObj
                    }
                })
                .then(() => {
                    return this.getTaskById(id);
                });
        });
    },
    deleteCommentFromTask(taskId, commentId) {
        return tasks().then(collection => {
            return collection.updateOne({
                    _id: taskId
                }, {
                    $pull: {
                        "comments": {
                            _id: commentId
                        }
                    }
                })
                .then(() => {
                    return this.getTaskById(taskId);
                });
        });

    },
    updateTask(id, updated) {
        if (!id) {
            return Promise.reject("You must provide an id to update.");
        }
        if (!updated) {
            return Promise.reject("No update provided.");
        }
        if (!updated.title) {
            return Promise.reject("Title not provided.");
        }
        if (!updated.description) {
            return Promise.reject("Description not provided.");
        }
        if (updated.completed === undefined) {
            return Promise.reject("Completed status not provided.");
        }
        if (!updated.hoursEstimated) {
            return Promise.reject("Hours Estimate not provided.");
        }
        if (typeof updated.completed !== "boolean") {
            return Promise.reject("Completed should be true or false.");
        }
        if (isNaN(updated.hoursEstimated) || updated.hoursEstimated <= 0) {
            return Promise.reject("Estimated hours should be a number greater than zero.");
        }
        if (updated.comments) {
            return Promise.reject("Comments cannot be updated while updating the task.");
        }

        return tasks().then(collection => {
            let updatedTask = {};
            updatedTask.title = updated.title;
            updatedTask.description = updated.description;
            updatedTask.hoursEstimated = updated.hoursEstimated;
            updatedTask.completed = updated.completed;
            let command = {
                $set: updated
            };
            return collection.updateOne({
                _id: id
            }, command).then(() => {
                return this.getTaskById(id);
            });
        });
    },
    patchTask(id, updated) {
        if (!id) {
            return Promise.reject("You must provide an id to update.");
        }
        if (!updated) {
            return Promise.reject("No update provided.");
        }
        if (updated.completed !== undefined && typeof updated.completed !== "boolean") {
            return Promise.reject("Completed should be true or false.");
        }
        if (updated.hoursEstimated && (isNaN(updated.hoursEstimated) || updated.hoursEstimated <= 0)) {
            return Promise.reject("Estimated hours should be a number greater than zero.");
        }
        if (updated.comments) {
            return Promise.reject("Comments cannot be updated while updating the task.");
        }

        return tasks().then(collection => {
            let updatedTask = {};
            if (updated.title) {
                updatedTask.title = updated.title;
            }
            if (updated.description) {
                updatedTask.description = updated.description;
            }
            if (updated.hoursEstimated) {
                updatedTask.hoursEstimated = updated.hoursEstimated;
            }
            if (updated.completed !== undefined) {
                updatedTask.completed = updated.completed;
            }
            let command = {
                $set: updated
            };
            return collection.updateOne({
                _id: id
            }, command).then(() => {
                return this.getTaskById(id);
            });
        });
    },
    removeTask(id) {
        if (!id) {
            return Promise.reject("You must provide an id to remove.");
        }
        return tasks().then((collection) => {
            return collection.removeOne({
                _id: id
            }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete Task with id : ${id}`);
                }
            });
        });
    },
    getCommentByTaskAndCommentId(taskId, commentId) {
        if (!taskId) {
            return Promise.reject("You must provide a task id.");
        }
        if (!commentId) {
            return Promise.reject("You must provide a comment id.");
        }
        return tasks().then(collection => {
            return collection.findOne({
                _id: taskId,
                "comments._id": commentId
            }).then(c => {
                if (!c) {
                    throw "Comment not found";
                }
                return c;
            });
        });
    }
};

module.exports = exportedMethods;