"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // প্রয়োজন হলে এরর কনসোলে দেখতে পারেন
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#FDFBF7]">
      <div className="max-w-md space-y-4">
        {/* টেক্সট কোড */}
        <span className="text-6xl font-serif font-bold text-[#1E3A2F]">
          Oops!
        </span>

        {/* হেডার ও বিবরণ */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-[#1F2937]">
            Something Went Wrong
          </h2>
          <p className="text-sm text-[#6B7280]">
            An unexpected error occurred while loading this page. Please try
            again.
          </p>
        </div>

        {/* অ্যাকশন বাটন গ্রুপ */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {/* পুনরায় লোড করার বাটন */}
          <Button
            onClick={() => reset()}
            className="bg-[#1E3A2F] hover:bg-[#162B23] text-white px-5 py-2 rounded-lg text-sm cursor-pointer shadow-xs"
          >
            Try Again
          </Button>

          {/* হোমে ফিরে যাওয়ার বাটন */}
          <Button
            variant="outline"
            className="border-[#E5E7EB] bg-white hover:bg-[#FDFBF7] text-[#1F2937] px-5 py-2 rounded-lg text-sm"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
