import type { Readiness } from '../readiness';

interface ReadinessBarProps {
  readiness: Readiness;
  /** Kompakte Variante ohne Legende, fuer die Deck-Liste. */
  compact?: boolean;
}

export function ReadinessBar({ readiness, compact }: ReadinessBarProps) {
  const { percent, mature, learning, fresh, total } = readiness;

  return (
    <div className={`readiness ${compact ? 'compact' : ''}`}>
      <div
        className="readiness-track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Klausur-Reife"
      >
        <div className="readiness-fill" style={{ width: `${percent}%` }} />
        <span className="readiness-percent">{percent}%</span>
      </div>
      {!compact && (
        <ul className="readiness-legend">
          <li>
            <span className="dot dot-mature" /> {mature} sitzt
          </li>
          <li>
            <span className="dot dot-learning" /> {learning} am Lernen
          </li>
          <li>
            <span className="dot dot-fresh" /> {fresh} noch frisch
          </li>
          <li className="legend-total">{total} gesamt</li>
        </ul>
      )}
    </div>
  );
}
