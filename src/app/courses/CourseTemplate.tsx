// src/app/courses/CourseTemplate.tsx
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Course } from "@/data/courses";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import {
  CheckCircle2,
  BookOpen,
  Play,
  Clock,
  Users,
  BookOpenIcon,
  CodeIcon,
  CpuIcon,
  ZapIcon,
} from "lucide-react";
import { Background } from "@/components/Background";

interface CourseTemplateProps {
  course: Course;
}

const CourseTemplate = ({ course }: CourseTemplateProps) => {
  const renderModuleIcon = (icon: React.ReactNode) => {
    switch (icon) {
      case (<BookOpen />):
        return (
          <BookOpenIcon className="h-5 w-5 mr-2 inline-block text-[#00406C]" />
        );
      case (<CodeIcon />):
        return (
          <CodeIcon className="h-5 w-5 mr-2 inline-block text-[#00406C]" />
        );
      case (<CpuIcon />):
        return <CpuIcon className="h-5 w-5 mr-2 inline-block text-[#00406C]" />;
      case (<ZapIcon />):
        return <ZapIcon className="h-5 w-5 mr-2 inline-block text-[#00406C]" />;
      default:
        return null;
    }
  };

  return (
    <main className="relative min-h-screen bg-gray-100 text-gray-800">
      <Background />
      <div className="relative z-10">
        <MaxWidthWrapper>
          <div className="py-16">
            {/* Course Hero Section */}
            {/* TODO: Add a loading state or skeleton for the hero section */}
            <div className="relative h-[500px] rounded-lg overflow-hidden mb-16">
              <Image
                src="/course-hero-bg.jpg" // Replace with your background image
                alt="Course Hero"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center justify-center">
                <div className="text-center text-white max-w-2xl">
                  <h1 className="text-5xl font-bold mb-4">{course.title}</h1>
                  <p className="text-xl mb-2">by {course.instructor}</p>
                  <p className="text-lg mb-6">{course.description}</p>
                  <Link href={`/courses/${course.id}/enroll`}>
                    <Button
                      variant="default"
                      className="bg-[#00406C] hover:bg-[#002d4a] text-white transition-colors duration-300 px-6 py-3 rounded-lg"
                    >
                      Enroll Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Course Overview */}
            {/* TODO: Add a loading state or skeleton for the course overview section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
              {/* ... */}
            </div>

            {/* Course Curriculum */}
            {/* TODO: Add a loading state or skeleton for the course curriculum section */}
            <div className="mb-24">
              <h2 className="text-3xl font-bold mb-4 text-[#00406C]">
                Course Curriculum
              </h2>
              <Accordion type="single" collapsible>
                {course.modules.map((module, index) => (
                  <AccordionItem key={index} value={`module-${index}`}>
                    <AccordionTrigger>
                      {renderModuleIcon(module.icon)}
                      <span className="text-lg font-semibold">
                        {module.name}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 gap-4">
                        {module.lessons.map((lesson) => (
                          <Card
                            key={lesson.id}
                            className="rounded-lg shadow-md bg-white transition-colors duration-300"
                          >
                            <CardHeader className="bg-white p-4">
                              <CardTitle className="text-xl">
                                {lesson.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                              <p className="text-base text-gray-600 mb-4">
                                {lesson.description}
                              </p>
                              <Link href={lesson.video}>
                                <Button
                                  variant="default"
                                  className="bg-[#00406C] hover:bg-[#002d4a] text-white transition-colors duration-300 px-4 py-2 rounded-lg"
                                >
                                  Watch Video
                                </Button>
                              </Link>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Course Details */}
            {/* TODO: Add a loading state or skeleton for the course details section */}
            <div className="mb-24">
              <h2 className="text-3xl font-bold mb-4 text-[#00406C]">
                Course Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* ... */}
              </div>
            </div>

            {/* Instructor Section */}
            {/* TODO: Add a loading state or skeleton for the instructor section */}
            <div className="mb-24">
              <h2 className="text-3xl font-bold mb-4 text-[#00406C]">
                Instructor
              </h2>
              <div className="flex items-center">
                <Image
                  src="/instructor-avatar.jpg" // Replace with instructor's profile picture
                  alt={course.instructor}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-bold">{course.instructor}</h3>
                  <p className="text-base text-gray-600">
                    {course.instructorBio}
                  </p>
                </div>
              </div>
              {/* TODO: Add a loading state or skeleton for the instructor's other courses section */}
              {course.instructorCourses &&
                Array.isArray(course.instructorCourses) && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">
                      Other Courses by {course.instructor}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {course.instructorCourses.map((otherCourse) => (
                        <Card
                          key={otherCourse.id}
                          className="rounded-lg shadow-md bg-white transition-colors duration-300"
                        >
                          <CardHeader className="bg-white p-4">
                            <CardTitle className="text-xl">
                              {otherCourse.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4">
                            <p className="text-base text-gray-600 mb-4">
                              {otherCourse.description}
                            </p>
                            <Link href={`/courses/${otherCourse.id}`}>
                              <Button
                                variant="default"
                                className="bg-[#00406C] hover:bg-[#002d4a] text-white transition-colors duration-300 px-4 py-2 rounded-lg"
                              >
                                View Course
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* FAQ Section */}
            {/* TODO: Add a loading state or skeleton for the FAQ section */}
            <div className="mb-24">
              <h2 className="text-3xl font-bold mb-4 text-[#00406C]">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible>
                {course.faq && Array.isArray(course.faq) ? (
                  course.faq.map(
                    (
                      faq: { question: string; answer: string },
                      index: number
                    ) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger>
                          <span className="text-lg font-semibold">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-base text-gray-600">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  )
                ) : (
                  <p className="text-base text-gray-600">
                    No FAQ available yet.
                  </p>
                )}
              </Accordion>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </main>
  );
};

export default CourseTemplate;

// TODO: Implement server-side rendering (SSR) or static site generation (SSG) for better performance
// TODO: Add support for course progress tracking and completion
// TODO: Implement a rating system for courses
// TODO: Add social sharing functionality for courses
// TODO: Implement a course recommendation system based on user preferences and behavior
// TODO: Add support for course discussions and Q&A
// TODO: Implement a course certificate generation system
// TODO: Add support for course bundles and discounts
// TODO: Implement a course search functionality
// TODO: Add support for course subtitles and translations
// TODO: Implement a course review system
// TODO: Add support for course notifications and reminders
// TODO: Implement a course analytics and reporting system
// TODO: Add support for course quizzes and assessments
// TODO: Implement a course payment and subscription system
// TODO: Add support for course prerequisites and dependencies
// TODO: Implement a course content management system for instructors
// TODO: Add support for course live streaming and webinars
// TODO: Implement a course gamification system with badges and achievements
// TODO: Add support for course offline viewing and downloading
// TODO: Implement a course accessibility features (e.g., closed captions, screen reader support)