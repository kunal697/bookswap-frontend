import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardFooter,
  CardHeader,
} from "../ui/card";
import axios from "axios";
import { Button } from "../ui/button";

function IncomingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/exchange/incoming`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching incoming requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleResponse = async (requestId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/exchange/response`,
        {
          requestId,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the state to reflect the new status
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error("Error responding to request:", error);
    }
  };

  const renderRequestedBookCard = (request) => {
    return (
      <Card
        key={request._id}
        className='flex flex-col h-full overflow-hidden shadow-sm hover:scale-105 transition-all duration-500'
      >
        <CardHeader className='p-4'>
          <img
            src={request.book.imageUrl}
            alt={`Cover of ${request.book.title}`}
            className='w-full h-48 object-cover rounded-md'
          />
        </CardHeader>
        <CardContent className='flex-grow p-4'>
          <CardTitle className='text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200'>
            {request.book.title}
          </CardTitle>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            by {request.book.author}
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
            Genre: {request.book.genre}
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
            From: {request.fromUser.username}
          </p>
        </CardContent>
        {request.status === "pending" && (
          <CardFooter className='p-4 flex justify-between items-center'>
            <Button
              className='bg-accept hover:bg-accept-hover'
              onClick={() => handleResponse(request._id, "accepted")}
            >
              Accept
            </Button>
            <Button
              className='bg-destructive hover:bg-destructive-hover'
              onClick={() => handleResponse(request._id, "rejected")}
            >
              Decline
            </Button>
          </CardFooter>
        )}
        {request.status !== "pending" && (
          <CardFooter className='p-4 flex justify-center items-center'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Status: {request.status}
            </p>
          </CardFooter>
        )}
      </Card>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {requests.map((request) => renderRequestedBookCard(request))}
    </div>
  );
}

export default IncomingRequests;
