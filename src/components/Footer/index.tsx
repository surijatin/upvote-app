import React from "react";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 py-3 bg-white text-center text-gray-600 border-t">
      <p>
        Developed by{" "}
        <a
          href="https://jatinsuri.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Jatin Suri
        </a>
      </p>
    </footer>
  );
}
