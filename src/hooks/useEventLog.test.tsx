import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEventLog } from './useEventLog';
import { EventLogProvider } from '../context/EventContext';
import type { PropsWithChildren } from 'react';

describe('useEventLog', () => {
  it('throws if used outside EventLogProvider (sync)', () => {
    expect(() => renderHook(() => useEventLog())).toThrow(/EventLogProvider/i);
  });

  it('works inside provider', () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <EventLogProvider>{children}</EventLogProvider>
    );

    const { result } = renderHook(() => useEventLog(), { wrapper });
    expect(result.current.events).toEqual([]);
  });
});
