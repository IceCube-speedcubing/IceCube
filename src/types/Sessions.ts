import { WCAEventId } from "./WCAEvents";

export interface Session {
  id: string;
  name: string;
  event: WCAEventId;
  createdAt: Date;
  times: Array<{
    time: number;
    date: Date;
    scramble: string;
    penalty?: 'plus2' | 'dnf';
  }>;
} 