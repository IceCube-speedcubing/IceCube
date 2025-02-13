'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, Copy, Settings2, Maximize2, Keyboard, Timer as TimerIcon, Smartphone, Check, Type } from "lucide-react"
import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import { Toaster } from "sonner"
import { generateWCAScramble } from "@/lib/scrambleGen"
import { TimerDisplay } from "@/components/timer/TimerDisplay"
import { ScrambleDisplay } from "@/components/timer/ScrambleDisplay"
import { TimesPanel } from "@/components/timer/TimesPanel"
import { MobileLayout } from "@/components/timer/MobileLayout"
import { Badge } from "@/components/ui/badge"
import { ScrambleVisual } from "@/components/timer/ScrambleVisual"
import { StatsPanel } from "@/components/timer/StatsPanel"
import { WCAEventId, WCA_EVENTS } from "@/types/WCAEvents"

type SolveTime = {
  time: number;
  date: Date;
  scramble: string;
  penalty?: 'plus2' | 'dnf';
};

export default function Page() {
  // State management
  const [scramble, setScramble] = useState("");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [times, setTimes] = useState<SolveTime[]>([]);
  const [isInspecting, setIsInspecting] = useState(false);
  const [inspectionTime, setInspectionTime] = useState(15);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [isHoldingLongEnough, setIsHoldingLongEnough] = useState(false);
  const [selectedTime, setSelectedTime] = useState<SolveTime | null>(null);
  const timeRef = useRef<number>(0);
  const [timerMode, setTimerMode] = useState<'keyboard' | 'typing' | 'stackmat'>('keyboard');
  const [timeInput, setTimeInput] = useState('');
  const [isTouchHolding, setIsTouchHolding] = useState(false);
  const [touchHoldingLongEnough, setTouchHoldingLongEnough] = useState(false);
  const [inspectionEnabled, setInspectionEnabled] = useState(true);
  const [event, setEvent] = useState<WCAEventId>('333');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTimerMode = localStorage.getItem('timerMode');
    const savedInspectionEnabled = localStorage.getItem('inspectionEnabled');
    const savedTimes = localStorage.getItem('times');
    const savedEvent = localStorage.getItem('event');

    if (savedTimerMode) {
      setTimerMode(savedTimerMode as 'keyboard' | 'typing' | 'stackmat');
    }
    if (savedInspectionEnabled !== null) {
      setInspectionEnabled(savedInspectionEnabled === 'true');
    }
    if (savedTimes) {
      setTimes(JSON.parse(savedTimes));
    }
    if (savedEvent) {
      setEvent(savedEvent as WCAEventId);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('times', JSON.stringify(times));
  }, [times]);

  useEffect(() => {
    localStorage.setItem('event', event);
  }, [event]);

  useEffect(() => {
    generateNewScramble();
  }, [event]);

  const generateNewScramble = useCallback(() => {
    const scramble = generateWCAScramble(event);
    setScramble(scramble);
  }, [event]);

  // Timer functions
  const startTimer = useCallback(() => {
    setIsRunning(true);
    setTime(0);
    timeRef.current = 0;
  }, []);

  const startInspection = useCallback(() => {
    setIsInspecting(true);
    setInspectionTime(15);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    const finalTime = timeRef.current;
    const newTime = {
      time: finalTime,
      date: new Date(),
      scramble
    };
    
    setTimes(prev => [...prev, newTime]);
    generateNewScramble();
  }, [scramble, generateNewScramble]);

  // Update the useEffect for keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        
        if (isRunning) {
          stopTimer();
          return;
        }

        if (!isInspecting) {
          if (inspectionEnabled) {
            startInspection();
          } else {
            setIsSpacePressed(true);
          }
        } else {
          setIsSpacePressed(true);
        }
      } else if (e.code === 'Escape' && isInspecting) {
        setIsInspecting(false);
        setIsSpacePressed(false);
        setIsHoldingLongEnough(false);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        setIsSpacePressed(false);

        if (isInspecting && isHoldingLongEnough) {
          setIsInspecting(false);
          startTimer();
        } else if (!inspectionEnabled && isHoldingLongEnough) {
          startTimer();
        }
        setIsHoldingLongEnough(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [
    isRunning,
    isInspecting,
    isHoldingLongEnough,
    setIsSpacePressed,
    setIsHoldingLongEnough,
    setIsInspecting,
    stopTimer,
    startTimer,
    startInspection,
    inspectionEnabled
  ]);

  // Space hold timer effect
  useEffect(() => {
    let holdTimer: NodeJS.Timeout;
    
    if (isSpacePressed && !isRunning) {
      if (isInspecting || !inspectionEnabled) {
        holdTimer = setTimeout(() => {
          setIsHoldingLongEnough(true);
        }, 300);
      }
    }

    return () => {
      if (holdTimer) {
        clearTimeout(holdTimer);
      }
    };
  }, [isSpacePressed, isRunning, isInspecting, inspectionEnabled]);

  // Inspection timer effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isInspecting) {
      intervalId = setInterval(() => {
        setInspectionTime((prev) => {
          if (prev <= 1) {
            setIsInspecting(false);
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isInspecting]);

  // Timer update effect
  useEffect(() => {
    let startTimeRef: number | null = null;
    let animationFrameId: number;

    const updateTimer = (currentTime: number) => {
      if (!startTimeRef) startTimeRef = currentTime;
      const elapsed = currentTime - startTimeRef;
      timeRef.current = elapsed;
      setTime(elapsed);
      animationFrameId = requestAnimationFrame(updateTimer);
    };

    if (isRunning) {
      animationFrameId = requestAnimationFrame(updateTimer);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isRunning]);

  // Time formatting
  const formatTime = useCallback((ms: number, penalty?: 'plus2' | 'dnf', showInspection: boolean = false) => {
    if (penalty === 'dnf') return 'DNF';
    
    const totalMs = penalty === 'plus2' ? ms + 2000 : ms;
    const hours = Math.floor(totalMs / 3600000);
    const minutes = Math.floor((totalMs % 3600000) / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const milliseconds = Math.floor((totalMs % 1000) / 10);
    
    if (showInspection && isInspecting) return `${inspectionTime}`;
    
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
    setTimes(prev => prev.map((time, i) => {
      if (i === index) {
        return {
          ...time,
          penalty: time.penalty === penalty ? undefined : penalty
        };
      }
      return time;
    }));
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

  // Modify the stats calculation
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

  const parseTimeInput = useCallback((input: string): number | null => {
    // Remove any non-numeric characters except dots
    const cleanInput = input.replace(/[^\d.]/g, '');
    
    // Parse the input as a float
    const seconds = parseFloat(cleanInput);
    
    // Check if the parsed value is valid
    if (isNaN(seconds)) return null;
    
    // Convert to milliseconds
    return Math.floor(seconds * 1000);
  }, []);

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden">
        <MobileLayout
          time={time}
          formatTime={formatTime}
          isRunning={isRunning}
          isInspecting={isInspecting}
          getTimerColor={getTimerColor}
          scramble={scramble}
          sortedTimes={times}
          stats={stats}
          setSelectedTime={setSelectedTime}
          addPenalty={addPenalty}
          deleteTime={deleteTime}
          onTouchStart={() => {
            if (isRunning) {
              stopTimer();
            } else if (inspectionEnabled) {
              startInspection();
            }
            setIsTouchHolding(true);
          }}
          onTouchEnd={() => {
            setIsTouchHolding(false);
            if (isInspecting && isHoldingLongEnough) {
              setIsInspecting(false);
              startTimer();
            } else if (!inspectionEnabled && isHoldingLongEnough) {
              startTimer();
            }
            setIsHoldingLongEnough(false);
          }}
          isTouchHolding={isTouchHolding}
          touchHoldingLongEnough={touchHoldingLongEnough}
          timerMode={timerMode}
          setTimerMode={setTimerMode}
          stopTimer={stopTimer}
          startTimer={startTimer}
          startInspection={startInspection}
          setIsInspecting={setIsInspecting}
          setIsTouchHolding={setIsTouchHolding}
          setTouchHoldingLongEnough={setIsHoldingLongEnough}
          inspectionEnabled={inspectionEnabled}
          saveInspectionEnabled={setInspectionEnabled}
          event={event}
          setEvent={setEvent}
        />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen flex-col bg-background text-foreground overflow-hidden">
        <Toaster />
        <div className="absolute right-8 top-20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-[180px] font-medium">
                <Settings2 className="w-4 h-4 mr-2" />
                Timer Settings
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[220px]" side="top" sideOffset={8}>
              <div className="px-2 py-1.5">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Event</h4>
              </div>
              {WCA_EVENTS.map((wcaEvent) => (
                <DropdownMenuItem 
                  key={wcaEvent.id}
                  onClick={() => setEvent(wcaEvent.id as WCAEventId)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    {wcaEvent.name}
                  </div>
                  {event === wcaEvent.id && <Check className="w-4 h-4" />}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Display</h4>
              </div>
              <DropdownMenuItem onClick={() => document.documentElement.requestFullscreen()}>
                <Maximize2 className="w-4 h-4 mr-2" />
                Full Screen
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Timer Settings</h4>
              </div>
              <DropdownMenuItem 
                onClick={() => setInspectionEnabled(!inspectionEnabled)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <TimerIcon className="w-4 h-4 mr-2" />
                  Inspection
                </div>
                {inspectionEnabled && <Check className="w-4 h-4" />}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Timer Mode</h4>
              </div>
              <DropdownMenuItem 
                onClick={() => setTimerMode('keyboard')}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Keyboard className="w-4 h-4 mr-2" />
                  Keyboard Timer
                </div>
                {timerMode === 'keyboard' && <Check className="w-4 h-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTimerMode('typing')}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Type className="w-4 h-4 mr-2" />
                  Type In Times
                </div>
                {timerMode === 'typing' && <Check className="w-4 h-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTimerMode('stackmat')}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <TimerIcon className="w-4 h-4 mr-2" />
                  Stackmat Timer 
                  <Badge className="ml-2">Soon</Badge>
                </div>
                {/* {timerMode === 'stackmat' && <Check className="w-4 h-4" />} */}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Smartphone className="w-4 h-4 mr-2" />
                GAN Timer 
                <Badge className="ml-2">Soon</Badge>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Main timer area */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4">
          <div className="w-full max-w-3xl flex flex-col items-center">
            <TimerDisplay
              timerMode={timerMode}
              timeInput={timeInput}
              setTimeInput={setTimeInput}
              getTimerColor={getTimerColor}
              time={time}
              formatTime={formatTime}
              saveSolve={(time, scramble) => {
                setTimes(prev => [...prev, { time, date: new Date(), scramble }]);
              }}
              scramble={scramble}
              generateNewScramble={generateNewScramble}
              parseTimeInput={parseTimeInput}
              startTimer={startTimer}
              stopTimer={stopTimer}
              startInspection={startInspection}
              isRunning={isRunning}
              isInspecting={isInspecting}
              setIsInspecting={setIsInspecting}
              inspectionEnabled={inspectionEnabled}
              touchHoldingLongEnough={isHoldingLongEnough}
              isTouchHolding={isSpacePressed}
            />
            
            <ScrambleDisplay 
              scramble={scramble} 
              event={event}
            />
          </div>
        </div>

        {/* Bottom panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 auto-rows-[250px]">
          <TimesPanel
            sortedTimes={times}
            formatTime={formatTime}
            setSelectedTime={setSelectedTime}
            addPenalty={addPenalty}
            deleteTime={deleteTime}
            event={event}
            setEvent={setEvent}
          />

          {/* Stats panel */}
          <StatsPanel 
            times={times} 
            formatTime={formatTime}
            setSelectedTime={setSelectedTime}
          />

          {/* Scramble visualization */}
          <div className="rounded-lg border bg-card overflow-hidden">
            <div className="p-3 border-b font-medium bg-muted/10">Scramble Visual</div>
            <ScrambleVisual 
              scramble={scramble} 
              event={event} 
            />
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
                <ScrambleVisual 
                  scramble={selectedTime?.scramble || ''} 
                  event={event} 
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
