import { Button } from "@/components/ui/button";

interface MobileTimerDisplayProps {
  time: number;
  formatTime: (ms: number, penalty?: 'plus2' | 'dnf', showInspection?: boolean) => string;
  isRunning: boolean;
  isInspecting: boolean;
  getTimerColor: () => string;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  isTouchHolding: boolean;
  touchHoldingLongEnough: boolean;
  timerMode: 'keyboard' | 'typing' | 'stackmat';
  stopTimer: () => void;
  startTimer: () => void;
  startInspection: () => void;
  setIsInspecting: (isInspecting: boolean) => void;
  setIsTouchHolding: (isHolding: boolean) => void;
  setTouchHoldingLongEnough: (isLongEnough: boolean) => void;
  inspectionEnabled: boolean;
}

export function MobileTimerDisplay({
  time,
  formatTime,
  isRunning,
  isInspecting,
  getTimerColor,
  onTouchStart,
  onTouchEnd,
  isTouchHolding,
  touchHoldingLongEnough,
  timerMode,
  stopTimer,
  startTimer,
  startInspection,
  setIsInspecting,
  setIsTouchHolding,
  setTouchHoldingLongEnough,
  inspectionEnabled
}: MobileTimerDisplayProps) {
  const getDisplayColor = () => {
    if (isRunning) return getTimerColor();
    if (isInspecting) {
      if (time >= 15000) return "text-red-500";
      if (time >= 8000) return "text-yellow-500";
      return touchHoldingLongEnough ? "text-green-500" : (isTouchHolding ? "text-yellow-500" : "text-foreground");
    }
    return touchHoldingLongEnough ? "text-green-500" : (isTouchHolding ? "text-yellow-500" : getTimerColor());
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (timerMode !== 'keyboard') return;
    onTouchStart(e);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (timerMode !== 'keyboard') return;
    onTouchEnd(e);
    
    if (isInspecting && touchHoldingLongEnough) {
      setIsInspecting(false);
      startTimer();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center touch-none select-none relative">
      <div 
        className="w-full h-full flex flex-col items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {isInspecting && (
          <Button
            variant="outline"
            size="sm"
            className="absolute bottom-8 text-muted-foreground hover:text-destructive hover:border-destructive"
            onClick={() => setIsInspecting(false)}
          >
            Cancel Inspection
          </Button>
        )}
        <div 
          className={`font-mono text-8xl transition-all duration-300 select-none ${getDisplayColor()}`}
          style={{
            transform: isTouchHolding ? 'scale(0.95)' : 'scale(1)',
            opacity: isTouchHolding && !touchHoldingLongEnough ? '0.5' : '1',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            KhtmlUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
          }}
        >
          {formatTime(time, undefined, isInspecting && !isRunning)}
        </div>
        
        <div className="text-sm text-muted-foreground mt-8 mb-20 pointer-events-none">
          {isTouchHolding ? 
            (touchHoldingLongEnough ? "Release to start" : "Hold to ready") : 
            isRunning ? "Tap to stop" : 
            isInspecting ? "Hold to start solve" : 
            inspectionEnabled ? "Hold to start inspection" : "Hold to start"}
        </div>
      </div>
    </div>
  );
} 