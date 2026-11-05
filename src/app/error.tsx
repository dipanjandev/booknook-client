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
    // প্রয়োজন হলে এরর কনসোলে দেখতে পারেন
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] sm:min-h-[75vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-[#FDFBF7]">
      <div className="w-full max-w-xs sm:max-w-md space-y-3.5 sm:space-y-4">
        {/* টেক্সট কোড */}
        <span className="block text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-[#1E3A2F] tracking-tight">
          Oops!
        </span>

        {/* হেডার ও বিবরণ */}
        <div className="space-y-1 sm:space-y-1.5">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1F2937]">
            Something Went Wrong
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-sm mx-auto">
            An unexpected error occurred while loading this page. Please try
            again.
          </p>
        </div>

        {/* অ্যাকশন বাটন গ্রুপ */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-2 sm:pt-3">
          {/* পুনরায় লোড করার বাটন */}
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-[#1E3A2F] hover:bg-[#162B23] text-white px-5 py-2.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium cursor-pointer shadow-xs transition-all"
          >
            Try Again
          </Button>

          {/* হোমে ফিরে যাওয়ার বাটন */}
          <Button
            variant="outline"
            className="w-full sm:w-auto border-[#E5E7EB] bg-white hover:bg-[#FDFBF7] text-[#1F2937] px-5 py-2.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
