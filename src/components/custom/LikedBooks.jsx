import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "../ui/card"; // Replace with your actual component library
import { Button } from "../ui/button";
import WantedBookButton from "./WishListButton"; // Assuming this is the component you provided earlier

const LikedBooks = () => {
  const [wishlistBooks, setWishlistBooks] = useState([]);

  const fetchWishlistBooks = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/books/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWishlistBooks(response.data.wishlist);
    } catch (error) {
      console.error("Error fetching wishlist books:", error);
    }
  }, []);

  useEffect(() => {
    fetchWishlistBooks();
  }, [fetchWishlistBooks]);

  const renderBookCard = useCallback(
    (book) => (
      <Card
        key={book._id}
        className='flex flex-col h-full overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 hover:scale-105'
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
            Owner: {book.owner.username}
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
            Genre: {book.genre}
          </p>
        </CardContent>
        <CardFooter className='p-4 flex justify-between items-center'>
          <WantedBookButton bookId={book._id} />
          <Button className='bg-primary hover:bg-primary-hover text-white transition-colors duration-200'>
            Request
          </Button>
        </CardFooter>
      </Card>
    ),
    []
  );

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {wishlistBooks.map((book) => renderBookCard(book))}
    </div>
  );
};

export default LikedBooks;
