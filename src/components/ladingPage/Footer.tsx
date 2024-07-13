import React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Crown, School, Trophy } from "lucide-react";

const perks = [
    {
      name: "Ice Cold Algorithms",
      Icon: Crown,
      description:
        "Chill with the coolest algorithms for all WCA events in our frosty library.",
    },
    {
      name: "Frozen Cubing Courses",
      Icon: School,
      description:
        "Expertly crafted courses to help you become as smooth as ice.",
    },
    {
      name: "Glacial Improvement",
      Icon: Trophy,
      description:
        "Strategies so cool, they'll freeze your times in their tracks.",
    },
  ];

const Footer = () => {
    return (
        <section className="bg-transparent backdrop-filter backdrop-blur-lg">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-[#0A4779] text-white">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-semibold text-white">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-white">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    )
};

export default Footer;
