// components/courses/CourseCard.tsx
import Image from "next/image";
import Link from "next/link";
import { courses } from "@/data/courses";
import { Star, Clock, User, Calendar } from "lucide-react";

interface CourseCardProps {
  course: (typeof courses)[number];
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="bg-black bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-full">
        <div className="relative h-56">
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white">{course.title}</h3>
            <div className="bg-black bg-opacity-60 text-white text-sm font-semibold px-3 py-2 rounded-full flex items-center">
              <Star size={16} className="mr-2" />
              {course.rating}
            </div>
          </div>
          <p className="text-gray-300 line-clamp-3 mb-4">
            {course.description}
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="bg-black bg-opacity-60 text-white text-sm font-semibold px-3 py-2 rounded-full mr-3">
                {course.level}
              </span>
              <span className="text-gray-300 font-medium text-sm flex items-center">
                <Clock size={16} className="mr-2" />
                {course.duration}
              </span>
            </div>
            <div className="flex items-center">
              <User size={16} className="text-gray-300 mr-2" />
              <span className="text-gray-300 text-sm">{course.instructor}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm flex items-center">
              <Calendar size={16} className="mr-2" />
              {course.lastUpdated}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
