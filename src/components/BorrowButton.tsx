"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
import { IBookType } from "@/app/allbooks/page";
import { useRouter } from "next/navigation";
import { CalendarClock, Mail, User } from "lucide-react";
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
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // ১. বর্তমান তারিখ এবং ৭ দিন পরের রিটার্ন হিসাব
  const borrowDate = new Date();
  const returnDate = new Date();
  returnDate.setDate(borrowDate.getDate() + 7);

  // পপআপে দেখানোর জন্য ফরম্যাট
  const formattedReturnDeadline = returnDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleBorrow = async () => {
    if (!user) {
      toast.error("Please login first to borrow books!");
      return;
    }

    if (book.quantity <= 0) {
      toast.error("This book is out of stock!");
      return;
    }

    setIsOpen(false);
    setLoading(true);

    // ২. borrowInfo-তে borrowDate ও returnDate যুক্ত করা
    const borrowInfo = {
      bookId: book._id,
      title: book.title,
      image: book.image,
      category: book.category,
      userEmail: user.email,
      userName: user.name,
      borrowDate: borrowDate.toISOString(),
      returnDate: returnDate.toISOString(), // ৭ দিন পরের তারিখ
    };

    // client side এ টোকেন এর জন্য।
    const { data, error } = await authClient.token();
    const token = data?.token;
    if (error) {
      toast.error("Something went Wrong!");
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      const res = await fetch(`${backendUrl}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
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

  if (isPending) {
    return (
      <Button
        disabled
        className="w-full bg-[#1E3A2F]/80 text-white font-semibold py-3 h-auto text-base shadow-sm cursor-not-allowed"
      >
        Loading...
      </Button>
    );
  }

  if (!user) {
    return (
      <Button
        onClick={() => {
          toast.error("Please login first to borrow books!");
          router.push("/login");
        }}
        className="w-full bg-[#1E3A2F] hover:bg-[#162B23] text-white font-semibold py-3 h-auto text-base shadow-sm transition-colors cursor-pointer"
      >
        Borrow This Book
      </Button>
    );
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        render={
          <Button
            disabled={book.quantity <= 0 || loading}
            className="w-full bg-[#1E3A2F] hover:bg-[#162B23] disabled:bg-[#9CA3AF] text-white font-semibold py-3 h-auto text-base shadow-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Borrowing..." : "Borrow This Book"}
          </Button>
        }
      />

      <AlertDialogContent className="bg-white border border-[#E5E7EB] rounded-xl shadow-lg max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-[#1E3A2F]">
            Confirm Borrowing
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-[#4B5563]">
            Are you sure you want to borrow{" "}
            <strong className="text-[#1F2937]">{book.title}</strong>? You can
            keep this book for a maximum of <strong>7 days</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* ব্যবহারকারীর তথ্য ও রিটার্ন ডেট বক্স */}
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
          <div className="flex items-center gap-2 text-[#1E3A2F] pt-1 border-t border-[#E5E7EB]/70 font-medium">
            <CalendarClock className="w-4 h-4 text-[#D97706]" />
            <span className="font-semibold">Return Deadline:</span>
            <span>{formattedReturnDeadline} (Within 7 Days)</span>
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
