const express = require("express");
const router = express.Router();
const redisConnection = require("../redis-connection");
const nrpSender = require("../nrp-sender-shim");

router.get("/:id", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "get-person",
            data: { id: req.params.id },
            expectsResponse: true
        });
        res.json(response);
    } catch (error) {
        res.status(error.code).json({ error: error.message });
    }
});
router.put("/:id", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "update-person",
            data: {
                id: req.params.id,
                person: req.body
            },
            expectsResponse: true
        });
        res.json(response);
    } catch (error) {
        res.status(error.code).json({ error: error.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "delete-person",
            data: { id: req.params.id },
            expectsResponse: true
        });
        res.json(response);
    } catch (error) {
        res.status(error.code).json({ error: error.message });
    }
});
router.post("/", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "add-person",
            data: { person: req.body },
            expectsResponse: true
        });

        res.json(response);
    } catch (error) {
        res.status(error.code).json({ error: error.message });
    }
});

module.exports = router;
