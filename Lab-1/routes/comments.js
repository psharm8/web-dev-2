/*
 * @Author : Puneet Sharma 
 * @Copyright (c) 2017, Stevens Institute of Technology 
 * @Created: 2017-09-04
 */

const express = require('express');
const router = express.Router();
const data = require("../data");
const taskData = data.tasks;

router.post("/:taskId/comments",
    (req, res) => {
        taskData.getTaskById(req.params.taskId)
            .then(() => {
                return taskData.addCommentToTask(req.params.taskId, req.body.name, req.body.comment)
                    .then(task => {
                            res.json(task);
                        },
                        (e) => {
                            res.status(500).json({
                                error: e
                            });
                        });
            }, e => {
                res.status(400).send({
                    error: e
                });
            });
    });

router.delete("/:taskId/:commentId",
    (req, res) => {
        taskData.getCommentByTaskAndCommentId(req.params.taskId, req.params.commentId)
            .then(() => {
                taskData.deleteCommentFromTask(req.params.taskId, req.params.commentId)
                    .then(t => {
                        res.json(t);
                    }).catch(err => {
                        res.status(500).send({
                            error: err
                        });
                    });
            }, e => {
                res.status(400).send({
                    error: e
                });
            });

    });

module.exports = router;