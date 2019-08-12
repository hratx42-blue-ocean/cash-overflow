const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const uri =
  'mongodb+srv://greenoceanatx:hackatx42@greenocean-naa2k.gcp.mongodb.net/greenOcean?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });

// client.connect(err => {
//   if (err) {
//     throw err;
//   } else {
//     const collection = client.db('greenOcean').collection('userData');
//     // perform actions on the collection object
//     const cursor = collection
//       .find({ name: 'testObject' })
//       .toArray((err, doc) => {
//         if (err) {
//           console.log(err);
//         } else {
//           assert.equal(null, err);
//           assert.equal(1, doc.length);
//           console.log(null, doc);
//         }
//       });
//     console.log(cursor);
//     client.close();
//   }
// });

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

getUserData('test@gmail.com');

module.exports = { getUserData };
