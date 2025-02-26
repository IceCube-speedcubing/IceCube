'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

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
  customStats?: Array<{
    id: string;
    label: string;
    category: 'single' | 'average';
    count?: number;
    description: string;
  }>;
  layout?: 'grid' | 'list';
  showDescriptions?: boolean;
  onCustomize?: (stats: Array<{
    id: string;
    label: string;
    category: 'single' | 'average';
    count?: number;
    description: string;
  }>) => void;
}

export const DEFAULT_STATS = [
  { id: 'best', label: 'Best', category: 'single' as const, description: 'Best single solve' },
  { id: 'mean', label: 'Mean', category: 'average' as const, description: 'Average of all solves' },
  { id: 'ao3', label: 'Ao3', category: 'average' as const, count: 3, description: 'Average of last 3 solves' },
  { id: 'ao5', label: 'Ao5', category: 'average' as const, count: 5, description: 'Average of last 5 solves' },
  { id: 'ao12', label: 'Ao12', category: 'average' as const, count: 12, description: 'Average of last 12 solves' },
  { id: 'ao50', label: 'Ao50', category: 'average' as const, count: 50, description: 'Average of last 50 solves' },
  { id: 'ao100', label: 'Ao100', category: 'average' as const, count: 100, description: 'Average of last 100 solves' },
];

type StatType = {
  id: string;
  label: string;
  category: 'single' | 'average';
  count?: number;
  description: string;
};

