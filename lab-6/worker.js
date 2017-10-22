const redisConnection = require("./redis-connection");
const axios = require("axios");
let response = axios.get(
    "https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json"
);

let people = [];
let getPerson = (message, channel) => {
    const { requestId, successEventName, failedEventName, data } = message;

    let id = parseInt(data.id);
    if (isNaN(id)) {
        redisConnection.emit(failedEventName, {
            requestId: requestId,
            data: {
                code: 400,
                message: "Invalid id."
            }
        });
    } else {
        let person = people.find(p => p.id === id);
        if (!person) {
            redisConnection.emit(failedEventName, {
                requestId: requestId,
                data: {
                    code: 404,
                    message: "Person not found."
                }
            });
        } else {
            redisConnection.emit(successEventName, {
                requestId: requestId,
                data: person
            });
        }
    }
};

let deletePerson = (message, channel) => {
    const { requestId, successEventName, failedEventName, data } = message;

    let id = parseInt(data.id);
    if (isNaN(id)) {
        redisConnection.emit(failedEventName, {
            requestId: requestId,
            data: {
                code: 400,
                message: "Invalid id."
            }
        });
    } else {
        let person = people.findIndex(p => p.id === id);
        if (person < 0) {
            redisConnection.emit(failedEventName, {
                requestId: requestId,
                data: {
                    code: 404,
                    message: "Person not found."
                }
            });
        } else {
            let deleted = people.splice(person, 1);
            if (deleted.length === 0) {
                console.log("Something went wrong, this should not happen!!");
                redisConnection.emit(failedEventName, {
                    requestId: requestId,
                    data: {
                        code: 500,
                        message: "Failed to delete."
                    }
                });
            } else {
                redisConnection.emit(successEventName, {
                    requestId: requestId,
                    data: `Person with id=${id} deleted successfully.`
                });
            }
        }
    }
};

let addPerson = (message, channel) => {};

let updatePerson = (message, channel) => {};

response.then(r => {
    people = r.data;
    console.log("Data Loaded!");

    redisConnection.on("get-person:request:*", getPerson);
    redisConnection.on("delete-person:request:*", deletePerson);
    redisConnection.on("add-person:request:*", addPerson);
    redisConnection.on("update-person:request:*", updatePerson);
});
