import { db, type Card, type Deck } from './db';

interface BackupFile {
  version: 1;
  exportedAt: number;
  decks: Deck[];
  cards: Card[];
}

export async function exportBackup(): Promise<void> {
  const [decks, cards] = await Promise.all([db.decks.toArray(), db.cards.toArray()]);
  const backup: BackupFile = { version: 1, exportedAt: Date.now(), decks, cards };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `karteikarten-backup-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importBackup(file: File): Promise<{ decks: number; cards: number }> {
  const text = await file.text();
  let parsed: BackupFile;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('INVALID_JSON');
  }

  if (!parsed || !Array.isArray(parsed.decks) || !Array.isArray(parsed.cards)) {
    throw new Error('INVALID_FORMAT');
  }

  let deckCount = 0;
  let cardCount = 0;

  await db.transaction('rw', db.decks, db.cards, async () => {
    // Assign fresh ids so this never collides with data already in this browser.
    const idMap = new Map<number, number>();
    for (const deck of parsed.decks) {
      const newId = await db.decks.add({ name: deck.name, createdAt: deck.createdAt });
      idMap.set(deck.id, newId);
      deckCount++;
    }
    for (const card of parsed.cards) {
      const newDeckId = idMap.get(card.deckId);
      if (newDeckId === undefined) continue;
      await db.cards.add({
        deckId: newDeckId,
        front: card.front,
        back: card.back,
        easeFactor: card.easeFactor,
        interval: card.interval,
        repetitions: card.repetitions,
        dueDate: card.dueDate,
        lastReviewedAt: card.lastReviewedAt,
      });
      cardCount++;
    }
  });

  return { decks: deckCount, cards: cardCount };
}
