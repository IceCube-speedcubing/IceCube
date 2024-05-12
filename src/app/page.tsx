import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Crown, School, Trophy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const perks = [
  {
    name: "Best Algorithm",
    Icon: Crown,
    description:
      "Access the top algorithms for all WCA events in our comprehensive library.",
  },
  {
    name: "Cubing Courses",
    Icon: School,
    description:
      "Expertly designed courses to help you improve at your own pace.",
  },
  {
    name: "Guaranteed Improvement",
    Icon: Trophy,
    description:
      "Effective strategies to help you reach new personal bests.",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            The All-in-One <span className="text-[#00406C]">Speedcubing</span>{" "}
            Website
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-prose">
            IceCube is the ultimate all-in-one platform for speedcubing
            enthusiasts, empowering you with the knowledge, resources, and
            strategies to achieve top-tier solving speeds and become a true
            master of precision.
          </p>
          <Link href="/sign-up">
            <Button
              variant="default"
              className="mt-8 bg-[#00406C] hover:bg-[#002d4a] text-white"
            >
              Join Now
            </Button>
          </Link>
        </div>
      </MaxWidthWrapper>

      <section className="bg-gray-100 py-20 dark:bg-[#00253E]">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Comprehensive Algorithm Library
              </h2>
              <p className="text-lg mb-8"> 
                Explore our extensive collection of algorithms for every WCA
                event, meticulously curated and explained by experts. Master
                the most efficient techniques and unlock your full potential.
              </p>
              <Link href="/algorithms">
                <Button variant="default" className="bg-[#00406C] text-white">
                  Browse Algorithms
                </Button>
              </Link>
            </div>
            <div>
              <Image
                src="/algorithm-library.jpg"
                alt="Algorithm Library"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-white py-20 dark:bg-[#001A]">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <div className="rounded-lg shadow-lg bg-gray-100 flex items-center justify-center h-[400px] overflow-hidden dark:bg-[#010313]">
                <span className="text-4xl font-bold">Coming Soon</span>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">
                 Cubing Courses
              </h2>
              <p className="text-lg mb-8">
                Accelerate your progress with our expertly designed cubing
                courses tailored to your skill level and event preferences.
                Unlock new techniques and strategies to shave off precious
                seconds from your solves.
              </p>
              <Link href="/courses">
                <Button variant="default" className="bg-[#00406C] text-white">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-gray-50 dark:bg-[#001A]">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-[#00406C] text-white">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
