import type { Card } from './db';

/**
 * Endspurt-Modus fuer kurzfristiges Klausurlernen.
 *
 * SM-2 blendet gut sitzende Karten tagelang aus — sinnvoll fuers Langzeit-
 * gedaechtnis, aber blockierend, wenn die Klausur uebermorgen ist. Der Endspurt
 * geht deshalb einmal durch *alle* Karten des Decks, in zufaelliger Reihenfolge.
 *
 * Wiederholt wird nur, was man in dieser Runde tatsaechlich nicht wusste: eine
 * mit "Nochmal" bewertete Karte wandert zurueck in die Warteschlange (siehe
 * reinsertAfterAgain im scheduler). Vorab verdoppeln waere Rateraterei und
 * wuerde die Runde unnoetig aufblaehen.
 */

/** Fisher-Yates: gleichverteiltes Mischen ohne die Sortier-Trick-Fallstricke. */
export function shuffle<T>(items: T[], random: () => number = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Alle Karten des Decks, zufaellig gemischt. */
export function buildCramQueue(cards: Card[], random: () => number = Math.random): Card[] {
  return shuffle(cards, random);
}
