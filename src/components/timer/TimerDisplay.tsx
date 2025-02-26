import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface TimerDisplayProps {
  timerMode: 'keyboard' | 'typing' | 'stackmat';
  timeInput: string;
  setTimeInput: (value: string) => void;
  getTimerColor: () => string;
  time: number;
  formatTime: (ms: number, penalty?: 'plus2' | 'dnf', showInspection?: boolean) => string;
  saveSolve: (time: number, scramble: string) => void;
  scramble: string;
  generateNewScramble: () => void;
  parseTimeInput: (input: string) => number | null;
  startTimer: () => void;
  stopTimer: () => void;
  startInspection: () => void;
  isRunning: boolean;
  isInspecting: boolean;
  setIsInspecting: (isInspecting: boolean) => void;
  inspectionEnabled: boolean;
  touchHoldingLongEnough: boolean;
  isTouchHolding: boolean;
}

export function TimerDisplay({
  timerMode,
  timeInput,
  setTimeInput,
  getTimerColor,
  time,
  formatTime,
  saveSolve,
  scramble,
  generateNewScramble,
  parseTimeInput,
  startTimer,
  stopTimer,
  startInspection,
  isRunning,
  isInspecting,
  setIsInspecting,
  inspectionEnabled,
  touchHoldingLongEnough,
  isTouchHolding
}: TimerDisplayProps) {
  const [touchStart, setTouchStart] = useState<number>(0);
  const [isHolding, setIsHolding] = useState(false);
  const [readyToStart, setReadyToStart] = useState(false);

  const handleTouchStart = () => {
    if (timerMode !== 'keyboard') return;
    setTouchStart(Date.now());
    setIsHolding(true);
  };

  const handleTouchEnd = () => {
    if (timerMode !== 'keyboard' || !isHolding) return;
    
    const holdDuration = Date.now() - touchStart;
    setIsHolding(false);

    if (isRunning) {
      stopTimer();
      return;
    }

    if (isInspecting) {
      setIsInspecting(false);
      setReadyToStart(false);
      if (holdDuration >= 300 && readyToStart) {
        startTimer();
      }
      return;
    }

    if (holdDuration >= 300 && readyToStart) {
      startInspection();
      setReadyToStart(false);
    }
  };

  useEffect(() => {
    if (isHolding) {
      const timer = setTimeout(() => {
        setReadyToStart(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setReadyToStart(false);
    }
  }, [isHolding]);

  const getDisplayColor = () => {
    if (isRunning) return getTimerColor();
    if (isInspecting) {
      if (time >= 15000) return "text-red-500";
      if (time >= 8000) return "text-yellow-500";
      return touchHoldingLongEnough ? "text-green-500" : (isTouchHolding ? "text-yellow-500" : "text-foreground");
    }
    if (!inspectionEnabled) {
      return touchHoldingLongEnough ? "text-green-500" : (isTouchHolding ? "text-yellow-500" : "text-foreground");
    }
    return touchHoldingLongEnough ? "text-green-500" : (isTouchHolding ? "text-yellow-500" : getTimerColor());
  };

  return (
    <div className="flex-1 flex items-center justify-center min-h-[200px] w-full touch-none select-none">
      {timerMode === 'typing' ? (
        <div className="flex flex-col items-center gap-6 w-full px-4">
          <div className="relative w-full max-w-[20rem] sm:max-w-[32rem]">
            <Input
              type="text"
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              placeholder="0.00"
              className="text-center text-4xl sm:text-8xl h-20 sm:h-28 font-mono tracking-wider"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && timeInput) {
                  const parsedTime = parseTimeInput(timeInput);
                  if (parsedTime !== null) {
                    saveSolve(parsedTime, scramble);
                    setTimeInput('');
                    generateNewScramble();
                  }
                } else if (e.key === 'Escape') {
                  setTimeInput('');
                }
              }}
              autoFocus
            />
          </div>
          <div className="text-base text-muted-foreground">
            Press Enter to save time
          </div>
        </div>
      ) : (
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`w-full h-full flex items-center justify-center font-mono select-none transition-colors duration-300 ${getDisplayColor()}`}
        >
          <div className={`text-5xl sm:text-8xl md:text-9xl transition-transform ${isHolding ? 'scale-95' : 'scale-100'}`}>
            {formatTime(time, undefined, true)}
          </div>
        </div>
      )}
    </div>
  );
} 