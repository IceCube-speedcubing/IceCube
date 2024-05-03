"use client"

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const Timer: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault(); // Prevent default spacebar behavior
        toggleTimer();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleTimer = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const startTimer = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const centiseconds = time % 100;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <div className="text-6xl font-bold mb-4">{formatTime(time)}</div>
      <div className="flex space-x-4">
        <Button
        variant={'destructive'}
        className='hover:bg-red-700'
        onClick={resetTimer}>
        <X />
        </Button>
      </div>
    </div>
  );
};

export default Timer;
