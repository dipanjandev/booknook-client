"use client";

import { BookOpen, User, LogOut } from "lucide-react";
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

  const handleSignOut = () => {
    signOut();
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

  return (
    <div className="bg-[#FFFFFF] border-b border-[#E5E7EB] sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3.5 px-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-[#1E3A2F] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#1E3A2F]">
              BookNook
            </h2>
          </div>
        </Link>

        {/* Dynamic Navigation Links */}
        <div className="flex items-center gap-7 text-sm font-medium text-[#1F2937]">
          {/* Public Links */}
          {publicLinks.map((link) => {
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

          {/* Private Links */}
          {user &&
            privateLinks.map((link) => {
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

        {/* Action Buttons & Avatar Popover */}
        <div className="flex items-center gap-3">
          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    className="rounded-full ring-2 ring-[#D97706]/40 hover:ring-[#D97706] transition-all p-0.5 focus:outline-none"
                  >
                    <Avatar className="h-9 w-9 cursor-pointer">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user?.image as string}
                        alt={user?.name || "User Avatar"}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-[#1E3A2F] text-white font-semibold text-sm">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                }
              />
              <PopoverContent
                align="end"
                className="w-64 p-3 bg-white border border-[#E5E7EB] shadow-lg rounded-xl"
              >
                {/* User Info Header */}
                <div className="flex items-center gap-3 p-2 bg-[#FDFBF7] rounded-lg border border-[#E5E7EB]/60">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image as string}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback className="bg-[#1E3A2F] text-white font-bold">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-[#1F2937] truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-[#6B7280] truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <Separator className="my-2" />

                {/* Navigation Actions */}
                <div className="space-y-1">
                  {/* Profile Page Link */}
                  <Link href="/profile">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2.5 text-sm font-medium text-[#1F2937] hover:text-[#1E3A2F] hover:bg-[#FDFBF7] h-9"
                    >
                      <User className="w-4 h-4 text-[#D97706]" />
                      Profile
                    </Button>
                  </Link>

                  {/* Sign Out Button */}
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    className="w-full justify-start gap-2.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 h-9"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    Sign Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link href={"/login"}>
                <Button
                  variant="default"
                  className="bg-[#1E3A2F] hover:bg-[#162B23] text-white px-5 py-2 font-semibold shadow-sm rounded-md"
                >
                  Login
                </Button>
              </Link>
              <Link href={"/register"}>
                <Button
                  variant="outline"
                  className="border-[#1E3A2F] text-[#1E3A2F] hover:bg-[#FDFBF7] px-5 py-2 font-semibold rounded-md"
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NaVBar;
