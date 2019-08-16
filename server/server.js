const path = require('path');
const logger = require('morgan');
const express = require('express');
const compression = require('compression');
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));

// You can place your routes here, feel free to refactor
const { usersRoute } = require('./routes');

app.use('/api/users', usersRoute);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'), (err) => {
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

module.exports = app;
