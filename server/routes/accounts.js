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

router.post('/', (req, res) => {
  const { name, balance, type, user } = req.body.account;
  accounts
    .post(name, balance, type, user)
    .then(ok => res.send(ok))
    .catch(console.error);
});

router.get('/types', (req, res) => {
  accounts
    .types()
    .then(types => res.send(types))
    .catch(console.error);
});

module.exports = router;
