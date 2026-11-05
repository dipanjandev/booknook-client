"use client";

import React, { useState } from "react";
import { BookOpen, User, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "./ui/separator";

const NaVBar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.replace("/login");
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
      window.location.replace("/login");
    }
  };

  const pathname = usePathname();

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/allbooks" },
  ];

  const privateLinks = [
    { name: "Add Books", href: "/addbooks" },
    { name: "My Books", href: "/mybooks" },
    { name: "My Borrows", href: "/myborrows" },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-3">
      {/* iOS Floating Frosted Glass Container */}
      <div className="container mx-auto rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
        <div className="flex items-center justify-between py-2.5 sm:py-3 px-4 sm:px-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-to-br from-[#1E3A2F] to-[#162B23] flex items-center justify-center text-white shadow-md shadow-[#1E3A2F]/20 transition-all duration-300 group-hover:scale-105 shrink-0">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#1E3A2F] font-serif">
                BookNook
              </h2>
            </div>
          </Link>

          {/* Desktop Navigation Links (Pill Style) */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 text-sm font-medium bg-[#1E3A2F]/5 p-1 rounded-full border border-black/5">
            {/* Public Links */}
            {publicLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-[#1E3A2F] text-white font-semibold shadow-xs"
                      : "text-[#1F2937] hover:text-[#1E3A2F] hover:bg-white/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Private Links */}
            {user &&
              privateLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-[#1E3A2F] text-white font-semibold shadow-xs"
                        : "text-[#1F2937] hover:text-[#1E3A2F] hover:bg-white/60"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
          </nav>

          {/* Action Buttons, Avatar Popover & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <Popover>
                <PopoverTrigger
                  render={
                    <button
                      type="button"
                      className="rounded-full ring-2 ring-[#D97706]/40 hover:ring-[#D97706] transition-all p-0.5 focus:outline-none bg-white/50 backdrop-blur-xs"
                    >
                      <Avatar className="h-8 w-8 sm:h-9 sm:w-9 cursor-pointer shadow-xs">
                        <AvatarImage
                          referrerPolicy="no-referrer"
                          src={user?.image as string}
                          alt={user?.name || "User Avatar"}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-[#1E3A2F] text-white font-semibold text-xs sm:text-sm">
                          {user?.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  }
                />
                <PopoverContent
                  align="end"
                  className="w-60 sm:w-64 p-3 bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-2xl z-50"
                >
                  {/* User Info Header */}
                  <div className="flex items-center gap-3 p-2 bg-[#FDFBF7]/80 rounded-xl border border-[#E5E7EB]/50 backdrop-blur-xs">
                    <Avatar className="h-9 w-9 sm:h-10 sm:w-10 shrink-0">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user?.image as string}
                        alt={user?.name || "User"}
                      />
                      <AvatarFallback className="bg-[#1E3A2F] text-white font-bold text-xs sm:text-sm">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                      <p className="text-xs sm:text-sm font-semibold text-[#1F2937] truncate">
                        {user?.name}
                      </p>
                      <p className="text-[11px] sm:text-xs text-[#6B7280] truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <Separator className="my-2 bg-[#E5E7EB]/60" />

                  {/* Navigation Actions */}
                  <div className="space-y-1">
                    <Link href="/profile">
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2.5 text-xs sm:text-sm font-medium text-[#1F2937] hover:text-[#1E3A2F] hover:bg-white/80 h-8.5 sm:h-9 rounded-lg"
                      >
                        <User className="w-4 h-4 text-[#D97706]" />
                        Profile
                      </Button>
                    </Link>

                    <Button
                      onClick={handleSignOut}
                      variant="ghost"
                      className="w-full justify-start gap-2.5 text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50/80 h-8.5 sm:h-9 rounded-lg cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Sign Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href={"/login"}>
                  <Button
                    variant="ghost"
                    className="text-[#1E3A2F] hover:bg-white/70 px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all"
                  >
                    Login
                  </Button>
                </Link>
                <Link href={"/register"}>
                  <Button
                    variant="default"
                    className="bg-[#1E3A2F] hover:bg-[#162B23] text-white px-4 sm:px-5 py-1.5 text-xs sm:text-sm font-semibold shadow-xs rounded-full transition-all"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-xl text-[#1F2937] hover:bg-white/70 border border-white/60 bg-white/40 backdrop-blur-xs transition-colors shadow-2xs"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#1E3A2F]" />
              ) : (
                <Menu className="w-5 h-5 text-[#1E3A2F]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer / Glass Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/40 px-4 pt-3 pb-4 space-y-3 rounded-b-2xl bg-white/80 backdrop-blur-xl">
            <div className="flex flex-col space-y-1">
              {publicLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#1E3A2F] text-white font-semibold shadow-xs"
                        : "text-[#1F2937] hover:bg-white/60"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {user &&
                privateLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#1E3A2F] text-white font-semibold shadow-xs"
                          : "text-[#1F2937] hover:bg-white/60"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
            </div>

            {/* Mobile Auth Buttons (যদি ইউজার লগইন না থাকে) */}
            {!user && (
              <div className="pt-2 border-t border-white/50 flex flex-col gap-2">
                <Link href="/login" onClick={closeMenu} className="w-full">
                  <Button className="w-full bg-[#1E3A2F] hover:bg-[#162B23] text-white text-sm font-semibold py-2 rounded-xl">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={closeMenu} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border-white/80 bg-white/50 backdrop-blur-xs text-[#1E3A2F] hover:bg-white/80 text-sm font-semibold py-2 rounded-xl"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default NaVBar;
