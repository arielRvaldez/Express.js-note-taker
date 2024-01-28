const router = require("express").Router();
// const fs = require("fs");
const notesData = require("../db/db.json");
const { v4: uuidv4 } = require('uuid')
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');


// localhost:3001/api/notes 
router.get("/notes", (req, res) => {
  readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data)));
  });

router.post("/notes", (req, res) => {
  console.log(req.body);

  const isValid = req.body?.isValid;
  const errors = req.body?.errors;

  const payload = {
    time: Date.now(),
    error_id: uuidv4(),
    errors,
  };

  if (!isValid) {
    readAndAppend(payload, './db/db.json');
    res.json('Note added');
  } else {
    res.json({
      message: 'Object is valid, not logging. Check front end implementation',
      error_id: payload.error_id,
    });
  }
  // notesData.push(payload);

  // fs.writeFileSync("../db/db.json", JSON.stringify(notesData));
  //   res.json(true);
});

module.exports = router;

//   app.delete("/notes/:id", function(req, res) {
//         let id = req.params.id;
//         fs.writeFileSync("../db/db.json", JSON.stringify(notesData));
//         res.json(true);

//         let note = notesData.filter(function(note) {
//           return note.id === req.params.id;
//         })[0];
    
//         console.log(note);
//         const index = notesData.indexOf(note);
    
//     //updates the note
//         fs.writeFileSync((path.join(__dirname,'../db/db.json'), JSON.stringify(notesData)));
//         res.json(true);
//     });
