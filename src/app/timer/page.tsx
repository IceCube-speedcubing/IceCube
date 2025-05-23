"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Timer as TimerIcon, ChevronDown, Trash2, Copy, Check, Edit, Settings2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Toaster } from "sonner";
import cstimer from 'cstimer_module';

// Mock scramble
const mockScramble = "R U R' U' R' F R2 U' R' U' R U R' F'";

// Initialize cstimer
let isCstimerInitialized = false;
try {
  if (typeof window !== 'undefined' && cstimer && typeof cstimer.getScramble === 'function') {
    isCstimerInitialized = true;
  }
} catch (error) {
  console.error('Failed to initialize cstimer:', error);
}

// Define types
type SolveTime = {
  id: number;
  time: number;
  status: "normal" | "plus2" | "dnf";
  date?: string;
  scramble?: string;
};

type StatType = 
  | "best"
  | "average"
  | "ao5"
  | "ao12"
  | "ao50"
  | "ao100"
  | "mean"
  | "median"
  | "worst";

type StatConfig = {
  type: StatType;
  enabled: boolean;
};

type CubeEvent = 
  | "3x3"
  | "2x2"
  | "4x4"
  | "5x5"
  | "6x6"
  | "7x7"
  | "3x3 OH"
  | "3x3 BLD"
  | "4x4 BLD"
  | "5x5 BLD"
  | "3x3 MBLD"
  | "3x3 FMC"
  | "Clock"
  | "Megaminx"
  | "Pyraminx"
  | "Skewb"
  | "Square-1";

type Session = {
  id: string;
  name: string;
  event: CubeEvent;
  times: SolveTime[];
  createdAt: string;
  lastModified: string;
  statConfig: StatConfig[];
};

// Map our event types to cstimer types and their scramble lengths
const eventTypeMap: Record<CubeEvent, { type: string; length: number }> = {
  "3x3": { type: "333", length: 0 },
  "2x2": { type: "222so", length: 0 },
  "4x4": { type: "444wca", length: 0 },
  "5x5": { type: "555wca", length: 60 },
  "6x6": { type: "666wca", length: 80 },
  "7x7": { type: "777wca", length: 100 },
  "3x3 OH": { type: "333", length: 0 },
  "3x3 BLD": { type: "333ni", length: 0 },
  "4x4 BLD": { type: "444bld", length: 40 },
  "5x5 BLD": { type: "555bld", length: 60 },
  "3x3 MBLD": { type: "r3ni", length: 5 },
  "3x3 FMC": { type: "333fm", length: 0 },
  "Clock": { type: "clkwca", length: 0 },
  "Megaminx": { type: "mgmp", length: 70 },
  "Pyraminx": { type: "pyrso", length: 10 },
  "Skewb": { type: "skbso", length: 0 },
  "Square-1": { type: "sqrs", length: 0 }
};

// Add new types for timer settings
type TimerSettings = {
  inspectionTime: number;
  inspectionEnabled: boolean;
  showMilliseconds: boolean;
  timerDisplayFormat: 'decimal' | 'centiseconds';
  showScrambleImage: boolean;
  showStatistics: boolean;
  showKeyboardShortcuts: boolean;
  fullScreen: boolean;
  hideUIWhenRunning: boolean;
  timerType: 'keyboard' | 'typing';
};

