const MongoClient = require('mongodb').MongoClient;
const { URI } = require('../server/config.js');
const options = {
  useNewUrlParser: true
};

const databases = {};

async function connect(uri, database) {
  const client = await MongoClient.connect(uri, options);
  return client.db(database);
}

async function initializeDatabases() {
  const greenOcean = await connect(
    URI,
    'greenOcean'
  );
  databases.greenOcean = greenOcean;
}

function getUserDatabase() {
  return databases.greenOcean;
}

module.exports = { getUserDatabase, initializeDatabases };
