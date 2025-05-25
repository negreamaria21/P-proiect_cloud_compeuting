import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    try {
      const { database } = await connectToDatabase();
  
      if (req.method === "GET") {
        const books = await database.collection("books").find({}).sort({ createdAt: -1 }).toArray();
        return res.status(200).json(books);
      }
  
      if (req.method === "POST") {
        const book = { ...req.body, createdAt: new Date() };
        await database.collection("books").insertOne(book);
        return res.status(201).json({ message: "Carte salvată cu succes!" });
      }
  
      return res.status(405).json({ message: "Method not allowed" });
    } catch (err) {
      console.error("EROARE API:", err);
      return res.status(500).json({ message: err.message });
    }
  }
