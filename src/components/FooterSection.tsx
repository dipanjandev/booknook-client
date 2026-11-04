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
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-lg text-[#FDFBF7] shadow-xs">
                <BsBook />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white font-serif">
                BookNook
              </h2>
            </div>
            <p className="text-sm text-[#D1D5DB] leading-relaxed max-w-sm">
              BookNook is a tranquil digital haven for bibliophiles. Discover,
              borrow, and share your favorite reads within a vibrant community
              of book lovers.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xs font-semibold text-[#D97706] tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-[#D1D5DB]">
              <li className="flex items-center gap-2.5">
                <BsEnvelope className="text-sm text-[#D97706] shrink-0" />
                <span>dipanjan.webdev@gmail.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <BsTelephone className="text-sm text-[#D97706] shrink-0" />
                <span>+880 1716-164345</span>
              </li>
              <li className="flex items-center gap-2.5">
                <BsGeoAlt className="text-sm text-[#D97706] shrink-0" />
                <span>Madhyanagar Bazar, Sylhet, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xs font-semibold text-[#D97706] tracking-wider uppercase mb-4">
              Follow Us
            </h3>
            <div className="flex flex-col space-y-2.5 text-sm text-[#D1D5DB]">
              <Link
                href="https://www.facebook.com/dipanjan.webdev"
                target="_blank"
                className="hover:text-white transition-colors flex gap-2 items-center"
              >
                <BsFacebook className="text-[#D97706]" />
                Facebook
              </Link>

              <Link
                href="https://www.linkedin.com/in/dipanjandev/"
                target="_blank"
                className="hover:text-white transition-colors flex gap-2 items-center"
              >
                <BsLinkedin className="text-[#D97706]" />
                LinkedIn
              </Link>
              <Link
                href="https://github.com/dipanjandev"
                target="_blank"
                className="hover:text-white transition-colors flex gap-2 items-center"
              >
                <BsGithub className="text-[#D97706]" />
                GitHub
              </Link>
            </div>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8 bg-white/10" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF]">
          <p>© {new Date().getFullYear()} BookNook. All rights reserved.</p>
          <div className="flex gap-6">
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
