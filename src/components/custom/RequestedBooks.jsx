import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardFooter,
  CardHeader,
} from "../ui/card";
import axios from "axios";

function RequestedBooks() {
  const [requestedBooks, setRequestedBooks] = useState([]);

  useEffect(() => {
    const fetchRequestedBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/exchange/outgoing`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRequestedBooks(response.data);
      } catch (error) {
        console.error("Error fetching requested books:", error);
      }
    };

    fetchRequestedBooks();
  }, []);

  const capitalizeFirstWord = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderRequestedBookCard = (book) => {
    let statusColor = "bg-yellow-400";
    if (book.status === "rejected") {
      statusColor = "bg-red-500";
    } else if (book.status === "success") {
      statusColor = "bg-green-500";
    }

    const capitalizedStatus = capitalizeFirstWord(book.status);

    return (
      <Card
        key={book._id}
        className='flex flex-col h-full overflow-hidden shadow-sm hover:scale-105 transition-all duration-500'
      >
        <CardHeader className='p-4'>
          <img
            src={book.book.imageUrl}
            alt={`Cover of ${book.book.title}`}
            className='w-full h-48 object-cover rounded-md'
          />
        </CardHeader>
        <CardContent className='flex-grow p-4'>
          <CardTitle className='text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200'>
            {book.book.title}
          </CardTitle>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            by {book.book.author}
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
            Genre: {book.book.genre}
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
            Owner: {book.toUser.username}
          </p>
        </CardContent>
        <CardFooter className='p-4 flex justify-between items-center'>
          <div
            className={`${statusColor} hover:${statusColor} p-2 text-lg rounded-xl w-full text-center`}
          >
            {capitalizedStatus}
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {requestedBooks.map((book) => renderRequestedBookCard(book))}
    </div>
  );
}

export default RequestedBooks;
