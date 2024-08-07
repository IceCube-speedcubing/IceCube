"use client";

import React, { useState, useEffect, useRef } from "react";

interface TimerProps {
  onAddTime: (time: number) => void;
}

const Timer: React.FC<TimerProps> = ({ onAddTime }) => {
  const [displayTime, setDisplayTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isInspecting, setIsInspecting] = useState<boolean>(false);
  const [inspectionTime, setInspectionTime] = useState<number>(15);
  const [isSpacePressed, setIsSpacePressed] = useState<boolean>(false);
  const [isHoldingLongEnough, setIsHoldingLongEnough] =
    useState<boolean>(false);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isInspecting) {
      interval = setInterval(() => {
        setInspectionTime((prevTime) => {
          if (prevTime <= 1) {
            setIsInspecting(false);
            return 15;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (isRunning) {
      interval = setInterval(() => {
        timeRef.current += 0.01;
        setDisplayTime(timeRef.current);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning, isInspecting]);

  useEffect(() => {
    let holdTimer: NodeJS.Timeout | undefined;
    if (isSpacePressed) {
      holdTimer = setTimeout(() => {
        setIsHoldingLongEnough(true);
      }, 1000);
    } else {
      setIsHoldingLongEnough(false);
    }
    return () => clearTimeout(holdTimer);
  }, [isSpacePressed]);

  const startInspection = (): void => {
    setIsInspecting(true);
    setInspectionTime(15);
  };

  const startTimer = (): void => {
    timeRef.current = 0;
    setDisplayTime(0);
    setIsRunning(true);
  };

  const stopTimer = (): void => {
    setIsRunning(false);
    const finalTime = parseFloat(timeRef.current.toFixed(2));
    onAddTime(finalTime);
  };

  const resetTimer = (): void => {
    setIsInspecting(false);
    setIsRunning(false);
    setDisplayTime(0);
    timeRef.current = 0;
    setInspectionTime(15);
    setIsHoldingLongEnough(false);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (minutes > 0) {
      return `${minutes}:${seconds.toFixed(2).padStart(5, "0")}`;
    } else {
      return seconds.toFixed(2);
    }
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.code === "Space") {
      event.preventDefault();
      if (!isInspecting && !isRunning) {
        startInspection();
      } else if (isInspecting) {
        setIsSpacePressed(true);
      }
    } else if (event.code === "KeyR") {
      event.preventDefault();
      resetTimer();
    }
  };

  const handleKeyUp = (event: KeyboardEvent): void => {
    if (event.code === "Space") {
      event.preventDefault();
      if (isInspecting && isSpacePressed) {
        setIsInspecting(false);
        if (isHoldingLongEnough) {
          startTimer();
        }
      } else if (isRunning) {
        stopTimer();
      }
      setIsSpacePressed(false);
      setIsHoldingLongEnough(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isRunning, isInspecting, isSpacePressed, isHoldingLongEnough]);

  const getInspectionColor = (): string => {
    if (isHoldingLongEnough) {
      return "text-green-500";
    }
    return isSpacePressed ? "text-red-500" : "text-white";
  };

  return (
    <div>
      <h3
        className={`text-6xl font-bold ${
          isInspecting ? getInspectionColor() : "text-white"
        }`}
      >
        {isInspecting ? `${inspectionTime}` : formatTime(displayTime)}
      </h3>
    </div>
  );
};

export default Timer;
