"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { IBookType } from "@/app/allbooks/page";
import Image from "next/image";

const HeroSlider = ({ allBooks }: { allBooks: IBookType[] }) => {
  // ডাটাবেজ থেকে প্রথম ৩টি বই আলাদা করা হচ্ছে
  const sliderBooks = allBooks?.slice(0, 5);

  if (sliderBooks.length === 0) return null;

  return (
    <div className="w-full relative overflow-hidden shadow-sm">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={sliderBooks.length > 1}
        className="w-full h-150"
      >
        {sliderBooks.map((book) => (
          <SwiperSlide key={book._id} className="relative w-full h-full">
            {/* বইয়ের কভার ইমেজ ব্যাকগ্রাউন্ড হিসেবে */}
            <Image
              src={book.image}
              alt={book.title}
              fill
              unoptimized
              priority
              className="object-cover blur-[15px] scale-105"
            />

            {/* ডার্ক গ্রেডিয়েন্ট ওভারলে: টেক্সট ও কভার স্পষ্ট পড়ার জন্য */}
            <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/80 to-black/50 z-1" />

            {/* স্লাইডের ভেতরের কনটেন্ট: বামে লেখা এবং ডানে কভার */}
            <div className="relative z-10 container mx-auto h-full flex items-center justify-between px-8 md:px-16 max-w-5xl gap-8">
              {/* বাম পাশ: বইয়ের তথ্য */}
              <div className="flex-1 flex flex-col justify-center max-w-xl">
                {/* ক্যাটাগরি ও ব্র্যান্ড ট্যাগ */}
                <span className="text-xs font-bold tracking-[0.25em] text-[#D97706] uppercase mb-3">
                  {book.category} • BOOKNOOK
                </span>

                {/* বইয়ের নাম */}
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] mb-3 line-clamp-2">
                  {book.title}
                </h1>

                {/* লেখকের নাম */}
                <p className="text-sm text-gray-300 font-medium mb-3">
                  by{" "}
                  <span className="text-[#FDFBF7] font-semibold">
                    {book.author}
                  </span>
                </p>

                {/* বইয়ের বিবরণ */}
                <p className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed mb-6 line-clamp-2 md:line-clamp-3">
                  {book.description}
                </p>

                {/* অ্যাকশন বাটন */}
                <div>
                  <Link
                    href={`/allbooks/${book._id}`}
                    className="inline-block bg-[#1E3A2F] hover:bg-[#162B23] text-white text-xs font-medium px-5 py-2.5 rounded transition-colors shadow-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* ডান পাশ: বইয়ের ফ্রন্ট কভার শোকেস */}
              <div className="hidden sm:flex items-center justify-center shrink-0">
                <div className="relative w-36 md:w-48 aspect-2/3 rounded-r-md overflow-hidden shadow-[6px_10px_25px_rgba(0,0,0,0.5)] bg-white border-y border-r border-white/10">
                  {/* স্পাইন ইফেক্ট */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-r from-black/40 via-white/15 to-transparent z-10 pointer-events-none" />
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
