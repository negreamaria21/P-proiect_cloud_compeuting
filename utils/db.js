import { MongoClient } from "mongodb";

const uri = process.env.NEXT_ATLAS_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.NEXT_ATLAS_URI) {
  throw new Error("Please add your Mongo URI to .env");
}

if (!clientPromise) {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db("Proiect");
  return { db };
} 