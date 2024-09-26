import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        username,
        email,
        password,
        confirmPassword,
      });
      toast.success(
        "Registered successfully. Please check your email to verify your account."
      );
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className='min-h-screen flex-1 flex items-center justify-center'>
      <div className='bg-white shadow-xl rounded-lg w-full max-w-xl p-8 md:p-12'>
        <h2 className='text-4xl font-bold text-primary text-center mb-8'>
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Username
            </label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your username'
              className='w-full p-4 border border-gray-300 rounded-lg focus:ring-primary focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='w-full p-4 border border-gray-300 rounded-lg focus:ring-primary focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              className='w-full p-4 border border-gray-300 rounded-lg focus:ring-primary focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Confirm Password
            </label>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm your password'
              className='w-full p-4 border border-gray-300 rounded-lg focus:ring-primary focus:ring-blue-500'
              required
            />
          </div>
          <div className='m-0'>
            <Button
              type='submit'
              className='w-full py-4 bg-primary text-white rounded-lg hover:bg-primary-hover transition duration-300'
            >
              Create Account
            </Button>
          </div>

          <div className='m-0'>
            Already Registered?{" "}
            <Link to='/login' className='text-primary text-sm'>
              Login Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
