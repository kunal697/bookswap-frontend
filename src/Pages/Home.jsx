import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, RefreshCw, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='px-4 lg:px-6 h-14 flex items-center'>
        <Link className='flex items-center justify-center' href='#'>
          <BookOpen className='h-6 w-6' />
          <span className='ml-2 text-2xl font-bold'>BookSwap</span>
        </Link>
        <nav className='ml-auto flex gap-4 sm:gap-6'>
          <Button variant='outline'>
            <Link className='text-sm font-medium' to='/signup'>
              Register
            </Link>
          </Button>
          <Button>
            <Link className='text-sm font-medium' to='/login'>
              Sign In
            </Link>
          </Button>
        </nav>
      </header>
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary'>
                  Exchange Books, Share Stories
                </h1>
                <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                  Join our community of book lovers. Swap your read books for
                  new adventures. It's easy, eco-friendly, and free to join!
                </p>
              </div>
              <div className='space-x-4'>
                <Button>
                  {" "}
                  <Link to='/signup'> Get Started </Link>{" "}
                </Button>
                <Button variant='outline'>Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
          <div className='container px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>
              How It Works
            </h2>
            <div className='grid gap-10 sm:grid-cols-2 md:grid-cols-3'>
              <div className='flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg'>
                <BookOpen className='h-12 w-12 mb-2' />
                <h3 className='text-xl font-bold'>List Your Books</h3>
                <p className='text-gray-500 dark:text-gray-400 text-center'>
                  Add books you want to exchange to your profile.
                </p>
              </div>
              <div className='flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg'>
                <RefreshCw className='h-12 w-12 mb-2' />
                <h3 className='text-xl font-bold'>Make a Swap</h3>
                <p className='text-gray-500 dark:text-gray-400 text-center'>
                  Find a book you want and propose a swap with the owner.
                </p>
              </div>
              <div className='flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg'>
                <Users className='h-12 w-12 mb-2' />
                <h3 className='text-xl font-bold'>Grow Your Library</h3>
                <p className='text-gray-500 dark:text-gray-400 text-center'>
                  Expand your reading list and connect with fellow book lovers.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Join Our Book-Loving Community
                </h2>
                <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                  Sign up now and start swapping books with readers from around
                  the world.
                </p>
              </div>
              <div className='w-full max-w-sm space-y-2'>
                <form className='flex space-x-2'>
                  <Input
                    className='max-w-lg flex-1'
                    placeholder='Enter your email'
                    type='email'
                  />
                  <Button type='submit'>Sign Up</Button>
                </form>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  By signing up, you agree to our{" "}
                  <Link className='underline underline-offset-2' href='#'>
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          © 2023 BookSwap. All rights reserved.
        </p>
        <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
          <Link className='text-xs hover:underline underline-offset-4' href='#'>
            Terms of Service
          </Link>
          <Link className='text-xs hover:underline underline-offset-4' href='#'>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
