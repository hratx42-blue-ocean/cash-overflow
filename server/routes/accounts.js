const router = require('express').Router();
const { accounts } = require('../db/model');

router.use('/', (req, res, next) => {
  req.query.id = req.query.id.replace(/[\\/: +]/g, '');
  console.log('User ID received as:', req.query.id);
  next();
});

router.get('/', (req, res) => {
  const { id } = req.query;

  console.log('Query received as:', req.query);
  if (id) {
    accounts
      .byUserId(id)
      .then(accnts => res.send(accnts))
      .catch(console.error);
  } else {
    res.send();
  }
});

module.exports = router;
