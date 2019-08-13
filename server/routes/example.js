const router = require('express').Router();
const db = require('../../db/queries.js');

router.get('/', (req, res) => {
  db.getUserData('Macey30@gmail.com').then(user => {
    console.log('User is: ', user);
    res.send(user);
  });
});

module.exports = router;
