import type { Card } from './db';
import { byWeakness } from './scheduler';

/**
 * Endspurt-Modus fuer kurzfristiges Klausurlernen.
 *
 * SM-2 blendet gut sitzende Karten tagelang aus — sinnvoll fuers Langzeit-
 * gedaechtnis, aber nutzlos, wenn die Klausur uebermorgen ist. Hier bauen wir
 * deshalb eine Warteschlange nach Schwierigkeit statt nach Faelligkeit:
 * schwere Karten immer, mittlere gelegentlich eingestreut, leichte raus.
 */

/** Unter diesem Ease-Faktor gilt eine Karte als schwer (oft "Nochmal"/"Schwer"). */
const HARD_EASE = 2.2;
/** Ab diesem Ease-Faktor gilt eine Karte als leicht. */
const EASY_EASE = 2.6;
/** Ab diesem Intervall (Tage) gilt eine Karte als sicher gelernt. */
const MATURE_INTERVAL_DAYS = 21;
/** Anteil der mittleren Karten, der zur Auflockerung mitgenommen wird. */
const MEDIUM_SPRINKLE_RATE = 0.35;

export type CramTier = 'hard' | 'medium' | 'easy';

export function cramTier(card: Card): CramTier {
  // Nie (oder kaum) bewertete Karten zaehlen als schwer — wir wissen es nicht besser.
  if (card.repetitions <= 1 || card.easeFactor < HARD_EASE) return 'hard';
  if (card.easeFactor < EASY_EASE || card.interval < MATURE_INTERVAL_DAYS) return 'medium';
  return 'easy';
}

/**
 * Stellt die Endspurt-Warteschlange zusammen. `random` ist injizierbar, damit
 * sich das Einstreuen der mittleren Karten testen laesst.
 */
export function buildCramQueue(cards: Card[], random: () => number = Math.random): Card[] {
  const hard: Card[] = [];
  const medium: Card[] = [];
  const easy: Card[] = [];

  for (const card of cards) {
    const tier = cramTier(card);
    if (tier === 'hard') hard.push(card);
    else if (tier === 'medium') medium.push(card);
    else easy.push(card);
  }

  const sprinkled = medium.filter(() => random() < MEDIUM_SPRINKLE_RATE);
  const selected = [...hard, ...sprinkled];

  // Sitzt schon alles? Dann lieber die mittleren (ersatzweise alle) Karten
  // ueben, statt eine leere Runde zu starten.
  if (selected.length === 0) {
    const fallback = medium.length > 0 ? medium : easy;
    return byWeakness(fallback);
  }

  return byWeakness(selected);
}
