const router = require('express').Router();
const db = require('../../db/queries.js');

//middleware below should sanitize to prevent basic table-drop attempts and shenanigans

router.use('/getData', (req, res, next) => {
  req.query.user = req.query.user.replace(/[\\/: +]/g, '');
  console.log(req.query.user);
  next();
});

router.get('/getData', (req, res) => {
  const userEmail = req.query.user;
  db.getUserData(userEmail).then(userData => {
    console.log('User email is: ', userEmail);
    res.send(userData);
  });
});

router.post('/upsertData', (req, res) => {
  db.upsertUserData(req.body.userUpdate).then(() => {
    res.send('user updated!');
  });
});

module.exports = router;
