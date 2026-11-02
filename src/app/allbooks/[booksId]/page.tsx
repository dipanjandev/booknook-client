import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar, Mail, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IBookType } from "../page";
import Image from "next/image";

const SingleBookPage = async ({
  params,
}: {
  params: Promise<{ booksId: string }>;
}) => {
  const { booksId } = await params;

  const res = await fetch(`http://localhost:5000/allbooks/${booksId}`, {
    cache: "no-store",
  });
  const data: IBookType = await res.json();

  const formattedDate = data.addedDate
    ? new Date(data.addedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recently Added";

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-10">
      <div className="container mx-auto max-w-5xl">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/allbooks"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E3A2F] hover:text-[#D97706] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Books
          </Link>
        </div>

        {/* Main Details Card */}
        <Card className="border border-[#E5E7EB] bg-[#FFFFFF] shadow-sm overflow-hidden rounded-xl">
          <div className="grid grid-cols-12 gap-0">
            {/* Book Cover Showcase */}
            <div className="col-span-5 p-10 flex flex-col items-center justify-center border-r border-[#E5E7EB]">
              <div className="relative w-64 aspect-2/3 rounded-r-md overflow-hidden shadow-[6px_10px_25px_rgba(0,0,0,0.18)] bg-white">
                {/* Book Spine Simulation */}
                <div className="absolute left-0 top-0 bottom-0 w-1.25 bg-linear-to-r from-black/25 via-white/10 to-transparent z-10 pointer-events-none" />
                <Image
                  src={data.image}
                  alt={data.title}
                  height={300}
                  width={300}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Stock Status indicator */}
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#1E3A2F] bg-white px-3.5 py-1.5 rounded-full border border-[#E5E7EB] shadow-xs">
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
            <div className="col-span-7 p-8 flex flex-col justify-between">
              <div>
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-[#D97706] text-white hover:bg-[#B45309] border-none text-xs font-semibold px-3 py-0.5 rounded shadow-xs">
                    {data.category}
                  </Badge>
                </div>

                {/* Title & Author */}
                <h1 className="text-3xl font-bold text-[#1E3A2F] leading-tight mb-2">
                  {data.title}
                </h1>
                <p className="text-base text-[#6B7280] font-medium mb-6">
                  Written by{" "}
                  <span className="text-[#1F2937] font-semibold">
                    {data.author}
                  </span>
                </p>

                <Separator className="bg-[#E5E7EB] mb-6" />

                {/*  Description */}
                <div className="mb-8">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D97706] mb-2">
                    Short Description
                  </h3>
                  <p className="text-[#1F2937] text-sm leading-relaxed whitespace-pre-line">
                    {data.description}
                  </p>
                </div>
              </div>

              {/* Bottom Area: Contributor Details & Action Button */}
              <div>
                {/* Added By Metadata Box */}
                <div className="bg-[#FDFBF7] border border-[#E5E7EB] rounded-lg p-3.5 mb-6">
                  <p className="text-xs font-bold text-[#1E3A2F] uppercase tracking-wider mb-2">
                    Added to Library By
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs text-[#6B7280]">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#D97706]" />
                      <span className="truncate font-medium text-[#1F2937]">
                        {data.userName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#D97706]" />
                      <span className="truncate">{data.userEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <Calendar className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>Added on {formattedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Borrow Button */}
                <Button
                  disabled={data.quantity === 0}
                  className="w-full bg-[#1E3A2F] hover:bg-[#162B23] disabled:bg-[#9CA3AF] text-white font-semibold py-3 h-auto text-base shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  {data.quantity > 0 ? "Borrow This Book" : "Out of Stock"}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SingleBookPage;
