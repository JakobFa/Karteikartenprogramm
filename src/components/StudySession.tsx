import { useEffect, useState } from 'react';
import { db, type Card } from '../db';
import { byWeakness, reinsertAfterAgain, schedule, type Grade } from '../scheduler';
import { Cat, pick, type CatName } from '../cats';
import { useLanguage } from '../LanguageContext';

interface StudySessionProps {
  deckId: number;
  deckName: string;
  onFinish: () => void;
}

/** Katze passend zur Bewertung. */
const GRADE_CAT: Record<Grade, CatName> = {
  again: 'support',
  hard: 'think',
  good: 'cheer',
  easy: 'love',
};

interface CatState {
  cat: CatName;
  text: string;
}

export function StudySession({ deckId, deckName, onFinish }: StudySessionProps) {
  const { t, lang, phrases } = useLanguage();
  const [queue, setQueue] = useState<Card[] | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [catState, setCatState] = useState<CatState>(() => ({
    cat: 'think',
    text: pick(phrases.front),
  }));
  const [sfx, setSfx] = useState<{ text: string; key: number } | null>(null);
  const [donePhrase, setDonePhrase] = useState(() => pick(phrases.done));
  useEffect(() => {
    setDonePhrase(pick(phrases.done));
    setCatState({ cat: 'think', text: pick(phrases.front) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

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
        <p>{t.study.loading}</p>
      </section>
    );
  }

  if (queue.length === 0) {
    return (
      <section className="panel study-session done">
        <div className="done-inner">
          <h2 className="done-title">{t.study.doneTitle}</h2>
          <Cat name="sleepy" className="cat cat-lg cat-wiggle" />
          <p className="speech">{donePhrase}</p>
          <p>{t.study.doneSummary(reviewedCount, deckName)}</p>
          <button className="cbtn cbtn-primary" onClick={onFinish}>
            {t.study.backToOverview}
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
      setCatState({ cat: 'wink', text: pick(phrases.back) });
    }
  }

  async function handleGrade(grade: Grade) {
    const result = schedule(current, grade);
    await db.cards.update(current.id, result);
    setReviewedCount((n) => n + 1);

    setCatState({ cat: GRADE_CAT[grade], text: pick(phrases[grade]) });
    setSfx({ text: t.study.sfx[grade], key: Date.now() });

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
        <span className="study-remaining">{t.study.remaining(queue.length)}</span>
      </div>

      <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
        {sfx && (
          <span className="sfx" key={sfx.key}>
            {sfx.text}
          </span>
        )}
        <div className="flashcard-content">{flipped ? current.back : current.front}</div>
        {!flipped && <p className="flip-hint">{t.study.flipHint}</p>}
      </div>

      {flipped && (
        <div className="grade-buttons">
          <button className="cbtn grade-again" onClick={() => handleGrade('again')}>
            {t.study.gradeAgain}
          </button>
          <button className="cbtn grade-hard" onClick={() => handleGrade('hard')}>
            {t.study.gradeHard}
          </button>
          <button className="cbtn grade-good" onClick={() => handleGrade('good')}>
            {t.study.gradeGood}
          </button>
          <button className="cbtn grade-easy" onClick={() => handleGrade('easy')}>
            {t.study.gradeEasy}
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
