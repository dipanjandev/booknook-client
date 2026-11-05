"use client";

import React, { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

interface QuoteItem {
  id: number;
  quote: string;
  author: string;
  role: string;
}

const literaryQuotes: QuoteItem[] = [
  {
    id: 1,
    quote:
      "A reader lives a thousand lives before he dies . . . The man who never reads lives only one.",
    author: "George R.R. Martin",
    role: "Novelist, A Song of Ice and Fire",
  },
  {
    id: 2,
    quote: "There is no friend as loyal as a book.",
    author: "Ernest Hemingway",
    role: "Nobel Prize-winning Author",
  },
  {
    id: 3,
    quote: "Books are a uniquely portable magic.",
    author: "Stephen King",
    role: "Author of Over 60 Novels",
  },
  {
    id: 4,
    quote: "A room without books is like a body without a soul.",
    author: "Marcus Tullius Cicero",
    role: "Roman Statesman & Philosopher",
  },
  {
    id: 5,
    quote: "I have always imagined that Paradise will be a kind of a library.",
    author: "Jorge Luis Borges",
    role: "Argentine Writer & Poet",
  },
  {
    id: 6,
    quote:
      "The reading of all good books is like conversation with the finest men of past centuries.",
    author: "René Descartes",
    role: "Philosopher & Mathematician",
  },
];

const LiteraryQuotesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // অটো-স্লাইড (প্রতি ৬ সেকেন্ড পর পর পরিবর্তন হবে)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % literaryQuotes.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + literaryQuotes.length) % literaryQuotes.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % literaryQuotes.length);
  };

  const currentQuote = literaryQuotes[currentIndex];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* সেকশন হেডার */}
        <div className="text-center space-y-2 mb-8 sm:mb-10 px-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E3A2F]/5 border border-[#1E3A2F]/10 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#D97706]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Words of Wisdom</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#1F2937] tracking-tight">
            Words that Inspire Reading
          </h2>
        </div>

        {/* স্লাইডার মূল কার্ড */}
        <div className="relative overflow-hidden bg-white border border-[#E5E7EB] rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 shadow-sm">
          {/* ব্যাকগ্রাউন্ড বড় ওয়াটারমার্ক কোট আইকন */}
          <Quote className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 text-[#FDFBF7] -rotate-12 pointer-events-none select-none" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-4 sm:space-y-6">
            {/* ছোট অ্যাকসেন্ট আইকন */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FDFBF7] border border-[#E5E7EB] flex items-center justify-center text-[#1E3A2F] shrink-0">
              <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D97706]" />
            </div>

            {/* উক্তি */}
            <p className="text-base sm:text-xl md:text-2xl font-serif text-[#1F2937] leading-relaxed italic max-w-2xl min-h-22 sm:min-h-20 md:min-h-18 flex items-center justify-center transition-all duration-500 px-1 sm:px-4">
              “{currentQuote.quote}”
            </p>

            {/* লেখক ও পরিচয় */}
            <div className="space-y-0.5 sm:space-y-1">
              <h4 className="text-sm sm:text-base font-bold text-[#1E3A2F] tracking-wide">
                {currentQuote.author}
              </h4>
              <p className="text-[11px] sm:text-xs font-medium text-[#6B7280]">
                {currentQuote.role}
              </p>
            </div>

            {/* ডট ইন্ডিকেটর ও নেভিগেশন কন্ট্রোল */}
            <div className="flex items-center gap-3 sm:gap-6 pt-2 sm:pt-4">
              <button
                onClick={handlePrev}
                aria-label="Previous quote"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#E5E7EB] hover:border-[#1E3A2F] hover:bg-[#1E3A2F] hover:text-white flex items-center justify-center text-[#4B5563] transition-all cursor-pointer shadow-xs shrink-0"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* ডটস */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {literaryQuotes.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentIndex
                        ? "w-4 sm:w-6 bg-[#1E3A2F]"
                        : "w-1.5 sm:w-2 bg-[#E5E7EB] hover:bg-[#D97706]"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Next quote"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#E5E7EB] hover:border-[#1E3A2F] hover:bg-[#1E3A2F] hover:text-white flex items-center justify-center text-[#4B5563] transition-all cursor-pointer shadow-xs shrink-0"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiteraryQuotesSlider;
