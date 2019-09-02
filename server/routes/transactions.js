const router = require('express').Router();
const { transactions } = require('../db/model');

router.get('/', (req, res) => {
  const { userid, year, month } = req.query;

  console.log('Query received as:', req.query);
  if (userid && year && month) {
    transactions
      .byUserIdAndDate(userid, year, month)
      .then(txs => res.send(txs))
      .catch(console.error);
  } else {
    res.send();
  }
});

router.post('/', (req, res) => {
  console.log('Body received as:', req.body);
  const {
    account,
    amount,
    category,
    date,
    memo,
    recurring,
    type,
    user
  } = req.body.transaction;

  transactions
    .post(account, amount, category, date, memo, recurring, type, user)
    .then(ok => res.send(ok))
    .catch(console.error);
});

module.exports = router;
