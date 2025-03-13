import UpvoteDemo from "@/components/UpvoteDemo";
import { UpvoteProvider } from "@/context/UpvoteContext";
import Footer from "@/components/Footer";

function App() {
  return (
    <UpvoteProvider>
      <main className="min-h-screen p-8 pb-16 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Upvote Component System</h1>
        <UpvoteDemo />
      </main>
      <Footer />
    </UpvoteProvider>
  );
}

export default App;
