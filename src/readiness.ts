import type { Card } from './db';

/**
 * Ab diesem Intervall (in Tagen) gilt eine Karte als sicher gelernt — das ist
 * die uebliche SM-2 Schwelle fuer eine "reife" Karte.
 */
const MATURE_INTERVAL_DAYS = 21;

/** Reife einer einzelnen Karte, 0..1. */
export function cardReadiness(card: Card): number {
  if (card.repetitions === 0) return 0;
  return Math.min(card.interval / MATURE_INTERVAL_DAYS, 1);
}

export interface Readiness {
  /** Klausur-Reife in Prozent, 0..100. */
  percent: number;
  /** Karten, die die Reifeschwelle voll erreicht haben. */
  mature: number;
  /** Angefangene, aber noch nicht reife Karten. */
  learning: number;
  /** Noch nie beantwortete Karten. */
  fresh: number;
  total: number;
}

export function deckReadiness(cards: Card[]): Readiness {
  if (cards.length === 0) {
    return { percent: 0, mature: 0, learning: 0, fresh: 0, total: 0 };
  }

  let sum = 0;
  let mature = 0;
  let learning = 0;
  let fresh = 0;

  for (const card of cards) {
    const score = cardReadiness(card);
    sum += score;
    if (score >= 1) mature++;
    else if (card.repetitions > 0) learning++;
    else fresh++;
  }

  return {
    percent: Math.round((sum / cards.length) * 100),
    mature,
    learning,
    fresh,
    total: cards.length,
  };
}
