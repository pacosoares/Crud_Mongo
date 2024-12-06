
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri=process.env.MONGOURI;
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
    const coll = client.db("sample_guides").collection("planets");
    // find code using AND < 15 and >-100
    const cursor = coll.find({
      $and: [{ orderFromSun: { $gt: 2 } }, { orderFromSun: { $lt: 5 } }],
    });
    // iterate code goes here
    await cursor.forEach(console.log);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
