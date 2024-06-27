"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { UserAccountNav } from "@/components/UserAccountNav";
import Image from "next/image";
import { MobileNav } from "@/components/MobileNav";
import { ChevronDown, Clock, ArrowRight } from "lucide-react";

const navItems = [
  { name: "Algorithms", href: "/algs" },
  { 
    name: "Courses", 
    href: "/courses",
    dropdown: [
      {
        name: "Popular Courses",
        courses: [
          { name: "Beginner's Guide to Speedcubing", href: "/courses/beginners-guide", image: "/images/beginners-guide.jpg", duration: "4 weeks" },
          { name: "Advanced CFOP Techniques", href: "/courses/advanced-cfop", image: "/images/advanced-cfop.jpg", duration: "6 weeks" },
          { name: "One-Handed Solving Mastery", href: "/courses/one-handed", image: "/images/one-handed.jpg", duration: "5 weeks" },
          { name: "Blindfolded Solving", href: "/courses/blindfolded", image: "/images/blindfolded.jpg", duration: "8 weeks" },
        ]
        // TODO: Fetch popular courses from the database instead of hardcoding
        // TODO: Implement a caching mechanism to avoid frequent database queries
        // TODO: Add a rating or review count to each course to show popularity
        // TODO: Implement a mechanism to rotate featured courses periodically
      },
      {
        name: "Course Categories",
        categories: [
          { name: "Beginner", href: "/courses/category/beginner", count: 10 },
          { name: "Intermediate", href: "/courses/category/intermediate", count: 15 },
          { name: "Advanced", href: "/courses/category/advanced", count: 8 },
          { name: "Specialized", href: "/courses/category/specialized", count: 5 },
        ]
        // TODO: Fetch category data and course counts from the database
        // TODO: Implement dynamic routing for category pages
        // TODO: Add subcategories if the course structure becomes more complex
      },
      // TODO: Add a section for "New Courses" or "Coming Soon" to highlight fresh content
      // TODO: Implement user-specific course recommendations based on their progress or interests
      // TODO: Add a quick link to resume the user's most recent course if they're logged in
      // TODO: Integrate a search functionality within the dropdown for quick course lookup
    ]
  },
  { name: "About", href: "/about" },
];

// TODO: Implement a function to fetch and update course data periodically
// TODO: Create a context or Redux store to manage global state for course data
// TODO: Implement error handling for failed data fetches
// TODO: Add loading states for when course data is being fetched
// TODO: Optimize images with next/image and implement lazy loading for performance
// TODO: Implement A/B testing for different dropdown layouts or content arrangements
// TODO: Add analytics tracking for dropdown interactions (e.g., which courses are clicked most)


export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLoggedIn = true; // TODO: Replace with actual auth check

  const trackNavigation = (path: string) => {
    // TODO: Replace with actual analytics tracking
    console.log(`Navigated to: ${path}`);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black bg-opacity-50 backdrop-blur-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" onClick={() => trackNavigation('/')}>
            <Image
              src="/images/type-logo-w.png"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>

          <div className="hidden md:flex items-center justify-center flex-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    pathname === item.href ? 'text-white' : ''
                  }`}
                  onClick={() => trackNavigation(item.href)}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="inline-block ml-1" size={14} />}
                </Link>
                {item.dropdown && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-7xl rounded-md shadow-lg bg-[#1f2937] ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                    <div className="grid grid-cols-3 gap-8 p-8" role="menu" aria-orientation="horizontal" aria-labelledby="options-menu">
                      <div className="col-span-2">
                        <h3 className="text-white font-semibold mb-4 text-lg">Popular Courses</h3>
                        <div className="grid grid-cols-2 gap-6">
                          {item.dropdown[0]?.courses?.map((course, courseIndex) => (
                            <Link
                              key={courseIndex}
                              href={course.href}
                              className="flex flex-col space-y-2 text-gray-300 hover:bg-[#374151] hover:text-white p-3 rounded-md transition-colors duration-150 ease-in-out"
                              onClick={() => trackNavigation(course.href)}
                            >
                              <Image src={course.image} alt={course.name} width={200} height={120} className="rounded-md object-cover" />
                              <p className="font-medium">{course.name}</p>
                              <p className="text-xs flex items-center"><Clock size={12} className="mr-1" /> {course.duration}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-4 text-lg">Course Categories</h3>
                        <div className="space-y-2">
                          {item.dropdown[1]?.categories?.map((category, categoryIndex) => (
                            <Link
                              key={categoryIndex}
                              href={category.href}
                              className="flex items-center justify-between text-gray-300 hover:bg-[#374151] hover:text-white p-2 rounded-md transition-colors duration-150 ease-in-out"
                              onClick={() => trackNavigation(category.href)}
                            >
                              <span>{category.name}</span>
                              <span className="text-sm text-gray-400">{category.count} courses</span>
                            </Link>
                          ))}
                        </div>
                        <Link
                          href="/courses"
                          className="mt-6 block text-center bg-[#0A4779] text-white p-2 rounded-md hover:bg-[#0D2E4D] transition-colors duration-150 ease-in-out"
                          onClick={() => trackNavigation('/courses')}
                        >
                          View All Courses <ArrowRight className="inline-block ml-1" size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <UserAccountNav />
            ) : (
              <>
                <Link href="/auth/login" onClick={() => trackNavigation('/auth/login')}>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Log In
                  </Button>
                </Link>
                <div className="w-px h-6 bg-gray-600 mx-2" />
                <Link href="/auth/signup" onClick={() => trackNavigation('/auth/signup')}>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <MobileNav isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </nav>
  );
}

// TODO: Implement internationalization (i18n) for multi-language support
// TODO: Add accessibility features (e.g., aria-labels, keyboard navigation)
// TODO: Add animations for navbar items on page load
// TODO: Optimize performance using React.memo or useMemo where appropriate
// TODO: Add unit and integration tests for the Navbar component
// TODO: Consider implementing a search functionality in the navbar
// TODO: Add support for dynamic navigation items (e.g., fetched from an API)
// TODO: Implement a close mechanism for the dropdown when clicking outside
// TODO: Add a subtle transition for the ChevronDown icon rotation on dropdown open/close