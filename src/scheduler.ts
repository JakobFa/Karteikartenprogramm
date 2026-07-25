import type { Card } from './db';

export type Grade = 'again' | 'hard' | 'good' | 'easy';

// SM-2 quality scale (0-5), mapped from the 4 UI buttons.
const GRADE_QUALITY: Record<Grade, number> = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5,
};

const MIN_EASE_FACTOR = 1.3;

export interface SchedulingResult {
  easeFactor: number;
  interval: number;
  repetitions: number;
  dueDate: number;
}

export function schedule(card: Card, grade: Grade, now: number = Date.now()): SchedulingResult {
  const quality = GRADE_QUALITY[grade];

  let { easeFactor, interval, repetitions } = card;

  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  easeFactor =
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor);

  const dueDate = now + interval * 24 * 60 * 60 * 1000;

  return { easeFactor, interval, repetitions, dueDate };
}
