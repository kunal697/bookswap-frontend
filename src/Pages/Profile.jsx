import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import LikedBooks from "@/components/custom/LikedBooks";
import MyBooks from "@/components/custom/MyBooks";
import RequestedBooks from "@/components/custom/RequestedBooks";
import IncomingRequests from "@/components/custom/IncomingRequests";
import axios from "axios";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const { username } = user;
  const initials = username ? username.substring(0, 2).toUpperCase() : "JD";
  return (
    <div className='flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900'>
      <header className='px-4 lg:px-6 h-16 flex items-center border-b bg-white dark:bg-gray-800 shadow-sm'>
        <Link className='flex items-center justify-center' href='/'>
          <div className='flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white'>
            <BookOpen className='h-6 w-6' />
          </div>
          <span className='ml-2 text-2xl font-bold text-primary'>BookSwap</span>
        </Link>
        <nav className='ml-auto flex gap-4 sm:gap-6'>
          <Link
            className='text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors'
            to='/listed-books'
          >
            Browse Books
          </Link>
        </nav>
      </header>
      <main className='flex-1 py-12 px-4 md:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex items-center mb-20'>
            <Avatar className='h-24 w-24'>
              <AvatarImage
                src='/placeholder.svg?height=96&width=96'
                alt="User's profile picture"
              />
              <AvatarFallback className='bg-gray-300'>
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className='ml-10'>
              <h1 className='text-4xl font-bold text-gray-800 dark:text-gray-100'>
                {username}
              </h1>
            </div>
          </div>

          <Tabs defaultValue='myBooks' className='w-full'>
            <TabsList className='grid w-full grid-cols-2 lg:grid-cols-4 mb-8'>
              <TabsTrigger value='myBooks'>My Books</TabsTrigger>
              <TabsTrigger value='likedBooks'>Liked Books</TabsTrigger>
              <TabsTrigger value='exchangeRequests'>
                Exchange Requests
              </TabsTrigger>
              <TabsTrigger value='requestedBooks'>Requested Books</TabsTrigger>
            </TabsList>
            <TabsContent value='myBooks'>
              <MyBooks />
            </TabsContent>
            <TabsContent value='likedBooks'>
              <LikedBooks />
            </TabsContent>
            <TabsContent value='exchangeRequests'>
              <IncomingRequests />
            </TabsContent>
            <TabsContent value='requestedBooks'>
              <RequestedBooks />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className='py-6 text-center text-gray-500 dark:text-gray-400 border-t bg-white dark:bg-gray-800'>
        <p className='text-sm'>© 2023 BookSwap. All rights reserved.</p>
      </footer>
    </div>
  );
}
