const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
require('dotenv').config();
const dataSeeder = require('./dataSeeder.js');

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@greenocean-naa2k.gcp.mongodb.net/greenOcean?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

const getUserData = async userEmail => {
  try {
    await client.connect();
    const collection = await client.db('greenOcean').collection('userData');
    const userData = await collection
      .find({ email: userEmail })
      .limit(1)
      .toArray();
    assert.equal(1, userData.length);
    console.log(userData);
    return userData;
  } finally {
    client.close();
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

// getUserData('Webster21@gmail.com');
// seedFakeUserData();
// testSchema();

module.exports = { getUserData };
