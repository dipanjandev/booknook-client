import Link from "next/link";
import { IBookType } from "@/app/allbooks/page";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const BooksCard = ({ book }: { book: IBookType }) => {
  return (
    <Card className="group flex flex-col h-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Book Display Area */}
      <div className="relative w-full h-72 flex items-center justify-center p-6 border-b border-[#E5E7EB] overflow-hidden">
        {/* Category Badge */}
        <Badge className="absolute top-3 right-3 bg-[#D97706] text-white hover:bg-[#D97706] border-none text-xs font-semibold px-2.5 py-0.5 rounded shadow-sm z-10">
          {book.category}
        </Badge>

        {/* Realistic Book Cover with Shadow & Spine Effect */}
        <div className="relative h-full aspect-2/3 max-h-56 rounded-r-sm overflow-hidden shadow-[4px_6px_15px_rgba(0,0,0,0.15)] group-hover:shadow-[6px_10px_20px_rgba(0,0,0,0.22)] transition-all duration-300 transform group-hover:-translate-y-1 bg-white">
          {/* Subtle Spine Highlight Line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-r from-black/25 via-white/10 to-transparent z-10 pointer-events-none" />

          {/* Book Image */}
          <Image
            src={book.image}
            alt={book.title}
            width={500}
            height={500}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Book Details */}
      <CardContent className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3
            className="text-lg font-bold text-[#1E3A2F] line-clamp-1 leading-snug group-hover:text-[#D97706] transition-colors"
            title={book.title}
          >
            {book.title}
          </h3>
          <p className="text-sm text-[#6B7280] mt-1 font-medium line-clamp-1">
            by <span className="text-[#1F2937]">{book.author}</span>
          </p>
        </div>
      </CardContent>

      {/* Action Footer */}
      <CardFooter className="px-5 pb-5 pt-0">
        <Link href={`/books/${book._id}`} className="w-full">
          <Button className="w-full bg-[#1E3A2F] hover:bg-[#162B23] text-white font-semibold py-2.5 rounded shadow-sm transition-colors">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BooksCard;
