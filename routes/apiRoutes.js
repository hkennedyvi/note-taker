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

        if (notesDB.length > 0) {
            notes = JSON.parse(notesDB);
        };

        const newNote = {
            id: notes.length + 1,
            title: req.body.title,
            text: req.body.text
        };
        notes.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(notes), () => {
            console.log("Note Written");
        })
        res.send(newNote);
    });

    app.delete('/api/notes/:id', (req, res) => {
       
        const removeNote = req.params.id - 1;

        notesDB = JSON.parse(notesDB);

        notesDB.splice(removeNote, 1);

        for (let i = 0; i < notesDB.length; i++) {
            notesDB[i].id = i + 1;
            notes.push(notesDB[i]);
        };

        fs.writeFile("./db/db.json", JSON.stringify(notes), () => {
            console.log("Deleted");
        });

        res.json(notes);

    });

};