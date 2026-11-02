"use client";

import { useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;
  //   console.log(user);

  //   ব্যবহারকারী কবে একাউন্ট ক্রিয়েট করছে এটা দেখানোর জন্য।
  const formateDate = user?.createdAt
    ? new Date(user?.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Recently joined";

  return (
    <main className="min-h-[80vh] bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-xl mx-auto">
        <Card className="border border-[#E5E7EB] bg-white shadow-sm rounded-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-[#1E3A2F]">
              My Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-6 space-y-4">
            <Avatar className="h-24 w-24 ring-4 ring-[#D97706]/30">
              <AvatarImage
                referrerPolicy="no-referrer"
                src={user?.image as string}
                alt={user?.name || "Profile"}
              />
              <AvatarFallback className="bg-[#1E3A2F] text-white text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-semibold text-[#1F2937]">
                {user?.name || "Guest Reader"}
              </h3>
              <p className="text-sm text-[#6B7280]">{user?.email}</p>
              <div className="flex items-center gap-2 bg-[#FDFBF7] border border-[#E5E7EB] px-4 py-2 rounded-full text-xs font-medium text-[#1E3A2F]">
                <Calendar className="w-3.5 h-3.5 text-[#D97706]" />
                <span>
                  Member since:{" "}
                  <strong className="text-[#1F2937]">{formateDate}</strong>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
