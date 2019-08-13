const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const express = require('express');
const app = express();

// auth imports
const SESSION_SECRET = require('./config.js');
const expressSession = require('express-session');
const session = {
  secret: SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false
};

// open up CORS
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Logging and other Utilities
app.use(logger('dev'));

app.use(
  bodyParser.json({
    strict: false
  })
);

// Static file serving
app.use(express.static(path.join(__dirname, '../client/public')));

// Routes

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
