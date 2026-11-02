"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { IBookType } from "@/app/allbooks/page";
import { useRouter } from "next/navigation";

interface BorrowButtonProps {
  book: IBookType;
}

const BorrowButton = ({ book }: BorrowButtonProps) => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  // বাটনটিতে কত কপি অবশিষ্ট আছে তা ট্র্যাকিংয়ের জন্য লোকাল স্টেট
  const [currentQuantity, setCurrentQuantity] = useState(book.quantity);
  const [loading, setLoading] = useState(false);

  const handleBorrow = async () => {
    // ১. ইউজার লগইন না থাকলে আটকানো
    if (!user) {
      toast.error("Please login first to borrow books!");
      return;
    }

    // ২. বইয়ের কপি না থাকলে আটকানো
    if (currentQuantity <= 0) {
      toast.error("This book is out of stock!");
      return;
    }

    setLoading(true);

    // ৩. ব্যাকএন্ডে পাঠানোর অবজেক্ট
    const borrowInfo = {
      bookId: book._id,
      title: book.title,
      image: book.image,
      category: book.category,
      userEmail: user.email,
      userName: user.name,
      borrowDate: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/borrows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(borrowInfo),
      });

      const data = await res.json();
      //   console.log(data);

      if (data.insertedId) {
        toast.success("Book borrowed successfully!");
        // UI-তে ইনস্ট্যান্ট ১ কপি কমানো
        setCurrentQuantity((prev) => prev - 1);
        router.refresh();
      } else {
        toast.error("Failed to borrow book.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error while borrowing book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleBorrow}
      disabled={currentQuantity <= 0 || loading}
      className="bg-[#1E3A2F] hover:bg-[#162B23] text-white font-medium px-6 py-2 rounded-md shadow-sm transition-colors"
    >
      Borrow This Book
    </Button>
  );
};

export default BorrowButton;
