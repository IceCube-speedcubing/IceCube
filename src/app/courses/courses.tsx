// pages/courses.tsx
import CourseCard from "@/components/courses/CourseCard";
import { courses } from "@/data/courses";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CoursesPage: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-[#00253E]">
      <MaxWidthWrapper>
        <div className="py-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl text-center mb-8">
            Courses
          </h1>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-prose mx-auto text-center mb-8">
            Accelerate your progress with our expertly designed cubing courses
            tailored to your skill level and event preferences. Unlock new
            techniques and strategies to shave off precious seconds from your
            solves.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/courses/new">
              <Button
                variant="default"
                className="bg-[#00406C] hover:bg-[#002d4a] text-white"
              >
                Create New Course
              </Button>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default CoursesPage;
