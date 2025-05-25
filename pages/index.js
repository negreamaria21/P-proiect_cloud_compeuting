import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("/api/books").then((res) => setBooks(res.data));
  }, []);

  return (
    <div className="p-4 bg-pink-50 min-h-screen">
      <h1 className="text-3xl font-bold text-pink-700 text-center mb-4">My BookShelf</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
          {book.cover && (
            <img src={book.cover} alt="Copertă" className="h-48 w-full object-contain mb-4 rounded" />
          )}
          <h2 className="text-lg font-bold text-pink-700">{book.title}</h2>
          <p className="text-pink-600 italic">{book.author}</p>
          {book.genre && <p className="text-sm text-gray-700">Gen: {book.genre}</p>}
          {book.readDate && <p className="text-sm text-gray-700">Citită pe: {book.readDate}</p>}
          {book.rating && <p className="text-sm text-gray-700">Rating: {book.rating}/5</p>}
          {book.comment && <p className="text-sm text-gray-600 mt-2 italic">"{book.comment}"</p>}
        </div>
        ))}
        </div>
        <a href="/add" className="block text-center text-pink-600 font-semibold underline mb-6 hover:text-pink-800">
          + Adaugă o carte nouă
        </a>
    </div>
    
  );
}