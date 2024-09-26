import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../ui/button"; // Replace with your actual component library
import { Heart } from "lucide-react";
import { toast } from "sonner";

const WantedBookButton = ({ bookId, onLike }) => {
  const [isWanted, setIsWanted] = useState(false);

  useEffect(() => {
    const fetchWantedStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage");
        return;
      }

      try {
        // Fetch the user's wishlist
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/books/wishlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check if the book is in the wishlist
        const wishlist = response.data.wishlist;
        const bookInWishlist =
          Array.isArray(wishlist) &&
          wishlist.some((book) => book._id === bookId);

        setIsWanted(bookInWishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWantedStatus();
  }, [bookId]);

  const handleClick = async () => {
    const token = localStorage.getItem("token"); // Corrected the token key
    if (!token) {
      console.error("No token found in local storage");
      return;
    }

    try {
      if (isWanted) {
        // Remove book from wanted list
        await axios
          .delete(
            `${import.meta.env.VITE_API_URL}/books/wantedBooks/${bookId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            toast("Removed from wishlist");
          });
      } else {
        // Add book to wanted list
        await axios
          .post(
            `${import.meta.env.VITE_API_URL}/books/wantedBooks`,
            { bookId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            toast("Added to wishlist");
          });
      }

      // Toggle the state
      setIsWanted(!isWanted);
      // Trigger the onLike callback to re-fetch matched books
      onLike();
    } catch (error) {
      console.error("Error toggling wanted book:", error);
    }
  };

  return (
    <Button
      variant='ghost'
      size='icon'
      className='transition-colors duration-200'
      onClick={handleClick}
    >
      <Heart
        className='h-5 w-5'
        fill={isWanted ? "#f44336" : "white"}
        color={isWanted ? "#f44336" : "black"}
      />
    </Button>
  );
};

export default WantedBookButton;
