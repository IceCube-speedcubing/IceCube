// src/app/courses/[id]/page.tsx
import { courses } from "@/data/courses";
import CourseTemplate from "../CourseTemplate";

interface CoursePageProps {
  params: {
    id: string;
  };
}

const CoursePage = ({ params }: CoursePageProps) => {
  const { id } = params;
  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return <div>Course not found</div>;
  }

  return <CourseTemplate course={course} />;
};

export default CoursePage;
