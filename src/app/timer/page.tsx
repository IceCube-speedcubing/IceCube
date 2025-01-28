'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, Settings, Plus, Copy, Settings2, Maximize2, Keyboard, Timer as TimerIcon, Smartphone, Check, Type } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Toaster } from "sonner"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Session, WCA_EVENTS } from "@/types/WCAEvents"
import { generateScramble } from "@/lib/scrambleGen"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TimerDisplay } from "@/components/timer/TimerDisplay"
import { ScrambleDisplay } from "@/components/timer/ScrambleDisplay"
import { TimesPanel } from "@/components/timer/TimesPanel"

// Add these types at the top
type SolveData = {
  time: number;
  scramble: string;
  date: string;
  solveNumber: number;
};

// Add after the types
const LOCAL_STORAGE_KEYS = {
  SESSIONS: 'cubing-sessions',
  CURRENT_SESSION: 'cubing-current-session',
  TIMER_MODE: 'cubing-timer-mode'
} as const;

// TODO: Replace localStorage with database storage
// - Create database schema for sessions and solves
// - Implement API endpoints for CRUD operations
// - Add authentication to protect user data
// - Sync local storage with database when online

export default function Page() {
  // State management
  const [scramble, setScramble] = useState("");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState<Session[]>(() => {
    const savedSessions = localStorage.getItem(LOCAL_STORAGE_KEYS.SESSIONS);
    return savedSessions ? JSON.parse(savedSessions) : [{
      id: 'default',
      name: 'Default',
      event: '333',
      times: []
    }];
  });
  const [currentSessionId, setCurrentSessionId] = useState(() => {
    const savedSessionId = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_SESSION);
    return savedSessionId || 'default';
  });
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
  const [isNewSessionDialogOpen, setIsNewSessionDialogOpen] = useState(false);
  const [isManageSessionsDialogOpen, setIsManageSessionsDialogOpen] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('333');
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const selectedSessionRef = useRef<HTMLDivElement>(null);
  const [timerMode, setTimerMode] = useState<'keyboard' | 'typing' | 'stackmat'>(
    localStorage.getItem('timerMode') as 'keyboard' | 'typing' | 'stackmat' || 'keyboard'
  );
  const [timeInput, setTimeInput] = useState('');

  // Get current session
  const currentSession = useMemo(() => {
    return sessions.find(s => s.id === currentSessionId) || sessions[0];
  }, [sessions, currentSessionId]);

  // Add these memoized values
  const currentEvent = useMemo(() => 
    WCA_EVENTS.find(e => e.id === currentSession.event), 
    [currentSession.event]
  );

  const sortedTimes = useMemo(() => 
    [...currentSession.times].reverse(),
    [currentSession.times]
  );

  // Memoized stats calculations
  const stats = useMemo(() => {
    const validTimes = currentSession.times.filter(t => t.penalty !== 'dnf')
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
  }, [currentSession.times]);

  // Move generateNewScramble up before it's used
  const generateNewScramble = useCallback(() => {
    const newScramble = generateScramble(currentSession.event);
    setScramble(newScramble);
  }, [currentSession.event]);

  // Timer functions - define these before the effects
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
      date: new Date().toISOString(), // Store as ISO string for better serialization
      scramble
    };
    
    setSessions(prev => prev.map(s => 
      s.id === currentSessionId ? {
        ...s,
        times: [...s.times, {
          ...newTime,
          date: new Date(newTime.date) // Convert ISO string back to Date
        }]
      } : s
    ));
    generateNewScramble();
  }, [currentSessionId, scramble, generateNewScramble]);

  // Update the useEffect for keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        
        if (isRunning) {
          stopTimer();
          return;
        }

        if (!isSpacePressed) {
          setIsSpacePressed(true);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        setIsSpacePressed(false);

        if (isRunning) {
          return;
        }

        if (isHoldingLongEnough) {
          if (isInspecting) {
            setIsInspecting(false);
            startTimer();
          } else {
            startInspection();
          }
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
    isSpacePressed,
    stopTimer,
    startTimer,
    startInspection
  ]);

  // Space hold timer effect
  useEffect(() => {
    let holdTimer: NodeJS.Timeout;
    
    if (isSpacePressed && !isRunning) {
      holdTimer = setTimeout(() => {
        setIsHoldingLongEnough(true);
      }, 300);
    }

    return () => {
      if (holdTimer) {
        clearTimeout(holdTimer);
      }
    };
  }, [isSpacePressed, isRunning]);

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

  // Initial scramble generation
  useEffect(() => {
    generateNewScramble();
  }, [generateNewScramble]);

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
    setSessions(prev => prev.map(s => 
      s.id === currentSessionId ? { ...s, times: s.times.map((t, i) => 
        i === index ? { ...t, penalty: t.penalty === penalty ? undefined : penalty } : t
      )} : s
    ));
  }, [currentSessionId]);

  const deleteTime = useCallback((index: number) => {
    setSessions(prev => prev.map(s => 
      s.id === currentSessionId ? { ...s, times: s.times.filter((_, i) => i !== index) } : s
    ));
  }, [currentSessionId]);

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

  // Session management functions
  const addSession = useCallback((name: string, event: string) => {
    const newSessionId = crypto.randomUUID();
    const newSession = {
      id: newSessionId,
      name,
      event,
      times: []
    };
    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSessionId);
    generateNewScramble();
  }, [generateNewScramble]);

  const deleteSession = useCallback((id: string) => {
    if (id === 'default') return; // Prevent deleting default session
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentSessionId === id) {
      setCurrentSessionId('default');
    }
  }, [currentSessionId]);


  const updateSession = useCallback((id: string, updates: Partial<Session>) => {
    setSessions(prev => prev.map(s => 
      s.id === id ? { ...s, ...updates } : s
    ));
  }, []);

  // Add this effect after your other useEffects
  useEffect(() => {
    if (isManageSessionsDialogOpen && selectedSessionRef.current) {
      const scrollContainer = selectedSessionRef.current.parentElement;
      if (scrollContainer) {
        setTimeout(() => {
          selectedSessionRef.current?.scrollIntoView({
            behavior: 'instant',
            block: 'center'
          });
        }, 50);
      }
    }
  }, [isManageSessionsDialogOpen]);

  useEffect(() => {
    if (isManageSessionsDialogOpen) {
      // Wait for dialog animation to complete
      const timer = setTimeout(() => {
        const selectedElement = selectedSessionRef.current;
        if (selectedElement) {
          const scrollArea = selectedElement.closest('[role="presentation"]');
          if (scrollArea) {
            const containerRect = scrollArea.getBoundingClientRect();
            const elementRect = selectedElement.getBoundingClientRect();
            const scrollTop = elementRect.top - containerRect.top - (containerRect.height / 2) + (elementRect.height / 2);
            scrollArea.scrollTop = scrollTop;
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isManageSessionsDialogOpen]);

  // Update the time parsing function
  function parseTimeInput(input: string): number | null {
    // Remove all non-numeric characters except decimal point and colon
    const cleanInput = input.replace(/[^\d.:]/g, '');
    
    if (cleanInput.includes(':')) {
      // Handle MM:SS.ms format
      const [minutes, secondsPart] = cleanInput.split(':');
      const [seconds, milliseconds = '0'] = secondsPart.split('.');
      return (parseInt(minutes) * 60 + parseInt(seconds)) * 1000 + parseInt(milliseconds.padEnd(3, '0').slice(0, 3));
    } else if (cleanInput.includes('.')) {
      // Handle SS.ms format
      const [seconds, milliseconds] = cleanInput.split('.');
      return parseInt(seconds) * 1000 + parseInt(milliseconds.padEnd(3, '0').slice(0, 3));
    } else if (cleanInput.length <= 2) {
      // Handle SS format (under 1 minute)
      return parseInt(cleanInput) * 1000;
    } else if (cleanInput.length <= 4) {
      // Handle SS.xx format (automatically add decimal point)
      const seconds = cleanInput.slice(0, -2);
      const milliseconds = cleanInput.slice(-2);
      return parseInt(seconds) * 1000 + parseInt(milliseconds) * 10;
    } else {
      return null;
    }
  }

  // Function to save timer mode
  const saveTimerMode = (mode: 'keyboard' | 'typing' | 'stackmat') => {
    setTimerMode(mode);
    localStorage.setItem('timerMode', mode);
  };

  // Function to save solve data
  const saveSolve = (time: number, scramble: string) => {
    const solves: SolveData[] = JSON.parse(localStorage.getItem('solves') || '[]');
    const newSolve: SolveData = {
      time,
      scramble,
      date: new Date().toISOString(),
      solveNumber: solves.length + 1
    };
    solves.push(newSolve);
    localStorage.setItem('solves', JSON.stringify(solves));
    
    // Update sessions as before
    setSessions(prevSessions => 
      prevSessions.map(s => 
        s.id === currentSession?.id 
          ? { ...s, times: [...s.times, { time, date: new Date(), scramble }] }
          : s
      )
    );
  };

  // Add effect to save sessions
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }, [sessions]);

  // Add effect to save current session
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_SESSION, currentSessionId);
  }, [currentSessionId]);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
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
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Display</h4>
            </div>
            <DropdownMenuItem onClick={() => document.documentElement.requestFullscreen()}>
              <Maximize2 className="w-4 h-4 mr-2" />
              Full Screen
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Timer Mode</h4>
            </div>
            <DropdownMenuItem 
              onClick={() => saveTimerMode('keyboard')}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <Keyboard className="w-4 h-4 mr-2" />
                Keyboard Timer
              </div>
              {timerMode === 'keyboard' && <Check className="w-4 h-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => saveTimerMode('typing')}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <Type className="w-4 h-4 mr-2" />
                Type In Times
              </div>
              {timerMode === 'typing' && <Check className="w-4 h-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => saveTimerMode('stackmat')}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <TimerIcon className="w-4 h-4 mr-2" />
                Stackmat Timer
              </div>
              {timerMode === 'stackmat' && <Check className="w-4 h-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Smartphone className="w-4 h-4 mr-2" />
              GAN Timer
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
            isSpacePressed={isSpacePressed}
            getTimerColor={getTimerColor}
            time={time}
            formatTime={formatTime}
            saveSolve={saveSolve}
            scramble={scramble}
            generateNewScramble={generateNewScramble}
            parseTimeInput={parseTimeInput}
          />
          
          <ScrambleDisplay scramble={scramble} />
        </div>
      </div>

      {/* Bottom panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <TimesPanel
          sortedTimes={sortedTimes}
          formatTime={formatTime}
          setSelectedTime={setSelectedTime}
          addPenalty={addPenalty}
          deleteTime={deleteTime}
        />

        {/* Stats panel */}
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="p-3 border-b font-medium bg-muted/10 flex items-center justify-between">
            <span>Statistics</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <div className="truncate">{currentSession.name}</div>
                    <div className="px-1.5 py-0.5 rounded-md bg-muted text-xs font-medium shrink-0">
                      {currentEvent?.name}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-[320px]" 
                side="top"
                sideOffset={8}
              >
                <div className="px-2 py-1.5">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Sessions</h4>
                </div>
                <ScrollArea className="h-[min(200px,calc(100vh-120px))]">
                  {sessions.map((session) => (
                    <DropdownMenuItem 
                      key={session.id}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2.5 cursor-pointer",
                        currentSessionId === session.id && "bg-primary/5"
                      )}
                      onClick={() => setCurrentSessionId(session.id)}
                    >
                      <div className="flex-1 flex items-center gap-2 min-w-0">
                        <div className="truncate font-medium">{session.name}</div>
                        <div className="px-2 py-1 rounded-md bg-muted text-sm font-medium">
                          {WCA_EVENTS.find(e => e.id === session.event)?.name}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {session.times.length} solves
                      </span>
                    </DropdownMenuItem>
                  ))}
                </ScrollArea>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="px-3 py-2.5 cursor-pointer hover:bg-primary/5"
                  onClick={() => setIsNewSessionDialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span className="font-medium">New Session</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="px-3 py-2.5 cursor-pointer hover:bg-primary/5"
                  onClick={() => setIsManageSessionsDialogOpen(true)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span className="font-medium">Manage Sessions</span>
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

      {/* New Session Dialog */}
      <Dialog open={isNewSessionDialogOpen} onOpenChange={setIsNewSessionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">New Session</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Session Name</Label>
                <Input
                  id="name"
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                  placeholder="Enter session name..."
                  type="text"
                  autoComplete="off"
                  spellCheck="false"
                  className="font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event">Event</Label>
                <Select
                  value={selectedEvent}
                  onValueChange={setSelectedEvent}
                >
                  <SelectTrigger className="w-full font-medium">
                    <SelectValue>
                      {WCA_EVENTS.find(e => e.id === selectedEvent)?.name}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    <ScrollArea className="h-[min(250px,60vh)]">
                      {WCA_EVENTS.map(event => (
                        <SelectItem 
                          key={event.id} 
                          value={event.id}
                          className="font-medium"
                        >
                          {event.name}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewSessionDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (newSessionName.trim()) {
                  addSession(newSessionName.trim(), selectedEvent);
                  setNewSessionName('');
                  setSelectedEvent('333');
                  setIsNewSessionDialogOpen(false);
                }
              }}
            >
              Create Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Sessions Dialog */}
      <Dialog open={isManageSessionsDialogOpen} onOpenChange={setIsManageSessionsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Manage Sessions</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your solving sessions and their settings
            </p>
          </DialogHeader>
          <ScrollArea className="h-[min(400px,calc(100vh-240px))]">
            <div className="space-y-4 py-4 px-1">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  ref={currentSessionId === session.id ? selectedSessionRef : null}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg border transition-colors",
                    currentSessionId === session.id ? "bg-primary/5 border-primary/20" : "hover:bg-muted/50"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    {editingSession?.id === session.id ? (
                      <div className="flex gap-3">
                        <Input
                          value={editingSession.name}
                          onChange={(e) => setEditingSession({ ...editingSession, name: e.target.value })}
                          className="max-w-[200px] font-medium"
                          placeholder="Session name"
                        />
                        <Select
                          value={editingSession.event}
                          onValueChange={(value) => setEditingSession({ ...editingSession, event: value })}
                        >
                          <SelectTrigger className="w-full font-medium">
                            <SelectValue>
                              {WCA_EVENTS.find(e => e.id === editingSession.event)?.name}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            <ScrollArea className="h-[min(250px,60vh)]">
                              {WCA_EVENTS.map(event => (
                                <SelectItem 
                                  key={event.id} 
                                  value={event.id}
                                  className="font-medium"
                                >
                                  {event.name}
                                </SelectItem>
                              ))}
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="font-medium truncate">{session.name}</div>
                        <div className="px-2 py-1 rounded-md bg-muted text-sm font-medium">
                          {WCA_EVENTS.find(e => e.id === session.event)?.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {session.times.length} solves
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {editingSession?.id === session.id ? (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => {
                            updateSession(session.id, {
                              name: editingSession.name,
                              event: editingSession.event
                            });
                            setEditingSession(null);
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingSession(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant={currentSessionId === session.id ? "secondary" : "ghost"}
                          size="sm"
                          onClick={() => setCurrentSessionId(session.id)}
                        >
                          {currentSessionId === session.id ? "Selected" : "Select"}
                        </Button>
                        {session.id !== 'default' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingSession(session)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteSession(session.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
