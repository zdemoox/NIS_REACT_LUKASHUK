export type Mood = 'happy' | 'content' | 'tired' | 'sad' | 'offline';

export type Species = 'cat' | 'dog' | 'fox' | 'dragon' | 'bot';

export interface Pet {
  id: string;
  name: string;
  species: Species;
  mood: Mood;
  energy: number;
  level: number;
  avatar: string;
}

export const speciesLabels: Record<Species, string> = {
  cat: 'Кибер‑кот',
  dog: 'Неон‑пёс',
  fox: 'Технолис',
  dragon: 'Синт‑дракон',
  bot: 'Сервис‑бот',
};
