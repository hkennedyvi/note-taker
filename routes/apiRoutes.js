// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

    app.get('/api/notes', (req, res) => {
        res.json(notes);
    });

    app.get('/api/notes/:id', (req, res) => {
        const note = notes.find(c => c.id === parseInt(req.params.id));
        if (!note) res.status(404).send("The note with the given ID not found");
        res.json(note);
    });

};