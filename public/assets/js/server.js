const express = require('express');
const fs = require('node.fs');
const api = require('./js/index.js');
const uuid = require('uuid');

// Generate a random UUID
const randomUuid = uuid.v4();

// Print the result
console.log('Random UUID:', randomUuid);

const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
const app = express.json();

app.use('/api', api);

app.use(express.static(__dirname,'../public/assets'));

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);