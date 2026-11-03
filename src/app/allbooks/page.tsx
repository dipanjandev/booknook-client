import BooksCard from "@/components/BooksCard";

export interface IBookType {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  quantity: number;
  userName: string;
  userEmail: string;
  addedDate: string;
}

const AllBooksPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allbooks`, {
    cache: "no-store", // রিয়েল-টাইম আপডেটের জন্য
  });
  const allBooks: IBookType[] = await res.json();

  return (
    <div className="min-h-screen  py-10">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="border-b border-[#E5E7EB] pb-6 mb-10 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-[#D97706]" />
              <span className="text-xs font-semibold tracking-wider uppercase text-[#D97706]">
                Catalog
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#1E3A2F] tracking-tight">
              All Books
            </h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Every book on the BookNook shelf available for reading and
              borrowing.
            </p>
          </div>

          {/* Book Count Badge */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] px-4 py-2 rounded-md shadow-sm">
            <span className="text-xs text-[#6B7280]">Total Collection: </span>
            <span className="text-sm font-bold text-[#1E3A2F]">
              {allBooks?.length || 0} Books
            </span>
          </div>
        </div>

        {/* Books Grid */}
        {allBooks && allBooks.length > 0 ? (
          <div className="grid grid-cols-5 gap-8">
            {allBooks.map((book) => (
              <BooksCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] shadow-sm">
            <p className="text-lg font-semibold text-[#1E3A2F]">
              No books found on the shelf.
            </p>
            <p className="text-sm text-[#6B7280] mt-1">
              Check back later or add a new book to the library.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooksPage;
