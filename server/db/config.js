const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'cash_overflow'
});

connection.connect();

module.exports = connection;
