
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
  touchHoldingLongEnough
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

  return (
    <div 
      className="flex-1 flex flex-col items-center justify-center touch-none select-none relative"
    >
      <div className="absolute top-8 left-0 right-0 text-center pointer-events-none">
        <div className="text-sm text-muted-foreground">
          {isTouchHolding ? (touchHoldingLongEnough ? "Release to start" : "Hold to ready") : 
           isRunning ? "Tap to stop" : "Hold to start"}
        </div>
      </div>

      <div 
        className="w-full h-full flex items-center justify-center"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
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
      </div>
    </div>
  );
} 