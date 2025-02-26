export type WCAEvent = {
    id: string;
    name: string;
    icon?: string;
  };
  
  export type WCAEventId = '333' | '222' | '444' | '555' | '666' | '777' | '333bf' | '333oh' | 'clock' | 'minx' | 'pyram' | 'skewb' | 'sq1';
  
  export const WCA_EVENTS: WCAEvent[] = [
    { id: '333', name: '3x3x3' },
    { id: '222', name: '2x2x2' },
    { id: '444', name: '4x4x4' },
    { id: '555', name: '5x5x5' },
    { id: '666', name: '6x6x6' },
    { id: '777', name: '7x7x7' },
    { id: '333bf', name: '3x3x3 Blindfolded' },
    { id: '333oh', name: '3x3x3 One-Handed' },
    { id: 'clock', name: 'Clock' },
    { id: 'minx', name: 'Megaminx' },
    { id: 'pyram', name: 'Pyraminx' },
    { id: 'skewb', name: 'Skewb' },
    { id: 'sq1', name: 'Square-1' },
  ];