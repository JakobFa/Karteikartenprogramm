import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

interface DeckListProps {
  onStudy: (deckId: number) => void;
}

export function DeckList({ onStudy }: DeckListProps) {
  const decks = useLiveQuery(() => db.decks.orderBy('createdAt').reverse().toArray(), []);

  const dueCounts = useLiveQuery(async () => {
    const allDecks = await db.decks.toArray();
    const now = Date.now();
    const counts: Record<number, { due: number; total: number }> = {};
    for (const deck of allDecks) {
      const cards = await db.cards.where('deckId').equals(deck.id).toArray();
      counts[deck.id] = {
        total: cards.length,
        due: cards.filter((c) => c.dueDate <= now).length,
      };
    }
    return counts;
  }, []);

  async function handleDelete(deckId: number, name: string) {
    if (!confirm(`Deck "${name}" und alle Karten wirklich löschen?`)) return;
    await db.transaction('rw', db.decks, db.cards, async () => {
      await db.cards.where('deckId').equals(deckId).delete();
      await db.decks.delete(deckId);
    });
  }

  if (!decks) return <p>Lade Decks…</p>;
  if (decks.length === 0) {
    return <p className="hint">Noch keine Decks vorhanden. Importiere oben eine CSV-Datei.</p>;
  }

  return (
    <div className="deck-list">
      <h2>Deine Decks</h2>
      <ul>
        {decks.map((deck) => {
          const counts = dueCounts?.[deck.id];
          return (
            <li key={deck.id} className="deck-item">
              <div className="deck-info">
                <span className="deck-name">{deck.name}</span>
                <span className="deck-stats">
                  {counts ? `${counts.due} fällig / ${counts.total} gesamt` : '…'}
                </span>
              </div>
              <div className="deck-actions">
                <button
                  onClick={() => onStudy(deck.id)}
                  disabled={!counts || counts.due === 0}
                >
                  Lernen
                </button>
                <button className="danger" onClick={() => handleDelete(deck.id, deck.name)}>
                  Löschen
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
