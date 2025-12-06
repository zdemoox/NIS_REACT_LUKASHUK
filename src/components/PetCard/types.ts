import type { Pet } from '../../types/pet';

export type PetState = Pet;

export type PetAction =
  | { type: 'FEED' }
  | { type: 'LEVEL_UP' }
  | { type: 'CHEER' }
  | { type: 'RESET' }
  | { type: 'TICK' };

export interface PetCardProps {
  pet: Pet;
  onEvent: (message: string) => void;
}
