import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, CheckCircle, XCircle } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      // Verify token
      axios
        .post(`${import.meta.env.VITE_API_URL}/verify-token`, { token })
        .then(() => {
          setIsTokenValid(true);
        })
        .catch(() => {
          toast.error("Invalid or expired token");
        });
    }
  }, [token]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/forgot-password`,
        { email }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reset-password`,
        {
          token,
          newPassword: password,
          confirmPassword,
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = (password) =>
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password);
  const passwordsMatch = password === confirmPassword && password !== "";
  const isFormValid =
    isEmailValid(email) && isPasswordValid(password) && passwordsMatch;

  return (
    <div className='flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900'>
      <Toaster position='top-center' />
      <header className='px-4 lg:px-6 h-14 flex items-center'>
        <Link className='flex items-center justify-center' href='/'>
          <BookOpen className='h-6 w-6' />
          <span className='ml-2 text-2xl font-bold'>BookSwap</span>
        </Link>
      </header>
      <main className='flex-1 flex items-center justify-center'>
        <div className='w-full max-w-md space-y-8 px-4 bg-white dark:bg-gray-800 py-12 rounded-lg shadow-lg'>
          <div className='space-y-2 text-center'>
            <h1 className='text-3xl font-bold'>Reset Your Password</h1>
            <p className='text-gray-500 dark:text-gray-400'>
              Enter your email and new password below
            </p>
          </div>
          <form
            onSubmit={isTokenValid ? handlePasswordReset : handleEmailSubmit}
            className='space-y-6'
          >
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                required
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby='email-description'
                disabled={isTokenValid}
              />
              <p
                id='email-description'
                className='text-sm text-gray-500 dark:text-gray-400'
              >
                {isTokenValid
                  ? "Email is verified"
                  : "Enter the email associated with your account"}
              </p>
            </div>
            {isTokenValid && (
              <>
                <div className='space-y-2'>
                  <Label htmlFor='new-password'>New Password</Label>
                  <Input
                    id='new-password'
                    required
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-describedby='password-requirements'
                  />
                  <p
                    id='password-requirements'
                    className='text-sm text-gray-500 dark:text-gray-400'
                  >
                    Password must be at least 8 characters long and include
                    uppercase, lowercase, number, and special character.
                  </p>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='confirm-password'>Confirm Password</Label>
                  <Input
                    id='confirm-password'
                    required
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    aria-describedby='password-match'
                  />
                  <div
                    id='password-match'
                    className='flex items-center space-x-2'
                  >
                    {passwordsMatch ? (
                      <CheckCircle className='text-green-500' size={16} />
                    ) : (
                      <XCircle className='text-red-500' size={16} />
                    )}
                    <span
                      className={`text-sm ${
                        passwordsMatch ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {passwordsMatch
                        ? "Passwords match"
                        : "Passwords do not match"}
                    </span>
                  </div>
                </div>
              </>
            )}
            <Button
              className='w-full'
              type='submit'
              disabled={isTokenValid ? !isFormValid : !isEmailValid(email)}
            >
              {isTokenValid ? "Reset Password" : "Submit Email"}
            </Button>
          </form>
          <div className='text-center'>
            <Link
              className='text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'
              to='/login'
            >
              Back to Login
            </Link>
          </div>
        </div>
      </main>
      <footer className='py-6 text-center text-gray-500 dark:text-gray-400'>
        <p className='text-sm'>© 2023 BookSwap. All rights reserved.</p>
      </footer>
    </div>
  );
}
