'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsPanelProps {
  times: Array<{
    time: number;
    date: Date;
    scramble: string;
    penalty?: 'plus2' | 'dnf';
  }>;
  formatTime: (ms: number, penalty?: 'plus2' | 'dnf') => string;
  setSelectedTime: (time: {
    time: number;
    date: Date;
    scramble: string;
    penalty?: 'plus2' | 'dnf';
  } | null) => void;
}

const DEFAULT_STATS = [
  { id: 'best', label: 'Best', category: 'single', description: 'Best single solve' },
  { id: 'mean', label: 'Mean', category: 'average', description: 'Average of all solves' },
  { id: 'ao5', label: 'Ao5', category: 'average', count: 5, description: 'Average of last 5 solves' },
  { id: 'ao12', label: 'Ao12', category: 'average', count: 12, description: 'Average of last 12 solves' },
];

export function StatsPanel({ times, formatTime, setSelectedTime }: StatsPanelProps) {
  const [showAverageDialog, setShowAverageDialog] = useState<boolean>(false);
  const [selectedStat, setSelectedStat] = useState<typeof DEFAULT_STATS[0] | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="p-3 border-b font-medium bg-muted/10">
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="h-[202px] p-4">
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-md p-2.5 bg-muted/50">
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-7 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const calculateStatValue = (stat: typeof DEFAULT_STATS[0]): number => {
    if (times.length === 0) return 0;

    const validTimes = times
      .filter((t) => t.penalty !== "dnf")
      .map((t) => (t.penalty === "plus2" ? t.time + 2000 : t.time));

    if (validTimes.length === 0) return 0;

    switch (stat.id) {
      case "best":
        return Math.min(...validTimes);
      case "mean":
        return (
          validTimes.reduce((sum, time) => sum + time, 0) / validTimes.length
        );
      case "ao5":
      case "ao12":
        if (validTimes.length < stat.count!) return 0;
        const recentTimes = validTimes.slice(-stat.count!);
        const sorted = [...recentTimes].sort((a, b) => a - b);
        const trimmed = sorted.slice(1, -1);
        return trimmed.reduce((sum, time) => sum + time, 0) / trimmed.length;
      default:
        return 0;
    }
  };

  const getBestTime = () => {
    if (times.length === 0) return null;
    return times.reduce((best, current) => {
      const currentTime = current.penalty === 'plus2' ? current.time + 2000 : current.time;
      const bestTime = best.penalty === 'plus2' ? best.time + 2000 : best.time;
      if (current.penalty === 'dnf') return best;
      if (best.penalty === 'dnf') return current;
      return currentTime < bestTime ? current : best;
    });
  };

  const getAverageDetails = (stat: typeof DEFAULT_STATS[0]) => {
    if (!stat.count) return [];
    
    // Get the recent times with their original indices
    const recentTimes = times.slice(-stat.count).map((t, i) => ({
      ...t,
      index: times.length - stat.count + i + 1,
      originalValue: t.penalty === 'dnf' ? Infinity : (t.penalty === 'plus2' ? t.time + 2000 : t.time)
    }));

    // Find the best and worst indices based on the processed times
    const processedTimes = recentTimes.map(t => t.originalValue);
    const maxValue = Math.max(...processedTimes);
    const minValue = Math.min(...processedTimes.filter(t => t !== Infinity));
    
    // Mark each time as counting or not
    return recentTimes.map(t => ({
      ...t,
      counting: t.originalValue !== maxValue && t.originalValue !== minValue
    }));
  };

  const handleStatClick = (stat: typeof DEFAULT_STATS[0]) => {
    if (stat.id === 'best') {
      const bestTime = getBestTime();
      if (bestTime) setSelectedTime(bestTime);
    } else {
      setSelectedStat(stat);
      setShowAverageDialog(true);
    }
  };

  return (
    <>
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="p-3 border-b font-medium bg-muted/10">Statistics</div>
        <div className="h-[202px] p-4">
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-2">
            {DEFAULT_STATS.map((stat) => (
              <div
                key={stat.id}
                className="rounded-md p-2.5 relative group transition-colors bg-muted/50 hover:bg-muted/70 cursor-pointer"
                title={stat.description}
                onClick={() => handleStatClick(stat)}
              >
                <div className="text-sm text-muted-foreground flex items-center justify-between">
                  {stat.label}
                  {stat.count && <span className="text-xs opacity-50">/{stat.count}</span>}
                </div>
                <div className="font-mono text-lg font-medium">
                  {formatTime(calculateStatValue(stat))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={showAverageDialog} onOpenChange={setShowAverageDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {selectedStat?.label} Details
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="text-sm font-medium text-muted-foreground mb-2">Average</div>
              <div className="font-mono text-4xl">
                {selectedStat && formatTime(calculateStatValue(selectedStat))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Times</div>
              <div className="space-y-1">
                {selectedStat && getAverageDetails(selectedStat).map((t, _, arr) => {
                  const processedTimes = arr.map(t => t.originalValue);
                  const maxValue = Math.max(...processedTimes);
                  const minValue = Math.min(...processedTimes.filter(t => t !== Infinity));
                  return (
                    <div
                      key={t.date.getTime()}
                      className="flex items-center justify-between p-2 rounded-md bg-muted/30"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">#{t.index}</span>
                        <span className={`font-mono text-lg ${!t.counting ? 'opacity-50' : ''}`}>
                          {formatTime(t.time, t.penalty)}
                        </span>
                      </div>
                      {!t.counting && (
                        <span className="text-xs text-muted-foreground">
                          {t.originalValue === maxValue ? '(worst)' : '(best)'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
