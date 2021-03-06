'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('note:server');

const listRouter = require('./route/list-route.js');
const noteRouter = require('./route/note-route.js');
const errors = require('./lib/error-middleware.js');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost/listofnotes';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));

app.use(listRouter);
app.use(noteRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(`listening on ${PORT}`);
});
