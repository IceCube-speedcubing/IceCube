import React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Background } from "@/components/Background";
import { ArrowRight } from "lucide-react";

interface ComingSoonProps {
  title: string;
  message?: string;
  emoji?: string;
  linkText?: string;
  linkHref?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title,
  message,
  emoji,
  linkText,
  linkHref,
}) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 flex items-center justify-center">
      <Background />
      <div className="relative z-10 w-full">
        <MaxWidthWrapper>
          <div className="mx-auto text-center flex flex-col items-center max-w-3xl animate-fade-in-up">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl animate-fade-in-down">
              {title}
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-prose animate-fade-in">
              {message ||
                "We are currently working on this exciting new feature."}
            </p>
            <div className="mt-8 animate-bounce">
              <span className="text-6xl">{emoji || "🚧"}</span>
            </div>
            <p className="mt-6 text-xl font-semibold text-gray-100 animate-fade-in">
              Coming Soon!
            </p>
            {linkText && linkHref && (
              <div className="mt-8 animate-fade-in-up">
                <Link href={linkHref}>
                  <Button
                    variant="default"
                    className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-semibold py-3 px-6 shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                  >
                    {linkText} 
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default ComingSoon;
