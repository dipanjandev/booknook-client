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
    <footer className="bg-[#FFFFFF] border-t border-[#E5E7EB] mt-auto">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded bg-[#1E3A2F] flex items-center justify-center text-lg text-white shadow-sm">
                <BsBook />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-[#1E3A2F]">
                BookNook
              </h2>
            </div>
            <p className="text-sm text-[#6B7280] leading-relaxed max-w-sm">
              BookNook is a tranquil digital haven for bibliophiles. Discover,
              borrow, and share your favorite reads within a vibrant community
              of book lovers.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold text-[#1E3A2F] tracking-wide uppercase mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              <li className="flex items-center gap-2">
                <BsEnvelope className="text-base text-[#1E3A2F] shrink-0" />
                <span>dipanjan.webdev@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <BsTelephone className="text-base text-[#1E3A2F] shrink-0" />
                <span>+880 1716-164345</span>
              </li>
              <li className="flex items-center gap-2">
                <BsGeoAlt className="text-base text-[#1E3A2F] shrink-0" />
                <span>Madhyanagar Bazar, Sylhet, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-bold text-[#1E3A2F] tracking-wide uppercase mb-4">
              Follow Us
            </h3>
            <div className="flex flex-col space-y-2 text-sm text-[#6B7280]">
              <Link
                href="https://www.facebook.com/dipanjan.webdev"
                target="_blank"
                className="hover:text-[#D97706] transition-colors flex gap-2 items-center"
              >
                <BsFacebook />
                Facebook
              </Link>

              <Link
                href="https://www.linkedin.com/in/dipanjandev/"
                target="_blank"
                className="hover:text-[#D97706] transition-colors flex gap-2 items-center"
              >
                <BsLinkedin />
                LinkedIn
              </Link>
              <Link
                href="https://github.com/dipanjandev"
                target="_blank"
                className="hover:text-[#D97706] transition-colors flex gap-2 items-center"
              >
                <BsGithub />
                GitHub
              </Link>
            </div>
          </div>
        </div>

        {/* Separator from Shadcn UI */}
        <Separator className="my-8 bg-[#E5E7EB]" />

        {/* Copyright */}
        <div className="flex items-center justify-between text-xs text-[#6B7280]">
          <p>© {new Date().getFullYear()} BookNook. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-[#1E3A2F] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[#1E3A2F] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
