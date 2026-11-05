import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-[#FDFBF7]">
      <div className="w-full max-w-xs sm:max-w-md space-y-3.5 sm:space-y-4">
        {/* ৪MD কোড */}
        <span className="block text-6xl sm:text-7xl md:text-8xl font-serif font-bold text-[#1E3A2F] tracking-tight">
          404
        </span>

        {/* হেডার ও বিবরণ */}
        <div className="space-y-1 sm:space-y-1.5">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1F2937]">
            Page Not Found
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-sm mx-auto">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* অ্যাকশন বাটন */}
        <div className="pt-2 sm:pt-3 flex justify-center">
          <Button className="w-full sm:w-auto bg-[#1E3A2F] hover:bg-[#162B23] text-white px-6 py-2.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
