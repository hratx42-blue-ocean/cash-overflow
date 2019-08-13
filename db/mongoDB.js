const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dataSeeder = require('./dataSeeder.js');
const URI = require('../server/config.js');

const options = {
  useNewUrlParser: true
};

const databases = {};

function connect(uri, database) {
  return MongoClient.connect(uri, options).then(client => client.db(database));
}

async function initializeDatabases() {
  const greenOcean = await connect(
    URI,
    'greenocean'
  );
  databases.greenOcean = greenOcean;
}

function getUserDatabase() {
  return databases.greenOcean;
}
console.log(URI);

const getUserData = async userEmail => {
  try {
    console.log(databases);
    const collection = await getUserDatabase().collection('userData');
    const userData = await collection
      .find({ email: userEmail })
      .limit(1)
      .toArray();
    assert.equal(1, userData.length);
    console.log(userData);
    return userData;
  } catch (err) {
    console.log(err);
  }
};

// below functions are used for seeding DB with 5 fake users and testing schema enforecement

const seedFakeUserData = async () => {
  try {
    await client.connect();
    const collection = await client.db('greenOcean').collection('userData');
    const bulk = collection.initializeUnorderedBulkOp();
    for (let i = 0; i < 5; i++) {
      const fakeUserData = dataSeeder.createData();
      bulk.insert(fakeUserData);
    }
    await bulk.execute();
  } finally {
    client.close();
  }
};

const testSchema = async () => {
  const fakeFella = dataSeeder.createData();
  console.log(fakeFella.budgetCategories[0].allotment);

  // uncomment line below to test schema enforcement (should fail when uncommented)
  // fake.middleName = 'ron';

  try {
    await client.connect();
    const collection = await client.db('greenOcean').collection('userData');
    await collection.insertOne(fakeFella);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

getUserData('Webster21@gmail.com');
// seedFakeUserData();
// testSchema();

module.exports = { getUserData, getUserDatabase, initializeDatabases };
