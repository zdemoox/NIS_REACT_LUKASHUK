import { useEffect, useRef } from 'react';

interface UsePetLifecycleParams {
  isOffline: boolean;
  onTick: () => void;
  intervalMs?: number;
}

export const usePetLifecycle = ({
  isOffline,
  onTick,
  intervalMs = 5000,
}: UsePetLifecycleParams): void => {
  const savedCallback = useRef<() => void>(() => {});

  useEffect(() => {
    savedCallback.current = onTick;
  }, [onTick]);

  useEffect(() => {
    if (isOffline) {
      return;
    }

    const id = window.setInterval(() => {
      savedCallback.current();
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [intervalMs, isOffline]);
};
