export const formatTime = (time: number): string => {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor(time / 60000);
  
    const formattedMilliseconds = milliseconds.toString().padStart(3, '0').slice(0, 2);
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    if (minutes > 0) {
      return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
    } else {
      return `${formattedSeconds}.${formattedMilliseconds}`;
    }
  };