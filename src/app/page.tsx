import HeroSlider from "@/components/homepage-components/HeroSlider";
import { IBookType } from "./allbooks/page";
import RecentBooks from "@/components/RecentBooks";
import LibraryRulesAndGuidline from "@/components/homepage-components/LibraryRulesAndGuidline";
import LiteraryQuotesSlider from "@/components/homepage-components/LiteraryQuotesSlider";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allbooks`);
  const allBooks: IBookType[] = await res.json();
  return (
    <div>
      <HeroSlider allBooks={allBooks} />
      <RecentBooks />
      <LibraryRulesAndGuidline />
      <LiteraryQuotesSlider />
    </div>
  );
}
