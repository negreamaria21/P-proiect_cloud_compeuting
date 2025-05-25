import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState('');

  useEffect(() => {
    axios.get('/api/books').then((res) => setBooks(res.data));
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genreFilter ? book.genre === genreFilter : true;
    return matchesSearch && matchesGenre;
  });

  const genres = [...new Set(books.map((b) => b.genre).filter(Boolean))];

  return (
    <div className="p-4 bg-pink-50 min-h-screen">
      <h1 className="text-3xl font-bold text-pink-700 text-center mb-4">My BookShelf</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Caută după titlu sau autor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-pink-300 rounded w-full sm:w-1/3"
        />

        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="p-2 border border-pink-300 rounded w-full sm:w-1/4"
        >
          <option value="">Toate genurile</option>
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <Link
          href="/add"
          className="bg-pink-600 text-white text-center px-4 py-2 rounded shadow hover:bg-pink-700 transition w-full sm:w-auto"
        >
          + Adauga o carte noua
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div key={book._id} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
            {book.cover && (
              <img src={book.cover} alt="Copertă" className="h-48 w-full object-contain mb-4 rounded" />
            )}
            <h2 className="text-lg font-bold text-pink-700">{book.title}</h2>
            <p className="text-pink-600 italic">{book.author}</p>
            {book.genre && <p className="text-sm text-gray-700">Gen: {book.genre}</p>}
            {book.readDate && <p className="text-sm text-gray-700">Citita pe: {book.readDate}</p>}
            {book.rating && <p className="text-sm text-gray-700">Rating: {book.rating}/5</p>}
            {book.comment && <p className="text-sm text-gray-600 mt-2 italic">&quot;{book.comment}&quot;</p>}

            <div className="flex justify-between mt-4">
              <Link href={`/edit?id=${book._id}`} className="text-sm text-pink-600 underline hover:text-pink-800">
                Editeaza
              </Link>
              <button
                onClick={async () => {
                  const confirmDelete = window.confirm(`Sigur vrei sa stergi cartea "${book.title}"?`);
                  if (!confirmDelete) return;

                  await axios.delete(`/api/books?id=${book._id}`);
                  setBooks(books.filter((b) => b._id !== book._id));
                }}
                className="text-sm text-pink-600 underline hover:text-red-700"
              >
                Sterge
              </button>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}
