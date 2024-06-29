// src/app/courses/page.tsx
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { courses, Course } from "@/data/courses";
import { Background } from "@/components/Background";
import Image from "next/image";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// TODO: Implement pagination or infinite scrolling for large course catalogs
// TODO: Add course filtering and sorting options
// TODO: Implement a course search functionality
// TODO: Add support for course categories and tags
// TODO: Implement a course recommendation system based on user preferences and behavior
// TODO: Add support for course bundles and discounts
// TODO: Implement a course wishlist or favorites functionality

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="bg-gray-800 text-white transition-colors duration-300 hover:bg-gray-700 rounded-lg overflow-hidden">
        <div className="relative h-64 overflow-hidden">
          <Image
            src="/course-card-bg.jpg" // Replace with your course card background image
            alt={course.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
        <CardHeader className="bg-gray-800 p-4 relative">
          <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
          <div className="absolute top-2 right-2 bg-[#00406C] rounded-full h-6 w-6 flex items-center justify-center">
            <span className="text-white text-sm font-bold">{course.level}</span>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-base text-gray-300 mb-4">{course.description}</p>
          <div className="flex items-center mb-4">
            <Image
              src="/instructor-avatar.jpg" // Replace with instructor's profile picture
              alt={course.instructor}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-gray-300 ml-2">{course.instructor}</span>
          </div>
          <Button
            variant="default"
            className="bg-[#00406C] hover:bg-[#002d4a] text-white transition-colors duration-300 px-4 py-2 rounded-lg w-full"
          >
            View Course
          </Button>
        </CardContent>
      </div>
    </Link>
  );
  // TODO: Add a loading state or skeleton for the course card
  // TODO: Implement a course rating or review system
  // TODO: Add support for course progress tracking and completion
  // TODO: Implement a course wishlist or favorites functionality
};

const CoursesPage = () => {
  return (
    <main className="relative min-h-screen bg-gray-900 text-white">
      <Background />
      <div className="relative z-10">
        <MaxWidthWrapper>
          <div className="py-16">
            <h1 className="text-4xl font-bold mb-8 text-[#00406C]">
              All Courses
            </h1>
            {courses && courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <p className="text-base text-gray-300">No courses available.</p>
            )}
          </div>
        </MaxWidthWrapper>
      </div>
    </main>
  );
  // TODO: Add a loading state or skeleton for the courses page
  // TODO: Implement server-side rendering (SSR) or static site generation (SSG) for better performance
  // TODO: Add support for course categories and tags
  // TODO: Implement a course recommendation system based on user preferences and behavior
  // TODO: Add support for course bundles and discounts
  // TODO: Implement a course search functionality
};

export default CoursesPage;
