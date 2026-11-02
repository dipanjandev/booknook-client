"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { IBookType } from "@/app/allbooks/page";
import { useRouter } from "next/navigation";
import { Mail, User } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BorrowButtonProps {
  book: IBookType;
}

const BorrowButton = ({ book }: BorrowButtonProps) => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [currentQuantity] = useState(book.quantity);
  const [loading, setLoading] = useState(false);
  // ১. পপআপ সাথে সাথে ক্লোজ করার জন্য ওপেন স্টেট ব্যবহার করা হল।
  const [isOpen, setIsOpen] = useState(false);

  const handleBorrow = async () => {
    if (!user) {
      toast.error("Please login first to borrow books!");
      return;
    }

    if (currentQuantity <= 0) {
      toast.error("This book is out of stock!");
      return;
    }

    // ২. বাটনে চাপ দেওয়ার সাথে সাথেই পপআপ বন্ধ হয়ে যাবে।
    setIsOpen(false);
    setLoading(true);

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

      if (res.ok && data.insertedId) {
        toast.success("Book borrowed successfully!");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to borrow book.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error while borrowing book.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Button
        onClick={() => toast.error("Please login first to borrow books!")}
        className="w-full bg-[#1E3A2F] hover:bg-[#162B23] text-white font-semibold py-3 h-auto text-base shadow-sm transition-colors cursor-pointer"
      >
        Borrow This Book
      </Button>
    );
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>
        <Button
          disabled={currentQuantity <= 0 || loading}
          className="w-full bg-[#1E3A2F] hover:bg-[#162B23] disabled:bg-[#9CA3AF] text-white font-semibold py-3 h-auto text-base shadow-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? "Borrowing..." : "Borrow This Book"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white border border-[#E5E7EB] rounded-xl shadow-lg max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-[#1E3A2F]">
            Confirm Borrowing
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-[#4B5563]">
            Are you sure you want to borrow{" "}
            <strong className="text-[#1F2937]">{book.title}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Borrower details in English */}
        <div className="bg-[#FDFBF7] border border-[#E5E7EB] rounded-lg p-3.5 my-2 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-[#1F2937]">
            <User className="w-4 h-4 text-[#D97706]" />
            <span className="font-semibold">Borrower:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex items-center gap-2 text-[#1F2937]">
            <Mail className="w-4 h-4 text-[#D97706]" />
            <span className="font-semibold">Email:</span>
            <span>{user.email}</span>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-[#E5E7EB] text-xs cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleBorrow}
            className="bg-[#1E3A2F] hover:bg-[#162B23] text-white text-xs cursor-pointer"
          >
            Confirm Borrow
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BorrowButton;
