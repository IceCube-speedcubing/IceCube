"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { generateScramble } from "react-rubiks-cube-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatTime } from "@/lib/formatTime";

const TimerPage = () => {
  const [scramble, setScramble] = useState("");
  const [scrambleType, setScrambleType] = useState("3x3");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isInspectionTime, setIsInspectionTime] = useState(false);
  const [inspectionTimeRemaining, setInspectionTimeRemaining] = useState(15000); // 15 seconds
  const [times, setTimes] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [averageTime, setAverageTime] = useState<number | null>(null);
  const [ao5, setAo5] = useState<number | null>(null);
  const [ao12, setAo12] = useState<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const inspectionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimerHoldTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    generateNewScramble();
  }, [scrambleType]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isTimerRunning) {
      const startTime = Date.now() - currentTime;
      intervalId = setInterval(() => {
        setCurrentTime(Date.now() - startTime);
      }, 10);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isTimerRunning, currentTime]);

  useEffect(() => {
    if (isInspectionTime) {
      const inspectionIntervalId = setInterval(() => {
        setInspectionTimeRemaining((prevTime) => prevTime - 10);
      }, 10);
      inspectionIntervalRef.current = inspectionIntervalId;
    }

    return () => {
      if (inspectionIntervalRef.current) {
        clearInterval(inspectionIntervalRef.current);
      }
    };
  }, [isInspectionTime]);

  useEffect(() => {
    if (inspectionTimeRemaining === 0) {
      setIsInspectionTime(false);
      startTimer();
    }
  }, [inspectionTimeRemaining]);

  useEffect(() => {
    if (times.length > 0) {
      const sortedTimes = [...times].sort((a, b) => a - b);
      setBestTime(sortedTimes[0]);
      const sum = sortedTimes.reduce((acc, val) => acc + val, 0);
      setAverageTime(sum / sortedTimes.length);

      const ao5Times = sortedTimes.slice(-5);
      if (ao5Times.length === 5) {
        const ao5Sum = ao5Times.reduce((acc, val) => acc + val, 0);
        setAo5(ao5Sum / 5);
      } else {
        setAo5(null);
      }

      const ao12Times = sortedTimes.slice(-12);
      if (ao12Times.length === 12) {
        const ao12Sum = ao12Times.reduce((acc, val) => acc + val, 0);
        setAo12(ao12Sum / 12);
      } else {
        setAo12(null);
      }
    } else {
      setBestTime(null);
      setAverageTime(null);
      setAo5(null);
      setAo12(null);
    }
  }, [times]);

  const generateNewScramble = () => {
    const newScramble = generateScramble({ type: scrambleType });
    setScramble(newScramble);
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    setIsInspectionTime(false);
    setInspectionTimeRemaining(15000);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setTimes([...times, currentTime]);
    setCurrentTime(0);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setIsInspectionTime(false);
    setInspectionTimeRemaining(15000);
    setCurrentTime(0);
    setTimes([]);
    setBestTime(null);
    setAverageTime(null);
    setAo5(null);
    setAo12(null);
    generateNewScramble();
  };

  const handleScrambleTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setScrambleType(event.target.value);
  };

  const deleteTime = (index: number) => {
    const newTimes = [...times];
    newTimes.splice(index, 1);
    setTimes(newTimes);
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Space") {
        if (isTimerRunning) {
          stopTimer();
        } else if (isInspectionTime) {
          startTimer();
        } else {
          setIsInspectionTime(true);
          setInspectionTimeRemaining(15000);
        }
      } else if (event.code === "KeyR") {
        resetTimer();
      }
    },
    [isTimerRunning, isInspectionTime, stopTimer, startTimer, resetTimer]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleStartButtonClick = () => {
    if (isInspectionTime) {
      startTimerHoldTimeoutRef.current = setTimeout(() => {
        startTimer();
      }, 1000);
    }
  };

  const handleStartButtonMouseUp = () => {
    if (startTimerHoldTimeoutRef.current) {
      clearTimeout(startTimerHoldTimeoutRef.current);
      startTimerHoldTimeoutRef.current = null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="mb-8 text-center max-w-md w-full">
        <div className="mb-4 flex justify-between items-center">
          <div className="w-1/2 pr-2">
            <Label
              htmlFor="scrambleType"
              className="text-gray-700 dark:text-gray-300"
            >
              Scramble Type
            </Label>
            <select
              id="scrambleType"
              value={scrambleType}
              onChange={handleScrambleTypeChange}
              className="block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="3x3">3x3</option>
              <option value="2x2">2x2</option>
              <option value="4x4">4x4</option>
              <option value="5x5">5x5</option>
              <option value="6x6">6x6</option>
              <option value="7x7">7x7</option>
            </select>
          </div>
          <div className="w-1/2 pl-2">
            <Button
              variant="outline"
              onClick={resetTimer}
              className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Reset
            </Button>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
          Scramble
        </h3>
        <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
          <p className="text-gray-700 dark:text-gray-300 break-words">
            {scramble}
          </p>
        </div>
      </div>

      <div className="mb-8 text-center">
        <span className="text-6xl font-bold text-gray-700 dark:text-gray-300">
          {isInspectionTime
            ? Math.floor(inspectionTimeRemaining / 1000)
            : formatTime(currentTime)}
        </span>
      </div>
      <div className="flex justify-center gap-4">
        <Button
          onMouseDown={isInspectionTime ? handleStartButtonClick : undefined}
          onMouseUp={isInspectionTime ? handleStartButtonMouseUp : undefined}
          onClick={
            isTimerRunning
              ? stopTimer
              : isInspectionTime
              ? undefined
              : () => setIsInspectionTime(true)
          }
          className={`${
            isTimerRunning
              ? "bg-red-500 hover:bg-red-700"
              : isInspectionTime
              ? "bg-green-500 hover:bg-green-700"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded`}
        >
          {isTimerRunning ? "Stop" : isInspectionTime ? "Start" : "Inspection"}
        </Button>
        {isInspectionTime && (
          <Button
            variant="outline"
            onClick={resetTimer}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Reset
          </Button>
        )}
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg p-6 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <div className="max-w-sm w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <Label className="text-gray-700 dark:text-gray-300">
                Best Time
              </Label>
              <Input
                value={bestTime ? formatTime(bestTime) : "-"}
                readOnly
                className="w-full rounded-md border-gray-300 bg-gray-100 dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="max-w-sm w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <Label className="text-gray-700 dark:text-gray-300">
                Average Time
              </Label>
              <Input
                value={averageTime ? formatTime(averageTime) : "-"}
                readOnly
                className="w-full rounded-md border-gray-300 bg-gray-100 dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="max-w-sm w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <Label className="text-gray-700 dark:text-gray-300">Ao5</Label>
              <Input
                value={ao5 ? formatTime(ao5) : "-"}
                readOnly
                className="w-full rounded-md border-gray-300 bg-gray-100 dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="max-w-sm w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <Label className="text-gray-700 dark:text-gray-300">Ao12</Label>
              <Input
                value={ao12 ? formatTime(ao12) : "-"}
                readOnly
                className="w-full rounded-md border-gray-300 bg-gray-100 dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="max-w-sm w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <Label className="text-gray-700 dark:text-gray-300">Times</Label>
              <ul className="list-disc list-inside">
                {times.map((time, index) => (
                  <li
                    key={index}
                    className="text-gray-700 dark:text-gray-300 flex justify-between items-center"
                  >
                    <span>{formatTime(time)}</span>
                    <Button
                      variant="outline"
                      onClick={() => deleteTime(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      X
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const CommingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Timer</h1>
      <p className="text-lg text-gray-600">
        We are currently working on our timer section.
      </p>
      <p className="text-lg text-gray-600 mb-8">Coming Soon!</p>
      <div className="animate-pulse">
        <span className="text-6xl">⏱️</span>
      </div>
    </div>
  );
};

export default CommingSoon;
