const html = require("express").Router();
const { v4: uuidv4 } = require('uuid')
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

html.get("*", (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

html.post('*', (req, res) => {
    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };
        readAndAppend(newNote, '.db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };
    
        res.json(response);
    }   else {
        res.json('Error in posting note');
    }
});

module.exports = html;