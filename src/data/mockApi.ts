import type { Pet } from '../types/pet';
import pets from './pets.json';

export const fetchPets = (): Promise<Pet[]> => {
  const typed = pets as Pet[];
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(typed), 800);
  });
};
