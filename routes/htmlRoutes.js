const html = require("express").Router();
// const path = require("path");
const { v4: uuidv4 } = require('uuid')
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

router.get("*", (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

router.post('*', (req, res) => {
    const {noteTitle, noteText} = req.body;

    if (title && text) {
        const newNote = {
            noteTitle,
            noteText,
            note_id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };
    
        res.json(response);
    }   else {
        const response = {
            status: 'error',
            message: 'Title and text are required fields.',
        };
        //bad status code
        res.status(400).json(response);
    }
});

module.exports = html;