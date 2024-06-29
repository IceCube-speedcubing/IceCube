// src/data/courses.ts
import { BookOpen, Code, Cpu, Zap } from "lucide-react";

export interface Course {
  id: number;
  title: string;
  description: string;
  overview: string;
  level: string;
  duration: string;
  instructor: string;
  instructorBio: string;
  rating: number;
  numReviews: number;
  numStudents: number;
  requirements: string[];
  learningOutcomes: string[];
  resources: { title: string; url: string }[];
  modules: {
    name: string;
    icon: React.ReactNode;
    lessons: {
      id: number;
      title: string;
      description: string;
      video: string;
    }[];
  }[];
  reviews: {
    author: string;
    rating: number;
    text: string;
  }[];
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Beginner's Guide to Speedcubing",
    description:
      "Learn the fundamentals of speedcubing and master the basic techniques.",
    overview:
      "This course is designed for beginners who want to learn the art of speedcubing. You'll start with the basics of cube notation and solving methods, and gradually progress to more advanced techniques and algorithms. By the end of the course, you'll be able to solve the 3x3x3 Rubik's Cube efficiently and improve your solving times.",
    level: "Beginner",
    duration: "4 weeks",
    instructor: "John Doe",
    instructorBio:
      "John Doe is a professional speedcuber and coach with over 10 years of experience. He has won numerous competitions and is passionate about teaching others the art of speedcubing.",
    rating: 4.7,
    numReviews: 1234,
    numStudents: 5678,
    requirements: [
      "A 3x3x3 Rubik's Cube",
      "Willingness to practice regularly",
      "Basic understanding of cube notation",
    ],
    learningOutcomes: [
      "Master the CFOP method for solving the 3x3x3 Rubik's Cube",
      "Improve your look-ahead and finger tricks",
      "Learn advanced techniques for faster solves",
    ],
    resources: [
      {
        title: "Speedcubing Wiki",
        url: "https://www.speedsolving.com/wiki/index.php/Main_Page",
      },
      {
        title: "Cubing Glossary",
        url: "https://www.cubingglossary.com/",
      },
    ],
    modules: [
      {
        name: "Introduction",
        icon: BookOpen,
        lessons: [
          {
            id: 1,
            title: "Introduction to Speedcubing",
            description: "Learn about the history and basics of speedcubing.",
            video: "https://example.com/intro-video",
          },
          {
            id: 2,
            title: "Cube Notation",
            description: "Understand the standard cube notation.",
            video: "https://example.com/notation-video",
          },
        ],
      },
      {
        name: "CFOP Method",
        icon: Cpu,
        lessons: [
          {
            id: 3,
            title: "Beginner's Cross",
            description: "Master the first step of the CFOP method.",
            video: "https://example.com/cross-video",
          },
          {
            id: 4,
            title: "F2L Basics",
            description: "Learn the fundamentals of the F2L step.",
            video: "https://example.com/f2l-basics-video",
          },
          // Add more lessons...
        ],
      },
      // Add more modules...
    ],
    reviews: [
      {
        author: "Jane Smith",
        rating: 5,
        text: "This course is amazing! The instructor explains everything clearly, and the lessons are well-structured. I've improved my solving times significantly.",
      },
      {
        author: "Bob Johnson",
        rating: 4,
        text: "The course is great, but I wish there were more advanced techniques covered. Overall, a solid introduction to speedcubing.",
      },
      // Add more reviews...
    ],
  },
  // Add more courses...
];
