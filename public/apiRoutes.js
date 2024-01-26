const fs = require("node.fs");
var notesData = require("../db/db.json");

function getNotes() {
  let data = fs.readFileSync("../db/db.json", "utf8");

    let notes = JSON.parse(data);

    for (let i = 0; i < notes.length; i++) {
      notes[i].id = "" + i;
    }

    return notes;
}

module.exports = function(app) {
    
//get
  app.get("/notes", function(req, res) {
    notesData = getNotes();
    res.json(notesData);
  });
//post
  app.post("api/notes", function(req, res) {
    notesData.push(req.body);
    fs.writeFileSync("../db/db.json", JSON.stringify(notesData));
    res.json(true);
  });
//delete
  app.delete("/notes/:id", function(req, res) {
        let id = req.params.id;
        notesData.splice(id, 1);
        fs.writeFileSync("../db/db.json", JSON.stringify(notesData));
        res.json(true);
    });
    let note = notesData.filter(function(note) {
      return note.id === req.params.id;
    })[0];

    console.log(note);
    const index = notesData.indexOf(note);

    notesData.splice(index, 1);

    fs.writeFileSync("../db/db.json", JSON.stringify(notesData));
    res.json(true);
};