// src/app/courses/page.tsx
import CourseCard from "@/components/courses/CourseCard";
import { courses } from "@/data/courses";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Background } from "@/components/Background";
import Link from "next/link";

const CoursesPage: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <Background />
      <div className="pt-24 z-10 relative">
        <MaxWidthWrapper>
          <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/courses/new">
                <div className="bg-gradient-to-r from-[#00406C] to-[#002d4a] text-white text-lg font-semibold px-8 py-4 rounded-full">
                  Create New Course
                </div>
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default CoursesPage;
