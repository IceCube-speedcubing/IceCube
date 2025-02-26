export function formatTime(ms: number, penalty?: 'plus2' | 'dnf'): string {
  if (penalty === 'dnf') return 'DNF';
  
  const totalMs = penalty === 'plus2' ? ms + 2000 : ms;
  
  // Handle negative time (for inspection)
  if (totalMs < 0) {
    return Math.abs(Math.ceil(totalMs / 1000)).toString();
  }
  
  const hours = Math.floor(totalMs / 3600000);
  const minutes = Math.floor((totalMs % 3600000) / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const milliseconds = Math.floor((totalMs % 1000) / 10);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  }
  if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  }
  
  const timeStr = `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
  return penalty === 'plus2' ? `${timeStr}+` : timeStr;
}