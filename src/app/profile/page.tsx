"use client";

import { useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;
  //   console.log(user);

  //   ব্যবহারকারী কবে একাউন্ট ক্রিয়েট করছে এটা দেখানোর জন্য।
  const formateDate = user?.createdAt
    ? new Date(user?.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Recently joined";

  return (
    <main className="min-h-[80vh] bg-[#FDFBF7] py-8 sm:py-12 md:py-16 px-4 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-xl mx-auto">
        <Card className="border border-[#E5E7EB] bg-white shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="text-center p-5 sm:p-6 pb-2 sm:pb-3">
            <CardTitle className="text-xl sm:text-2xl font-bold text-[#1E3A2F]">
              My Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center p-5 sm:p-6 pt-3 sm:pt-4 space-y-4 sm:space-y-5">
            {/* Avatar Responsive Sizing */}
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 ring-4 ring-[#D97706]/30 shrink-0">
              <AvatarImage
                referrerPolicy="no-referrer"
                src={user?.image as string}
                alt={user?.name || "Profile"}
              />
              <AvatarFallback className="bg-[#1E3A2F] text-white text-xl sm:text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            {/* Profile Info */}
            <div className="w-full flex flex-col items-center text-center space-y-1.5 sm:space-y-2">
              <h3 className="text-base sm:text-lg font-semibold text-[#1F2937] wrap-break-words">
                {user?.name || "Guest Reader"}
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] break-all max-w-70 sm:max-w-sm">
                {user?.email}
              </p>

              {/* Member Since Badge */}
              <div className="mt-2 inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#FDFBF7] border border-[#E5E7EB] px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-medium text-[#1E3A2F] shadow-2xs">
                <Calendar className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span className="truncate">
                  Member since:{" "}
                  <strong className="text-[#1F2937] font-semibold">
                    {formateDate}
                  </strong>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
