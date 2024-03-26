const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();



// anslut till databas
const db = new sqlite3.Database("./db/course.db");

// inställningar
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Route
app.get("/", (req, res) => {
    //läs ut befintliga kurser
    db.all("SELECT * FROM courses;", (err, rows) => {
        if (err) {
            console.error(err.coursecode);
        }

        res.render("index", {
            error: "", 
            rows: rows
        });
    });
});


// skapa nytt inlägg
app.post("/", (req, res) => {
    let coursename = req.body.coursename;
    let coursecode = req.body.coursecode;
    let syllabus = req.body.syllabus;
    let progression = req.body.progression;
    let error = "";


    // kontrollera input
    if (coursename != "" && coursecode != "") {
        // korrekt - lagra i db
        const stmt = db.prepare("INSERT INTO courses(coursename, coursecode, syllabus, progression)VALUES(?,?,?,?);");
        stmt.run(coursename, coursecode, syllabus, progression);
        stmt.finalize();

    } else {
        error = "du måste fylla i namn och meddelande";
    }

    res.redirect("/");
});

// Starta
app.listen(port, () => {
    console.log("server started on port: " + port);
});
