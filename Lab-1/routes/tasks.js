/*
 * @Author : Puneet Sharma 
 * @Copyright (c) 2017, Stevens Institute of Technology 
 * @Created: 2017-09-03
 */

const express = require('express');
const router = express.Router();
const data = require("../data");
const taskData = data.tasks;

router.get("/:id",
    (req, res) => {
        taskData.getTaskById(req.params.id).then(task => {
                res.json(task);
            },
            () => {
                res.status(404).json({
                    error: "Task not found"
                });
            });
    });

router.put("/:id",
    (req, res) => {
        let updatedData = req.body;
        taskData.getTaskById(req.params.id).then(() => {
                return taskData.updateTask(req.params.id, updatedData)
                    .then(updated => {
                            res.json(updated);
                        },
                        e => {
                            res.status(500).json({
                                error: e
                            });
                        });
            },
            () => {
                res.status(404).json({
                    error: "Task not found"
                });
            });
    });
router.patch("/:id",
    (req, res) => {
        let updatedData = req.body;
        taskData.getTaskById(req.params.id).then(() => {
                return taskData.patchTask(req.params.id, updatedData)
                    .then(updated => {
                            res.json(updated);
                        },
                        e => {
                            res.status(500).json({
                                error: e
                            });
                        });
            },
            () => {
                res.status(404).json({
                    error: "Task not found"
                });
            });
    });
router.delete("/:id",
    (req, res) => {
        taskData.getTaskById(req.params.id).then(() => {
            taskData.removeTask(req.params.id)
                .then(() => {
                        res.sendStatus(200);
                    },
                    e => {
                        res.status(500).json({
                            error: e
                        });
                    });
        }).catch(err => {
            res.status(404).send({
                error: err
            });
        });
    });

router.post("/",
    (req, res) => {
        let task = req.body;
        taskData.addTask(task.title, task.description, task.hoursEstimated)
            .then(newTask => {
                    res.json(newTask);
                },
                (e) => {
                    res.status(500).json({
                        error: e
                    });
                });
    });

router.get("/",
    (req, res) => {
        let skip = parseInt(req.query.skip);
        if (!skip || isNaN(skip)) {
            skip = 0;
        }
        let take = parseInt(req.query.take);
        if (!take || isNaN(take)) {
            take = 20;
        }
        taskData.getAllTasks(skip, take).then(tasks => {
                res.json(tasks);
            },
            e => {
                res.status(500).json({
                    error: e
                });
            });
    });

module.exports = router;