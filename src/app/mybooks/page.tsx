"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import MyBookRow from "@/components/MyBookRow";
import { IBookType } from "../allbooks/page";

const MyBooksPage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [books, setBooks] = useState<IBookType[]>([]);

  // ১. ব্যাকএন্ড থেকে বই লোড করা
  useEffect(() => {
    if (!user?.email) return;

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mybooks/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user?.email, isPending, user]);

  // ২. ডিলিট হ্যান্ডলার
  const handleDeleteBook = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/allbooks/${id}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Book deleted successfully!");
        // UI থেকে সাথে সাথে রিমুভ করে দেওয়া
        setBooks((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error("Failed to delete the book.");
      }
    } catch {
      toast.error("Network error while deleting book.");
    }
  };

  // ৩. আপডেট হ্যান্ডলার (Edit Dialog থেকে কল হবে)
  const handleUpdateBook = async (
    id: string,
    updatedData: Partial<IBookType>,
  ): Promise<boolean> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/allbooks/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0 || data.matchedCount > 0) {
        toast.success("Book updated successfully!");
        // ব্রাউজার রিফ্রেশ না করে সরাসরি UI স্টেট আপডেট করা
        setBooks((prev) =>
          prev.map((book) =>
            book._id === id ? { ...book, ...updatedData } : book,
          ),
        );
        return true;
      } else {
        toast.error("No changes made to the book.");
        return false;
      }
    } catch {
      toast.error("Failed to update book.");
      return false;
    }
  };

  // লগইন না থাকলে
  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-[#FDFBF7]">
        <p className="text-[#1F2937] font-medium">
          Please log in to manage your added books.
        </p>
        <Link href="/login">
          <Button className="bg-[#1E3A2F] hover:bg-[#162B23] text-white">
            Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-[#FDFBF7] py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {books.length === 0 ? (
          /* বই না থাকলে: ফাঁকা স্টেট */
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-4">
            <h2 className="text-xl font-normal text-[#4B5563] font-serif">
              You have not added any books yet.
            </h2>
            <Link href="/addbooks">
              <Button className="bg-[#1E3A2F] hover:bg-[#162B23] text-white px-6 py-2 rounded-md font-medium">
                Add Book
              </Button>
            </Link>
          </div>
        ) : (
          /* বই থাকলে: টেবিল ভিউ */
          <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-xs font-medium text-[#1F2937]">
                    <th className="py-3 px-6">Book</th>
                    <th className="py-3 px-6 text-center">Category</th>
                    <th className="py-3 px-6 text-center">Copies</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <MyBookRow
                      key={book._id}
                      book={book}
                      onDelete={handleDeleteBook}
                      onUpdate={handleUpdateBook}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooksPage;
