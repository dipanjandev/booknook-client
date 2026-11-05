import React from "react";
import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] w-full flex flex-col items-center justify-center  px-4 sm:px-6 py-10">
      {/* সেন্ট্রাল অ্যানিমেটেড কন্টেইনার */}
      <div className="relative flex flex-col items-center space-y-5 sm:space-y-6 max-w-xs sm:max-w-sm text-center">
        {/* লোগো ও পালসিং রিং */}
        <div className="relative flex items-center justify-center">
          {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
          <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1E3A2F]/10 animate-ping opacity-75" />

          {/* বাইরের স্পিনিং রিং */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#E5E7EB] border-t-[#1E3A2F] border-r-[#D97706] animate-spin" />

          {/* মাঝের আইকন */}
          <div className="absolute flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-xs">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E3A2F] animate-pulse" />
          </div>
        </div>

        {/* টেক্সট ও টাইপোগ্রাফি */}
        <div className="text-center space-y-1 sm:space-y-1.5 px-2">
          <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold text-[#1F2937] tracking-tight">
            Loading...
          </h3>
          <p className="text-[11px] sm:text-xs font-medium text-[#6B7280] leading-relaxed">
            Preparing the shelves for your next read
          </p>
        </div>

        {/* প্রগ্রেস বার অ্যানিমেশন */}
        <div className="w-32 sm:w-40 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
          <div className="h-full bg-[#1E3A2F] rounded-full animate-[progress_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
