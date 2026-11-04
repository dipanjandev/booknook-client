import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#FDFBF7]">
      <div className="max-w-md space-y-4">
        {/* ৪MD কোড */}
        <span className="text-6xl font-serif font-bold text-[#1E3A2F]">
          404
        </span>

        {/* হেডার ও বিবরণ */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-[#1F2937]">Page Not Found</h2>
          <p className="text-sm text-[#6B7280]">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* অ্যাকশন বাটন */}
        <div className="pt-2">
          <Button className="bg-[#1E3A2F] hover:bg-[#162B23] text-white px-6 py-2 rounded-lg text-sm">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
