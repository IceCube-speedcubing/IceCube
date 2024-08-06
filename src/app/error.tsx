"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Background } from "@/components/Background";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <Background />
      <div className="text-center z-10 bg-black bg-opacity-50 p-8 rounded-lg backdrop-filter backdrop-blur-lg">
        <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
          Oops! Something went wrong
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
          {error.message ||
            "An unexpected error occurred. Don't worry, we're on it!"}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            onClick={reset}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <RefreshCcw className="mr-2 h-5 w-5" /> Try Again
          </Button>
          <Link href="/">
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
              <Home className="mr-2 h-5 w-5" /> Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
