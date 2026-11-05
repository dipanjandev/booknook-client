import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import BooksCard from "./BooksCard";
import { IBookType } from "@/app/allbooks/page";

const RecentBooks = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/recentlyadded`,
    {
      cache: "no-store",
    },
  );
  const recentBooks: IBookType[] = await res.json();
  // console.log(recentBooks);

  return (
    <section className="my-10 sm:my-14 md:my-16 container mx-auto px-4 sm:px-6 lg:px-8">
      {/* সেকশন হেডার */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 sm:pb-5 mb-6 sm:mb-8 border-b border-[#E5E7EB]">
        <div>
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D97706] shrink-0" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#D97706]">
              New Arrivals
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1E3A2F] tracking-tight">
            Recently Added Books
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
            The latest books added by our readers.
          </p>
        </div>

        <Link
          href="/allbooks"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1E3A2F] hover:text-[#D97706] transition-colors w-fit self-start sm:self-auto"
        >
          <span>View All Books</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Link>
      </div>

      {/* কার্ড গ্রিড ও ম্যাপিং */}
      {recentBooks && recentBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {recentBooks.map((bookList) => (
            <BooksCard key={bookList._id} book={bookList} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4 bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] shadow-xs">
          <p className="text-sm sm:text-base font-semibold text-[#1E3A2F]">
            No recent arrivals at the moment.
          </p>
          <p className="text-xs text-[#6B7280] mt-1">
            New books added to BookNook will show up here.
          </p>
        </div>
      )}
    </section>
  );
};

export default RecentBooks;
