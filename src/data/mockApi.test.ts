import { describe, expect, it, vi } from 'vitest';
import { fetchPets } from './mockApi';
import pets from './pets.json';
import type { Pet } from '../types/pet';

describe('fetchPets', () => {
  it('returns pets after timeout (async + fake timers)', async () => {
    vi.useFakeTimers();

    try {
      const promise = fetchPets();
      vi.advanceTimersByTime(800);
      const data = await promise;

      expect(data).toEqual(pets as Pet[]);
    } finally {
      vi.useRealTimers();
    }
  });
});
