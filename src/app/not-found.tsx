import Link from "next/link";
import { Background } from "@/components/Background";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <Background />
      <div className="text-center z-10">
        <h1 className="text-4xl font-bold text-white mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Home className="mr-2 h-4 w-4" /> Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
