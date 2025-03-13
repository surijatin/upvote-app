import { useEffect } from "react";
import { Plus } from "lucide-react";
import Upvote from "@/components/UpvoteComponent";
import { useUpvote } from "@/context/UpvoteContext";

export interface UpvoteListProps {
  id: string;
  initialCount?: number;
  title: string;
}

export default function UpvoteList({
  id,
  initialCount = 3,
  title,
}: UpvoteListProps) {
  const { state, dispatch, initializeList } = useUpvote();

  useEffect(() => {
    initializeList(id, title, initialCount);
  }, [id, title, initialCount, initializeList]);

  const listData = state.lists[id];

  // Use stored values or fall back to initial props
  const upvoteCount = listData?.upvoteCount ?? initialCount;
  const isSelected = listData?.isSelected ?? false;

  const toggleSelection = () => {
    dispatch({ type: "TOGGLE_SELECTION", listId: id });
  };

  const addUpvote = () => {
    dispatch({ type: "ADD_UPVOTE", listId: id });
  };

  return (
    <div className="border border-neutral-400 rounded-lg p-4 mb-4">
      <h2 className="font-medium mb-3">{title}</h2>
      <div className="flex gap-2 justify-between">
        <div className="flex flex-wrap gap-2 rounded-lg border p-2 flex-grow">
          {Array.from({ length: upvoteCount }).map((_, index) => (
            <Upvote
              key={index}
              isSelected={isSelected}
              onToggle={toggleSelection}
            />
          ))}
        </div>
        <div className="flex-shrink-0 self-center">
          <button
            onClick={addUpvote}
            className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg hover:bg-gray-200"
            aria-label="Add upvote"
          >
            <Plus className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
