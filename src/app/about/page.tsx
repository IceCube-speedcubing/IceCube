import Link from "next/link";
import { Trophy, Book, Users, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Background } from "@/components/Background";

const features = [
  {
    icon: Trophy,
    color: "text-blue-500",
    bg: "bg-blue-500",
    title: "Best Algorithms",
    description:
      "We have curated the best algorithms for all events, ensuring you have access to the most efficient and effective solutions.",
  },
  {
    icon: Book,
    color: "text-green-500",
    bg: "bg-green-500",
    title: "Comprehensive Courses",
    description:
      "Our courses are designed by experienced cubers and cover all events, from beginner to advanced levels.",
  },
  {
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-500",
    title: "Supportive Community",
    description:
      "Join our vibrant community of cubers, share your experiences, and get support from fellow enthusiasts.",
  },
  {
    icon: Box,
    color: "text-orange-500",
    bg: "bg-orange-500",
    title: "All Events Covered",
    description:
      "IceCube covers all official WCA events, ensuring you have resources for every puzzle you solve.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Background />
      <MaxWidthWrapper className="relative z-10">
        <div className="pt-24 md:pt-32 pb-12 md:pb-16 flex flex-col items-center">
          {/* ^ Added pt-24 for mobile and md:pt-32 for larger screens */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 text-center">
            About IceCube
          </h1>
          <p className="mt-3 text-lg md:text-xl text-gray-300 max-w-3xl text-center mb-12 px-4">
            IceCube is an all-in-one website dedicated to the speedcubing
            community. Our mission is to provide cubers of all levels with the
            best resources, algorithms, and courses to help them improve their
            skills and achieve their goals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 px-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-black bg-opacity-40 backdrop-blur-md p-6 rounded-lg transition-all duration-300 hover:bg-opacity-50"
              >
                <div className="relative h-16 w-16 mb-4">
                  <feature.icon className={`h-12 w-12 ${feature.color}`} />
                  <div
                    className={`absolute -top-1 -right-1 ${feature.bg} rounded-full h-6 w-6 flex items-center justify-center`}
                  >
                    <span className="text-white text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white mb-2 text-center">
                  {feature.title}
                </h2>
                <p className="text-gray-300 text-center text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl text-center mb-16 px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Our Team
            </h2>
            <p className="text-gray-300 text-sm md:text-base">
              IceCube was founded by a group of passionate cubers who wanted to
              create a comprehensive platform for the speedcubing community. Our
              team consists of experienced cubers, developers, and designers who
              work tirelessly to ensure that IceCube remains at the forefront of
              the speedcubing world.
            </p>
          </div>

          <div className="max-w-3xl text-center mb-12 px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Get Started
            </h2>
            <p className="text-gray-300 text-sm md:text-base mb-6">
              Ready to take your cubing skills to the next level? Sign up today
              and start exploring our extensive collection of algorithms and
              courses.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/signup">
                <Button className="w-full sm:w-auto bg-[#0A4779] hover:bg-[#083A61] text-white py-2 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-lg">
                  Sign Up
                </Button>
              </Link>
              <Link href="/algs">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-[#0A4779] hover:bg-[#0A4779] hover:text-white border-[#0A4779] py-2 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
                >
                  Explore Algorithms
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
