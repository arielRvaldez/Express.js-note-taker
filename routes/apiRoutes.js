const router = require("express").Router();
// const fs = require("fs");
const noteData = require("../db/db.json");
const { v4: uuidv4 } = require('uuid')
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// router.use("express".json());
// localhost:3001/api/notes 
router.get("/notes", (req, res) => {
  readFromFile('./db/db.json').then((noteData) => res.json(JSON.parse(noteData)));
});

router.post("/notes", (req, res) => {
  const {noteTitle, noteText} = req.body;

  if (noteTitle && noteText) {
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
  // console.log(req.body);

  // const isValid = req.body?.isValid;
  // const errors = req.body?.errors;

  // const payload = {
  //   time: Date.now(),
  //   error_id: uuidv4(),
  //   text: req.body.text,
  //   title: req.body.title,
  //   errors,
  // };

  // if (!isValid) {
  //   readAndAppend(payload, './db/db.json');
  //   res.json('Note added');
  // } else {
  //   res.json({
  //     message: 'Object is valid, not logging. Check front end implementation',
  //     error_id: payload.error_id
  //   });
  // }});

module.exports = router;