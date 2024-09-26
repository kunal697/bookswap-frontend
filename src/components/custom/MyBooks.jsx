import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import axios from "axios";
import EditButton from "./EditButton";

function MyBooks() {
  const [ownedBooks, setOwnedBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/books/owned`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("My books: ", response.data);
        setOwnedBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the state to remove the deleted book
      setOwnedBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEdit = (bookId, updatedData) => {
    setOwnedBooks((prevBooks) =>
      prevBooks.map((book) =>
        book._id === bookId ? { ...book, ...updatedData } : book
      )
    );
  };

  const renderBookCard = (book) => {
    return (
      <Card
        key={book._id}
        className='flex flex-col h-full overflow-hidden shadow-sm hover:scale-105 transition-all duration-500'
      >
        <CardHeader className='p-4'>
          <img
            src={book.imageUrl}
            alt={`Cover of ${book.title}`}
            className='w-full h-48 object-cover rounded-md'
          />
        </CardHeader>
        <CardContent className='flex-grow p-4'>
          <CardTitle className='text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200'>
            {book.title}
          </CardTitle>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            by {book.author}
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
            Genre: {book.genre}
          </p>
        </CardContent>
        <CardFooter className='p-4 flex justify-between items-center'>
          <EditButton book={book} onEdit={handleEdit} />
          <Button
            className='bg-destructive hover:bg-red-600 text-white transition-colors duration-200'
            onClick={() => handleDelete(book._id)}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {ownedBooks.map((book) => renderBookCard(book))}
    </div>
  );
}

export default MyBooks;
