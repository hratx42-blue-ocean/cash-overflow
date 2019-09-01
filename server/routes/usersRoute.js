const router = require('express').Router();
const { users } = require('../db/model');

// middleware below should sanitize to prevent basic table-drop attempts and shenanigans

router.use('/getData', (req, res, next) => {
  req.query.userid = req.query.userid.replace(/[\\/: +]/g, '');
  console.log('User ID received as:', req.query.userid);
  next();
});

router.get('/getData', (req, res) => {
  const { userid } = req.query;

  console.log('Query received as:', req.query);
  if (userid) {
    users
      .byEmail(userid)
      .then(user => res.send(user))
      .catch(console.error);
  } else {
    res.send();
  }
});

// below route will seed DB with 10 fake users

// router.post('/seedData', (req, res) => {
//   db.seedFakeUserData(10).then(() => {
//     res.send('users seeded!');
//   });
// });

module.exports = router;
