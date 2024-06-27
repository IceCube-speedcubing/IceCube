"use client";

import { useEffect, useState, useRef } from "react";

export function Background() {
  const [scrollY, setScrollY] = useState(0);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const initialTransition = 500; // Scroll position where initial transition completes
  const fadeGrowth = 1500; // Additional scroll for fade to grow

  const gradientProgress = Math.min(scrollY / initialTransition, 1);
  const fadeSize = Math.max(
    0,
    Math.min((scrollY - initialTransition) / fadeGrowth, 1)
  );

  const gradientStyle = {
    background: `
      linear-gradient(
        ${135 - gradientProgress * 90}deg,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,0.8) ${40 + fadeSize * 60}%,
        rgba(0,0,0,0.6) ${60 + fadeSize * 40}%,
        rgba(0,0,0,0.4) ${80 + fadeSize * 20}%,
        rgba(0,0,0,0) ${100 + fadeSize * 100}%
      )
    `,
  };

  return (
    <div className="fixed inset-0 w-full h-full">
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('/images/gradiantBackground.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div
        className="absolute inset-0 transition-all duration-300"
        style={gradientStyle}
      />
    </div>
  );
}
