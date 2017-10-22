const fs = require("fs");

let fileContent = fs.readFileSync("data/lab5.json");
const people = JSON.parse(fileContent);

let exportedFunctions = {
  getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let pid = +id;
        let person = people.find(p => p.id === pid);
        if (person) {
          resolve(person);
        } else {
          reject("Not Found");
        }
      }, 5000);
    });
  }
};

module.exports = exportedFunctions;
