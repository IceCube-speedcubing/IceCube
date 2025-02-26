import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, Settings2, Check, Keyboard, Type, Trash2, Timer } from "lucide-react";
import { MobileTimerDisplay } from "./MobileTimerDisplay";
import { ScrambleDisplay } from "./ScrambleDisplay";
import { WCAEventId } from "@/types/WCAEvents";
import { SolveTime } from "@/types/Sessions";

interface MobileLayoutProps {
  time: number;
  formatTime: (ms: number, penalty?: 'plus2' | 'dnf', showInspection?: boolean) => string;
  isRunning: boolean;
  isInspecting: boolean;
  getTimerColor: () => string;
  scramble: string;
  sortedTimes: SolveTime[];
  stats: {
    best: number;
    average: number;
    ao5: number;
    ao12: number;
  };
  setSelectedTime: (time: SolveTime | null) => void;
  addPenalty: (index: number, penalty: 'plus2' | 'dnf') => void;
  deleteTime: (index: number) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  isTouchHolding: boolean;
  touchHoldingLongEnough: boolean;
  timerMode: 'keyboard' | 'typing' | 'stackmat';
  setTimerMode: (mode: 'keyboard' | 'typing' | 'stackmat') => void;
  stopTimer: () => void;
  startTimer: () => void;
  startInspection: () => void;
  setIsInspecting: (isInspecting: boolean) => void;
  setIsTouchHolding: (isHolding: boolean) => void;
  setTouchHoldingLongEnough: (isLongEnough: boolean) => void;
  inspectionEnabled: boolean;
  saveInspectionEnabled: (enabled: boolean) => void;
  event: WCAEventId;
  setEvent: (event: WCAEventId) => void;
}

export function MobileLayout({
  time,
  formatTime,
  isRunning,
  isInspecting,
  getTimerColor,
  scramble,
  sortedTimes,
  stats,
  setSelectedTime,
  addPenalty,
  deleteTime,
  onTouchStart,
  onTouchEnd,
  isTouchHolding,
  touchHoldingLongEnough,
  timerMode,
  setTimerMode,
  stopTimer,
  startTimer,
  startInspection,
  setIsInspecting,
  setIsTouchHolding,
  setTouchHoldingLongEnough,
  inspectionEnabled,
  saveInspectionEnabled,
  event,
}: MobileLayoutProps) {
  const reversedTimes = sortedTimes.map(t => ({
    ...t,
    date: new Date(t.date)
  })).reverse();

  return (
    <div className="h-[100dvh] flex flex-col bg-background select-none">
      {/* Timer */}
      <div className="flex-1 flex flex-col min-h-0">
        <MobileTimerDisplay
          time={time}
          formatTime={formatTime}
          isRunning={isRunning}
          isInspecting={isInspecting}
          getTimerColor={getTimerColor}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          isTouchHolding={isTouchHolding}
          touchHoldingLongEnough={touchHoldingLongEnough}
          timerMode={timerMode}
          stopTimer={stopTimer}
          startTimer={startTimer}
          startInspection={startInspection}
          setIsInspecting={setIsInspecting}
          setIsTouchHolding={setIsTouchHolding}
          setTouchHoldingLongEnough={setTouchHoldingLongEnough}
          inspectionEnabled={inspectionEnabled}
        />
      </div>

      {/* Bottom section with scramble and stats */}
      <div className="border-t shrink-0">
        {/* Scramble */}
        <div className="p-4 border-b bg-card/50">
          <ScrambleDisplay scramble={scramble} event={event} />
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-card/50">
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
            {sortedTimes.length > 0 && (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 px-2 text-sm hover:text-yellow-500 hover:bg-yellow-500/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    addPenalty(sortedTimes.length - 1, 'plus2');
                  }}
                >
                  +2
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 px-2 text-sm hover:text-red-500 hover:bg-red-500/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    addPenalty(sortedTimes.length - 1, 'dnf');
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
                    deleteTime(sortedTimes.length - 1);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="h-9 px-3 flex items-center gap-2">
                  <Menu className="h-5 w-5" />
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Times</span>
                    <div className="px-1.5 py-0.5 rounded-md bg-muted text-xs font-medium">
                      {sortedTimes.length}
                    </div>
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] sm:w-[400px] p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Solve Times</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b bg-muted/50">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">Times</h2>
                      <div className="text-sm text-muted-foreground">
                        {sortedTimes.length} solves
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {reversedTimes.map((solve, index) => (
                      <div
                        key={solve.date.getTime()}
                        className="flex items-center px-4 py-3 border-b hover:bg-muted/50 cursor-pointer"
                        onClick={() => setSelectedTime({...solve, date: solve.date.toISOString()})}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-sm text-muted-foreground">
                            {sortedTimes.length - index}.
                          </div>
                          <div className="font-mono text-xl">
                            {formatTime(solve.time, solve.penalty)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Settings2 className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Timer Settings</SheetTitle>
                </SheetHeader>
                <div className="py-6">
                  <div>
                    <div className="px-2 py-1.5">
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Timer Mode</h4>
                    </div>
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-between"
                        onClick={() => setTimerMode('keyboard')}
                      >
                        <div className="flex items-center">
                          <Keyboard className="w-4 h-4 mr-2" />
                          Touch Timer
                        </div>
                        {timerMode === 'keyboard' && <Check className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-between"
                        onClick={() => setTimerMode('typing')}
                      >
                        <div className="flex items-center">
                          <Type className="w-4 h-4 mr-2" />
                          Type In Times
                        </div>
                        {timerMode === 'typing' && <Check className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="py-6">
                    <div>
                      <div className="px-2 py-1.5">
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Timer Settings</h4>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full justify-between"
                        onClick={() => saveInspectionEnabled(!inspectionEnabled)}
                      >
                        <div className="flex items-center">
                          <Timer className="w-4 h-4 mr-2" />
                          Inspection
                        </div>
                        {inspectionEnabled && <Check className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Stats panel */}
      <div className="bg-card/50 pb-safe">
        <div className="grid grid-cols-2 gap-3 p-4">
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="text-sm text-muted-foreground">Best</div>
            <div className="font-mono text-xl">{formatTime(stats.best)}</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="text-sm text-muted-foreground">Average</div>
            <div className="font-mono text-xl">{formatTime(stats.average)}</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="text-sm text-muted-foreground">ao5</div>
            <div className="font-mono text-xl">{formatTime(stats.ao5)}</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="text-sm text-muted-foreground">ao12</div>
            <div className="font-mono text-xl">{formatTime(stats.ao12)}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 