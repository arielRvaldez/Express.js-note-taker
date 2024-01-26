const express = require('express');
const fs = require('fs');
const api = require('./js/index.js');
const uuid = require('uuid');
const path = require('path');

const app = express();

// Generate a random UUID
const randomUuid = uuid.v4();

// Print the result
console.log('Random UUID:', randomUuid);

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname,'../public/assets')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', api);

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);