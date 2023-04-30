import { MongoClient, ServerApiVersion } from "mongodb";

export const connectToMongo = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw Error("must have a MONGO_URI environment variable");
  }
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  return client.db("simple-todo-app");
};
