require('dotenv').config();
const path = require('path');
const logger = require('morgan');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const { usersRoute } = require('./routes');
const db = require('./db/model');

const { SERVER_PORT } = process.env;
const app = express();

app.use(logger('dev'));
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));

app.use('/api/users', usersRoute);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(SERVER_PORT, () =>
  console.log(`Server is running on ${SERVER_PORT}`)
);

module.exports = app;
