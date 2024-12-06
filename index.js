
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
    const coll = client.db("sample_guides").collection("comets");
   // update code goes here
    const filter = {};
    const updateDoc = {
      $mul: {
        radius: 1.60934,
      },
    };
    const result = await coll.updateMany(filter, updateDoc);
    // display the results of your operation
    console.log("Number of documents updated: " + result.modifiedCount);


  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
