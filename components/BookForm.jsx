import { useState } from "react";
import axios from "axios";

export default function BookForm({ onSubmit, entry = {}  }) {
  const [title, setTitle] = useState(entry?.title || '');
  const [author, setAuthor] = useState(entry?.author || '');
  const [genre, setGenre] = useState(entry?.genre || '');
  const [readDate, setReadDate] = useState(entry?.readDate || '');
  const [rating, setRating] = useState(entry?.rating || 3);
  const [comment, setComment] = useState(entry?.comment || '');
  const [cover, setCover] = useState(entry?.cover || '');

  const fetchBookDetails = async (bookTitle) => {
    try {
      const res = await axios.get(`https://openlibrary.org/search.json?title=${bookTitle}`);
      const book = res.data.docs.find(b =>
        b.title.toLowerCase() === bookTitle.toLowerCase()
      );
      if (book) {
        if (book.cover_i) {
          setCover(`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`);
        }
      }
    } catch (err) {
      console.error("Eroare la căutarea cărții:", err);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ title, author, genre, readDate, rating, comment, cover });
      }}
      className="flex flex-col gap-4 max-w-md mx-auto p-4 bg-pink-100 rounded-xl"
    >
      <label className="text-pink-900 font-semibold">Titlu</label>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (e.target.value.length > 3) {
            fetchBookDetails(e.target.value);
          }
        }}
        className="p-2 rounded border border-pink-300"
        required
      />

      <label className="text-pink-900 font-semibold">Autor</label>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="p-2 rounded border border-pink-300"
        required
      />

      <label className="text-pink-900 font-semibold">Gen</label>
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="p-2 rounded border border-pink-300"
      />

      <label className="text-pink-900 font-semibold">Data citire</label>
      <input
        type="date"
        value={readDate}
        onChange={(e) => setReadDate(e.target.value)}
        className="p-2 rounded border border-pink-300"
      />

      <label className="text-pink-900 font-semibold">Rating (1–5)</label>
      <input
        type="number"
        value={rating}
        min={1}
        max={5}
        onChange={(e) => setRating(parseInt(e.target.value))}
        className="p-2 rounded border border-pink-300"
      />

      <label className="text-pink-900 font-semibold">Comentariu</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="p-2 rounded border border-pink-300"
      />

      {cover && (
        <div className="flex justify-center">
          <img src={cover} alt="Coperta" className="h-40 rounded mt-4 shadow-md" />
        </div>
      )}

      <button
        type="submit"
        className="bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
      >
        Salveaza cartea
      </button>
    </form>
  );
}
