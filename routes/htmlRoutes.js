const path = require("path");
const html = require("express").Router();
const fs = require("fs");
const notesData = require("../db/db.json");
const { v4: uuidv4 } = require('uuid')
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

html.get("/", (req, res) => {
    readFromFile('./db/feedback.json').then((data) => res.json(JSON.parse(data)))
});
//here//

html.post('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
    console.log("'getting' index.html");
});


module.exports = router