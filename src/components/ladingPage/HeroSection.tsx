import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center px-4 md:px-8 lg:px-16 pt-20 md:pt-28">
      {/* ^ Added pt-20 for mobile and pt-28 for larger screens */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          {/* TODO: Consider making the headline text customizable through props or CMS */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center md:text-left">
            The All-in-one <br />
            <span className="bg-gradient-to-br from-[#276ea8] to-[#061253] text-transparent bg-clip-text">Speedcubing</span> <br />
            website
          </h1>
          {/* TODO: Implement a reusable component for gradient or animated text */}
          <p className="text-lg md:text-xl mb-6 text-gray-300 text-center md:text-left">
            Master advanced algorithms, track your progress, and join a global
            community of cubers. IceCube empowers you to shatter your records
            and dominate the world of speedcubing.
          </p>
          {/* TODO: Add hover and focus states for better accessibility */}
          {/* TODO: Consider adding an icon to the button for visual interest */}
          <div className="flex justify-center md:justify-start">
            <Button className="text-lg px-8 py-3 bg-[#0A4779] hover:bg-[#083A61]">
              Start Cubing
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative group w-full max-w-md">
            {/* TODO: Optimize the glow effect for better performance on lower-end devices */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#0A4779] to-[#0D2E4D] rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              {/* TODO: Implement lazy loading for the image */}
              {/* TODO: Add alt text that's more descriptive for better SEO and accessibility */}
              <Image
                src="/images/IceCube-logo.png"
                alt="IceCube Logo"
                width={400}
                height={400}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// TODO: Implement responsive design improvements for smaller screens
// TODO: Add animations for text and image entrance when the component mounts
// TODO: Consider adding a background pattern or subtle animation to increase visual interest
// TODO: Implement A/B testing for different headline variations
// TODO: Add event tracking for the "Start Cubing" button click
// TODO: Optimize component re-renders using React.memo or useMemo where appropriate
// TODO: Add unit and integration tests for the HeroSection component
// TODO: Implement internationalization (i18n) for multi-language support
// TODO: Consider adding a video background or animated cube as an alternative to the static image
// TODO: Implement keyboard navigation for better accessibility
// TODO: Add schema markup for better SEO
