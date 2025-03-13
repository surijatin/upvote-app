import UpvoteList from "@/components/UpvoteList";

export default function UpvoteDemo() {
  return (
    <div className="flex flex-col gap-6">
      <UpvoteList id="list-a" title="List A" initialCount={3} />
      <UpvoteList id="list-b" title="List B" initialCount={5} />
      <UpvoteList id="list-c" title="List C" initialCount={2} />
      <UpvoteList id="list-d" title="List D" initialCount={4} />
    </div>
  );
}
