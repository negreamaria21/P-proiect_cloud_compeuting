import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { database } = await connectToDatabase();

  if (req.method === 'GET') {
    const books = await database.collection('books').find({}).toArray();
    return res.status(200).json(books);
  }

  if (req.method === 'POST') {
    const newBook = { ...req.body, createdAt: new Date() };
    await database.collection('books').insertOne(newBook);
    return res.status(201).json({ message: 'Carte adaugata cu succes' });
  }

  if (req.method === 'PUT') {
    const { _id, ...rest } = req.body;
    await database.collection('books').updateOne(
      { _id: new ObjectId(_id) },
      { $set: rest }
    );
    return res.status(200).json({ message: 'Carte actualizata' });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    await database.collection('books').deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ message: 'Carte stearsa' });
  }

  return res.status(405).json({ message: 'Metoda refuzata' });
}
