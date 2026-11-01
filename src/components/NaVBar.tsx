"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

const NaVBar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  // console.log(user);

  const handleSignOut = () => {
    signOut();
  };

  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/allbooks" },
    { name: "Add Books", href: "/addbooks" },
    { name: "My Books", href: "/mybooks" },
    { name: "My Borrows", href: "/myborrows" },
  ];

  return (
    <div className="bg-[#FFFFFF] border-b border-[#E5E7EB]">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#1E3A2F] flex items-center justify-center text-white shadow-sm">
            {/* Lucide React কম্পোনেন্ট */}
            <BookOpen className="w-5 h-5 text-white" />
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
          {/* এখানে আমারা কন্ডিশনাল রেন্ডারিং করলাম। */}
          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <Avatar>
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image as string}
                    />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                }
              ></PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>{user?.name}</PopoverTitle>
                  <PopoverDescription>
                    <p>{user?.email}</p>
                    <Button
                      onClick={handleSignOut}
                      variant={"destructive"}
                      className={"w-full"}
                    >
                      SignOut
                    </Button>
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link href={"/login"}>
                <Button
                  variant="default"
                  className="bg-[#1E3A2F] hover:bg-[#162B23] text-white px-5 py-2 font-semibold shadow-sm"
                >
                  Login
                </Button>
              </Link>
              <Link href={"/register"}>
                <Button
                  variant="outline"
                  className="border-[#1E3A2F] text-[#1E3A2F] hover:bg-[#FDFBF7] px-5 py-2 font-semibold"
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
