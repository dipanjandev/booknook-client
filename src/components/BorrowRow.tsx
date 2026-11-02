"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
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

export interface IBorrowItem {
  _id: string;
  bookId: string;
  title: string;
  image: string;
  category?: string;
  userEmail: string;
  borrowDate: string;
  returnDate?: string;
}

interface BorrowRowProps {
  item: IBorrowItem;
}

const BorrowRow = ({ item }: BorrowRowProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // রিটার্ন ডেট ফরম্যাটিং (যদি returnDate না থাকে তবে ধার নেওয়ার ৭ দিন পরের তারিখ প্রদর্শন)
  const borrowDateObj = new Date(item.borrowDate);
  const formattedBorrowDate = borrowDateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const returnDateObj = item.returnDate
    ? new Date(item.returnDate)
    : new Date(borrowDateObj.getTime() + 7 * 24 * 60 * 60 * 1000);

  const formattedReturnDate = returnDateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // বই ফেরত দেওয়ার হ্যান্ডলার
  const handleReturn = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/myborrows/${item._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Book returned successfully!");
        // সার্ভার পেজের ডেটা পেজ রিলোড ছাড়াই সাথে সাথে রিফ্রেশ হবে
        router.refresh();
      } else {
        toast.error("Failed to return book.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error while returning book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="border-b border-[#E5E7EB] hover:bg-[#FDFBF7]/40 transition-colors">
      {/* ১. Image কলাম */}
      <td className="py-4 px-6 align-middle">
        <div className="relative w-12 h-16 rounded overflow-hidden border border-[#E5E7EB] bg-white shadow-xs">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
      </td>

      {/* ২. Title কলাম */}
      <td className="py-4 px-6 align-middle font-medium text-[#1F2937] text-sm">
        {item.title}
      </td>

      {/* ৩. Borrow Date কলাম */}
      <td className="py-4 px-6 align-middle text-sm text-[#4B5563]">
        {formattedBorrowDate}
      </td>

      {/* ৪. Return Date কলাম */}
      <td className="py-4 px-6 align-middle text-sm text-[#4B5563]">
        {formattedReturnDate}
      </td>

      {/* ৫. Action (Return Book বাটন) */}
      <td className="py-4 px-6 align-middle text-right">
        <AlertDialog>
          <AlertDialogTrigger className="h-8 px-3 border border-[#E5E7EB] rounded-md text-[#1F2937] hover:bg-[#FDFBF7] text-xs font-normal cursor-pointer transition-colors">
            {loading ? "Returning..." : "Return Book"}
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white border border-[#E5E7EB] rounded-xl shadow-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-bold text-[#1F2937]">
                Return this book?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-[#6B7280]">
                Are you sure you want to return{" "}
                <strong className="text-[#1F2937]">{item.title}</strong>? This
                will add 1 copy back to the library collection.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-[#E5E7EB] text-xs">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleReturn}
                className="bg-[#1E3A2F] hover:bg-[#162B23] text-white text-xs"
              >
                Confirm Return
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </td>
    </tr>
  );
};

export default BorrowRow;
