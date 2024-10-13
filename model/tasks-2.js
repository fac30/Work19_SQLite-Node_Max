const db = require("../database/db.js");

const insert_task = db.prepare(`
    INSERT INTO tasks (content)
    VALUES (?)
    RETURNING id, content, created_at
`);
  
function createTask(content) {
    return insert_task.get(content);
}

// ...
createTask("Eat a banana");
const tasks = db.prepare("SELECT * FROM tasks").all();
console.log(tasks);
const result = createTask("Send mum flowers");
console.log(result);

module.exports = { createTask };