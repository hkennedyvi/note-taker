const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3100;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const notes = [
    {id: 1, name: 'note1'},
    {id: 2, name: 'note2'},
    {id: 3, name: 'note3'}
];

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const note = notes.find(c => c.id === parseInt(req.params.id));
    if (!note) res.status(404).send("The note with the given ID not found");
    res.json(note);
});

app.post('/api/notes', (req, res) => {
    const newNote = {
        id: notes.length + 1,
        name: req.body.name,
    };
    notes.push(newNote);
    res.send(newNote);
});

//Update
app.put('/api/notes/:id', (req, res) => {
    //Look up the note
    //If not existing, return 404
    const note = notes.find(c => c.id === parseInt(req.params.id));
    if (!note) res.status(404).send("The note with the given ID not found");

res.send(note);

});

app.delete('/api/notes/:id', (req, res) => {
    //Look up the note
    //Not existing, send error
    const note = notes.find(c => c.id === parseInt(req.params.id));
    if (!note) res.status(404).send("The note with the given ID not found");

    //Delete
    const index = notes.indexOf(note);
    notes.splice(index, 1);

    //Return response
    res.send(note);

});



app.listen(port, () => console.log(`Listening on ${port}`));

