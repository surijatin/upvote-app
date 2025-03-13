import { ArrowUp } from "lucide-react";

interface UpvoteProps {
  isSelected: boolean;
  onToggle: () => void;
}

export default function Upvote({ isSelected, onToggle }: UpvoteProps) {
  return (
    <button
      onClick={onToggle}
      className={`${"w-10 h-10 rounded-md flex items-center justify-center transition-colors"} ${
        isSelected ? "bg-[#E5E8FD]" : "bg-[#F4F6F8]"
      }`}
      aria-pressed={isSelected}
    >
      <ArrowUp
        className={`w-5 h-5 transition-colors ${
          isSelected ? "text-[#253CF2]" : "text-[#343A40]"
        }`}
        strokeWidth={2.5}
      />
    </button>
  );
}
