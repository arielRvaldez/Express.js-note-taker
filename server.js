const express = require('express');
const fs = require('fs');
const api = require('./routes/apiRoutes');
const html = require('./routes/htmlRoutes')
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', api);
app.use('/', html);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);