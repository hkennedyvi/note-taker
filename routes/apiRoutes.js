const path = require("path");
const fs = require("fs");
let notes = [];
let notesDB = fs.readFileSync("./db/db.json");

module.exports = function (app) {

    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    app.get('/api/notes/:id', (req, res) => {
        const note = notes.find(c => c.id === parseInt(req.params.id));
        if (!note) res.status(404).send("The note with the given ID not found");
        res.send(note);
    });

    app.post('/api/notes', (req, res) => {

        let notesArray = [];

        const notesDB = fs.readFileSync("./db/db.json");

        if (notesDB.length > 0) {
            notesArray = JSON.parse(notesDB);
        };

        const newNote = {
            id: notesArray.length + 1,
            title: req.body.title,
            text: req.body.text
        };
        notesArray.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(notesArray), () => {
            console.log("Note Written");
        })
        res.json(newNote);
    });

    app.delete('/api/notes/:id', (req, res) => {
       
        const removeNote = req.params.id - 1;

        const newNotes = [];

        let notesDB = fs.readFileSync(("./db/db.json"));

        notesDB = JSON.parse(notesDB);

        notesDB.splice(removeNote, 1);

        for (let i = 0; i < notesDB.length; i++) {
            notesDB[i].id = i + 1;
            newNotes.push(notesDB[i]);
        };

        fs.writeFile("./db/db.json", JSON.stringify(newNotes), () => {
            console.log("Deleted Note");
          });

        res.json(newNotes);

    });

};