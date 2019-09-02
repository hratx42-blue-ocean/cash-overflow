const router = require('express').Router();
const { accounts } = require('../db/model');

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

router.get('/types', (req, res) => {
  console.log('at /types');
  accounts
    .types()
    .then(types => res.send(types))
    .catch(console.error);
});

module.exports = router;
