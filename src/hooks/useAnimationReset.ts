import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function useAnimationReset() {
  const pathname = usePathname();
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prev => prev + 1);
  }, [pathname]);

  return key;
} 