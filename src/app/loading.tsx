import React from "react";
import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-[#FDFBF7] px-4">
      {/* সেন্ট্রাল অ্যানিমেটেড কন্টেইনার */}
      <div className="relative flex flex-col items-center space-y-6">
        {/* লোগো ও পালসিং রিং */}
        <div className="relative flex items-center justify-center">
          {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
          <div className="absolute w-20 h-20 rounded-full bg-[#1E3A2F]/10 animate-ping opacity-75" />

          {/* বাইরের স্পিনিং রিং */}
          <div className="w-16 h-16 rounded-full border-2 border-[#E5E7EB] border-t-[#1E3A2F] border-r-[#D97706] animate-spin" />

          {/* মাঝের আইকন */}
          <div className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-xs">
            <BookOpen className="w-5 h-5 text-[#1E3A2F] animate-pulse" />
          </div>
        </div>

        {/* টেক্সট ও টাইপোগ্রাফি */}
        <div className="text-center space-y-1.5">
          <h3 className="font-serif text-lg font-bold text-[#1F2937] tracking-tight">
            Loading...
          </h3>
          <p className="text-xs font-medium text-[#6B7280]">
            Preparing the shelves for your next read
          </p>
        </div>

        {/* প্রগ্রেস বার অ্যানিমেশন */}
        <div className="w-40 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
          <div className="h-full bg-[#1E3A2F] rounded-full animate-[progress_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
