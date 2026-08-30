import type { Memory } from '@/types';

export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function buildChoices(
  correct: Memory,
  allMemories: Memory[],
  count = 3,
): Memory[] {
  const distractors = shuffle(
    allMemories.filter((m) => m.id !== correct.id),
  ).slice(0, count - 1);
  return shuffle([correct, ...distractors]);
}

export function buildQuizQueue(memories: Memory[], maxRounds: number): Memory[] {
  const rounds = Math.min(maxRounds, memories.length);
  return shuffle(memories).slice(0, rounds);
}
