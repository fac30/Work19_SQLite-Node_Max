// EXERCISE 1

const Database = require("better-sqlite3");

const db = new Database("db.sqlite");
const select_date = db.prepare("SELECT DATE()");
const result = select_date.get();
console.log(result);
console.log(db);
