"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  level: string;
  duration: string;
  instructor: string;
  imageUrl: string;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Beginner's Guide to Cubing",
    description:
      "Learn the basics of solving the 3x3 Rubik's Cube in this comprehensive course for beginners.",
    shortDescription: "Learn the basics of solving the 3x3 Rubik's Cube.",
    level: "Beginner",
    duration: "2 hours",
    instructor: "John Doe",
    imageUrl: "/courses/beginner.jpg",
  },
  {
    id: "2",
    title: "Advanced Cubing Techniques",
    description:
      "Take your cubing skills to the next level with advanced techniques and algorithms.",
    shortDescription: "Master advanced techniques for solving cubes.",
    level: "Advanced",
    duration: "4 hours",
    instructor: "Jane Smith",
    imageUrl: "/courses/advanced.jpg",
  },
  // Add more courses as needed
];

const CoursesPage = () => {
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  const handleCardClick = (courseId: string) => {
    setExpandedCourseId((prevId) => (prevId === courseId ? null : courseId));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isExpanded={course.id === expandedCourseId}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button>
          <Link href="/courses/new">Create New Course</Link>
        </Button>
      </div>
    </div>
  );
};

const CourseCard = ({
  course,
  isExpanded,
  onCardClick,
}: {
  course: Course;
  isExpanded: boolean;
  onCardClick: (courseId: string) => void;
}) => {
  return (
    <div
      className="cursor-pointer"
      onClick={() => onCardClick(course.id)}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <Image
            src={course.imageUrl}
            alt={course.title}
            width={640}
            height={360}
            className="w-full h-auto rounded-t-lg"
          />
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle>{course.title}</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
            {course.shortDescription}
          </CardDescription>
          {isExpanded && (
            <div className="mt-4">
              <p className="text-gray-600 dark:text-gray-400">
                {course.description}
              </p>
              <div className="mt-2">
                <p>
                  <strong>Level:</strong> {course.level}
                </p>
                <p>
                  <strong>Duration:</strong> {course.duration}
                </p>
                <p>
                  <strong>Instructor:</strong> {course.instructor}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const ComingSoon = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Courses</h1>
        <p className="text-lg text-gray-600">
          We are currently working on our courses section.
        </p>
        <p className="text-lg text-gray-600 mb-8">Coming Soon!</p>
        <div className="animate-pulse">
          <span className="text-6xl">🚧</span>
        </div>
      </div>
    );
  };
  
  export default ComingSoon;
  