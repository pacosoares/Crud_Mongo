
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGOURI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // database and collection code goes here
    const coll = client.db("sample_guides").collection("comets");
    // filter to delete
    const doc = {
      orbitalPeriod: {
        $gt: 5,
        $lt: 85
      }
    };
    const result = await coll.deleteMany(doc);
    // amount deleted code 
    console.log("Number of documents deleted: " + result.deletedCount);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
