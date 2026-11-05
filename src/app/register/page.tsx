"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ১. রাউটার ইমপোর্ট করা হলো
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { signIn, signUp } from "@/lib/auth-client";

const RegisterPage = () => {
  const router = useRouter(); // ২. রাউটার ইনিশিয়ালাইজ করা হলো

  // ইনপুটের ডেটা রাখার স্টেট
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");

  // ইনপুট টাইপ হ্যান্ডলার
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") setPasswordError("");
  };

  // পাসওয়ার্ড ভ্যালিডেশন
  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    return "";
  };

  // ৩. ইমেইল রেজিস্ট্রেশন সাবমিট হ্যান্ডলার
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // পাসওয়ার্ড চেক
    const errorPass = validatePassword(formData.password);
    if (errorPass) {
      setPasswordError(errorPass);
      toast.error(errorPass);
      return;
    }

    const { data, error } = await signUp.email({
      ...formData,
    });

    if (data) {
      // সফল হলে মেসেজ দেখাবে এবং লগইন পেজে নিয়ে যাবে
      toast.success("Account created successfully!");
      router.push("/"); // এখানে রিডাইরেক্ট যোগ করা হয়েছে
    }

    if (error) {
      toast.error(error.message || "Please use another email.");
    }
  };

  // ৪. গুগল লগইন হ্যান্ডলার
  const handleGoogleRegister = async () => {
    try {
      // গুগল অথেন্টিকেশন শুরু হওয়ার বার্তা
      toast.loading("Connecting with Google...");

      await signIn.social({
        provider: "google",
        callbackURL: "/", // সফল সাইন-ইন শেষে হোম পেজে রিডাইরেক্ট করবে
      });
    } catch {
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
      <Card className="w-full max-w-sm sm:max-w-md border border-[#E5E7EB] bg-white shadow-sm rounded-xl overflow-hidden">
        <CardHeader className="text-center p-5 sm:p-6 pb-3 sm:pb-4">
          <CardTitle className="text-xl sm:text-2xl font-bold text-[#1E3A2F]">
            Register to BookNook
          </CardTitle>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
            Create an account to browse and share books
          </p>
        </CardHeader>

        <CardContent className="p-5 sm:p-6 pt-0">
          <form onSubmit={handleRegister} className="space-y-3.5 sm:space-y-4">
            {/* Name */}
            <div className="space-y-1">
              <Label
                htmlFor="name"
                className="text-xs sm:text-sm font-medium text-[#1F2937]"
              >
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleChange}
                className="text-sm border-[#E5E7EB] focus-visible:ring-[#1E3A2F]"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label
                htmlFor="email"
                className="text-xs sm:text-sm font-medium text-[#1F2937]"
              >
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="reader@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="text-sm border-[#E5E7EB] focus-visible:ring-[#1E3A2F]"
              />
            </div>

            {/* Photo URL */}
            <div className="space-y-1">
              <Label
                htmlFor="image"
                className="text-xs sm:text-sm font-medium text-[#1F2937]"
              >
                Photo URL
              </Label>
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/photo.jpg"
                required
                value={formData.image}
                onChange={handleChange}
                className="text-sm border-[#E5E7EB] focus-visible:ring-[#1E3A2F]"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label
                htmlFor="password"
                className="text-xs sm:text-sm font-medium text-[#1F2937]"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                className="text-sm border-[#E5E7EB] focus-visible:ring-[#1E3A2F]"
              />
              {passwordError && (
                <p className="text-[11px] sm:text-xs text-red-500 font-medium mt-1">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Register Button */}
            <div className="pt-1 sm:pt-2">
              <Button
                type="submit"
                className="w-full bg-[#1E3A2F] hover:bg-[#162B23] text-white font-medium py-2.5 h-auto text-sm sm:text-base rounded-md transition-all cursor-pointer"
              >
                Register
              </Button>
            </div>
          </form>

          {/* Or Divider */}
          <div className="relative my-5 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="bg-[#E5E7EB]" />
            </div>
            <div className="relative flex justify-center text-[11px] sm:text-xs uppercase">
              <span className="bg-white px-2.5 text-[#6B7280]">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-2.5 border-[#E5E7EB] bg-white hover:bg-[#FDFBF7] text-[#1F2937] py-2.5 h-auto text-sm rounded-md transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="truncate">Continue with Google</span>
          </Button>
        </CardContent>

        <CardFooter className="justify-center border-t border-[#F3F4F6] py-3.5 sm:py-4 px-4 text-[11px] sm:text-xs text-[#6B7280] text-center">
          <span>
            Already have an account?{" "}
            <Link
              href="/login"
              className="ml-1 font-semibold text-[#1E3A2F] hover:text-[#D97706] transition-colors"
            >
              Login here
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
