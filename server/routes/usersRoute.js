const router = require('express').Router();
const db = require('../db/config');

// middleware below should sanitize to prevent basic table-drop attempts and shenanigans

router.use('/getData', (req, res, next) => {
  req.query.userid = req.query.userid.replace(/[\\/: +]/g, '');
  console.log('User ID received as:', req.query.userid);
  next();
});

router.get('/getData', (req, res) => {
  const { query } = req;
  const { userid } = query;

  console.log('Query received as:', req.query);
  if (userid) {
    db.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results[0].solution);
    });
  } else {
    const userData = [];
    res.send(userData);
  }
});

// below route will seed DB with 10 fake users

// router.post('/seedData', (req, res) => {
//   db.seedFakeUserData(10).then(() => {
//     res.send('users seeded!');
//   });
// });

module.exports = router;
