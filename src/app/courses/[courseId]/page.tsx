import React from "react";
import { notFound } from "next/navigation";
import { courses } from "@/data/courses";
import CourseDetails from "@/components/courses/CourseDetails";

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

const CoursePage: React.FC<CoursePageProps> = ({ params }) => {
  const { courseId } = params;
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    notFound();
  }

  return <CourseDetails course={course} />;
};

export default CoursePage;
