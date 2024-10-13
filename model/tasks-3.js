const db = require("../database/db.js");

// CREATE
const insert_task = db.prepare(/*sql*/ `
    INSERT INTO tasks (content, complete)
    VALUES ($content, $complete)
    RETURNING id, content, created_at
`);

function createTask(task) {
    return insert_task.get(task);
}

// SELECT
const select_tasks = db.prepare(/*sql*/ `
    SELECT
      id,
      content,
      TIME(created_at) AS created_at,
      complete
    FROM tasks
`);

console.log(select_tasks);

// LIST
function listTasks() {
    return select_tasks.all();
}

// DELETE
const delete_task = db.prepare(/*sql*/ `
    DELETE FROM tasks WHERE id = ?
`);

function removeTask(id) {
    delete_task.run(id);
}

// UPDATE
const update_content = db.prepare(/*sql*/ `
    UPDATE tasks
    SET content = $content
    WHERE id = $id
    RETURNING id, content, created_at, complete
`);

function editTask(task) {
    return update_content.get(task);
}

// ...
createTask({ content: "Eat a banana", complete: 0 });
const tasks = db.prepare(/*sql*/ `SELECT * FROM tasks`).get();
console.log(tasks);
const result = createTask({ content: "Send mum flowers", complete: 0 });
console.log(result);

//..
removeTask(1);
listTasks();

module.exports = { createTask, removeTask, listTasks, editTask };