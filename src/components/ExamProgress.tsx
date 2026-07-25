import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { deckReadiness } from '../readiness';
import { Cat, readinessComment } from '../cats';
import { ReadinessBar } from './ReadinessBar';

export function ExamProgress() {
  const cards = useLiveQuery(() => db.cards.toArray(), []);

  if (!cards || cards.length === 0) return null;

  const readiness = deckReadiness(cards);
  const comment = readinessComment(readiness.percent);

  return (
    <section className="panel exam-progress">
      <h2 className="panel-title">
        Klausur-Reife <span className="starburst">alle Decks</span>
      </h2>
      <ReadinessBar readiness={readiness} />
      <div className="cat-row">
        <Cat name={comment.cat} className="cat cat-md" />
        <p className="speech">{comment.text}</p>
      </div>
    </section>
  );
}
