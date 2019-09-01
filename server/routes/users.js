const router = require('express').Router();
const { users } = require('../db/model');

// middleware below should sanitize to prevent basic table-drop attempts and shenanigans

router.use('/', (req, res, next) => {
  req.query.id = req.query.id.replace(/[\\/: +]/g, '');
  console.log('User ID received as:', req.query.id);
  next();
});

router.get('/', (req, res) => {
  const { id } = req.query;

  console.log('Query received as:', req.query);
  if (id) {
    users
      .byEmail(id)
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
