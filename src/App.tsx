import UpvoteDemo from "@/components/UpvoteDemo";
import { UpvoteProvider } from "@/context/UpvoteContext";

function App() {
  return (
    <UpvoteProvider>
      <main className="min-h-screen p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Upvote Component System</h1>
        <UpvoteDemo />
      </main>
    </UpvoteProvider>
  );
}

export default App;
