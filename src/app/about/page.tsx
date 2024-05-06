import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Book, Box, Trophy, Users } from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <MaxWidthWrapper>
      <div className="py-16 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
          About IceCube
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
          IceCube is an all-in-one website dedicated to the speedcubing community. Our mission is to provide cubers of all levels with the best resources, algorithms, and courses to help them improve their skills and achieve their goals.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center">
            <div className="relative h-16 w-16">
              <Trophy className="h-12 w-12 text-blue-500" />
              <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full h-6 w-6 flex items-center justify-center">
                <span className="text-white text-sm font-bold">1</span>
              </div>
            </div>
            <h2 className="mt-3 text-lg font-bold text-gray-800 dark:text-gray-200">
              Best Algorithms
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              We have curated the best algorithms for all events, ensuring you have access to the most efficient and effective solutions.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative h-16 w-16">
              <Book className="h-12 w-12 text-green-500" />
              <div className="absolute -top-1 -right-1 bg-green-500 rounded-full h-6 w-6 flex items-center justify-center">
                <span className="text-white text-sm font-bold">2</span>
              </div>
            </div>
            <h2 className="mt-3 text-lg font-bold text-gray-800 dark:text-gray-200">
              Comprehensive Courses
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Our courses are designed by experienced cubers and cover all events, from beginner to advanced levels.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative h-16 w-16">
              <Users className="h-12 w-12 text-purple-500" />
              <div className="absolute -top-1 -right-1 bg-purple-500 rounded-full h-6 w-6 flex items-center justify-center">
                <span className="text-white text-sm font-bold">3</span>
              </div>
            </div>
            <h2 className="mt-3 text-lg font-bold text-gray-800 dark:text-gray-200">
              Supportive Community
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Join our vibrant community of cubers, share your experiences, and get support from fellow enthusiasts.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative h-16 w-16">
              <Box className="h-12 w-12 text-orange-500" />
              <div className="absolute -top-1 -right-1 bg-orange-500 rounded-full h-6 w-6 flex items-center justify-center">
                <span className="text-white text-sm font-bold">4</span>
              </div>
            </div>
            <h2 className="mt-3 text-lg font-bold text-gray-800 dark:text-gray-200">
              All Events Covered
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              IceCube covers all official WCA events, ensuring you have resources for every puzzle you solve.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-200">
            Our Team
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
            IceCube was founded by a group of passionate cubers who wanted to create a comprehensive platform for the speedcubing community. Our team consists of experienced cubers, developers, and designers who work tirelessly to ensure that IceCube remains at the forefront of the speedcubing world.
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-200">
            Get Started
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
            Ready to take your cubing skills to the next level? Sign up today and start exploring our extensive collection of algorithms and courses.
          </p>
          <div className="mt-4 flex justify-center space-x-3">
            <Link href="/sign-up">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
                Sign Up
              </Button>
            </Link>
            <Link href="/algs">
              <Button
                variant="outline"
                className="text-blue-500 hover:bg-blue-500 hover:text-white border-blue-500 font-semibold py-2 px-4 rounded-lg"
              >
                Explore Algorithms
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default AboutPage;
