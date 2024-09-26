// src/pages/Login.js
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Logged in successfully");

      setTimeout(() => {
        console.log("Navigating to /listed-books...");
        navigate("/listed-books");
      }, 100);

      console.log("redirected");
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900'>
      <header className='px-4 lg:px-6 h-14 flex items-center'>
        <Link className='flex items-center justify-center' to='/'>
          <BookOpen className='h-6 w-6' />
          <span className='ml-2 text-2xl font-bold'>BookSwap</span>
        </Link>
      </header>
      <main className='flex-1 flex items-center justify-center'>
        <div className='w-full max-w-md space-y-8 px-4 bg-white dark:bg-gray-800 py-12 rounded-lg shadow-lg'>
          <div className='space-y-2 text-center'>
            <h1 className='text-3xl font-bold'>Welcome back</h1>
            <p className='text-gray-500 dark:text-gray-400'>
              Enter your credentials to access your account
            </p>
          </div>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                placeholder='m@example.com'
                required
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password'>Password</Label>
              </div>
              <Input
                id='password'
                required
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
              />
            </div>
            <Button className='w-full' type='submit'>
              Sign in
            </Button>
          </form>
          <div className='text-center'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Don't have an account?{" "}
              <Link
                className='text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'
                to='/signup'
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <footer className='py-6 text-center text-gray-500 dark:text-gray-400'>
        <p className='text-sm'>© 2023 BookSwap. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Login;
