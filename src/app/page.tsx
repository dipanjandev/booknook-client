import HeroSlider from "@/components/homepage-components/HeroSlider";
import { IBookType } from "./allbooks/page";
import RecentBooks from "@/components/RecentBooks";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allbooks`);
  const allBooks: IBookType[] = await res.json();
  return (
    <div>
      <HeroSlider allBooks={allBooks} />
      <RecentBooks />
    </div>
  );
}
