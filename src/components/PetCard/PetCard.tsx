import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import type { Mood, Pet } from '../../types/pet';
import { speciesLabels } from '../../types/pet';
import { usePetLifecycle } from '../../hooks/usePetLifecycle';
import { ActionButton } from '../PetActions/ActionButton.styled';
import styles from './PetCard.module.scss';
import type { PetAction, PetCardProps, PetState } from './types';

const moodEmoji: Record<Mood, string> = {
  happy: '😺',
  content: '🙂',
  tired: '🥱',
  sad: '😿',
  offline: '💤',
};

const getMoodShadow = (mood: Mood): string => {
  switch (mood) {
    case 'happy':
      return '0 0 24px rgba(34, 197, 94, 0.8)';
    case 'content':
      return '0 0 18px rgba(52, 211, 153, 0.7)';
    case 'tired':
      return '0 0 16px rgba(234, 179, 8, 0.7)';
    case 'sad':
      return '0 0 18px rgba(248, 113, 113, 0.9)';
    case 'offline':
      return '0 0 0 rgba(15, 23, 42, 0.6)';
    default:
      return '0 0 14px rgba(148, 163, 184, 0.7)';
  }
};

const deriveMoodFromEnergy = (energy: number, prevMood: Mood): Mood => {
  if (energy <= 0) return 'offline';
  if (energy <= 20) return 'sad';
  if (energy <= 45) return 'tired';
  if (energy >= 80) return 'happy';
  return prevMood === 'offline' ? 'content' : prevMood;
};

const createPetReducer =
  (initialPet: Pet) =>
  (state: PetState, action: PetAction): PetState => {
    switch (action.type) {
      case 'FEED': {
        const nextEnergy = Math.min(100, state.energy + 18);
        return {
          ...state,
          energy: nextEnergy,
          mood: deriveMoodFromEnergy(nextEnergy, state.mood),
        };
      }
      case 'LEVEL_UP':
        return {
          ...state,
          level: state.level + 1,
        };
      case 'CHEER':
        return {
          ...state,
          mood: 'happy',
        };
      case 'RESET':
        return {
          ...initialPet,
        };
      case 'TICK': {
        const nextEnergy = Math.max(0, state.energy - 5);
        return {
          ...state,
          energy: nextEnergy,
          mood: deriveMoodFromEnergy(nextEnergy, state.mood),
        };
      }
      default:
        return state;
    }
  };

const PetCardComponent: React.FC<PetCardProps> = ({ pet, onEvent }) => {
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const previousEnergyRef = useRef<number>(pet.energy);
  const reducer = useMemo(() => createPetReducer(pet), [pet]);
  const [state, dispatch] = useReducer(reducer, pet);

  useEffect(() => {
    if (!avatarRef.current || typeof avatarRef.current.animate !== 'function') {
      return;
    }

    avatarRef.current.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.07)' },
        { transform: 'scale(1)' },
      ],
      {
        duration: 260,
        easing: 'ease-out',
      },
    );
  }, [state.mood]);

  useEffect(() => {
    if (state.energy <= 0 && previousEnergyRef.current > 0) {
      onEvent(`💤 ${state.name} ушёл в спящий режим (энергия 0).`);
    }
    previousEnergyRef.current = state.energy;
  }, [onEvent, state.energy, state.name]);

  usePetLifecycle({
    isOffline: state.energy <= 0,
    onTick: () => {
      dispatch({ type: 'TICK' });
    },
    intervalMs: 5000,
  });

  const handleFeed = useCallback(() => {
    dispatch({ type: 'FEED' });
    onEvent(`🍖 ${state.name} получил(а) энергетический батончик.`);
  }, [onEvent, state.name]);

  const handleLevelUp = useCallback(() => {
    dispatch({ type: 'LEVEL_UP' });
    onEvent(`⚡ ${state.name} повысил(а) уровень!`);
  }, [onEvent, state.name]);

  const handleCheer = useCallback(() => {
    dispatch({ type: 'CHEER' });
    onEvent(`💚 Вы погладили ${state.name}. Настроение улучшилось.`);
  }, [onEvent, state.name]);

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET' });
    onEvent(`🔄 ${state.name} сброшен(а) к заводским настройкам.`);
  }, [onEvent, state.name]);

  const energyPercent = Math.max(0, Math.min(100, state.energy));
  const cardShadow = getMoodShadow(state.mood);
  const isOffline = state.energy <= 0;

  return (
    <div className={styles.card} style={{ boxShadow: cardShadow }}>
      <div className={styles.header}>
        <div className={styles.meta}>
          <div className={styles.name}>{state.name}</div>
          <div className={styles.species}>{speciesLabels[state.species]}</div>
          <div className={styles.moodPill}>
            <span>{moodEmoji[state.mood]}</span>
            <span>{state.mood.toUpperCase()}</span>
          </div>
        </div>
        <div ref={avatarRef} className={styles.avatar}>
          {state.avatar}
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Энергия</span>
          <span className={styles.statValue}>{energyPercent}%</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Уровень</span>
          <span className={styles.statValue}>{state.level}</span>
        </div>
      </div>

      <div className={styles.energyBar}>
        <div
          className={styles.energyBarFill}
          style={{ width: `${energyPercent}%` }}
        />
      </div>

      <div className={styles.footer}>
        <div className={styles.actions}>
          <ActionButton
            variant="primary"
            onClick={handleFeed}
            disabled={isOffline}
          >
            🍖 Feed
          </ActionButton>
          <ActionButton
            variant="secondary"
            onClick={handleLevelUp}
            disabled={isOffline}
          >
            ⚡ Level Up
          </ActionButton>
          <ActionButton
            variant="secondary"
            onClick={handleCheer}
            disabled={isOffline}
          >
            💚 Cheer
          </ActionButton>
          <ActionButton onClick={handleReset}>🔄 Reset</ActionButton>
        </div>

        <p className={styles.statusText}>
          {isOffline
            ? 'Питомец недоступен: сбросьте настройки, чтобы разбудить его.'
            : 'Энергия уменьшается каждые 5 секунд.'}
        </p>
      </div>
    </div>
  );
};

export const PetCard = React.memo(PetCardComponent);
