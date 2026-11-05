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
    cache: "no-store", // রিয়েল-টাইম আপডেটের জন্য
  });
  const allBooks: IBookType[] = await res.json();

  return (
    <div className="min-h-screen py-6 sm:py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="border-b border-[#E5E7EB] pb-6 mb-8 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="h-2 w-2 rounded-full bg-[#D97706]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#D97706]">
                Catalog
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1E3A2F] tracking-tight">
              All Books
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1 max-w-md">
              Every book on the BookNook shelf available for reading and
              borrowing.
            </p>
          </div>

          {/* Book Count Badge */}
          <div className="w-full sm:w-auto bg-[#FFFFFF] border border-[#E5E7EB] px-3.5 py-2 rounded-md shadow-xs flex sm:inline-flex items-center justify-between sm:justify-start gap-1.5">
            <span className="text-xs text-[#6B7280]">Total Collection: </span>
            <span className="text-xs sm:text-sm font-bold text-[#1E3A2F]">
              {allBooks?.length || 0} Books
            </span>
          </div>
        </div>

        {/* Books Grid */}
        {allBooks && allBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {allBooks.map((book) => (
              <BooksCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-14 sm:py-20 px-4 bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] shadow-xs">
            <p className="text-base sm:text-lg font-semibold text-[#1E3A2F]">
              No books found on the shelf.
            </p>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
              Check back later or add a new book to the library.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooksPage;
