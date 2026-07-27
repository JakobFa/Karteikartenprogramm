import type { Readiness } from '../readiness';
import { useLanguage } from '../LanguageContext';

interface ReadinessBarProps {
  readiness: Readiness;
  /** Kompakte Variante ohne Legende, für die Deck-Liste. */
  compact?: boolean;
}

export function ReadinessBar({ readiness, compact }: ReadinessBarProps) {
  const { t } = useLanguage();
  const { percent, mature, learning, fresh, total } = readiness;

  return (
    <div className={`readiness ${compact ? 'compact' : ''}`}>
      <div
        className="readiness-track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={t.readiness.ariaLabel}
      >
        <div className="readiness-fill" style={{ width: `${percent}%` }} />
        <span className="readiness-percent">{percent}%</span>
      </div>
      {!compact && (
        <ul className="readiness-legend">
          <li>
            <span className="dot dot-mature" /> {mature} {t.readiness.mature}
          </li>
          <li>
            <span className="dot dot-learning" /> {learning} {t.readiness.learning}
          </li>
          <li>
            <span className="dot dot-fresh" /> {fresh} {t.readiness.fresh}
          </li>
          <li className="legend-total">
            {total} {t.readiness.total}
          </li>
        </ul>
      )}
    </div>
  );
}
