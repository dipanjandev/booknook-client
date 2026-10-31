"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const NaVBar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/allbooks" },
    { name: "Add Books", href: "/addbooks" },
    { name: "My Books", href: "/mybooks" },
    { name: "My Borrows", href: "/myborrows" },
  ];

  return (
    <div className="bg-[#FFFFFF] border-b border-[#E5E7EB] mb-5">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#1E3A2F] flex items-center justify-center text-xl text-white shadow-sm">
            📖
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#1E3A2F]">
              BookNook
            </h2>
          </div>
        </div>

        {/* Dynamic Navigation Links */}
        <div className="flex items-center gap-7 text-sm font-medium text-[#1F2937]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`pb-1 transition-colors ${
                  isActive
                    ? "text-[#1E3A2F] font-semibold border-b-2 border-[#D97706]"
                    : "hover:text-[#1E3A2F]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="default"
            className="bg-[#1E3A2F] hover:bg-[#162B23] text-white px-5 py-2 font-semibold shadow-sm"
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="border-[#1E3A2F] text-[#1E3A2F] hover:bg-[#FDFBF7] px-5 py-2 font-semibold"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NaVBar;
