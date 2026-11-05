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
import { authClient } from "@/lib/auth-client";

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

  // রিটার্ন ডেট ফরম্যাটিং (যদি returnDate না থাকে তবে ধার নেওয়ার ৭ দিন পরের তারিখ প্রদর্শন)
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

  // বই ফেরত দেওয়ার হ্যান্ডলার
  const handleReturn = async () => {
    setLoading(true);
    // client side এ টোকেন এর জন্য।
    const { data, error } = await authClient.token();
    const token = data?.token;
    if (error) {
      toast.error("Something went Wrong!");
    }
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      console.log("backendUrl", backendUrl);

      const res = await fetch(`${backendUrl}/myborrows/${item._id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Book returned successfully!");
        // সার্ভার পেজের ডেটা পেজ রিলোড ছাড়াই সাথে সাথে রিফ্রেশ হবে
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
      <td className="py-3 sm:py-4 px-4 sm:px-6 align-middle shrink-0">
        <div className="relative w-10 h-14 sm:w-12 sm:h-16 rounded overflow-hidden border border-[#E5E7EB] bg-white shadow-xs">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 40px, 48px"
          />
        </div>
      </td>

      {/* ২. Title কলাম */}
      <td className="py-3 sm:py-4 px-4 sm:px-6 align-middle font-medium text-[#1F2937] text-xs sm:text-sm max-w-45 sm:max-w-xs truncate">
        <span title={item.title}>{item.title}</span>
      </td>

      {/* ৩. Borrow Date কলাম */}
      <td className="py-3 sm:py-4 px-4 sm:px-6 align-middle text-xs sm:text-sm text-[#4B5563] whitespace-nowrap">
        {formattedBorrowDate}
      </td>

      {/* ৪. Return Date কলাম */}
      <td className="py-3 sm:py-4 px-4 sm:px-6 align-middle text-xs sm:text-sm text-[#4B5563] whitespace-nowrap">
        {formattedReturnDate}
      </td>

      {/* ৫. Action (Return Book বাটন) */}
      <td className="py-3 sm:py-4 px-4 sm:px-6 align-middle text-right whitespace-nowrap">
        <AlertDialog>
          <AlertDialogTrigger className="h-7 sm:h-8 px-2.5 sm:px-3 border border-[#E5E7EB] rounded-md text-[#1F2937] hover:bg-[#FDFBF7] text-[11px] sm:text-xs font-normal cursor-pointer transition-colors">
            {loading ? "Returning..." : "Return Book"}
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-sm sm:max-w-md bg-white border border-[#E5E7EB] rounded-xl p-4 sm:p-6 shadow-lg">
            <AlertDialogHeader className="text-left space-y-1 sm:space-y-1.5">
              <AlertDialogTitle className="text-base sm:text-lg font-bold text-[#1F2937]">
                Return this book?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                Are you sure you want to return{" "}
                <strong className="text-[#1F2937] wrap-break-words">
                  {item.title}
                </strong>
                ? This will add 1 copy back to the library collection.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-0 pt-2">
              <AlertDialogCancel className="w-full sm:w-auto border-[#E5E7EB] text-xs py-2 sm:py-2.5 cursor-pointer mt-0">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleReturn}
                className="w-full sm:w-auto bg-[#1E3A2F] hover:bg-[#162B23] text-white text-xs py-2 sm:py-2.5 cursor-pointer"
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
