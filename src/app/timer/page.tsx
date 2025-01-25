'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, Settings, Plus, Trash2, Copy } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Toaster } from "sonner"

export default function Page() {
  // State management
  const [scramble, setScramble] = useState("");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState("Default");
  const [times, setTimes] = useState<Array<{
    time: number, 
    penalty?: 'plus2' | 'dnf',
    date: Date,
    scramble: string
  }>>([]);
  const [isInspecting, setIsInspecting] = useState(false);
  const [inspectionTime, setInspectionTime] = useState(15);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [isHoldingLongEnough, setIsHoldingLongEnough] = useState(false);
  const [selectedTime, setSelectedTime] = useState<{
    time: number,
    penalty?: 'plus2' | 'dnf',
    date: Date,
    scramble: string
  } | null>(null);
  const timeRef = useRef<number>(0);

  // Memoized stats calculations
  const stats = useMemo(() => {
    const validTimes = times.filter(t => t.penalty !== 'dnf')
      .map(t => t.penalty === 'plus2' ? t.time + 2000 : t.time);
    
    if (validTimes.length === 0) {
      return { best: 0, average: 0, ao5: 0, ao12: 0 };
    }

    const calculateTrimmedMean = (arr: number[], trim: number) => {
      if (arr.length < trim * 2 + 1) return 0;
      const sorted = [...arr].sort((a, b) => a - b);
      const trimmed = sorted.slice(trim, -trim);
      return trimmed.reduce((a, b) => a + b, 0) / trimmed.length;
    };

    return {
      best: Math.min(...validTimes),
      average: validTimes.reduce((a, b) => a + b, 0) / validTimes.length,
      ao5: validTimes.length >= 5 ? calculateTrimmedMean(validTimes.slice(-5), 1) : 0,
      ao12: validTimes.length >= 12 ? calculateTrimmedMean(validTimes.slice(-12), 1) : 0
    };
  }, [times]);

  // Timer functions
  const startTimer = useCallback(() => {
    timeRef.current = 0;
    setTime(0);
    setIsRunning(true);
  }, []);

  const startInspection = useCallback(() => {
    setIsInspecting(true);
    setInspectionTime(15);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    const finalTime = timeRef.current;
    setTimes(prev => [...prev, {
      time: finalTime,
      date: new Date(),
      scramble
    }]);
    generateNewScramble();
  }, [scramble]);

  const resetTimer = useCallback(() => {
    setIsInspecting(false);
    setIsRunning(false);
    setTime(0);
    timeRef.current = 0;
    setInspectionTime(15);
    setIsHoldingLongEnough(false);
  }, []);

  // Timer update effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isInspecting) {
      interval = setInterval(() => {
        setInspectionTime(prev => {
          if (prev <= 1) {
            setIsInspecting(false);
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (isRunning) {
      interval = setInterval(() => {
        timeRef.current += 10;
        setTime(timeRef.current);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning, isInspecting]);

  // Space hold timer effect
  useEffect(() => {
    let holdTimer: NodeJS.Timeout;
    
    if (isSpacePressed) {
      holdTimer = setTimeout(() => setIsHoldingLongEnough(true), 1000);
    } else {
      setIsHoldingLongEnough(false);
    }

    return () => clearTimeout(holdTimer);
  }, [isSpacePressed]);

  // Keyboard event handlers
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
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
  }, [isInspecting, isRunning, startInspection, resetTimer]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
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
  }, [isInspecting, isRunning, isSpacePressed, isHoldingLongEnough, startTimer, stopTimer]);

  // Keyboard event listeners
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Scramble generation
  const generateNewScramble = useCallback(() => {
    const moves = ["R", "U", "F", "L", "D", "B"];
    const modifiers = ["", "'", "2"];
    let lastMove = "";
    let newScramble = Array(20).fill(null).map(() => {
      let move;
      do {
        move = moves[Math.floor(Math.random() * moves.length)];
      } while (move === lastMove);
      
      lastMove = move;
      const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      return move + modifier;
    }).join(" ");
    
    setScramble(newScramble);
  }, []);

  // Initial scramble generation
  useEffect(() => {
    generateNewScramble();
  }, [generateNewScramble]);

  // Time formatting
  const formatTime = useCallback((ms: number, penalty?: 'plus2' | 'dnf') => {
    if (penalty === 'dnf') return 'DNF';
    
    const totalMs = penalty === 'plus2' ? ms + 2000 : ms;
    const hours = Math.floor(totalMs / 3600000);
    const minutes = Math.floor((totalMs % 3600000) / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const milliseconds = Math.floor((totalMs % 1000) / 10);
    
    if (isInspecting) return `${inspectionTime}`;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    }
    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    }
    
    const timeStr = `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
    return penalty === 'plus2' ? timeStr + '+' : timeStr;
  }, [isInspecting, inspectionTime]);

  // Penalty management
  const addPenalty = useCallback((index: number, penalty: 'plus2' | 'dnf') => {
    setTimes(prev => prev.map((t, i) => 
      i === index ? { ...t, penalty: t.penalty === penalty ? undefined : penalty } : t
    ));
  }, []);

  const deleteTime = useCallback((index: number) => {
    setTimes(prev => prev.filter((_, i) => i !== index));
  }, []);

  const getTimerColor = useCallback(() => {
    if (isRunning) return 'text-white';
    if (isInspecting) {
      return isHoldingLongEnough ? 'text-green-500' : (isSpacePressed ? 'text-red-500' : '');
    }
    return 'text-foreground';
  }, [isRunning, isInspecting, isHoldingLongEnough, isSpacePressed]);

  const handleCopyScramble = useCallback(async (scrambleText: string) => {
    await navigator.clipboard.writeText(scrambleText);
    toast("Copied to clipboard", {
      duration: 2000,
      className: "font-mono bg-background text-foreground",
      position: "bottom-center",
    });
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <Toaster />
      {/* Main timer area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4">
        {/* Timer */}
        <div className="flex-1 w-full max-w-3xl flex flex-col items-center justify-center gap-8">
          <div 
            className={`font-mono select-none transition-colors duration-300 text-8xl md:text-9xl ${getTimerColor()}`}
            style={{
              transform: isSpacePressed ? 'scale(0.95)' : 'scale(1)'
            }}
          >
            {formatTime(time)}
          </div>
          
          {/* Scramble */}
          <div className="rounded-lg border bg-card p-4 w-full">
            <p className="text-lg md:text-2xl font-mono text-center break-words">{scramble}</p>
          </div>
        </div>
      </div>

      {/* Bottom panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {/* Times panel */}
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="p-3 border-b font-medium bg-muted/10">Times</div>
          <ScrollArea className="h-48">
            {times.map((t, index) => (
              <div 
                key={index} 
                className="px-4 py-3 border-b hover:bg-muted/50 flex items-center justify-between group cursor-pointer"
                onClick={() => setSelectedTime(t)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground">#{times.length - index}</span>
                  <span className="font-mono text-lg">{formatTime(t.time, t.penalty)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`h-7 px-2 text-sm ${t.penalty === 'plus2' ? 'bg-yellow-500/10 text-yellow-500' : 'hover:text-yellow-500 hover:bg-yellow-500/10'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      addPenalty(index, 'plus2');
                    }}
                  >
                    +2
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`h-7 px-2 text-sm ${t.penalty === 'dnf' ? 'bg-red-500/10 text-red-500' : 'hover:text-red-500 hover:bg-red-500/10'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      addPenalty(index, 'dnf');
                    }}
                  >
                    DNF
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 p-0 hover:bg-destructive/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTime(index);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            )).reverse()}
          </ScrollArea>
        </div>

        {/* Stats panel */}
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="p-3 border-b font-medium bg-muted/10 flex items-center justify-between">
            <span>Statistics</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <span className="font-medium text-muted-foreground">{currentSession}</span>
                  <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="flex items-center">
                  Default
                  <span className="ml-auto text-xs text-muted-foreground">{times.length} solves</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" />
                  New Session
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Manage Sessions
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md bg-muted/50 p-3">
                <div className="text-sm text-muted-foreground mb-1">Best</div>
                <div className="font-mono text-xl">{formatTime(stats.best)}</div>
              </div>
              <div className="rounded-md bg-muted/50 p-3">
                <div className="text-sm text-muted-foreground mb-1">Average</div>
                <div className="font-mono text-xl">{formatTime(stats.average)}</div>
              </div>
              <div className="rounded-md bg-muted/50 p-3">
                <div className="text-sm text-muted-foreground mb-1">Ao5</div>
                <div className="font-mono text-xl">{formatTime(stats.ao5)}</div>
              </div>
              <div className="rounded-md bg-muted/50 p-3">
                <div className="text-sm text-muted-foreground mb-1">Ao12</div>
                <div className="font-mono text-xl">{formatTime(stats.ao12)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scramble visualization */}
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="p-3 border-b font-medium bg-muted/10">Scramble Visual</div>
          <div className="h-48 flex items-center justify-center text-muted-foreground">
            Scramble Visual
          </div>
        </div>
      </div>

      <Dialog open={!!selectedTime} onOpenChange={() => setSelectedTime(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Solve Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="rounded-lg bg-muted/50 p-4 space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Time</div>
                <div className="font-mono text-4xl">{selectedTime && formatTime(selectedTime.time, selectedTime.penalty)}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Date</div>
                <div className="text-lg font-medium">{selectedTime?.date.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1 flex items-center justify-between">
                  Scramble
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-muted/50"
                    onClick={() => selectedTime && handleCopyScramble(selectedTime.scramble)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="font-mono text-sm bg-background/50 p-3 rounded-md">{selectedTime?.scramble}</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Scramble Visual</div>
              <div className="h-48 border rounded-lg flex items-center justify-center text-muted-foreground bg-muted/50">
                Scramble Visual
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
