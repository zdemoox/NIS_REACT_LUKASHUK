import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PetCard } from './PetCard';
import type { Pet } from '../../types/pet';

describe('PetCard', () => {
  it('fires onEvent and updates energy on Feed (component)', async () => {
    const user = userEvent.setup();
    const onEvent = vi.fn();

    const pet: Pet = {
      id: 'p-1',
      name: 'Мурлок',
      species: 'cat',
      mood: 'content',
      energy: 50,
      level: 1,
      avatar: '😺',
    };

    render(<PetCard pet={pet} onEvent={onEvent} />);

    expect(screen.getByText('50%')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /feed/i }));

    expect(onEvent).toHaveBeenCalledWith(
      '🍖 Мурлок получил(а) энергетический батончик.',
    );
    expect(screen.getByText('68%')).toBeInTheDocument();
  });
});
