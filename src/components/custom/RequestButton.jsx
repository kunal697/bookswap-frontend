import axios from "axios";
import { Button } from "../ui/button"; // Assuming you have a Button component
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";

const RequestButton = ({ bookId, toUserId }) => {
  const [isPending, setIsPending] = useState(false);
  const [outgoingRequests, setOutgoingRequests] = useState([]);

  const fetchOutgoingRequests = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/exchange/outgoing`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOutgoingRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch outgoing requests:", error);
    }
  }, []);

  useEffect(() => {
    fetchOutgoingRequests();
  }, [fetchOutgoingRequests]);

  useEffect(() => {
    const existingRequest = outgoingRequests.find(
      (request) => request.book._id === bookId && request.status === "pending"
    );
    if (existingRequest) {
      setIsPending(true);
    }
  }, [outgoingRequests, bookId]);

  const handleRequest = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    setIsPending(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/exchange/request`,
        {
          bookId,
          toUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Request successful:", response.data);
      toast.success("Request sent");
    } catch (error) {
      console.error("Request failed:", error);
      setIsPending(false);
      toast.error("Request failed");
    }
  };

  return (
    <Button
      className='bg-primary hover:bg-primary-hover text-white transition-colors duration-200'
      onClick={handleRequest}
      disabled={isPending}
    >
      {isPending ? "Pending" : "Request"}
    </Button>
  );
};

export default RequestButton;
