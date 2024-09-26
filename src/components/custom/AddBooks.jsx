import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

function AddBooks() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState(null);

  const genres = [
    "Fiction",
    "Sci-fi",
    "Horror",
    "Thriller",
    "Mystery",
    "Historic",
    "Novel",
    "Life",
    "Finance",
    "Romantic",
    "Adult",
    "Manga",
    "Comic",
    "Autobiography",
    "Poetry",
    "Children",
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("genre", genre);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/books`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Book added successfully:", response.data);
      toast.success("Book added successfully");
      setOpen(false); // Close the dialog on success
    } catch (error) {
      toast.error("Book is not added");
      console.error("Error adding book:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='fixed bottom-8 right-8 bg-primary hover:bg-primary-hover text-secondary-foreground p-2 rounded-full shadow-lg'
          aria-label='Add New Book'
        >
          <Plus className='h-6 w-6' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
          <DialogDescription>
            Please enter the details for the new book.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form className='space-y-4' onSubmit={handleFormSubmit}>
            <div>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                type='text'
                placeholder='Book Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor='author'>Author</Label>
              <Input
                id='author'
                type='text'
                placeholder='Author Name'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor='genre'>Genre</Label>
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger className='w-full'>
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
            <div className='flex items-center align-middle'>
              <Label htmlFor='image'>Upload Image</Label>
              <Input
                id='image'
                className='border border-gray-700'
                type='file'
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
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
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddBooks;
