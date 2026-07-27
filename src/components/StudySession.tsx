import { useEffect, useRef, useState } from 'react';
import { db, type Card } from '../db';
import { byWeakness, reinsertAfterAgain, schedule, type Grade } from '../scheduler';
import { buildCramQueue } from '../cram';
import { Cat, pick, type CatName } from '../cats';
import { useLanguage } from '../LanguageContext';

export type StudyMode = 'review' | 'cram';

interface StudySessionProps {
  deckId: number;
  deckName: string;
  mode: StudyMode;
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

export function StudySession({ deckId, deckName, mode, onFinish }: StudySessionProps) {
  const { t, lang, phrases } = useLanguage();
  const isCram = mode === 'cram';
  const [queue, setQueue] = useState<Card[] | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [catState, setCatState] = useState<CatState>(() => ({
    cat: 'think',
    text: pick(phrases.front),
  }));
  const [sfx, setSfx] = useState<{ text: string; key: number } | null>(null);
  const [donePhrase, setDonePhrase] = useState(() => pick(phrases.done));
  const gradingRef = useRef(false);

  useEffect(() => {
    setDonePhrase(pick(phrases.done));
    setCatState({ cat: 'think', text: pick(phrases.front) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cards = await db.cards.where('deckId').equals(deckId).toArray();
      if (cancelled) return;
      if (isCram) {
        // Endspurt ignoriert Faelligkeiten und geht nach Schwierigkeit.
        setQueue(buildCramQueue(cards));
      } else {
        const now = Date.now();
        setQueue(byWeakness(cards.filter((c) => c.dueDate <= now)));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [deckId, isCram]);

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
          <p>
            {isCram && reviewedCount === 0
              ? t.study.cramEmpty
              : isCram
                ? t.study.cramDoneSummary(reviewedCount, deckName)
                : t.study.doneSummary(reviewedCount, deckName)}
          </p>
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
    // Ohne diese Sperre kann ein schneller Doppelklick handleGrade zweimal mit
    // derselben Karte ausloesen: beide Durchlaeufe kuerzen die Warteschlange,
    // aber nur eine Karte wird bewertet — die uebersprungene bliebe faellig.
    if (gradingRef.current) return;
    gradingRef.current = true;

    const graded = current;
    try {
      // Im Endspurt wird bewusst nichts gespeichert: kurzfristiges Draufloslernen
      // soll die aufgebauten SM-2-Intervalle nicht zerschiessen.
      const result = isCram ? null : schedule(graded, grade);
      if (result) await db.cards.update(graded.id, result);

      setReviewedCount((n) => n + 1);
      setCatState({ cat: GRADE_CAT[grade], text: pick(phrases[grade]) });
      setSfx({ text: t.study.sfx[grade], key: Date.now() });

      setQueue((prev) => {
        if (!prev) return prev;
        const rest = prev.slice(1);
        // "Nochmal" kommt schon nach ein paar Karten wieder dran, nicht erst am Sessionende.
        if (grade === 'again') {
          return reinsertAfterAgain(rest, result ? { ...graded, ...result } : graded);
        }
        return rest;
      });
      setFlipped(false);
    } finally {
      gradingRef.current = false;
    }
  }

  return (
    <section className="panel study-session">
      <div className="study-header">
        <span className="study-deck-name">{deckName}</span>
        {isCram && <span className="cram-badge">{t.study.cramBadge}</span>}
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

      {isCram && <p className="cram-note">{t.study.cramNote}</p>}

      <div className="cat-row">
        <Cat name={catState.cat} className="cat cat-md cat-wiggle" />
        <p className="speech">{catState.text}</p>
      </div>
    </section>
  );
}
