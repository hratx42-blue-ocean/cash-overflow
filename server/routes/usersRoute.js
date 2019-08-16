const router = require('express').Router();
const db = require('../../db/queries.js');

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

  db.getUserDataByUserID(userid).then(userData => {
    console.log('UserID is:', userid);
    res.send(userData);
  });
});

router.post('/upsertData', (req, res) => {
  db.upsertUserData(req.body.userUpdate).then(() => {
    res.send('user updated!');
  });
});

// below route will seed DB with 10 fake users

// router.post('/seedData', (req, res) => {
//   db.seedFakeUserData(10).then(() => {
//     res.send('users seeded!');
//   });
// });

module.exports = router;
