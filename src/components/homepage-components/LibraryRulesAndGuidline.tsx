import React from "react";
import {
  Clock,
  ShieldCheck,
  BookOpenCheck,
  HeartHandshake,
} from "lucide-react";

interface RuleItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
}

const rules: RuleItem[] = [
  {
    id: "01",
    icon: Clock,
    title: "7-Day Borrowing Window",
    subtitle: "Fair reading duration",
    description:
      "Keep borrowed titles for up to 7 days. Return or renew on time so fellow readers can enjoy them without waiting.",
  },
  {
    id: "02",
    icon: ShieldCheck,
    title: "Handle with Love & Care",
    subtitle: "Protect the pages",
    description:
      "Avoid folded corners, marker notes, or accidental stains. Treat every community book as your own keepsake.",
  },
  {
    id: "03",
    icon: BookOpenCheck,
    title: "Thoughtful Shelf Sharing",
    subtitle: "One story at a time",
    description:
      "Only borrow books you are actively reading. This keeps our shelf stock healthy and accessible for everyone.",
  },
  {
    id: "04",
    icon: HeartHandshake,
    title: "Zero Hidden Charges",
    subtitle: "Community trust model",
    description:
      "No membership subscriptions or late fines. Book Nook thrives purely on member goodwill, honesty, and mutual respect.",
  },
];

const LibraryRulesAndGuidline = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-[#F7F4EB]/70 border-y border-[#EAE5D8]">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* সেকশন হেডার */}
        <div className="text-center space-y-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#D97706]">
            Community Guidelines
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1F2937]">
            Library Rules & Ethics
          </h2>
          <p className="text-sm md:text-base text-[#6B7280] max-w-lg mx-auto">
            A few golden rules to keep our shared shelves welcoming, fair, and
            full of stories.
          </p>
        </div>

        {/* মডার্ন ২-কলাম বেন্টো স্টাইল কার্ড গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rules.map((rule) => {
            const Icon = rule.icon;
            return (
              <div
                key={rule.id}
                className="relative overflow-hidden bg-white border border-[#E7E2D6] hover:border-[#1E3A2F]/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-md group flex flex-col justify-between"
              >
                {/* ব্যাকগ্রাউন্ড বড় ওয়াটারমার্ক নম্বর */}
                <span className="absolute -right-2 -bottom-4 text-7xl font-serif font-extrabold text-[#F7F4EB] group-hover:text-[#EFEAD9] select-none pointer-events-none transition-colors">
                  {rule.id}
                </span>

                <div className="relative z-10 space-y-4">
                  {/* আইকন ও আইডি ব্যাজ */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-[#F7F4EB] border border-[#E7E2D6] text-[#1E3A2F] flex items-center justify-center group-hover:bg-[#1E3A2F] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5 transition-colors" />
                    </div>
                    <span className="text-xs font-mono font-semibold text-[#9CA3AF] group-hover:text-[#D97706] transition-colors">
                      RULE {rule.id}
                    </span>
                  </div>

                  {/* টেক্সট ও কন্টেন্ট */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-[#1F2937] tracking-tight group-hover:text-[#1E3A2F] transition-colors">
                      {rule.title}
                    </h3>
                    <p className="text-xs font-medium text-[#D97706]">
                      {rule.subtitle}
                    </p>
                    <p className="text-sm text-[#4B5563] leading-relaxed pt-1">
                      {rule.description}
                    </p>
                  </div>
                </div>

                {/* নিচের ইন্টারেক্টিভ অ্যাকসেন্ট লাইন */}
                <div className="relative z-10 pt-4 mt-4 border-t border-[#F3F0E6] flex items-center justify-between">
                  <span className="text-[11px] text-[#9CA3AF]">BookNook</span>
                  <div className="w-2 h-2 rounded-full bg-[#E2DDD0] group-hover:bg-[#1E3A2F] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LibraryRulesAndGuidline;
