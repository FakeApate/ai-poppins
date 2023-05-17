import { MongoClient, ServerApiVersion } from "mongodb";
console.log(process.cwd());
const credentials = "X509-cert-7100741271835394770.pem";
const client = new MongoClient(
  "mongodb+srv://aipoppins.1svygtu.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority",
  {
    sslKey: credentials,
    sslCert: credentials,
    serverApi: ServerApiVersion.v1,
  }
);

async function readRandom(): Promise<
  | import('bson').Document
  | null
> {
  try {
    await client.connect();
    const database = client.db("aipoppins_mock");
    const collection = database.collection("mock_data");
    var doc = await collection.aggregate([{ $sample: { size: 1 } }]).next();
    return doc;
  } finally {
    // Ensures that the client will close when you finish/error
    client.close().then();
  }
}

export { readRandom };
