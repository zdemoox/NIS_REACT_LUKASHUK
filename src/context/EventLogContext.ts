import { createContext } from 'react';

export interface EventLogContextValue {
  events: string[];
  addEvent: (event: string) => void;
  clearEvents: () => void;
}

export const EventLogContext = createContext<EventLogContextValue | undefined>(
  undefined,
);
