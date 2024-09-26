import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "../ui/label";

function EditButton({ book, onEdit }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [genre, setGenre] = useState(book.genre);
  const [author, setAuthor] = useState(book.author);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/books/${book._id}`,
        {
          title,
          genre,
          author,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Book updated successfully");
      setOpen(false);
      onEdit(book._id, { title, genre, author }); // Notify the parent component to update the book
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Failed to update book");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='bg-primary hover:bg-primary-hover'>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit book</DialogTitle>
          <DialogDescription>Edit the details of book.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              className='border border-gray-700'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <Label htmlFor='author'>Author</Label>
            <Input
              id='author'
              className='border border-gray-700'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <Label htmlFor='genre'>Genre</Label>
            <Input
              id='genre'
              className='border border-gray-700'
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>
          <div className='flex justify-end space-x-2'>
            <DialogClose asChild>
              <Button variant='ghost' onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' variant='primary'>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditButton;
