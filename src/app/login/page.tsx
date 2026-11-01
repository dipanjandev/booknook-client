"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, KeyRound, Loader2, Mail } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { signIn } from "@/lib/auth-client";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Credentials Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await signIn.email({
      ...formData,
    });
    // console.log(data?.user.name);

    // ব্যবহারকারীর নাম দেখানোর জন্য এটা ব্যবহার করা হয়েছে।
    const name = data?.user.name;

    if (data) {
      toast.success(`Welcome back ${name}`);
      router.push(redirectPath);
    }
    if (error) {
      toast.error("Something Went Wrong Please Check Again!");
    }
  };

  // Google Social Login Handler
  const handleGoogleLogin = async () => {
    try {
      // TODO: গুগল সোশ্যাল লগইন মেথড ট্রিগার করুন
      toast.success("Redirecting with Google...");
      router.push(redirectPath);
    } catch {
      toast.error("Failed to authenticate with Google.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border border-[#E5E7EB] bg-white shadow-md rounded-2xl overflow-hidden">
        {/* Header */}
        <CardHeader className="space-y-2 text-center pb-6 border-b border-[#F3F4F6]">
          <div className="mx-auto w-12 h-12 rounded-xl bg-[#1E3A2F]/10 flex items-center justify-center text-[#1E3A2F] mb-1">
            <BookOpen className="w-6 h-6 text-[#1E3A2F]" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-[#1E3A2F]">
            Sign in to BookNook
          </CardTitle>
          <CardDescription className="text-sm text-[#6B7280]">
            Enter your details to access your books and shelf.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-wider text-[#1F2937]"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="reader@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 bg-[#FDFBF7]/50 border-[#E5E7EB] focus-visible:ring-[#1E3A2F]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-wider text-[#1F2937]"
                >
                  Password
                </Label>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 bg-[#FDFBF7]/50 border-[#E5E7EB] focus-visible:ring-[#1E3A2F]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E3A2F] hover:bg-[#162B23] text-white font-semibold py-2.5 h-auto rounded-lg shadow-sm transition-all"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Separator */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="bg-[#E5E7EB]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2.5 text-[#6B7280] font-medium tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Google Login Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full border-[#E5E7EB] bg-white hover:bg-[#FDFBF7] text-[#1F2937] font-medium py-2.5 h-auto rounded-lg shadow-xs flex items-center justify-center gap-3 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            <span>Continue with Google</span>
          </Button>
        </CardContent>

        {/* Footer: Register Route */}
        <CardFooter className="bg-[#FDFBF7]/60 border-t border-[#F3F4F6] py-4 flex justify-center text-xs text-[#6B7280]">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="ml-1 font-semibold text-[#1E3A2F] hover:text-[#D97706] transition-colors"
          >
            Create an account
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
