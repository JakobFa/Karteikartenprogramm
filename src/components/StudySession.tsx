import { useEffect, useState } from 'react';
import { db, type Card } from '../db';
import { schedule, type Grade } from '../scheduler';

interface StudySessionProps {
  deckId: number;
  deckName: string;
  onFinish: () => void;
}

export function StudySession({ deckId, deckName, onFinish }: StudySessionProps) {
  const [queue, setQueue] = useState<Card[] | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const now = Date.now();
      const dueCards = await db.cards
        .where('deckId')
        .equals(deckId)
        .filter((c) => c.dueDate <= now)
        .toArray();
      if (!cancelled) setQueue(dueCards);
    })();
    return () => {
      cancelled = true;
    };
  }, [deckId]);

  if (queue === null) return <p>Lade Karten…</p>;

  if (queue.length === 0) {
    return (
      <div className="study-session done">
        <h2>Fertig!</h2>
        <p>Du hast {reviewedCount} Karte(n) aus "{deckName}" gelernt.</p>
        <button onClick={onFinish}>Zurück zur Übersicht</button>
      </div>
    );
  }

  const current = queue[0];

  async function handleGrade(grade: Grade) {
    const result = schedule(current, grade);
    await db.cards.update(current.id, result);
    setReviewedCount((n) => n + 1);

    setQueue((prev) => {
      if (!prev) return prev;
      const rest = prev.slice(1);
      // "Again" cards get requeued at the end so the session still drills them.
      if (grade === 'again') {
        return [...rest, { ...current, ...result }];
      }
      return rest;
    });
    setFlipped(false);
  }

  return (
    <div className="study-session">
      <div className="study-header">
        <span>{deckName}</span>
        <span>{queue.length} verbleibend</span>
      </div>
      <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped((f) => !f)}>
        <div className="flashcard-content">{flipped ? current.back : current.front}</div>
        {!flipped && <p className="flip-hint">Klicken zum Umdrehen</p>}
      </div>
      {flipped && (
        <div className="grade-buttons">
          <button className="grade-again" onClick={() => handleGrade('again')}>
            Nochmal
          </button>
          <button className="grade-hard" onClick={() => handleGrade('hard')}>
            Schwer
          </button>
          <button className="grade-good" onClick={() => handleGrade('good')}>
            Gut
          </button>
          <button className="grade-easy" onClick={() => handleGrade('easy')}>
            Leicht
          </button>
        </div>
      )}
    </div>
  );
}
