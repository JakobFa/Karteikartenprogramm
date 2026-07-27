import type { Card } from './db';
import { byWeakness } from './scheduler';

/**
 * Endspurt-Modus fuer kurzfristiges Klausurlernen.
 *
 * SM-2 blendet gut sitzende Karten tagelang aus — sinnvoll fuers Langzeit-
 * gedaechtnis, aber blockierend, wenn die Klausur uebermorgen ist. Vor einer
 * Klausur will man einmal *alles* gesehen haben, deshalb nimmt der Endspurt
 * jede Karte des Decks mit — schwere zuerst und ein zweites Mal, leichte
 * einmal am Ende.
 */

/** Unter diesem Ease-Faktor gilt eine Karte als schwer (oft "Nochmal"/"Schwer"). */
const HARD_EASE = 2.2;
/** Ab diesem Ease-Faktor gilt eine Karte als leicht. */
const EASY_EASE = 2.6;
/** Ab diesem Intervall (Tage) gilt eine Karte als sicher gelernt. */
const MATURE_INTERVAL_DAYS = 21;

export type CramTier = 'hard' | 'medium' | 'easy';

export function cramTier(card: Card): CramTier {
  // Nie (oder kaum) bewertete Karten zaehlen als schwer — wir wissen es nicht besser.
  if (card.repetitions <= 1 || card.easeFactor < HARD_EASE) return 'hard';
  if (card.easeFactor < EASY_EASE || card.interval < MATURE_INTERVAL_DAYS) return 'medium';
  return 'easy';
}

/**
 * Stellt die Endspurt-Warteschlange zusammen: jede Karte mindestens einmal,
 * schwere Karten zusaetzlich ein zweites Mal. Die Wiederholungen liegen
 * bewusst weit hinten, damit zwischen erster und zweiter Abfrage andere Karten
 * liegen (Spacing-Effekt statt stumpfem Doppel-Anzeigen).
 */
export function buildCramQueue(cards: Card[]): Card[] {
  if (cards.length === 0) return [];

  const base = byWeakness(cards); // schwerste zuerst
  const repeats = base.filter((c) => cramTier(c) === 'hard');
  if (repeats.length === 0) return base;

  // Wiederholungen erst ab der zweiten Haelfte einstreuen.
  const half = Math.max(1, Math.floor(base.length / 2));
  const gap = Math.max(1, Math.floor((base.length - half) / repeats.length));

  const queue: Card[] = [];
  const pending = [...repeats];
  base.forEach((card, i) => {
    queue.push(card);
    if (i >= half && pending.length > 0 && (i - half) % gap === 0) {
      queue.push(pending.shift()!);
    }
  });
  // Was nicht mehr reingepasst hat, kommt ans Ende.
  queue.push(...pending);

  return queue;
}
