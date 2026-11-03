import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // আপনার Better Auth সার্ভার ইন্সট্যান্স
import { Button } from "@/components/ui/button";
import BorrowRow, { IBorrowItem } from "@/components/BorrowRow";

export const dynamic = "force-dynamic";

const MyBorrowsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  // ২. লগইন না থাকলে লগইন বাটন দেখানো
  if (!user) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-4 bg-[#FDFBF7] px-4">
        <p className="text-[#1F2937] font-medium">
          Please log in to view your borrowed books.
        </p>
        <Link href="/login">
          <Button className="bg-[#1E3A2F] hover:bg-[#162B23] text-white">
            Login
          </Button>
        </Link>
      </div>
    );
  }

  // ৩. ব্যাকএন্ড থেকে সার্ভার-সাইডে ইউজারের ধার করা বই ফেচ করা
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/myborrows/${user.email}`,
  );
  const borrows: IBorrowItem[] = await res.json();

  return (
    <div className="min-h-[85vh] bg-[#FDFBF7] py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {borrows.length === 0 ? (
          /* বই না থাকলে খালি স্টেট */
          <div className="min-h-[45vh] flex flex-col items-center justify-center text-center space-y-4 bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-xs">
            <h2 className="text-xl font-normal text-[#4B5563] font-serif">
              You have not borrowed any books yet.
            </h2>
            <Link href="/allbooks">
              <Button className="bg-[#1E3A2F] hover:bg-[#162B23] text-white px-6 py-2 rounded-md font-medium">
                Browse Books
              </Button>
            </Link>
          </div>
        ) : (
          /* স্ক্রিনশট অনুযায়ী টেবিল কনটেইনার */
          <div className="bg-[#FAF7F2] border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-xs font-semibold text-[#1F2937]">
                    <th className="py-4 px-6">Image</th>
                    <th className="py-4 px-6">Title</th>
                    <th className="py-4 px-6">Borrow Date</th>
                    <th className="py-4 px-6">Return Date</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {borrows.map((item) => (
                    <BorrowRow key={item._id} item={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBorrowsPage;
