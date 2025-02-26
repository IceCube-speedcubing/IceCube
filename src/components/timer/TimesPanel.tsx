import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { WCAEventId } from "@/types/WCAEvents";
import { SessionManager } from "./SessionManager";
import { Session, SolveTime } from "@/types/Sessions";

interface TimesPanelProps {
  sortedTimes: SolveTime[];
  formatTime: (ms: number, penalty?: 'plus2' | 'dnf') => string;
  setSelectedTime: (time: SolveTime | null) => void;
  addPenalty: (index: number, penalty: 'plus2' | 'dnf') => void;
  deleteTime: (index: number) => void;
  event: WCAEventId;
  setEvent: (event: WCAEventId) => void;
  sessions: Session[];
  currentSession: Session;
  onSessionChange: (session: Session) => void;
  onSessionCreate: (name: string, event: WCAEventId) => void;
  onSessionDelete: (id: string) => void;
  onSessionRename: (id: string, newName: string) => void;
}

export function TimesPanel({
  sortedTimes,
  formatTime,
  setSelectedTime,
  addPenalty,
  deleteTime,
  sessions: initialSessions = [],
  currentSession: initialCurrentSession,
  onSessionChange,
  onSessionCreate,
  onSessionDelete,
  onSessionRename
}: TimesPanelProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  // Ensure dates are properly instantiated
  const reversedTimes = [...sortedTimes].map(t => ({
    ...t,
    date: new Date(t.date)
  })).reverse();

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="p-3 border-b">
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="p-4 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="p-3 border-b font-medium bg-muted/10 flex items-center justify-between">
        <span>Times</span>
        <SessionManager
          sessions={initialSessions}
          currentSession={initialCurrentSession}
          onSessionChange={onSessionChange}
          onSessionCreate={onSessionCreate}
          onSessionDelete={onSessionDelete}
          onSessionRename={onSessionRename}
        />
      </div>
      <ScrollArea className="h-48">
        {reversedTimes.map((t, index) => (
          <div 
            key={t.date.getTime()} 
            className="px-4 py-3 border-b hover:bg-muted/50 flex items-center justify-between group cursor-pointer"
            onClick={() => setSelectedTime({...t, date: t.date.toISOString()})}
          >
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">#{sortedTimes.length - index}</span>
              <span className="font-mono text-lg">{formatTime(t.time, t.penalty)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-7 px-2 text-sm ${t.penalty === 'plus2' ? 'bg-yellow-500/10 text-yellow-500' : 'hover:text-yellow-500 hover:bg-yellow-500/10'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  addPenalty(sortedTimes.length - 1 - index, 'plus2');
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
                  addPenalty(sortedTimes.length - 1 - index, 'dnf');
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
                  deleteTime(sortedTimes.length - 1 - index);
                }}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
} 