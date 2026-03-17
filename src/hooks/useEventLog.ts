import { useContext } from 'react';
import { EventLogContext } from '../context/EventLogContext';

export const useEventLog = () => {
  const ctx = useContext(EventLogContext);

  if (!ctx) {
    throw new Error(
      'useEventLog должен использоваться внутри EventLogProvider',
    );
  }

  return ctx;
};
