const sqlite3 = require("sqlite3").verbose();

// skapa databas
const db = new sqlite3.Database("./db/course.db");

// skapa tabell (id, coursename, coursecode, syllabus och progression och timestamp)
db.serialize(() => {
    db.run("DROP TABLE IF EXISTS courses");

    db.run(`
     CREATE TABLE courses (
        id integer primary key autoincrement,
        coursename text not null,
        coursecode text not null,
        syllabus text not null,
        progression text not null,
        posted timestamp default current_timestamp not null
     );
    `);
});

db.close();