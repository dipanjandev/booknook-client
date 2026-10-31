import type { Metadata } from "next";
import { Libre_Baskerville, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NaVBar from "@/components/NaVBar";
import FooterSection from "@/components/FooterSection";
import { Toaster } from "react-hot-toast";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const liberBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BookNook",
  description: "BookNook - A Small Online Library",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", geist.variable)}
    >
      <body
        className={`${liberBaskerville.className} min-h-full flex flex-col`}
      >
        <NaVBar />
        <div>{children}</div>
        <FooterSection />
        <Toaster />
      </body>
    </html>
  );
}
