const connection = require('./config');

// basic test to see if db connection is working
const query = connection.queryAsync('SELECT 1 + 1 AS solution')
  .then(results => console.log('DB is up, 1 + 1 =', results[0].solution))
  .catch(e => console.error(e));

module.exports = query;
