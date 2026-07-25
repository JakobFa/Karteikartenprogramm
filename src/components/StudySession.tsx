import { useEffect, useState } from 'react';
import { db, type Card } from '../db';
import { byWeakness, reinsertAfterAgain, schedule, type Grade } from '../scheduler';
import { Cat, PHRASES, pick, type CatName } from '../cats';

interface StudySessionProps {
  deckId: number;
  deckName: string;
  onFinish: () => void;
}

/** Katze + Comic-Lautwort passend zur Bewertung. */
const GRADE_REACTION: Record<Grade, { cat: CatName; sfx: string }> = {
  again: { cat: 'support', sfx: 'HOPPLA!' },
  hard: { cat: 'think', sfx: 'PUH!' },
  good: { cat: 'cheer', sfx: 'MIAU!' },
  easy: { cat: 'love', sfx: 'WOW!' },
};

interface CatState {
  cat: CatName;
  text: string;
}

export function StudySession({ deckId, deckName, onFinish }: StudySessionProps) {
  const [queue, setQueue] = useState<Card[] | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [catState, setCatState] = useState<CatState>(() => ({
    cat: 'think',
    text: pick(PHRASES.front),
  }));
  const [sfx, setSfx] = useState<{ text: string; key: number } | null>(null);
  const [donePhrase] = useState(() => pick(PHRASES.done));

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const now = Date.now();
      const dueCards = await db.cards
        .where('deckId')
        .equals(deckId)
        .filter((c) => c.dueDate <= now)
        .toArray();
      if (!cancelled) setQueue(byWeakness(dueCards));
    })();
    return () => {
      cancelled = true;
    };
  }, [deckId]);

  if (queue === null) {
    return (
      <section className="panel study-session">
        <p>Katze holt die Karten…</p>
      </section>
    );
  }

  if (queue.length === 0) {
    return (
      <section className="panel study-session done">
        <div className="done-inner">
          <h2 className="done-title">Geschafft!</h2>
          <Cat name="sleepy" className="cat cat-lg cat-wiggle" />
          <p className="speech">{donePhrase}</p>
          <p>
            Du hast <strong>{reviewedCount}</strong> Karte(n) aus „{deckName}“ gelernt.
          </p>
          <button className="cbtn cbtn-primary" onClick={onFinish}>
            Zurueck zur Uebersicht
          </button>
        </div>
      </section>
    );
  }

  const current = queue[0];

  function handleFlip() {
    const next = !flipped;
    setFlipped(next);
    if (next) {
      setCatState({ cat: 'wink', text: pick(PHRASES.back) });
    }
  }

  async function handleGrade(grade: Grade) {
    const result = schedule(current, grade);
    await db.cards.update(current.id, result);
    setReviewedCount((n) => n + 1);

    const reaction = GRADE_REACTION[grade];
    setCatState({ cat: reaction.cat, text: pick(PHRASES[grade]) });
    setSfx({ text: reaction.sfx, key: Date.now() });

    setQueue((prev) => {
      if (!prev) return prev;
      const rest = prev.slice(1);
      // "Nochmal" kommt schon nach ein paar Karten wieder dran, nicht erst am Sessionende.
      if (grade === 'again') {
        return reinsertAfterAgain(rest, { ...current, ...result });
      }
      return rest;
    });
    setFlipped(false);
  }

  return (
    <section className="panel study-session">
      <div className="study-header">
        <span className="study-deck-name">{deckName}</span>
        <span className="study-remaining">noch {queue.length}</span>
      </div>

      <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
        {sfx && (
          <span className="sfx" key={sfx.key}>
            {sfx.text}
          </span>
        )}
        <div className="flashcard-content">{flipped ? current.back : current.front}</div>
        {!flipped && <p className="flip-hint">👆 Klick mich um</p>}
      </div>

      {flipped && (
        <div className="grade-buttons">
          <button className="cbtn grade-again" onClick={() => handleGrade('again')}>
            Nochmal
          </button>
          <button className="cbtn grade-hard" onClick={() => handleGrade('hard')}>
            Schwer
          </button>
          <button className="cbtn grade-good" onClick={() => handleGrade('good')}>
            Gut
          </button>
          <button className="cbtn grade-easy" onClick={() => handleGrade('easy')}>
            Leicht
          </button>
        </div>
      )}

      <div className="cat-row">
        <Cat name={catState.cat} className="cat cat-md cat-wiggle" />
        <p className="speech">{catState.text}</p>
      </div>
    </section>
  );
}
