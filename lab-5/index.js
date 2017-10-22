const data = require("./data");
const bluebird = require("bluebird");
const express = require("express");
const app = express();
const redis = require("redis");
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.on("error", err => {
  console.log("Error " + err);
});

let updateHistory = async id => {
  let response = await client
    .multi()
    .lpush("history", id)
    .ltrim("history", 0, 19)
    .execAsync();
  console.log(`History Update: ${response}`);
};

app.get("/api/people/history", async (req, res) => {
  let ids = await client.lrangeAsync("history", 0, -1);
  let history = await Promise.all(
    ids.map(async p => {
      let person = await client.getAsync(p);
      return JSON.parse(person);
    })
  );
  res.json(history);
});

app.get("/api/people/:id", async (req, res, next) => {
  let id = req.params.id;
  let person = await client.getAsync(id);
  if (person) {
    let personObj = JSON.parse(person);
    console.log(`Person with id = ${id} found in cache.`);
    await updateHistory(id);
    res.json(personObj);
  } else {
    next();
  }
});

app.get("/api/people/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let person = await data.getById(id);
    console.log(`Person with id = ${id} retrieved from data file.`);
    await client.setAsync(person.id, JSON.stringify(person));
    await updateHistory(id);
    res.json(person);
  } catch (error) {
    if (error === "Not Found") {
      console.log(`Person with id = ${id} not found.`);
      res.sendStatus(404);
    } else {
      res.status(500).send(error);
    }
  }
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
