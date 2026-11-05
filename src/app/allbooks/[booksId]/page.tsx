import Link from "next/link";
import { ArrowLeft, Calendar, Mail, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IBookType } from "../page";
import Image from "next/image";
import BorrowButton from "@/components/BorrowButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const SingleBookPage = async ({
  params,
}: {
  params: Promise<{ booksId: string }>;
}) => {
  const { booksId } = await params;

  // সার্ভার সাইডে টোকেন এর জন্য।
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });

  const token = jwtToken?.token;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/allbooks/${booksId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const data: IBookType = await res.json();

  const formattedDate = data.addedDate
    ? new Date(data.addedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recently Added";

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-6 sm:py-8 md:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Back Link */}
        <div className="mb-4 sm:mb-6">
          <Link
            href="/allbooks"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1E3A2F] hover:text-[#D97706] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Books
          </Link>
        </div>

        {/* Main Details Card */}
        <Card className="border border-[#E5E7EB] bg-[#FFFFFF] shadow-sm overflow-hidden rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Book Cover Showcase */}
            <div className="col-span-1 md:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#E5E7EB] bg-[#FAF8F5]/30">
              <div className="relative w-48 sm:w-56 md:w-64 aspect-2/3 rounded-r-md overflow-hidden shadow-[6px_10px_25px_rgba(0,0,0,0.18)] bg-white">
                {/* Book Spine Simulation */}
                <div className="absolute left-0 top-0 bottom-0 w-1.25 bg-linear-to-r from-black/25 via-white/10 to-transparent z-10 pointer-events-none" />
                <Image
                  src={data.image}
                  alt={data.title}
                  height={300}
                  width={300}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Stock Status indicator */}
              <div className="mt-5 sm:mt-6 flex items-center gap-2 text-xs font-semibold text-[#1E3A2F] bg-white px-3.5 py-1.5 rounded-full border border-[#E5E7EB] shadow-xs">
                <span
                  className={`w-2 h-2 rounded-full ${
                    data.quantity > 0 ? "bg-emerald-600" : "bg-red-500"
                  }`}
                />
                <span>
                  {data.quantity > 0
                    ? `${data.quantity} Copies Available`
                    : "Currently Out of Stock"}
                </span>
              </div>
            </div>

            {/* Book Information Section */}
            <div className="col-span-1 md:col-span-7 p-5 sm:p-7 md:p-8 flex flex-col justify-between">
              <div>
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-[#D97706] text-white hover:bg-[#B45309] border-none text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 rounded shadow-xs">
                    {data.category}
                  </Badge>
                </div>

                {/* Title & Author */}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1E3A2F] leading-tight mb-2">
                  {data.title}
                </h1>
                <p className="text-sm sm:text-base text-[#6B7280] font-medium mb-5 sm:mb-6">
                  Written by{" "}
                  <span className="text-[#1F2937] font-semibold">
                    {data.author}
                  </span>
                </p>

                <Separator className="bg-[#E5E7EB] mb-5 sm:mb-6" />

                {/* Description */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D97706] mb-2">
                    Short Description
                  </h3>
                  <p className="text-[#1F2937] text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {data.description}
                  </p>
                </div>
              </div>

              {/* Bottom Area: Contributor Details & Action Button */}
              <div>
                {/* Added By Metadata Box */}
                <div className="bg-[#FDFBF7] border border-[#E5E7EB] rounded-lg p-3 sm:p-3.5 mb-5 sm:mb-6">
                  <p className="text-[11px] sm:text-xs font-bold text-[#1E3A2F] uppercase tracking-wider mb-2.5">
                    Added to Library By
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs text-[#6B7280]">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                      <span className="truncate font-medium text-[#1F2937]">
                        {data.userName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                      <span className="truncate">{data.userEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <Calendar className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                      <span>Added on {formattedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Borrow Button */}
                <BorrowButton book={data} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SingleBookPage;
