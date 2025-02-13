type Time = {
  time: number;
  penalty?: 'plus2' | 'dnf';
};

export function calculateAverage(times: Time[], count: number): number {
  if (times.length < count) return 0;

  // Get the most recent times
  const recentTimes = times.slice(-count);
  
  // Convert times to numbers, handling penalties
  const processedTimes = recentTimes.map(t => {
    if (t.penalty === 'dnf') return Infinity;  // DNF is always worst
    return t.penalty === 'plus2' ? t.time + 2000 : t.time;
  });

  // If there are any DNFs
  const dnfCount = processedTimes.filter(t => t === Infinity).length;
  if (dnfCount > 1) return 0; // More than one DNF makes the average DNF (return 0)

  // Sort times to remove best and worst
  const sortedTimes = [...processedTimes].sort((a, b) => a - b);
  
  // Remove best and worst
  const trimmedTimes = sortedTimes.slice(1, -1);
  
  // Calculate average
  const sum = trimmedTimes.reduce((acc, time) => acc + (time === Infinity ? 0 : time), 0);
  return sum / trimmedTimes.length;
}

export function calculateMultipleAverages(times: Time[]): {
  ao5: number;
  ao12: number;
  ao50: number;
  ao100: number;
} {
  return {
    ao5: calculateAverage(times, 5),
    ao12: calculateAverage(times, 12),
    ao50: calculateAverage(times, 50),
    ao100: calculateAverage(times, 100),
  };
}

export function calculateBestAverage(times: Time[], count: number): number {
  if (times.length < count) return 0;

  let bestAverage = Infinity;
  
  // Check each possible window of size 'count'
  for (let i = 0; i <= times.length - count; i++) {
    const windowTimes = times.slice(i, i + count);
    const average = calculateAverage(windowTimes, count);
    if (average > 0) { // Skip DNF averages
      bestAverage = Math.min(bestAverage, average);
    }
  }

  return bestAverage === Infinity ? 0 : bestAverage;
} 