export function StatsPanel({ 
  times, 
  formatTime, 
  setSelectedTime,
  customStats = DEFAULT_STATS.slice(0, 4), // Default to first 4 stats
  onCustomize
}: StatsPanelProps) {
  const [showAverageDialog, setShowAverageDialog] = useState<boolean>(false);
  const [selectedStat, setSelectedStat] = useState<StatType | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCustomizeDialog, setShowCustomizeDialog] = useState<boolean>(false);
  const [selectedStats, setSelectedStats] = useState(() => {
    if (typeof window === 'undefined') return customStats.map(stat => stat.id);
    const saved = localStorage.getItem('selectedStats');
    return saved ? JSON.parse(saved) : customStats.map(stat => stat.id);
  });
  const [newStatType, setNewStatType] = useState<'single' | 'average'>('average');
  const [useOverallAverage, setUseOverallAverage] = useState(true);
  const [averageCount, setAverageCount] = useState<number>(0);
  const [resultType, setResultType] = useState<'current' | 'best' | 'worst'>('current');
  const [sessionOnly, setSessionOnly] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('selectedStats', JSON.stringify(selectedStats));
  }, [selectedStats]);

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

  const calculateStatValue = (stat: StatType): number | null => {
    if (times.length === 0) return null;

    const validTimes = times
      .filter((t) => t.penalty !== "dnf")
      .map((t) => (t.penalty === "plus2" ? t.time + 2000 : t.time));

    if (validTimes.length === 0) return null;

    switch (stat.id) {
      case "best":
        return Math.min(...validTimes);
      case "mean":
        return (
          validTimes.reduce((sum, time) => sum + time, 0) / validTimes.length
        );
      case "ao3":
      case "ao5":
      case "ao12":
      case "ao50":
      case "ao100":
        if (validTimes.length < stat.count!) return null;
        const recentTimes = validTimes.slice(-stat.count!);
        const sorted = [...recentTimes].sort((a, b) => a - b);
        const trimmed = sorted.slice(1, -1);
        return trimmed.reduce((sum, time) => sum + time, 0) / trimmed.length;
      default:
        return null;
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

  const getAverageDetails = (stat: StatType) => {
    if (!stat.count) return [];
    
    // Get the recent times with their original indices
    const recentTimes = times.slice(-stat.count).map((t, i) => ({
      ...t,
      date: new Date(t.date),
      index: times.length - stat.count! + i + 1,
      originalValue: t.penalty === 'dnf' ? Infinity : (t.penalty === 'plus2' ? t.time + 2000 : t.time)
    }));

    // Find the best and worst indices based on the processed times
    const processedTimes = recentTimes.map(t => t.originalValue);
    const maxValue = Math.max(...processedTimes);
    
    // Mark each time as counting or not
    return recentTimes.map(t => ({
      ...t,
      counting: t.originalValue !== maxValue && t.originalValue !== Math.min(...processedTimes.filter(t => t !== Infinity))
    }));
  };

  const handleStatClick = (stat: StatType) => {
    if (stat.id === 'best') {
      const bestTime = getBestTime();
      if (bestTime) setSelectedTime(bestTime);
    } else {
      setSelectedStat(stat);
      setShowAverageDialog(true);
    }
  };

  const statsToShow = customStats.filter(stat => selectedStats.includes(stat.id));

  return (
    <>
      <div className="rounded-lg border bg-card h-full flex flex-col">
        <div className="p-3 border-b font-medium bg-muted/10 flex items-center justify-between">
          <span>Statistics</span>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowCustomizeDialog(true)}>
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 p-4">
          <div className={cn(
            "grid gap-2 h-full",
            statsToShow.length <= 2 && "grid-cols-2",
            statsToShow.length === 3 && "grid-cols-3",
            statsToShow.length === 4 && "grid-cols-2",
            statsToShow.length === 5 && "grid-cols-3",
            statsToShow.length === 6 && "grid-cols-3",
            statsToShow.length > 6 && "grid-cols-4",
            "auto-rows-fr"
          )}>
            {statsToShow.map((stat) => (
              <div
                key={stat.id}
                className="rounded-md p-2.5 relative group transition-colors bg-muted/50 hover:bg-muted/70 cursor-pointer flex flex-col justify-between"
                title={stat.description}
                onClick={() => handleStatClick(stat)}
              >
                <div className="text-sm text-muted-foreground flex items-center justify-between">
                  {stat.label}
                  {stat.count && <span className="text-xs opacity-50">/{stat.count}</span>}
                </div>
                <div className="font-mono text-lg font-medium">
                  {calculateStatValue(stat) === null ? "-" : formatTime(calculateStatValue(stat)!)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={showAverageDialog} onOpenChange={setShowAverageDialog}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{selectedStat?.label} Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="rounded-lg bg-muted/50 p-4 space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Average</div>
                <div className="font-mono text-4xl break-all">
                  {selectedStat && formatTime(calculateStatValue(selectedStat)!)}
                </div>
              </div>
              <div className="space-y-2">
                {selectedStat && getAverageDetails(selectedStat).map((t) => (
                  <div
                    key={t.date.getTime()}
                    className={cn(
                      "rounded-md p-3 space-y-2 transition-colors",
                      !t.counting ? "bg-muted/50" : "bg-muted/30"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">#{t.index}</span>
                        <span className={cn(
                          "font-mono text-lg",
                          !t.counting && "opacity-75"
                        )}>
                          {formatTime(t.time, t.penalty)}
                        </span>
                      </div>
                      {!t.counting && (
                        <span className={cn(
                          "text-xs font-medium",
                          t.originalValue === Math.max(...getAverageDetails(selectedStat).map(x => x.originalValue))
                            ? "text-red-500"
                            : "text-green-500"
                        )}>
                          {t.originalValue === Math.max(...getAverageDetails(selectedStat).map(x => x.originalValue))
                            ? "worst"
                            : "best"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCustomizeDialog} onOpenChange={setShowCustomizeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customize Statistics</DialogTitle>
            <p className="text-sm text-muted-foreground">Select and configure your statistics</p>
          </DialogHeader>
          <ScrollArea className="max-h-[600px]">
            <div className="space-y-6 pr-4">
              <div className="grid grid-cols-2 gap-2">
                {customStats.map((stat) => (
                  <div
                    key={stat.id}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-colors",
                      "hover:bg-muted/5",
                      selectedStats.includes(stat.id) && "bg-primary/10 border-primary"
                    )}
                    onClick={() => {
                      const newSelectedStats = selectedStats.includes(stat.id)
                        ? selectedStats.filter((id: string) => id !== stat.id)
                        : [...selectedStats, stat.id];
                      setSelectedStats(newSelectedStats);
                      
                      // Update customStats order based on selection
                      const newStats = customStats.sort((a, b) => {
                        const aSelected = newSelectedStats.includes(a.id);
                        const bSelected = newSelectedStats.includes(b.id);
                        if (aSelected && !bSelected) return -1;
                        if (!aSelected && bSelected) return 1;
                        return 0;
                      });
                      
                      onCustomize?.(newStats);
                    }}
                  >
                    <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                    <div className="font-mono text-lg">
                      {calculateStatValue(stat) === null ? "-" : formatTime(calculateStatValue(stat)!)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-4">Add New Statistic</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Type</h4>
                    <div className="flex gap-2">
                      <Button 
                        variant={newStatType === 'single' ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setNewStatType('single')}
                      >
                        Single
                      </Button>
                      <Button 
                        variant={newStatType === 'average' ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setNewStatType('average')}
                      >
                        Average
                      </Button>
                    </div>
                  </div>

                  {newStatType === 'average' && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Average By</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="overall" 
                            checked={useOverallAverage}
                            onCheckedChange={(checked) => setUseOverallAverage(checked as boolean)}
                          />
                          <label htmlFor="overall" className="text-sm">Overall average</label>
                        </div>
                        {!useOverallAverage && (
                          <div className="space-y-2">
                            <div className="flex gap-1">
                              {[5, 12, 50, 100, 1000].map((num) => (
                                <Button
                                  key={num}
                                  variant="outline"
                                  size="sm"
                                  className="px-2 h-7"
                                  onClick={() => setAverageCount(num)}
                                >
                                  {num}
                                </Button>
                              ))}
                            </div>
                            <div className="space-y-1">
                              <div className="flex gap-2">
                                <Input 
                                  type="number" 
                                  min={3}
                                  max={10000}
                                  value={averageCount || ''}
                                  onChange={(e) => setAverageCount(parseInt(e.target.value) || 0)}
                                  className="w-full"
                                />
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setAverageCount(0)}
                                >
                                  Clear
                                </Button>
                              </div>
                              <p className="text-xs text-muted-foreground">Must be between 3 and 10,000</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-medium mb-2">Result Type</h4>
                    <div className="flex gap-2">
                      {['current', 'best', 'worst'].map((type) => (
                        <Button 
                          key={type}
                          variant={resultType === type ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setResultType(type as typeof resultType)}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Options</h4>
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="session" 
                        checked={sessionOnly}
                        onCheckedChange={(checked) => setSessionOnly(checked as boolean)}
                      />
                      <label htmlFor="session" className="text-sm">Session solves only</label>
                    </div>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => {
                      if (typeof window === 'undefined') return;
                      
                      const newStat = {
                        id: `custom-${Date.now()}`,
                        label: `${newStatType === 'single' ? 'Single' : `Ao${averageCount}`}`,
                        category: newStatType,
                        count: newStatType === 'average' ? averageCount : undefined,
                        description: `Custom ${newStatType} statistic`
                      };
                      
                      const newStats = [...customStats, newStat];
                      onCustomize?.(newStats);
                      setSelectedStats([...selectedStats, newStat.id]);
                      setShowCustomizeDialog(false);
                    }}
                  >
                    Add Statistic
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