export default function TimerPage() {
  // State management
  const [times, setTimes] = useState<SolveTime[]>([]);
  const [scramble, setScramble] = useState(mockScramble);
  const [timerValue, setTimerValue] = useState("0.00");
  const [isRunning, setIsRunning] = useState(false);
  const [isInspecting, setIsInspecting] = useState(false);
  const [inspectionTime, setInspectionTime] = useState(15);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [isHoldingLongEnough, setIsHoldingLongEnough] = useState(false);
  const timeRef = useRef<number>(0);
  const [inspectionEnabled, setInspectionEnabled] = useState(true);
  const [selectedTime, setSelectedTime] = useState<SolveTime | null>(null);
  const [copied, setCopied] = useState(false);

  // Session management state
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const [isSessionMenuOpen, setIsSessionMenuOpen] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [newSessionName, setNewSessionName] = useState("");
  const [newSessionEvent, setNewSessionEvent] = useState<CubeEvent>("3x3");
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [isEditingStats, setIsEditingStats] = useState(false);

  // Add settings state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<TimerSettings>({
    inspectionTime: 15,
    inspectionEnabled: true,
    showMilliseconds: true,
    timerDisplayFormat: 'decimal',
    showScrambleImage: true,
    showStatistics: true,
    showKeyboardShortcuts: true,
    fullScreen: false,
    hideUIWhenRunning: false,
    timerType: 'keyboard'
  });

  // Add typing input state
  const [typingInput, setTypingInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Add state for scramble image
  const [scrambleImage, setScrambleImage] = useState<string>("");

  // Initialize default stat config
  const defaultStatConfig: StatConfig[] = [
    { type: "best", enabled: true },
    { type: "average", enabled: true },
    { type: "ao5", enabled: true },
    { type: "ao12", enabled: true },
    { type: "ao50", enabled: false },
    { type: "ao100", enabled: false },
    { type: "mean", enabled: false },
    { type: "median", enabled: false },
    { type: "worst", enabled: false },
  ];

  // Time formatting
  const formatTime = useCallback((ms: number, penalty?: 'plus2' | 'dnf', showInspection: boolean = false) => {
    if (penalty === 'dnf') return 'DNF';
    
    const totalMs = penalty === 'plus2' ? ms + 2000 : ms;
    const minutes = Math.floor(totalMs / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const milliseconds = Math.floor((totalMs % 1000) / (settings.timerDisplayFormat === 'decimal' ? 10 : 1));
    
    if (showInspection && isInspecting) return `${inspectionTime}`;
    
    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(settings.timerDisplayFormat === 'decimal' ? 2 : 3, '0')}`;
    }
    
    const timeStr = `${seconds}.${milliseconds.toString().padStart(settings.timerDisplayFormat === 'decimal' ? 2 : 3, '0')}`;
    return penalty === 'plus2' ? timeStr + '+' : timeStr;
  }, [isInspecting, inspectionTime, settings.timerDisplayFormat]);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem("sessions");
    if (savedSessions) {
      const parsedSessions = JSON.parse(savedSessions);
      // Ensure each session has statConfig
      const sessionsWithStats = parsedSessions.map((session: Session) => ({
        ...session,
        statConfig: session.statConfig || [...defaultStatConfig]
      }));
      setSessions(sessionsWithStats);
      
      // Set current session to the last modified session or create a new one
      if (sessionsWithStats.length > 0) {
        const lastModifiedSession = sessionsWithStats.reduce((prev: Session, current: Session) => 
          new Date(prev.lastModified) > new Date(current.lastModified) ? prev : current
        );
        setCurrentSessionId(lastModifiedSession.id);
        setTimes(lastModifiedSession.times);
      } else {
        createNewSession("Default Session");
      }
    } else {
      createNewSession("Default Session");
    }
  }, []);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem("sessions", JSON.stringify(sessions));
    }
  }, [sessions]);

  // Update current session times whenever times change
  useEffect(() => {
    if (currentSessionId && times.length > 0) {
      setSessions(prev => prev.map(session => 
        session.id === currentSessionId 
          ? { ...session, times, lastModified: new Date().toISOString() }
          : session
      ));
    }
  }, [times, currentSessionId]);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("timerSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("timerSettings", JSON.stringify(settings));
  }, [settings]);

  // Update inspection time when settings change
  useEffect(() => {
    setInspectionTime(settings.inspectionTime);
  }, [settings.inspectionTime]);

  // Update inspection enabled when settings change
  useEffect(() => {
    setInspectionEnabled(settings.inspectionEnabled);
  }, [settings.inspectionEnabled]);

  // Session management functions
  const createNewSession = (name: string) => {
    const newSession: Session = {
      id: crypto.randomUUID(),
      name,
      event: newSessionEvent,
      times: [],
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      statConfig: [...defaultStatConfig]
    };
    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSession.id);
    setTimes([]);
    setIsCreatingSession(false);
    setNewSessionName("");
    setNewSessionEvent("3x3");
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    if (sessionId === currentSessionId && sessions.length > 1) {
      const remainingSession = sessions.find(s => s.id !== sessionId);
      if (remainingSession) {
        setCurrentSessionId(remainingSession.id);
        setTimes(remainingSession.times);
      }
    }
  };

  const renameSession = (sessionId: string, newName: string) => {
    setSessions(prev => prev.map(session =>
      session.id === sessionId
        ? { ...session, name: newName, lastModified: new Date().toISOString() }
        : session
    ));
  };

  const switchSession = (sessionId: string) => {
    const targetSession = sessions.find(s => s.id === sessionId);
    if (targetSession) {
      setCurrentSessionId(sessionId);
      setTimes(targetSession.times);
      setScrambleImage("");
      generateNewScramble();
    }
  };

  // Helper function to get scale based on event type
  const getScaleForEvent = (event: CubeEvent) => {
    switch (event) {
      case "2x2":
        return 1.0;
      case "3x3":
      case "3x3 OH":
      case "3x3 BLD":
      case "3x3 FMC":
        return 0.65;
      case "4x4":
      case "4x4 BLD":
        return 0.55;
      case "5x5":
      case "5x5 BLD":
        return 0.45;
      case "6x6":
        return 0.39;
      case "7x7":
        return 0.32;
      case "Clock":
        return 1.0;
      case "Megaminx":
        return 0.8;
      case "Pyraminx":
        return 0.7;
      case "Skewb":
        return 0.7;
      case "Square-1":
        return 0.7;
      case "3x3 MBLD":
        return 0.65;
      default:
        return 0.65;
    }
  };

  // Helper function to get vertical position based on event type
  const getVerticalPosition = (event: CubeEvent) => {
    switch (event) {
      case "2x2":
        return -45; 
      case "3x3":
      case "3x3 OH":
      case "3x3 BLD":
      case "3x3 FMC":
        return -65;
      case "4x4":
      case "4x4 BLD":
        return -75;
      case "5x5":
      case "5x5 BLD":
        return -80; 
      case "6x6":
        return -85;
      case "7x7":
        return -85; 
      case "Clock":
        return -50; 
      case "Megaminx":
        return -55; 
      case "Pyraminx":
        return -65;
      case "Skewb":
        return -65;
      case "Square-1":
        return -55; 
      case "3x3 MBLD":
        return -65;
      default:
        return -65;
    }
  };

  // Generate new scramble
  const generateNewScramble = useCallback(() => {
    try {
      const currentSession = sessions.find(s => s.id === currentSessionId);
      if (!currentSession) return;

      const scrambleConfig = eventTypeMap[currentSession.event];
      if (!scrambleConfig) {
        console.error('Invalid event type:', currentSession.event);
        setScramble(mockScramble);
        return;
      }

      // Check if cstimer is initialized
      if (!isCstimerInitialized || !cstimer || !cstimer.getScramble) {
        console.error('cstimer is not initialized');
        setScramble(mockScramble);
        return;
      }

      // Generate scramble
      let newScramble;
      try {
        newScramble = cstimer.getScramble(scrambleConfig.type, scrambleConfig.length);
      } catch (scrambleError) {
        console.error('Error generating scramble:', scrambleError);
        setScramble(mockScramble);
        return;
      }

      if (!newScramble) {
        console.error('Failed to generate scramble for type:', scrambleConfig.type);
        setScramble(mockScramble);
        return;
      }

    setScramble(newScramble);

      // Generate and store the scramble image
      try {
        const image = cstimer.getImage(newScramble, scrambleConfig.type);
        setScrambleImage(image || "");
      } catch (imageError) {
        console.error('Error generating scramble image:', imageError);
        setScrambleImage("");
      }
    } catch (error) {
      console.error('Error in generateNewScramble:', error);
      setScramble(mockScramble);
      setScrambleImage("");
    }
  }, [sessions, currentSessionId]);

  // Update useEffect to generate initial scramble
  useEffect(() => {
    generateNewScramble();
  }, [generateNewScramble, currentSessionId]);

  // Timer functions
  const startTimer = useCallback(() => {
    setIsRunning(true);
    setTimerValue("0.00");
    timeRef.current = 0;
  }, []);

  const startInspection = useCallback(() => {
    setIsInspecting(true);
    setInspectionTime(15);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    const finalTime = timeRef.current;
    const newTime: SolveTime = {
      id: times.length + 1,
      time: finalTime,
      status: "normal",
      date: new Date().toISOString(),
      scramble
    };
    
    setTimes(prev => [...prev, newTime]);
    generateNewScramble();
  }, [scramble, generateNewScramble, times.length]);

  // Update timer type change handler
  const handleTimerTypeChange = useCallback((type: 'keyboard' | 'typing') => {
    setSettings(prev => ({ ...prev, timerType: type }));
  }, []);

  // Add typing input handler
  const handleTypingInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers, one decimal point, and one colon
    if (/^(\d*:)?\d*\.?\d*$/.test(value)) {
      setTypingInput(value);
    }
  }, []);

  // Add typing submit handler
  const handleTypingSubmit = useCallback(() => {
    if (!typingInput) return;
    
    // Convert time string to milliseconds
    let time;
    try {
      if (typingInput.includes(':')) {
        // Handle minutes format (e.g., "1:11.11")
        const [minutes, rest] = typingInput.split(':');
        const [seconds, centiseconds] = rest.split('.');
        time = (parseInt(minutes) * 60 + parseInt(seconds)) * 1000 + parseInt(centiseconds || '0') * 10;
      } else {
        // Handle seconds format (e.g., "11.11")
        const [seconds, centiseconds] = typingInput.split('.');
        time = parseInt(seconds) * 1000 + parseInt(centiseconds || '0') * 10;
      }

      if (isNaN(time)) {
        toast.error('Invalid time format');
        return;
      }

      const newTime: SolveTime = {
        id: times.length + 1,
        time: time,
        status: "normal",
        date: new Date().toISOString(),
        scramble
      };
      
      setTimes(prev => [...prev, newTime]);
      setTypingInput("");
      generateNewScramble();
    } catch (error) {
      toast.error('Invalid time format');
    }
  }, [typingInput, times.length, scramble, generateNewScramble]);

  // Update keyboard event handler
  useEffect(() => {
    if (settings.timerType !== 'keyboard') return;

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
    inspectionEnabled,
    settings.timerType
  ]);

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
      setTimerValue(formatTime(elapsed));
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

  // Penalty management
  const addPenalty = useCallback((id: number, penalty: 'plus2' | 'dnf') => {
    setTimes(prev => prev.map((time) =>
      time.id === id ? { ...time, status: time.status === penalty ? "normal" : penalty } : time
    ));
  }, []);

  const deleteTime = useCallback((id: number) => {
    setTimes(prev => prev.filter((time) => time.id !== id));
  }, []);

  const getTimerColor = useCallback(() => {
    if (isRunning) return 'text-white';
    if (isInspecting) {
      return isHoldingLongEnough ? 'text-green-500' : (isSpacePressed ? 'text-red-500' : '');
    }
    return 'text-foreground';
  }, [isRunning, isInspecting, isHoldingLongEnough, isSpacePressed]);

  // Calculate stats
  const calculateStats = useCallback((times: SolveTime[]) => {
    const validTimes = times
      .filter(t => t.status !== 'dnf')
      .map(t => t.status === 'plus2' ? t.time + 2000 : t.time);
    
    if (validTimes.length === 0) {
      return {
        best: 0,
        average: 0,
        ao5: 0,
        ao12: 0,
        ao50: 0,
        ao100: 0,
        mean: 0,
        median: 0,
        worst: 0
      };
    }

    const calculateTrimmedMean = (arr: number[], trim: number) => {
      if (arr.length < trim * 2 + 1) return 0;
      const sorted = [...arr].sort((a, b) => a - b);
      const trimmed = sorted.slice(trim, -trim);
      return trimmed.reduce((a, b) => a + b, 0) / trimmed.length;
    };

    const calculateAverage = (arr: number[], size: number) => {
      if (arr.length < size) return 0;
      return calculateTrimmedMean(arr.slice(-size), 1);
    };

    const sortedTimes = [...validTimes].sort((a, b) => a - b);
    const median = sortedTimes.length % 2 === 0
      ? (sortedTimes[sortedTimes.length / 2 - 1] + sortedTimes[sortedTimes.length / 2]) / 2
      : sortedTimes[Math.floor(sortedTimes.length / 2)];

    return {
      best: Math.min(...validTimes),
      average: validTimes.reduce((a, b) => a + b, 0) / validTimes.length,
      ao5: calculateAverage(validTimes, 5),
      ao12: calculateAverage(validTimes, 12),
      ao50: calculateAverage(validTimes, 50),
      ao100: calculateAverage(validTimes, 100),
      mean: validTimes.reduce((a, b) => a + b, 0) / validTimes.length,
      median,
      worst: Math.max(...validTimes)
    };
  }, []);

  // Get current session stats
  const currentStats = useMemo(() => {
    const currentSession = sessions.find(s => s.id === currentSessionId);
    if (!currentSession || !currentSession.statConfig) return [];

    const stats = calculateStats(currentSession.times);
    return currentSession.statConfig
      .filter(config => config.enabled)
      .map(config => ({
        type: config.type,
        value: stats[config.type]
      }));
  }, [sessions, currentSessionId, calculateStats]);

  // Toggle stat visibility
  const toggleStat = (statType: StatType) => {
    setSessions(prev => prev.map(session =>
      session.id === currentSessionId
        ? {
            ...session,
            statConfig: (session.statConfig || [...defaultStatConfig]).map(config =>
              config.type === statType
                ? { ...config, enabled: !config.enabled }
                : config
            )
          }
        : session
    ));
  };

  const handleCopyScramble = useCallback(async (scrambleText: string) => {
    await navigator.clipboard.writeText(scrambleText);
    toast("Copied to clipboard", {
      duration: 2000,
      className: "font-mono bg-background text-foreground",
      position: "bottom-center",
    });
  }, []);

  const handleCopyTime = useCallback(async (time: SolveTime) => {
    if (!time.date) return;
    
    const date = new Date(time.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }) + ' ' + new Date(time.date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const timeStr = formatTime(time.time, time.status === "plus2" ? "plus2" : undefined);
    const text = `Generated by Icecube Timer on ${date}\nTime: ${timeStr}\n\nScramble: ${time.scramble}`;
    await navigator.clipboard.writeText(text);
    toast("Time copied", {
      duration: 2000,
      className: "font-mono bg-background text-foreground",
      position: "bottom-center",
    });
  }, [formatTime]);

  const handleCopySummary = useCallback(() => {
    if (!selectedTime) return;
    const dateStr = selectedTime.date ? new Date(selectedTime.date).toLocaleString() : '';
    let selTimeStr = selectedTime.status === 'dnf' ? 'DNF' : ((selectedTime.status === 'plus2' ? selectedTime.time + 2000 : selectedTime.time) / 1000).toFixed(3);
    if (selectedTime.status === 'plus2') selTimeStr += '+';
    let text = `IceCube Timer\n`;
    text += `Date: ${dateStr}\n`;
    text += `\nSelected Solve:\n`;
    text += `Time: ${selTimeStr}\nScramble: ${selectedTime.scramble || ''}\n`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    toast("Summary copied", {
      duration: 2000,
      className: "font-mono bg-background text-foreground",
      position: "bottom-center",
    });
  }, [selectedTime]);

  const handleEditSession = (session: Session) => {
    setEditingSession(session);
    setNewSessionName(session.name);
    setNewSessionEvent(session.event);
  };

  const saveSessionEdit = () => {
    if (editingSession && newSessionName.trim()) {
      setSessions(prev => prev.map(session =>
        session.id === editingSession.id
          ? { ...session, name: newSessionName.trim(), event: newSessionEvent, lastModified: new Date().toISOString() }
          : session
      ));
      setEditingSession(null);
      setNewSessionName("");
      setNewSessionEvent("3x3");
    }
  };

  // Add keyboard shortcuts for penalties
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target !== document.body) return;
      
      if (selectedTime) {
        if (e.key === '+') {
          addPenalty(selectedTime.id, "plus2");
        } else if (e.key === 'd' || e.key === 'D') {
          addPenalty(selectedTime.id, "dnf");
        } else if (e.key === 'Delete' || e.key === 'Backspace') {
          if (window.confirm('Are you sure you want to delete this solve?')) {
            deleteTime(selectedTime.id);
            setSelectedTime(null);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedTime, addPenalty, deleteTime]);

  return (
    <div className="pt-16">
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/20 overflow-hidden">
        {/* Sidebar */}
        <Sidebar className="w-80 rounded-tr-xl border-r h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarContent className="h-full flex flex-col">
            <div className="p-4 pb-0 pl-2 sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {/* Session Selector Button */}
                  <Button 
                    variant="outline" 
                    size="default" 
                    className="flex-1 justify-between px-4 hover:bg-muted/50 transition-all duration-200 border-border/50 shadow-sm hover:shadow-md"
                    onClick={() => setIsSessionMenuOpen(!isSessionMenuOpen)}
                  >
                    <span className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-primary/10">
                        <TimerIcon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-base font-medium">
                        {sessions.find(s => s.id === currentSessionId)?.name || "Select Session"}
                </span>
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isSessionMenuOpen ? 'rotate-180' : ''}`} />
                  </Button>

                  {/* Settings Button */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 hover:bg-muted/50 transition-all duration-200 border-border/50 shadow-sm hover:shadow-md"
                    onClick={() => setIsSettingsOpen(true)}
                  >
                    <Settings2 className="h-4 w-4" />
              </Button>
                </div>

                {isSessionMenuOpen && (
                  <div className="w-11/12 ml-2 space-y-2 mt-2">
                    <ScrollArea className="h-[300px] pr-2">
                      <div className="space-y-2">
                        {sessions.map((session, index) => (
                          <div
                            key={`${session.id}-${index}`}
                            className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                              session.id === currentSessionId
                                ? 'bg-primary/10 text-primary'
                                : 'hover:bg-muted/50'
                            }`}
                          >
                            <div 
                              className="flex-1 truncate"
                              onClick={() => {
                                switchSession(session.id);
                                setIsSessionMenuOpen(false);
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <span className="truncate font-medium text-white">{session.name}</span>
                                <span className="text-xs text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-full">
                                  {session.times.length} solves
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {session.event}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 hover:bg-primary/10"
                                onClick={() => handleEditSession(session)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 hover:bg-destructive/10"
                                onClick={() => deleteSession(session.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    <div className="pt-2 border-t border-border/50">
                      {(isCreatingSession || editingSession) ? (
                        <div className="space-y-2 p-3 bg-muted/20 rounded-lg border border-border/50">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-muted-foreground">Session Name</label>
                            <input
                              type="text"
                              value={newSessionName}
                              onChange={(e) => setNewSessionName(e.target.value)}
                              placeholder="Enter session name"
                              className="w-full px-2 py-1.5 text-sm bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && newSessionName.trim()) {
                                  if (editingSession) {
                                    saveSessionEdit();
                                  } else {
                                    createNewSession(newSessionName.trim());
                                  }
                                } else if (e.key === 'Escape') {
                                  if (editingSession) {
                                    setEditingSession(null);
                                  } else {
                                    setIsCreatingSession(false);
                                  }
                                  setNewSessionName("");
                                }
                              }}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-muted-foreground">Event Type</label>
                            <select
                              value={newSessionEvent}
                              onChange={(e) => setNewSessionEvent(e.target.value as CubeEvent)}
                              className="w-full px-2 py-1.5 text-sm bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              <option value="3x3">3x3</option>
                              <option value="2x2">2x2</option>
                              <option value="4x4">4x4</option>
                              <option value="5x5">5x5</option>
                              <option value="6x6">6x6</option>
                              <option value="7x7">7x7</option>
                              <option value="3x3 OH">3x3 OH</option>
                              <option value="3x3 BLD">3x3 BLD</option>
                              <option value="4x4 BLD">4x4 BLD</option>
                              <option value="5x5 BLD">5x5 BLD</option>
                              <option value="3x3 MBLD">3x3 MBLD</option>
                              <option value="3x3 FMC">3x3 FMC</option>
                              <option value="Clock">Clock</option>
                              <option value="Megaminx">Megaminx</option>
                              <option value="Pyraminx">Pyraminx</option>
                              <option value="Skewb">Skewb</option>
                              <option value="Square-1">Square-1</option>
                            </select>
                          </div>
                          <div className="flex items-center gap-2 pt-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex-1"
                              onClick={() => {
                                if (editingSession) {
                                  setEditingSession(null);
                                } else {
                                  setIsCreatingSession(false);
                                }
                                setNewSessionName("");
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              className="flex-1"
                              onClick={() => {
                                if (newSessionName.trim()) {
                                  if (editingSession) {
                                    saveSessionEdit();
                                  } else {
                                    createNewSession(newSessionName.trim());
                                  }
                                }
                              }}
                            >
                              {editingSession ? 'Save Changes' : 'Create Session'}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-sm text-muted-foreground hover:text-foreground"
                          onClick={() => setIsCreatingSession(true)}
                        >
                          + New Session
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4 pt-2 pl-2 flex-1">
              <ScrollArea className="h-[calc(100vh-11rem)] pr-2 flex-1 [&_.simplebar-scrollbar]:w-2 [&_.simplebar-scrollbar]:bg-muted-foreground/30 [&_.simplebar-scrollbar:hover]:bg-muted-foreground/50">
                <div className="space-y-2 w-full pr-3">
                  {[...times].reverse().map((time, index) => (
                    <div
                      key={`${time.id}-${index}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-200 cursor-pointer border border-border/50 shadow-sm"
                      onClick={() => setSelectedTime(time)}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-muted-foreground">#{time.id}</span>
                        <span
                          className={`font-mono text-lg ${
                            time.status === "dnf"
                              ? "text-destructive"
                              : time.status === "plus2"
                              ? "text-amber-500"
                              : ""
                          }`}
                        >
                          {time.status === "dnf" ? "DNF" : formatTime(time.time, time.status === "plus2" ? "plus2" : undefined)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-7 px-2 text-sm transition-colors ${time.status === "plus2" ? 'bg-yellow-500/10 text-yellow-500' : 'hover:text-yellow-500 hover:bg-yellow-500/10'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            addPenalty(time.id, "plus2");
                          }}
                        >
                          +2
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-7 px-2 text-sm transition-colors ${time.status === "dnf" ? 'bg-red-500/10 text-red-500' : 'hover:text-red-500 hover:bg-red-500/10'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            addPenalty(time.id, "dnf");
                          }}
                        >
                          DNF
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 hover:bg-destructive/10 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTime(time.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col p-8 ${isRunning && settings.hideUIWhenRunning ? 'justify-center' : ''}`}>
          {/* Scramble */}
          {(!isRunning || !settings.hideUIWhenRunning) && (
          <div className="mb-8 text-center">
            <div className="inline-block p-6 rounded-xl bg-muted/20 hover:bg-muted/30 transition-all duration-200 shadow-lg border border-border/50 backdrop-blur supports-[backdrop-filter]:bg-muted/20">
                <p className="font-mono text-2xl tracking-wider font-medium text-foreground/90 leading-relaxed">{scramble}</p>
            </div>
          </div>
          )}

          {/* Timer */}
          <div className={`flex-1 flex items-center justify-center ${isRunning && settings.hideUIWhenRunning ? 'flex-1' : ''}`}>
            {settings.timerType === 'typing' ? (
              <input
                type="text"
                value={typingInput}
                onChange={handleTypingInput}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleTypingSubmit();
                  } else if (e.key === 'Escape') {
                    setTypingInput("");
                  }
                }}
                placeholder="0.00"
                className="text-7xl font-mono font-bold tracking-tighter bg-transparent border-none outline-none text-center w-64 text-foreground/90 placeholder:text-foreground/30 focus:ring-0"
                autoFocus
                spellCheck="false"
                autoComplete="off"
                inputMode="decimal"
              />
            ) : (
            <div 
              className={`text-9xl font-mono font-bold tracking-tighter transition-all duration-200 ${
                isRunning 
                  ? 'text-white' 
                  : isInspecting 
                    ? (isHoldingLongEnough 
                          ? 'text-green-500 animate-pulse' 
                        : (isSpacePressed 
                            ? 'text-red-500' 
                            : 'text-foreground/90'))
                    : 'text-foreground/90'
              }`}
            >
              {isInspecting ? inspectionTime : timerValue}
            </div>
            )}
          </div>

          {/* Statistics and Scramble Image */}
          {(!isRunning || !settings.hideUIWhenRunning) && (
            <div className="grid grid-cols-2 gap-6 h-64 relative">
            {/* Statistics Card */}
              {settings.showStatistics && (
            <Card className="border-border/50 shadow-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-medium text-muted-foreground">Statistics</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-primary/10 hover:text-primary transition-colors"
                        onClick={() => setIsEditingStats(true)}
                      >
                        <Settings2 className="h-4 w-4" />
                      </Button>
                  </div>
                    <div className={`grid gap-2 h-[calc(100%-1.5rem)] ${
                      currentStats.length <= 2 ? 'grid-cols-2' :
                      currentStats.length <= 4 ? 'grid-cols-2' :
                      currentStats.length <= 6 ? 'grid-cols-3' :
                      'grid-cols-4'
                    }`}>
                      {currentStats.length > 0 ? (
                        currentStats.map((stat, index) => (
                          <div key={`${stat.type}-${index}`} className={`bg-muted/20 p-2 rounded-lg border border-border/30 hover:bg-muted/30 transition-colors flex flex-col justify-center ${
                            currentStats.length <= 2 ? 'p-3' : ''
                          }`}>
                            <p className={`font-medium text-muted-foreground mb-0.5 truncate ${
                              currentStats.length <= 2 ? 'text-xs' :
                              currentStats.length <= 4 ? 'text-[11px]' :
                              'text-[10px]'
                            }`}>
                              {stat.type === 'ao5' ? 'Ao5' :
                               stat.type === 'ao12' ? 'Ao12' :
                               stat.type === 'ao50' ? 'Ao50' :
                               stat.type === 'ao100' ? 'Ao100' :
                               stat.type.charAt(0).toUpperCase() + stat.type.slice(1)}
                            </p>
                            <p className={`font-mono font-bold text-foreground/90 truncate ${
                              currentStats.length <= 2 ? 'text-lg' :
                              currentStats.length <= 4 ? 'text-base' :
                              'text-sm'
                            }`}>
                              {formatTime(stat.value)}
                            </p>
                  </div>
                        ))
                      ) : (
                        <div className="col-span-full flex items-center justify-center h-full">
                          <p className="text-xs text-muted-foreground">No statistics enabled</p>
                  </div>
                      )}
                </div>
              </CardContent>
            </Card>
              )}

            {/* Scramble Image Card */}
              {settings.showScrambleImage && (
            <Card className="border-border/50 shadow-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <CardContent className="flex items-center justify-center h-full p-6">
                    {scrambleImage ? (
                      <div 
                        className="w-full h-full flex items-center justify-center relative"
                        style={{
                          minWidth: '100%',
                          minHeight: '100%'
                        }}
                      >
                        <div 
                          className="absolute"
                          style={{
                            transformOrigin: 'center center',
                            top: '50%',
                            left: '50%',
                            transform: `translate(-50%, ${getVerticalPosition(sessions.find(s => s.id === currentSessionId)?.event || "3x3")}%) scale(${getScaleForEvent(sessions.find(s => s.id === currentSessionId)?.event || "3x3")})`,
                            filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))',
                            opacity: 0.95,
                            maxWidth: '100%',
                            maxHeight: '100%'
                          }}
                          dangerouslySetInnerHTML={{ __html: scrambleImage }}
                        />
                </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">Scramble Image</p>
                    )}
              </CardContent>
            </Card>
              )}
          </div>
          )}

          {/* Keyboard shortcuts info */}
          {settings.showKeyboardShortcuts && (
            <div className="absolute bottom-4 right-4 text-xs text-muted-foreground/50">
              <p>Space: Start/Stop • Esc: Cancel Inspection</p>
            </div>
          )}
        </div>

        {/* Time Details Modal */}
        <Dialog open={!!selectedTime} onOpenChange={() => setSelectedTime(null)}>
          <DialogContent className="sm:max-w-3xl p-0 bg-background">
            <DialogTitle className="sr-only">Solve Details</DialogTitle>
            <div className="flex flex-col items-center py-8 px-4">
              {/* Solve Number */}
              <div className="text-lg font-bold text-muted-foreground mb-1 text-center">
                Solves No.{selectedTime?.id}
              </div>
              {/* Time */}
              <div className={`font-mono text-5xl font-bold mb-4 text-center ${
                selectedTime?.status === "dnf"
                  ? "text-destructive"
                  : selectedTime?.status === "plus2"
                  ? "text-amber-500"
                  : "text-foreground"
              }`}>
                {selectedTime?.status === "dnf" 
                  ? "DNF" 
                  : formatTime(selectedTime?.time || 0, selectedTime?.status === "plus2" ? "plus2" : undefined)}
              </div>

              {/* Scramble and Image Side by Side */}
              <div className="w-full max-w-4xl flex flex-col sm:flex-row gap-4 mb-4">
                {/* Scramble Field */}
                <div className="flex-1 bg-muted/20 rounded-xl p-8 flex flex-col justify-center min-w-0 border border-border/50 shadow-sm relative">
                  <Button
                    size="icon"
                    variant="outline"
                    className={`absolute top-4 right-4 z-10 border border-border/50 bg-background/80 hover:bg-primary/10 active:bg-primary/20 transition-colors duration-150 h-10 w-10`}
                    onClick={handleCopySummary}
                    aria-label="Copy summary"
                  >
                    {copied ? (
                      <Check className="h-5 w-5 text-green-600 transition-all duration-150" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Button>
                  <div className="mb-6">
                    <div className="text-xs font-semibold text-muted-foreground mb-1">Scramble</div>
                    <span className="font-mono text-lg break-words w-full block px-2 py-1 rounded bg-background/80 border border-border/30 shadow-inner text-center" style={{wordBreak:'break-word', whiteSpace:'pre-wrap'}}>{selectedTime?.scramble}</span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1">Date</div>
                    <span className="font-mono text-sm">{selectedTime?.date && new Date(selectedTime.date).toLocaleString()}</span>
                  </div>
                </div>
                {/* Scramble Image */}
                <div className="flex-1 bg-muted/20 rounded-xl p-8 flex flex-col items-center justify-center min-w-0 border border-border/50 shadow-sm overflow-hidden relative">
                  {selectedTime?.scramble ? (
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        transformOrigin: 'center center',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, ${getVerticalPosition(sessions.find(s => s.id === currentSessionId)?.event || "3x3")}%) scale(${getScaleForEvent(sessions.find(s => s.id === currentSessionId)?.event || "3x3") * 1.2})`,
                        filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.2))',
                        opacity: 0.98
                      }}
                      dangerouslySetInnerHTML={{ 
                        __html: cstimer.getImage(
                          selectedTime.scramble,
                          eventTypeMap[sessions.find(s => s.id === currentSessionId)?.event || "3x3"].type
                        )
                      }}
                    />
                  ) : (
                    <span className="text-muted-foreground text-base">Scramble Image</span>
                  )}
                  </div>
                </div>
              </div>
          </DialogContent>
        </Dialog>

        {/* Stats Edit Modal */}
        <Dialog open={isEditingStats} onOpenChange={setIsEditingStats}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Statistics</DialogTitle>
              <DialogDescription>
                Choose which statistics to display in your session.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {defaultStatConfig.map(stat => {
                const currentSession = sessions.find(s => s.id === currentSessionId);
                const isEnabled = currentSession?.statConfig?.find(c => c.type === stat.type)?.enabled ?? false;
                return (
                  <div key={stat.type} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium leading-none">
                        {stat.type === 'ao5' ? 'Average of 5' :
                         stat.type === 'ao12' ? 'Average of 12' :
                         stat.type === 'ao50' ? 'Average of 50' :
                         stat.type === 'ao100' ? 'Average of 100' :
                         stat.type.charAt(0).toUpperCase() + stat.type.slice(1)}
                      </label>
                      <p className="text-sm text-muted-foreground">
                        {stat.type === 'best' ? 'Your fastest solve' :
                         stat.type === 'worst' ? 'Your slowest solve' :
                         stat.type === 'average' ? 'Mean of all solves' :
                         stat.type === 'mean' ? 'Arithmetic mean of all solves' :
                         stat.type === 'median' ? 'Middle value of all solves' :
                         `Average of your last ${stat.type.replace('ao', '')} solves`}
                      </p>
            </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 px-3 ${isEnabled ? 'bg-primary/10 text-primary' : ''}`}
                      onClick={() => toggleStat(stat.type)}
                    >
                      {isEnabled ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>
                );
              })}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditingStats(false)}
              >
                Done
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Settings Modal */}
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
              <DialogDescription>
                Options and preferences for IceCube Timer
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Timer Input</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium leading-none">Timer Type</label>
                        <p className="text-sm text-muted-foreground">Select your timer input method</p>
                      </div>
                      <select
                        value={settings.timerType}
                        onChange={(e) => handleTimerTypeChange(e.target.value as 'keyboard' | 'typing')}
                        className="px-2 py-1 text-sm bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="keyboard">Keyboard (Space)</option>
                        <option value="typing">Manual Typing</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Display Options</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium leading-none">Full Screen Mode</label>
                        <p className="text-sm text-muted-foreground">Enable full screen display</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 px-3 ${settings.fullScreen ? 'bg-primary/10 text-primary' : ''}`}
                        onClick={() => {
                          setSettings(prev => ({ ...prev, fullScreen: !prev.fullScreen }));
                          if (!settings.fullScreen) {
                            document.documentElement.requestFullscreen();
                          } else {
                            document.exitFullscreen();
                          }
                        }}
                      >
                        {settings.fullScreen ? 'Enabled' : 'Disabled'}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium leading-none">Hide UI When Running</label>
                        <p className="text-sm text-muted-foreground">Hide everything except timer during solve</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 px-3 ${settings.hideUIWhenRunning ? 'bg-primary/10 text-primary' : ''}`}
                        onClick={() => setSettings(prev => ({ ...prev, hideUIWhenRunning: !prev.hideUIWhenRunning }))}
                      >
                        {settings.hideUIWhenRunning ? 'Enabled' : 'Disabled'}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium leading-none">Show Scramble Image</label>
                        <p className="text-sm text-muted-foreground">Display scramble visualization</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 px-3 ${settings.showScrambleImage ? 'bg-primary/10 text-primary' : ''}`}
                        onClick={() => setSettings(prev => ({ ...prev, showScrambleImage: !prev.showScrambleImage }))}
                      >
                        {settings.showScrambleImage ? 'Enabled' : 'Disabled'}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium leading-none">Show Statistics</label>
                        <p className="text-sm text-muted-foreground">Display solve statistics</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 px-3 ${settings.showStatistics ? 'bg-primary/10 text-primary' : ''}`}
                        onClick={() => setSettings(prev => ({ ...prev, showStatistics: !prev.showStatistics }))}
                      >
                        {settings.showStatistics ? 'Enabled' : 'Disabled'}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Timer Options</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium leading-none">Inspection Time</label>
                        <p className="text-sm text-muted-foreground">Set inspection time in seconds</p>
                      </div>
                      <select
                        value={settings.inspectionTime}
                        onChange={(e) => setSettings(prev => ({ ...prev, inspectionTime: Number(e.target.value) }))}
                        className="px-2 py-1 text-sm bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="0">0s</option>
                        <option value="15">15s</option>
                        <option value="17">17s</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium leading-none">Timer Display Format</label>
                        <p className="text-sm text-muted-foreground">Choose how time is displayed</p>
                      </div>
                      <select
                        value={settings.timerDisplayFormat}
                        onChange={(e) => setSettings(prev => ({ ...prev, timerDisplayFormat: e.target.value as 'decimal' | 'centiseconds' }))}
                        className="px-2 py-1 text-sm bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="decimal">Decimal (0.00)</option>
                        <option value="centiseconds">Centiseconds (0:00)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t">
                <Button
                  variant="outline"
                  className="w-full text-destructive hover:text-destructive"
                  onClick={() => {
                    const defaultSettings: TimerSettings = {
                      inspectionTime: 15,
                      inspectionEnabled: true,
                      showMilliseconds: true,
                      timerDisplayFormat: 'decimal',
                      showScrambleImage: true,
                      showStatistics: true,
                      showKeyboardShortcuts: true,
                      fullScreen: false,
                      hideUIWhenRunning: false,
                      timerType: 'keyboard'
                    };
                    setSettings(defaultSettings);
                    localStorage.setItem("timerSettings", JSON.stringify(defaultSettings));
                    setIsSettingsOpen(false);
                  }}
                >
                  Reset Settings to Default
                </Button>
                <div className="text-xs text-muted-foreground pt-2 text-center">
                  (This will reset all timer settings to their default values)
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Toaster />
        </div>
      </SidebarProvider>
    </div>
  );
}
