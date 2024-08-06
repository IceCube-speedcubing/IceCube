"use client";

import React, { useState } from "react";
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
import { ChevronDown, Clock, Plus, RefreshCw } from "lucide-react";
import Timer from "@/components/timer/Timer";
import TimesPannel from "@/components/timer/TimesPannel";
import { useScramble } from "@/components/timer/GenScramble";

interface TimeEntry {
  time: number;
  isDNF: boolean;
  isPlus2: boolean;
}

interface StatisticItem {
  label: string;
  value: string;
  color: string;
}

const TimerPage: React.FC = () => {
  const { scramble, refreshScramble } = useScramble();
  const sessions: string[] = ["Session 1", "Session 2", "Session 3"];
  const [times, setTimes] = useState<TimeEntry[]>([]);

  const onAddTime = (time: number): void => {
    setTimes((prevTimes) => [
      ...prevTimes,
      { time, isDNF: false, isPlus2: false },
    ]);
    refreshScramble();
  };

  const onUpdateTime = (index: number, newTime: TimeEntry): void => {
    setTimes((prevTimes) => {
      const newTimes = [...prevTimes];
      newTimes[index] = newTime;
      return newTimes;
    });
  };

  const onDelete = (index: number): void => {
    setTimes((prevTimes) => prevTimes.filter((_, i) => i !== index));
  };

  const renderSessionDropdown = (): JSX.Element => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center shadow-lg"
        >
          <span>Select Session</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-56"
        align="center"
        side="top"
      >
        <DropdownMenuLabel className="text-white font-bold px-4 py-3 text-lg border-b border-gray-700">
          Sessions
        </DropdownMenuLabel>
        {sessions.map((session, index) => (
          <DropdownMenuItem
            key={index}
            className="text-white hover:bg-gray-800 px-4 py-3 cursor-pointer transition duration-300 ease-in-out flex items-center"
          >
            <Clock className="mr-2 h-4 w-4 text-blue-400" />
            <span className="text-base">{session}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="border-gray-700" />
        <DropdownMenuItem className="px-3 py-2 cursor-pointer">
          <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center justify-center shadow-md">
            <Plus className="w-4 h-4 mr-2" />
            New Session
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const renderStatistics = (): JSX.Element => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="bg-white bg-opacity-10 rounded-lg p-4 transition-all duration-300 hover:bg-opacity-20 hover:shadow-lg">
        <h4 className="text-xl font-semibold text-white mb-3 border-b border-white border-opacity-20 pb-2">
          Averages
        </h4>
        <div className="space-y-3">
          {[
            {
              label: "Ao5",
              value: calculateAverage(times, 5),
              color: "text-green-400",
            },
            {
              label: "Ao12",
              value: calculateAverage(times, 12),
              color: "text-blue-400",
            },
            {
              label: "Ao100",
              value: calculateAverage(times, 100),
              color: "text-purple-400",
            },
          ].map(({ label, value, color }: StatisticItem) => (
            <p
              key={label}
              className="text-lg text-white flex justify-between items-center"
            >
              <span className="font-medium">{label}:</span>
              <span
                className={`font-mono bg-white bg-opacity-20 px-2 py-1 rounded-full ${color} text-sm`}
              >
                {value}
              </span>
            </p>
          ))}
        </div>
      </div>
      <div className="bg-white bg-opacity-10 rounded-lg p-4 transition-all duration-300 hover:bg-opacity-20 hover:shadow-lg">
        <h4 className="text-xl font-semibold text-white mb-3 border-b border-white border-opacity-20 pb-2">
          Best
        </h4>
        <div className="space-y-3">
          {[
            {
              label: "Single",
              value: calculateBest(times),
              color: "text-yellow-400",
            },
            {
              label: "Ao5",
              value: calculateBestAverage(times, 5),
              color: "text-green-400",
            },
            {
              label: "Ao12",
              value: calculateBestAverage(times, 12),
              color: "text-blue-400",
            },
          ].map(({ label, value, color }: StatisticItem) => (
            <p
              key={label}
              className="text-lg text-white flex justify-between items-center"
            >
              <span className="font-medium">{label}:</span>
              <span
                className={`font-mono bg-white bg-opacity-20 px-2 py-1 rounded-full ${color} text-sm`}
              >
                {value}
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <Background />
      <div className="text-center relative z-10 flex-grow w-full max-w-4xl flex flex-col items-center justify-center">
        <div className="mb-8 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white mr-4">{scramble}</h2>
          <button
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded-full transition duration-300 ease-in-out"
            onClick={refreshScramble}
            aria-label="New Scramble"
          >
            <RefreshCw className="h-6 w-6" />
          </button>
        </div>
        <div className="mb-3">
          <Timer onAddTime={onAddTime} />
        </div>
      </div>
      <div className="w-full bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg p-4 mt-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="text-white">{renderSessionDropdown()}</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-4 transition-all duration-300 hover:bg-opacity-20 hover:shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-3 border-b border-white border-opacity-20 pb-2">
              Times
            </h3>
            <TimesPannel
              times={times}
              onUpdateTime={onUpdateTime}
              onDelete={onDelete}
            />
          </div>
          <div className="bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-6">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">
              Statistics
            </h3>
            {renderStatistics()}
          </div>
          <div className="bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-3">
            {/* Empty field for image */}
          </div>
        </div>
      </div>
    </div>
  );
};

const calculateAverage = (times: TimeEntry[], count: number): string => {
  if (times.length < count) return "N/A";

  const validTimes = times.slice(0, count).filter((t) => !t.isDNF);
  if (validTimes.length < count) return "DNF";

  const sum = validTimes.reduce(
    (acc, t) => acc + t.time + (t.isPlus2 ? 2 : 0),
    0
  );
  return (sum / validTimes.length).toFixed(2);
};

const calculateBest = (times: TimeEntry[]): string => {
  if (times.length === 0) return "N/A";
  const validTimes = times.filter((t) => !t.isDNF);
  if (validTimes.length === 0) return "N/A";

  const bestTime = Math.min(
    ...validTimes.map((t) => t.time + (t.isPlus2 ? 2 : 0))
  );
  return bestTime.toFixed(2);
};

const calculateBestAverage = (times: TimeEntry[], count: number): string => {
  if (times.length < count) return "N/A";

  const averages: number[] = [];
  for (let i = 0; i <= times.length - count; i++) {
    const subset = times.slice(i, i + count);
    const validTimes = subset.filter((t) => !t.isDNF);
    if (validTimes.length === count) {
      const sum = validTimes.reduce(
        (acc, t) => acc + t.time + (t.isPlus2 ? 2 : 0),
        0
      );
      averages.push(sum / count);
    }
  }

  if (averages.length === 0) return "N/A";
  return Math.min(...averages).toFixed(2);
};

export default TimerPage;
