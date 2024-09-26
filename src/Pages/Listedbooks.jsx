import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddBooks from "@/components/custom/AddBooks";
import WantedBookButton from "@/components/custom/WishListButton";
import RequestButton from "@/components/custom/RequestButton";

const ListedBooks = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("all");
  const [matches, setMatches] = useState([]);
  const [activeTab, setActiveTab] = useState("listed");

  const genres = [
    "Fiction",
    "Sci-fi",
    "Horror",
    "Comedy",
    "Thriller",
    "Mystery",
    "Historic",
    "Life",
    "Novel",
    "Finance",
    "Romantic",
    "Adult",
    "Manga",
    "Comic",
    "Autobiography",
    "Poetry",
    "Children",
  ];

  const fetchBooks = useCallback(
    async (title = "", author = "", genre = "all") => {
      let url = new URL(`${import.meta.env.VITE_API_URL}/books/search`);

      if (title) {
        url.searchParams.append("name", title);
      }
      if (author) {
        url.searchParams.append("author", author);
      }
      if (genre !== "all") {
        url.searchParams.append("genre", genre);
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(url.toString(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data.books)) {
          setBooks(response.data.books);
        } else {
          setBooks([]);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },
    []
  );

  const fetchMatchedBooks = useCallback(
    async (title = "", author = "", genre = "all") => {
      let url = new URL(`${import.meta.env.VITE_API_URL}/books/matches`);

      if (title) {
        url.searchParams.append("title", title);
      }
      if (author) {
        url.searchParams.append("author", author);
      }
      if (genre !== "all") {
        url.searchParams.append("genre", genre);
      }

      console.log("Fetching matched books with URL:", url.toString());

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(url.toString(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setMatches(response.data);
        } else {
          setMatches([]);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },
    []
  );

  useEffect(() => {
    fetchBooks(title, author, genre);
    fetchMatchedBooks(title, author, genre);
  }, [title, author, genre, fetchBooks, fetchMatchedBooks]);

  const handleLike = useCallback(() => {
    fetchMatchedBooks(title, author, genre);
  }, [title, author, genre, fetchMatchedBooks]);

  const renderBookCard = (book) => (
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
          Owner: {book.owner.username}
        </p>
        <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
          Genre: {book.genre}
        </p>
      </CardContent>
      <CardFooter className='p-4 flex justify-between items-center'>
        <WantedBookButton bookId={book._id} onLike={handleLike} />
        <RequestButton bookId={book._id} toUserId={book.owner._id} />
      </CardFooter>
    </Card>
  );

  const renderMatchedBookCard = (book) => (
    <Card
      key={book.matchedBook.id}
      className='flex flex-col h-full overflow-hidden shadow-sm hover:scale-105 transition-all duration-500'
    >
      <CardHeader className='p-4'>
        <img
          src={book.matchedBook.imageUrl}
          alt={`Cover of ${book.matchedBook.title}`}
          className='w-full h-48 object-cover rounded-md'
        />
      </CardHeader>
      <CardContent className='flex-grow p-4'>
        <CardTitle className='text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200'>
          {book.matchedBook.title}
        </CardTitle>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          by {book.author}
        </p>
        <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
          Owner: {book.matchedUser}
        </p>
        <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
          Genre: {book.matchedBook.genre}
        </p>
      </CardContent>
      <CardFooter className='p-4 flex justify-between items-center'>
        <WantedBookButton bookId={book.matchedBook.id} onLike={handleLike} />
        <RequestButton bookId={book.matchedBook.id} toUserId={book._id} />
      </CardFooter>
    </Card>
  );

  return (
    <div className='flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900'>
      <header className='px-4 lg:px-6 h-16 flex items-center border-b bg-white dark:bg-gray-800 shadow-sm'>
        <Link className='flex items-center justify-center' to='/'>
          <div className='flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white'>
            <BookOpen className='h-6 w-6' />
          </div>
          <span className='ml-2 text-2xl font-bold text-primary'>BookSwap</span>
        </Link>
        <nav className='ml-auto flex gap-4 sm:gap-6'>
          <Link
            className='text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors'
            to='#'
          >
            My Books
          </Link>
          <Link
            className='text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors'
            to='/profile'
          >
            Profile
          </Link>
        </nav>
      </header>
      <main className='flex-1 py-12 px-4 md:px-6 lg:px-8'>
        <h1 className='text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100'>
          My Books
        </h1>
        <Tabs defaultValue='listed' className='w-full max-w-4xl mx-auto'>
          <TabsList className='grid w-full grid-cols-2 mb-8'>
            <TabsTrigger value='listed' onClick={() => setActiveTab("listed")}>
              Listed Books
            </TabsTrigger>
            <TabsTrigger
              value='matches'
              onClick={() => setActiveTab("matches")}
            >
              My Matches
            </TabsTrigger>
          </TabsList>

          {/* Search and Filter Section */}
          <div className='flex items-center space-x-2 w-full'>
            <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full'>
              <Input
                type='text'
                placeholder='Title'
                className='flex-grow'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                type='text'
                placeholder='Author'
                className='flex-grow'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger className='w-full sm:w-[180px]'>
                  <SelectValue placeholder='Genre' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All</SelectItem>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value='listed'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {books.map((book) => renderBookCard(book))}
            </div>
            {books.length === 0 && (
              <p className='text-center text-gray-600 dark:text-gray-400'>
                There are no listed books here.
              </p>
            )}
          </TabsContent>
          <TabsContent value='matches'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {matches.map((match) => renderMatchedBookCard(match))}
            </div>
            {matches.length === 0 && (
              <p className='text-center text-gray-600 dark:text-gray-400'>
                You don't have any matches yet.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <footer className='py-6 text-center text-gray-500 dark:text-gray-400 border-t bg-white dark:bg-gray-800'>
        <p className='text-sm'>© 2023 BookSwap. All rights reserved.</p>
      </footer>
      <AddBooks />
    </div>
  );
};

export default ListedBooks;
