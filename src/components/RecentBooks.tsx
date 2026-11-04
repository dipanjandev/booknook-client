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
    <section className="my-16 container mx-auto">
      {/* সেকশন হেডার */}
      <div className="flex items-end justify-between pb-5 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#D97706]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#D97706]">
              New Arrivals
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A2F] tracking-tight">
            Recently Added Books
          </h2>
          <p className="text-sm text-[#6B7280] mt-1">
            The latest books added by our readers.
          </p>
        </div>

        <Link
          href="/allbooks"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3A2F] hover:text-[#D97706] transition-colors"
        >
          View All Books
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* কার্ড গ্রিড ও ম্যাপিং */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentBooks.map((bookList) => (
          <BooksCard key={bookList._id} book={bookList} />
        ))}
      </div>
    </section>
  );
};

export default RecentBooks;
