const router = require('express').Router();
const { allotments } = require('../db/model');

// router.get('/', (req, res) => {
//   const { userid, year, month } = req.query;
//   if (userid && year && month) {
//     allotments
//       .byUserIdAndDate(userid, year, month)
//       .then(txs => res.send(txs))
//       .catch(console.error);
//   } else {
//     res.send();
//   }
// });

router.post('/', (req, res) => {
  const { userid, category, date, amount } = req.body.allotment;
  const dateCat = `${date}_${category}`;
  console.log(userid, category, date, amount, dateCat);
  allotments
    .post(userid, category, date, amount, dateCat)
    .then(ok => res.send(ok))
    .catch(console.error);
});

module.exports = router;
