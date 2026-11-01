"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

const AddBooksPage = () => {
  // ডেমো লগইন ইউজার ডেটা (অথ স্টেট থেকে ডাইনামিক্যালি রিপ্লেস করা যাবে)
  const loggedInUser = {
    name: "Dipanjan Roy",
    email: "dipanjan.shirso@gmail.com",
  };

  const [category, setCategory] = useState<string | null>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const author = (form.elements.namedItem("author") as HTMLInputElement)
      .value;
    const quantity = parseInt(
      (form.elements.namedItem("quantity") as HTMLInputElement).value,
      10,
    );
    const image = (form.elements.namedItem("image") as HTMLInputElement).value;
    const description = (
      form.elements.namedItem("description") as HTMLTextAreaElement
    ).value;

    const newBook = {
      title,
      author,
      category,
      quantity,
      image,
      description,
      userName: loggedInUser.name,
      userEmail: loggedInUser.email,
      addedDate: new Date().toISOString(),
    };

    console.log("Book Data to Submit:", newBook);

    try {
      const res = await fetch("http://localhost:5000/allbooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });
      const data = await res.json();

      if (data.insertedId) {
        toast.success("Book Added Successfully");
        form.reset();
        setCategory("");
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect to the server");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto border-[#E5E7EB] bg-[#FFFFFF] shadow-sm">
        <CardHeader className="border-b border-[#E5E7EB] pb-5">
          <CardTitle className="text-2xl font-bold text-[#1E3A2F]">
            Add a New Book
          </CardTitle>
          <CardDescription className="text-[#6B7280]">
            Fill in the details below to add a book to the library collection.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Book Title */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-semibold text-[#1F2937]"
              >
                Book Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. The Great Gatsby"
                required
                className="border-[#E5E7EB] focus-visible:ring-[#1E3A2F]"
              />
            </div>

            {/* Author Name */}
            <div className="space-y-2">
              <Label
                htmlFor="author"
                className="text-sm font-semibold text-[#1F2937]"
              >
                Author Name
              </Label>
              <Input
                id="author"
                name="author"
                placeholder="e.g. F. Scott Fitzgerald"
                required
                className="border-[#E5E7EB] focus-visible:ring-[#1E3A2F]"
              />
            </div>

            {/* Category and Total Copies (Quantity) Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="category"
                  className="text-sm font-semibold text-[#1F2937]"
                >
                  Category
                </Label>
                <Select
                  onValueChange={(val) => setCategory(val as string)}
                  required
                >
                  <SelectTrigger className="border-[#E5E7EB] focus:ring-[#1E3A2F]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#FFFFFF] border-[#E5E7EB]">
                    <SelectItem value="Fiction">Fiction</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Kids">Kids</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="quantity"
                  className="text-sm font-semibold text-[#1F2937]"
                >
                  Total Copies
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  defaultValue="1"
                  required
                  className="border-[#E5E7EB] focus-visible:ring-[#1E3A2F]"
                />
              </div>
            </div>

            {/* Book Image Link */}
            <div className="space-y-2">
              <Label
                htmlFor="image"
                className="text-sm font-semibold text-[#1F2937]"
              >
                Book Image URL
              </Label>
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="Please Enter Your Image URL"
                required
                className="border-[#E5E7EB] focus-visible:ring-[#1E3A2F]"
              />
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-semibold text-[#1F2937]"
              >
                Short Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Write a brief overview of the book..."
                rows={4}
                required
                className="border-[#E5E7EB] focus-visible:ring-[#1E3A2F]"
              />
            </div>

            {/* User Name & Email (Read-only) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="userName"
                  className="text-sm font-semibold text-[#1F2937]"
                >
                  User Name
                </Label>
                <Input
                  id="userName"
                  value={loggedInUser.name}
                  readOnly
                  className="bg-[#FDFBF7] border-[#E5E7EB] text-[#6B7280] cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="userEmail"
                  className="text-sm font-semibold text-[#1F2937]"
                >
                  User Email
                </Label>
                <Input
                  id="userEmail"
                  value={loggedInUser.email}
                  readOnly
                  className="bg-[#FDFBF7] border-[#E5E7EB] text-[#6B7280] cursor-not-allowed"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#1E3A2F] hover:bg-[#162B23] text-white font-semibold py-2 shadow-sm"
            >
              Add Book
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBooksPage;
