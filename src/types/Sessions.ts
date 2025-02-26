import { WCAEventId } from "./WCAEvents";

export interface SolveTime {
  time: number;
  date: string;
  scramble: string;
  penalty?: 'plus2' | 'dnf';
}

export interface Session {
  id: string;
  name: string;
  event: WCAEventId;
  createdAt: string;
  times?: SolveTime[];
} 