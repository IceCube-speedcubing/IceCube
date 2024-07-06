"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  // Animations for text and image entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center px-4 md:px-8 lg:px-16 pt-20 md:pt-28">
      <motion.div
        className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="w-full md:w-1/2 mb-12 md:mb-0"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center md:text-left">
            The All-in-one <br />
            <span className="bg-gradient-to-br from-[#276ea8] to-[#061253] text-transparent bg-clip-text">
              Speedcubing
            </span>{" "}
            <br />
            website
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-300 text-center md:text-left">
            Master advanced algorithms, track your progress, and join a global
            community of cubers. IceCube empowers you to shatter your records
            and dominate the world of speedcubing.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link href="/auth/signup">
              <Button className="text-lg px-8 py-3 bg-[#0A4779] hover:bg-[#083A61] focus:outline-none focus:ring-2 focus:ring-[#0A4779] focus:ring-opacity-50">
                Join Now
                <UserPlus className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          variants={itemVariants}
        >
          <div
            className="relative group w-full max-w-md"
            role="img"
            aria-label="IceCube Logo with glowing effect"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-[#0A4779] to-[#0D2E4D] rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              <Image
                src="/images/IceCube-logo.png"
                alt="IceCube Logo - A stylized cube representing the IceCube speedcubing platform"
                width={400}
                height={400}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105 opacity-75"
                loading="eager"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Schema markup for better SEO
export function HeroSectionSchema() {
  return (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "IceCube",
        description:
          "The all-in-one speedcubing website for mastering advanced algorithms, tracking progress, and joining a global community of cubers.",
        url: "https://www.icecube-speedcubing.com", // Replace with your actual URL
      })}
    </script>
  );
}

// TODO: Implement A/B testing for different headline variations
// TODO: Add event tracking for the "Join Now" button click
// TODO: Optimize component re-renders using React.memo or useMemo where appropriate
// TODO: Add unit and integration tests for the HeroSection component
// TODO: Implement internationalization (i18n) for multi-language support
// TODO: Consider adding a video background or animated cube as an alternative to the static image
