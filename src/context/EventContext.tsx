import React, { createContext, useCallback, useMemo, useState } from 'react';

interface EventLogContextValue {
  events: string[];
  addEvent: (event: string) => void;
  clearEvents: () => void;
}

export const EventLogContext = createContext<EventLogContextValue | undefined>(
  undefined
);

interface EventLogProviderProps {
  children: React.ReactNode;
}

export const EventLogProvider: React.FC<EventLogProviderProps> = ({
  children,
}) => {
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = useCallback((event: string) => {
    setEvents((prev) => [event, ...prev]);
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  const value = useMemo(
    () => ({
      events,
      addEvent,
      clearEvents,
    }),
    [events, addEvent, clearEvents]
  );

  return (
    <EventLogContext.Provider value={value}>
      {children}
    </EventLogContext.Provider>
  );
};
