const router = require("express").Router();
// const fs = require("fs");
// const notesData = require("../db/db.json");
const { v4: uuidv4 } = require('uuid')
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// router.use("express".json());
// localhost:3001/api/notes 
router.get("/notes", (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post("/notes", (req, res) => {
  const {title, text} = req.body;

  if (title && text) {
    const newNote = {
        title,
        text,
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