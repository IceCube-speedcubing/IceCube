"use client";

import React, { useState, useEffect, useRef } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [scrambleString, setScrambleString] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        if (!isRunning) {
          startTimer();
        } else {
          stopTimer();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRunning]);

  const startTimer = () => {
    const startTime = Date.now() - time;
    timerRef.current = setInterval(() => {
      setTime(Date.now() - startTime);
    }, 10);
    setIsRunning(true);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current as NodeJS.Timeout);
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(3, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-2xl font-bold mb-4">{scrambleString}</div>
      <div className="text-6xl font-bold mb-8">{formatTime(time)}</div>
      <div className="flex space-x-4">
        {!isRunning ? (
          <button
            onClick={startTimer}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Start
          </button>
        ) : (
          <button
            onClick={stopTimer}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Stop
          </button>
        )}
        <button
          onClick={resetTimer}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
