import React from "react";
import Image from "next/image";
import { Star, Clock, User, Calendar } from "lucide-react";
import { Background } from "@/components/Background";

interface CourseDetailsProps {
  course: {
    id: string;
    title: string;
    description: string;
    level: string;
    duration: string;
    imageUrl: string;
    rating: number;
    instructor: string;
    category: string;
    numLessons: number;
    totalDuration: string;
    lastUpdated: string;
  };
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course }) => {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="relative h-96">
        <Image
          src={course.imageUrl}
          alt={course.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <Background />
      <div className="p-8 bg-white text-black shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
        <div className="flex items-center mb-6">
          <span className="bg-gray-200 text-gray-800 text-sm font-semibold px-3 py-2 rounded-full mr-4">
            {course.level}
          </span>
          <span className="text-gray-600 font-medium text-sm flex items-center mr-4">
            <Clock size={16} className="mr-2" />
            {course.duration}
          </span>
          <div className="bg-gray-200 text-gray-800 text-sm font-semibold px-3 py-2 rounded-full flex items-center">
            <Star size={16} className="mr-2" />
            {course.rating}
          </div>
        </div>
        <p className="text-gray-700 mb-8">{course.description}</p>
        <div className="flex items-center mb-8">
          <User size={16} className="text-gray-600 mr-2" />
          <span className="text-gray-600 text-sm">{course.instructor}</span>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Course Details</h2>
          <div className="flex items-center mb-2">
            <span className="text-gray-600 font-medium text-sm flex items-center mr-4">
              <Calendar size={16} className="mr-2" />
              Last Updated: {course.lastUpdated}
            </span>
            <span className="text-gray-600 font-medium text-sm flex items-center mr-4">
              <Clock size={16} className="mr-2" />
              Total Duration: {course.totalDuration}
            </span>
            <span className="text-gray-600 font-medium text-sm flex items-center">
              <User size={16} className="mr-2" />
              {course.numLessons} Lessons
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
          {/* Render course curriculum here */}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
