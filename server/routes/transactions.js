const router = require('express').Router();
const { transactions } = require('../db/model');

router.use('/', (req, res, next) => {
  req.query.userid = req.query.userid.replace(/[\\/: +]/g, '');
  console.log('User ID received as:', req.query.userid);
  next();
});

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

module.exports = router;
