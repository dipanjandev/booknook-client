import HeroSlider from "@/components/HeroSlider";
import { IBookType } from "./allbooks/page";
import RecentBooks from "@/components/RecentBooks";

export default async function Home() {
  const res = await fetch("http://localhost:5000/recentlyadded");
  const allBooks: IBookType[] = await res.json();
  return (
    <div>
      <HeroSlider allBooks={allBooks} />
      <RecentBooks />
    </div>
  );
}
