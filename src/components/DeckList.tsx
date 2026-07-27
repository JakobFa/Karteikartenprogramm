import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { deckReadiness, type Readiness } from '../readiness';
import { Cat, catForIndex, pick } from '../cats';
import { useLanguage } from '../LanguageContext';
import { ReadinessBar } from './ReadinessBar';

interface DeckListProps {
  onStudy: (deckId: number) => void;
}

interface DeckStats {
  due: number;
  readiness: Readiness;
}

export function DeckList({ onStudy }: DeckListProps) {
  const { t, lang, phrases } = useLanguage();
  // Einmal gewuerfelt und dann stabil, sonst wechselt der Spruch bei jedem Render;
  // bei Sprachwechsel aber neu wuerfeln, damit der Text zur Sprache passt.
  const [emptyPhrase, setEmptyPhrase] = useState(() => pick(phrases.emptyDecks));
  const [readyPhrase, setReadyPhrase] = useState(() => pick(phrases.deckReady));
  useEffect(() => {
    setEmptyPhrase(pick(phrases.emptyDecks));
    setReadyPhrase(pick(phrases.deckReady));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);
  const decks = useLiveQuery(() => db.decks.orderBy('createdAt').reverse().toArray(), []);

  const stats = useLiveQuery(async () => {
    const allDecks = await db.decks.toArray();
    const now = Date.now();
    const result: Record<number, DeckStats> = {};
    for (const deck of allDecks) {
      const cards = await db.cards.where('deckId').equals(deck.id).toArray();
      result[deck.id] = {
        due: cards.filter((c) => c.dueDate <= now).length,
        readiness: deckReadiness(cards),
      };
    }
    return result;
  }, []);

  async function handleDelete(deckId: number, name: string) {
    if (!confirm(t.deckList.deleteConfirm(name))) return;
    await db.transaction('rw', db.decks, db.cards, async () => {
      await db.cards.where('deckId').equals(deckId).delete();
      await db.decks.delete(deckId);
    });
  }

  if (!decks) {
    return (
      <section className="panel deck-list">
        <p>{t.deckList.loading}</p>
      </section>
    );
  }

  if (decks.length === 0) {
    return (
      <section className="panel deck-list">
        <h2 className="panel-title">{t.deckList.title}</h2>
        <div className="empty-state">
          <Cat name="sleepy" className="cat cat-md" />
          <p className="speech">{emptyPhrase}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="panel deck-list">
      <h2 className="panel-title">
        {t.deckList.title}{' '}
        <span className="starburst">
          {decks.length} {t.deckList.countSuffix}
        </span>
      </h2>
      <ul>
        {decks.map((deck, index) => {
          const stat = stats?.[deck.id];
          return (
            <li key={deck.id} className="deck-item">
              <Cat name={catForIndex(index)} className="cat cat-sm" />
              <div className="deck-main">
                <div className="deck-name">{deck.name}</div>
                <div className="deck-stats">
                  {stat ? (
                    <>
                      <span className="deck-due-badge">
                        {stat.due} {t.deckList.dueBadgeSuffix}
                      </span>{' '}
                      {t.deckList.ofPrefix} {stat.readiness.total}
                    </>
                  ) : (
                    t.deckList.counting
                  )}
                </div>
                {stat && <ReadinessBar readiness={stat.readiness} compact />}
              </div>
              <div className="deck-actions">
                <button
                  className="cbtn cbtn-primary"
                  onClick={() => onStudy(deck.id)}
                  disabled={!stat || stat.due === 0}
                >
                  {stat && stat.due === 0 ? t.deckList.allDoneBtn : t.deckList.studyBtn}
                </button>
                <button className="cbtn cbtn-red" onClick={() => handleDelete(deck.id, deck.name)}>
                  {t.deckList.deleteBtn}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="cat-row">
        <Cat name="cool" className="cat cat-sm" />
        <p className="speech">{readyPhrase}</p>
      </div>
    </section>
  );
}
