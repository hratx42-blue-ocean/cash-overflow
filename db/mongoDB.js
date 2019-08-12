const MongoClient = require('mongodb').MongoClient;
const uri =
  'mongodb+srv://greenoceanatx:hackatx42@greenocean-naa2k.gcp.mongodb.net/greenOcean?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db('greenOcean').collection('userData');
  // perform actions on the collection object
  const cursor = collection.find({});
  console.log(cursor);
  console.log(err);
  client.close();
});
