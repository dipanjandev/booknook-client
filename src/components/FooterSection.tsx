import {
  BsFacebook,
  BsGithub,
  BsLinkedin,
  BsEnvelope,
  BsTelephone,
  BsGeoAlt,
  BsBook,
} from "react-icons/bs";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const FooterSection = () => {
  return (
    <footer className="bg-[#1E3A2F] text-white border-t border-[#162B23] mt-auto">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
        {/* গ্রিড ব্রেকপয়েন্ট: মোবাইলে ১, ট্যাবলেটে ২ এবং ডেস্কটপে ৪ কলাম */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Logo & About */}
          <div className="sm:col-span-2 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-base sm:text-lg text-[#FDFBF7] shadow-xs shrink-0">
                <BsBook />
              </div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white font-serif">
                BookNook
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed max-w-sm sm:max-w-md">
              BookNook is a tranquil digital haven for bibliophiles. Discover,
              borrow, and share your favorite reads within a vibrant community
              of book lovers.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xs font-semibold text-[#D97706] tracking-wider uppercase mb-3 sm:mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-[#D1D5DB]">
              <li className="flex items-center gap-2.5">
                <BsEnvelope className="text-sm text-[#D97706] shrink-0" />
                <span className="truncate">dipanjan.webdev@gmail.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <BsTelephone className="text-sm text-[#D97706] shrink-0" />
                <span>+880 1716-164345</span>
              </li>
              <li className="flex items-start gap-2.5">
                <BsGeoAlt className="text-sm text-[#D97706] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Madhyanagar Bazar, Sylhet, Bangladesh
                </span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xs font-semibold text-[#D97706] tracking-wider uppercase mb-3 sm:mb-4">
              Follow Us
            </h3>
            <div className="flex flex-col space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-[#D1D5DB]">
              <Link
                href="https://www.facebook.com/dipanjan.webdev"
                target="_blank"
                className="hover:text-white transition-colors flex gap-2 items-center w-fit"
              >
                <BsFacebook className="text-[#D97706] shrink-0" />
                <span>Facebook</span>
              </Link>

              <Link
                href="https://www.linkedin.com/in/dipanjandev/"
                target="_blank"
                className="hover:text-white transition-colors flex gap-2 items-center w-fit"
              >
                <BsLinkedin className="text-[#D97706] shrink-0" />
                <span>LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/dipanjandev"
                target="_blank"
                className="hover:text-white transition-colors flex gap-2 items-center w-fit"
              >
                <BsGithub className="text-[#D97706] shrink-0" />
                <span>GitHub</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-6 sm:my-8 bg-white/10" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left text-[11px] sm:text-xs text-[#9CA3AF]">
          <p>© {new Date().getFullYear()} BookNook. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
