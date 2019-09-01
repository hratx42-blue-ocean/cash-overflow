const router = require('express').Router();
const { categories } = require('../db/model');

router.use('/', (req, res, next) => {
  req.query.id = req.query.id.replace(/[\\/: +]/g, '');
  console.log('User ID received as:', req.query.id);
  next();
});

router.get('/', (req, res) => {
  const { id } = req.query;

  console.log('Query received as:', req.query);
  if (id) {
    categories
      .byUserId(id)
      .then(cats => res.send(cats))
      .catch(console.error);
  } else {
    res.send();
  }
});

module.exports = router;
