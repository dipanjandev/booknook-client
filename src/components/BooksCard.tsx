import Link from "next/link";
import { IBookType } from "@/app/allbooks/page";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const BooksCard = ({ book }: { book: IBookType }) => {
  return (
    <Card className="group flex flex-col h-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 p-0">
      {/* Book Display Area */}
      <div className="relative w-full h-60 sm:h-64 md:h-72 flex items-center justify-center p-4 sm:p-5 md:p-6 border-b border-[#E5E7EB] overflow-hidden bg-slate-100">
        {/* ১. ব্যাকগ্রাউন্ড ইমেজ */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-120 blur-md opacity-45 group-hover:opacity-60 scale-105"
          style={{ backgroundImage: `url(${book.image})` }}
        />

        {/* ২. ফ্রস্টেড লাইট ওভারলে */}
        <div className="absolute inset-0 bg-white/35 backdrop-blur-[2px] transition-colors duration-500 group-hover:bg-white/20" />

        {/* Category Badge */}
        <Badge className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-[#D97706] text-white hover:bg-[#D97706] border-none text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 rounded shadow-sm z-30">
          {book.category}
        </Badge>

        {/* ৩. সফট হোয়াইট গ্লো প্যানেল */}
        <div className="absolute w-36 sm:w-40 md:w-44 h-48 sm:h-52 md:h-56 bg-white/70 blur-xl rounded-full z-10 pointer-events-none" />

        {/* ৪. মূল কভার */}
        <div className="relative z-20 h-full aspect-2/3 max-h-48 sm:max-h-52 md:max-h-56 rounded-r-sm overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.28)] ring-1 ring-black/5 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.38)] transition-all duration-500 ease-out transform group-hover:scale-105 group-hover:-translate-y-1 bg-white">
          {/* স্পাইন হাইলাইট */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-r from-black/20 via-white/20 to-transparent z-10 pointer-events-none" />

          {/* Book Image */}
          <Image
            src={book.image}
            alt={book.title}
            width={500}
            height={500}
            className="w-full h-full object-cover brightness-[1.03] contrast-[1.02]"
            loading="lazy"
          />
        </div>
      </div>

      {/* Book Details */}
      <CardContent className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3
            className="text-base sm:text-lg font-bold text-[#1E3A2F] line-clamp-1 leading-snug group-hover:text-[#D97706] transition-colors"
            title={book.title}
          >
            {book.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1 font-medium line-clamp-1">
            by <span className="text-[#1F2937]">{book.author}</span>
          </p>
        </div>
      </CardContent>

      {/* Action Footer */}
      <CardFooter className="px-4 pb-4 pt-0 sm:px-5 sm:pb-5 sm:pt-1">
        <Link href={`/allbooks/${book._id}`} className="w-full">
          <Button className="w-full bg-[#1E3A2F] hover:bg-[#162B23] text-white font-semibold py-2 sm:py-2.5 text-xs sm:text-sm rounded shadow-sm transition-colors cursor-pointer">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BooksCard;
