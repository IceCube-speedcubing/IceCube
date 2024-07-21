import React from "react";
import ComingSoon from "@/components/ComingSoon";
import { Background } from "@/components/Background";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";

const TimerPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <Background />
      <div className="text-center relative z-10 flex-grow w-full max-w-4xl flex flex-col items-center justify-center">
        <div className="mb-8 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white">
            F B U&apos; F&apos; B&apos; L&apos; B D&apos; L B&apos; L2 U2 F&apos; U2 B&apos; R2 B&apos; D2 R2 B L2
          </h2>
        </div>
        <div className="mb-8">
          <h1 className="font-bold text-8xl text-white drop-shadow-lg">
            0.00
          </h1>
        </div>
      </div>
      <div className="w-full bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg p-4 mt-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="text-white">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Select Session
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-gray-800 border border-gray-700 rounded-md shadow-lg"
                align="start"
                side="top"
              >
                <DropdownMenuLabel className="text-white font-bold px-4 py-2">
                  Sessions
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="border-gray-700" />
                <DropdownMenuLabel className="text-white font-bold px-4 py-2">
                  <Button className="bg-transparent hover:bg-white hover:bg-opacity-10 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    New Session
                  </Button>{" "}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="border-gray-200" />
                <DropdownMenuItem className="text-white hover:bg-gray-700 px-4 py-2 cursor-pointer">
                  Session 1
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-gray-700 px-4 py-2 cursor-pointer">
                  Session 2
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-gray-700 px-4 py-2 cursor-pointer">
                  Session 3
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-4">
            <h3 className="text-xl font-semibold text-white mb-2">Times</h3>
            <ScrollArea className="h-32 w-full">
              <div className="space-y-1">
                <p className="text-base text-white">12.34</p>
                <p className="text-base text-white">11.56</p>
                <p className="text-base text-white">13.78</p>
                <p className="text-base text-white">10.98</p>
                <p className="text-base text-white">12.45</p>
                <p className="text-base text-white">11.23</p>
                <p className="text-base text-white">13.01</p>
                <p className="text-base text-white">12.67</p>
                <p className="text-base text-white">11.89</p>
                <p className="text-base text-white">12.12</p>
              </div>
            </ScrollArea>
            <p className="text-base text-white mt-2">Solves: 25</p>
            <p className="text-base text-white">Mean: 11.45</p>
          </div>
          <div className="bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-4">
            <h3 className="text-xl font-semibold text-white mb-2">Statistics</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <h4 className="text-lg font-semibold text-white">Averages</h4>
                <p className="text-base text-white">Ao5: 11.56</p>
                <p className="text-base text-white">Ao12: 12.34</p>
                <p className="text-base text-white">Ao100: 13.45</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Best</h4>
                <p className="text-base text-white">Single: 10.56</p>
                <p className="text-base text-white">Ao5: 11.23</p>
                <p className="text-base text-white">Ao12: 11.89</p>
              </div>
            </div>
          </div>
          <div className="bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-4">
            {/* Empty field for image */}
          </div>
        </div>
      </div>
    </div>
  );
};

const TimerComingSoon: React.FC = () => {
  return (
    <ComingSoon
      title="Timer Feature"
      message="We're fine-tuning our advanced timer to help you track your solving times with precision. Get ready to shave off those milliseconds!"
      emoji="⏱️"
      linkText="Explore Algorithms"
      linkHref="/algs"
    />
  );
};

export default TimerComingSoon;
