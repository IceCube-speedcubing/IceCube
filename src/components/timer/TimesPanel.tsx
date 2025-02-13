import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { WCAEventId } from "@/types/WCAEvents";

interface TimesPanelProps {
  sortedTimes: Array<{
    time: number;
    penalty?: 'plus2' | 'dnf';
    date: Date;
    scramble: string;
  }>;
  formatTime: (ms: number, penalty?: 'plus2' | 'dnf') => string;
  setSelectedTime: (time: {
    time: number;
    penalty?: 'plus2' | 'dnf';
    date: Date;
    scramble: string;
  } | null) => void;
  addPenalty: (index: number, penalty: 'plus2' | 'dnf') => void;
  deleteTime: (index: number) => void;
  event: WCAEventId;
  setEvent: (event: WCAEventId) => void;
}

export function TimesPanel({
  sortedTimes,
  formatTime,
  setSelectedTime,
  addPenalty,
  deleteTime
}: TimesPanelProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const reversedTimes = [...sortedTimes].reverse();

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
      <div className="p-3 border-b font-medium bg-muted/10">Times</div>
      <ScrollArea className="h-48">
        {reversedTimes.map((t, index) => (
          <div 
            key={t.date.getTime()} 
            className="px-4 py-3 border-b hover:bg-muted/50 flex items-center justify-between group cursor-pointer"
            onClick={() => setSelectedTime(t)}
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
                className="h-7 w-7 p-0 hover:bg-destructive/10 transition-opacity"
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