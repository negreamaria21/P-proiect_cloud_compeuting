import BookForm from "../components/BookForm";
import axios from "axios";
import { useRouter } from "next/router";

export default function AddBook() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    await axios.post("/api/books", data);
    router.push("/");
  };

  return (
    <div className="p-4 bg-pink-50 min-h-screen">
      <h1 className="text-2xl font-bold text-pink-700 mb-4">Adaugă o carte nouă</h1>
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
}