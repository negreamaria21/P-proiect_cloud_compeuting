import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import BookForm from '../components/BookForm';

export default function EditBook() {
  const [bookData, setBookData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id || !router.isReady) return;

    axios.get('/api/books').then((res) => {
      const book = res.data.find((b) => b._id === id);
      if (book) setBookData(book);
    });
  }, [id, router.isReady]);

  const handleUpdate = async (updatedBook) => {
    await axios.put('/api/books', { ...updatedBook, _id: id });
    router.push('/');
  };

  if (!bookData) return <p className="text-center p-4">Se încarcă datele...</p>;

  return (
    <div className="p-4 bg-pink-50 min-h-screen">
      <h1 className="text-2xl font-bold text-pink-700 mb-4 text-center">Editează cartea</h1>
      <BookForm onSubmit={handleUpdate} entry={bookData} />
    </div>
  );
}
