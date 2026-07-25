/**
 * Handgezeichnete Comic-Katzen als Inline-SVG (keine externen Assets, damit
 * alles auf GitHub Pages self-contained bleibt) plus die Mutmach-Sprueche,
 * die sie in Sprechblasen von sich geben.
 */

interface CatProps {
  className?: string;
}

const ink = '#151515';

/** Jubelnde Katze, Pfoten in der Luft. */
export function CatCheer({ className }: CatProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" role="img" aria-label="Jubelnde Katze">
      <g stroke={ink} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
        {/* Pfoten */}
        <path d="M22 62 L10 44" fill="none" />
        <circle cx="9" cy="41" r="6" fill="#ffb0d8" />
        <path d="M78 62 L90 44" fill="none" />
        <circle cx="91" cy="41" r="6" fill="#ffb0d8" />
        {/* Koerper */}
        <path d="M28 92 Q28 62 50 62 Q72 62 72 92 Z" fill="#ffd93d" />
        {/* Ohren */}
        <path d="M22 34 L20 12 L40 24 Z" fill="#ffd93d" />
        <path d="M78 34 L80 12 L60 24 Z" fill="#ffd93d" />
        <path d="M26 30 L25 19 L35 25 Z" fill="#ffb0d8" stroke="none" />
        <path d="M74 30 L75 19 L65 25 Z" fill="#ffb0d8" stroke="none" />
        {/* Kopf */}
        <ellipse cx="50" cy="45" rx="30" ry="26" fill="#ffd93d" />
        {/* Augen: freudig zugekniffen */}
        <path d="M33 42 Q39 35 45 42" fill="none" />
        <path d="M55 42 Q61 35 67 42" fill="none" />
        {/* Wangen */}
        <ellipse cx="30" cy="52" rx="6" ry="4" fill="#ff6ec7" stroke="none" opacity="0.8" />
        <ellipse cx="70" cy="52" rx="6" ry="4" fill="#ff6ec7" stroke="none" opacity="0.8" />
        {/* Offener Jubel-Mund */}
        <path d="M42 52 Q50 68 58 52 Z" fill="#ff5470" />
        {/* Schnurrhaare */}
        <path d="M18 48 L4 45 M18 53 L4 55" fill="none" strokeWidth="2.5" />
        <path d="M82 48 L96 45 M82 53 L96 55" fill="none" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

/** Zwinkernde Katze mit rausgestreckter Zunge. */
export function CatWink({ className }: CatProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" role="img" aria-label="Zwinkernde Katze">
      <g stroke={ink} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M28 92 Q28 62 50 62 Q72 62 72 92 Z" fill="#4ecdc4" />
        <path d="M22 34 L20 12 L40 24 Z" fill="#4ecdc4" />
        <path d="M78 34 L80 12 L60 24 Z" fill="#4ecdc4" />
        <path d="M26 30 L25 19 L35 25 Z" fill="#ffb0d8" stroke="none" />
        <path d="M74 30 L75 19 L65 25 Z" fill="#ffb0d8" stroke="none" />
        <ellipse cx="50" cy="45" rx="30" ry="26" fill="#4ecdc4" />
        {/* Linkes Auge offen, rechtes zwinkert */}
        <circle cx="39" cy="41" r="6" fill="#fff" />
        <circle cx="40" cy="42" r="3.5" fill={ink} stroke="none" />
        <path d="M55 42 Q61 35 67 42" fill="none" />
        <ellipse cx="30" cy="52" rx="6" ry="4" fill="#ff6ec7" stroke="none" opacity="0.8" />
        <ellipse cx="70" cy="52" rx="6" ry="4" fill="#ff6ec7" stroke="none" opacity="0.8" />
        {/* Naeschen + Zunge */}
        <path d="M46 50 L54 50 L50 55 Z" fill="#ff5470" />
        <path d="M50 55 Q50 64 44 64 Q40 64 41 58" fill="#ff5470" />
        <path d="M18 48 L4 45 M18 53 L4 55" fill="none" strokeWidth="2.5" />
        <path d="M82 48 L96 45 M82 53 L96 55" fill="none" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

/** Nachdenkliche Katze, Pfote am Kinn. */
export function CatThink({ className }: CatProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" role="img" aria-label="Nachdenkliche Katze">
      <g stroke={ink} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M28 92 Q28 62 50 62 Q72 62 72 92 Z" fill="#ff9f1c" />
        <path d="M22 34 L20 12 L40 24 Z" fill="#ff9f1c" />
        <path d="M78 34 L80 12 L60 24 Z" fill="#ff9f1c" />
        <path d="M26 30 L25 19 L35 25 Z" fill="#ffb0d8" stroke="none" />
        <path d="M74 30 L75 19 L65 25 Z" fill="#ffb0d8" stroke="none" />
        <ellipse cx="50" cy="45" rx="30" ry="26" fill="#ff9f1c" />
        {/* Nach oben schauende Augen */}
        <circle cx="39" cy="41" r="6.5" fill="#fff" />
        <circle cx="40" cy="38" r="3.5" fill={ink} stroke="none" />
        <circle cx="61" cy="41" r="6.5" fill="#fff" />
        <circle cx="62" cy="38" r="3.5" fill={ink} stroke="none" />
        <path d="M46 50 L54 50 L50 55 Z" fill="#ff5470" />
        {/* Schiefer Gruebel-Mund */}
        <path d="M44 60 Q50 57 57 61" fill="none" />
        {/* Pfote am Kinn */}
        <circle cx="70" cy="70" r="8" fill="#ffb0d8" />
        <path d="M18 48 L4 45 M18 53 L4 55" fill="none" strokeWidth="2.5" />
        <path d="M82 48 L96 45 M82 53 L96 55" fill="none" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

/** Coole Katze mit Sonnenbrille. */
export function CatCool({ className }: CatProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" role="img" aria-label="Coole Katze mit Sonnenbrille">
      <g stroke={ink} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M28 92 Q28 62 50 62 Q72 62 72 92 Z" fill="#b39ddb" />
        <path d="M22 34 L20 12 L40 24 Z" fill="#b39ddb" />
        <path d="M78 34 L80 12 L60 24 Z" fill="#b39ddb" />
        <path d="M26 30 L25 19 L35 25 Z" fill="#ffb0d8" stroke="none" />
        <path d="M74 30 L75 19 L65 25 Z" fill="#ffb0d8" stroke="none" />
        <ellipse cx="50" cy="45" rx="30" ry="26" fill="#b39ddb" />
        {/* Sonnenbrille */}
        <path d="M26 38 L74 38" fill="none" strokeWidth="4" />
        <path d="M28 38 L44 38 Q46 50 36 50 Q28 50 28 38 Z" fill={ink} />
        <path d="M72 38 L56 38 Q54 50 64 50 Q72 50 72 38 Z" fill={ink} />
        <path d="M32 41 L38 41" stroke="#fff" strokeWidth="2.5" />
        <path d="M60 41 L66 41" stroke="#fff" strokeWidth="2.5" />
        <path d="M46 50 L54 50 L50 55 Z" fill="#ff5470" />
        {/* Selbstsicheres Grinsen */}
        <path d="M42 58 Q50 66 60 57" fill="none" />
        <path d="M18 48 L4 45 M18 53 L4 55" fill="none" strokeWidth="2.5" />
        <path d="M82 48 L96 45 M82 53 L96 55" fill="none" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

/** Katze mit Herzaugen. */
export function CatLove({ className }: CatProps) {
  const heart = 'M0 -3 C -4 -8, -10 -3, 0 5 C 10 -3, 4 -8, 0 -3 Z';
  return (
    <svg className={className} viewBox="0 0 100 100" role="img" aria-label="Katze mit Herzaugen">
      <g stroke={ink} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M28 92 Q28 62 50 62 Q72 62 72 92 Z" fill="#ff6ec7" />
        <path d="M22 34 L20 12 L40 24 Z" fill="#ff6ec7" />
        <path d="M78 34 L80 12 L60 24 Z" fill="#ff6ec7" />
        <path d="M26 30 L25 19 L35 25 Z" fill="#fff0f6" stroke="none" />
        <path d="M74 30 L75 19 L65 25 Z" fill="#fff0f6" stroke="none" />
        <ellipse cx="50" cy="45" rx="30" ry="26" fill="#ff6ec7" />
        <g transform="translate(39 41) scale(1.5)">
          <path d={heart} fill="#ff1744" strokeWidth="2" />
        </g>
        <g transform="translate(61 41) scale(1.5)">
          <path d={heart} fill="#ff1744" strokeWidth="2" />
        </g>
        <path d="M46 52 L54 52 L50 57 Z" fill="#ffd93d" />
        <path d="M42 60 Q50 68 58 60" fill="none" />
        <path d="M18 48 L4 45 M18 53 L4 55" fill="none" strokeWidth="2.5" />
        <path d="M82 48 L96 45 M82 53 L96 55" fill="none" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

/** Schlafende Katze mit Zzz. */
export function CatSleepy({ className }: CatProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" role="img" aria-label="Schlafende Katze">
      <g stroke={ink} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M28 92 Q28 62 50 62 Q72 62 72 92 Z" fill="#a5d6a7" />
        <path d="M22 34 L20 12 L40 24 Z" fill="#a5d6a7" />
        <path d="M78 34 L80 12 L60 24 Z" fill="#a5d6a7" />
        <path d="M26 30 L25 19 L35 25 Z" fill="#ffb0d8" stroke="none" />
        <path d="M74 30 L75 19 L65 25 Z" fill="#ffb0d8" stroke="none" />
        <ellipse cx="50" cy="45" rx="30" ry="26" fill="#a5d6a7" />
        {/* Geschlossene Augen */}
        <path d="M33 44 Q39 50 45 44" fill="none" />
        <path d="M55 44 Q61 50 67 44" fill="none" />
        <path d="M46 52 L54 52 L50 57 Z" fill="#ff5470" />
        <path d="M44 62 Q50 66 56 62" fill="none" />
        {/* Zzz */}
        <text
          x="74"
          y="22"
          fontSize="18"
          fontWeight="bold"
          fill={ink}
          stroke="none"
          fontFamily="'Comic Sans MS', cursive"
        >
          z
        </text>
        <text
          x="84"
          y="12"
          fontSize="13"
          fontWeight="bold"
          fill={ink}
          stroke="none"
          fontFamily="'Comic Sans MS', cursive"
        >
          z
        </text>
        <path d="M18 48 L4 45 M18 53 L4 55" fill="none" strokeWidth="2.5" />
        <path d="M82 48 L96 45 M82 53 L96 55" fill="none" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

/** Aufmunternde Katze, die die Pfote reicht. */
export function CatSupport({ className }: CatProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" role="img" aria-label="Aufmunternde Katze">
      <g stroke={ink} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M28 92 Q28 62 50 62 Q72 62 72 92 Z" fill="#ffab91" />
        <path d="M22 34 L20 12 L40 24 Z" fill="#ffab91" />
        <path d="M78 34 L80 12 L60 24 Z" fill="#ffab91" />
        <path d="M26 30 L25 19 L35 25 Z" fill="#fff0f6" stroke="none" />
        <path d="M74 30 L75 19 L65 25 Z" fill="#fff0f6" stroke="none" />
        <ellipse cx="50" cy="45" rx="30" ry="26" fill="#ffab91" />
        {/* Grosse, warme Augen */}
        <circle cx="39" cy="42" r="7" fill="#fff" />
        <circle cx="40" cy="43" r="4" fill={ink} stroke="none" />
        <circle cx="38" cy="41" r="1.5" fill="#fff" stroke="none" />
        <circle cx="61" cy="42" r="7" fill="#fff" />
        <circle cx="62" cy="43" r="4" fill={ink} stroke="none" />
        <circle cx="60" cy="41" r="1.5" fill="#fff" stroke="none" />
        <ellipse cx="28" cy="54" rx="6" ry="4" fill="#ff6ec7" stroke="none" opacity="0.8" />
        <ellipse cx="72" cy="54" rx="6" ry="4" fill="#ff6ec7" stroke="none" opacity="0.8" />
        <path d="M46 52 L54 52 L50 57 Z" fill="#ff5470" />
        <path d="M42 61 Q50 68 58 61" fill="none" />
        {/* Ausgestreckte Pfote (Daumen hoch) */}
        <path d="M74 70 L86 58" fill="none" />
        <circle cx="88" cy="55" r="7" fill="#fff0f6" />
        <path d="M18 48 L4 45 M18 53 L4 55" fill="none" strokeWidth="2.5" />
        <path d="M82 48 L96 45 M82 53 L96 55" fill="none" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

export type CatName =
  | 'cheer'
  | 'wink'
  | 'think'
  | 'cool'
  | 'love'
  | 'sleepy'
  | 'support';

export const CATS: Record<CatName, (props: CatProps) => React.ReactElement> = {
  cheer: CatCheer,
  wink: CatWink,
  think: CatThink,
  cool: CatCool,
  love: CatLove,
  sleepy: CatSleepy,
  support: CatSupport,
};

export function Cat({ name, className }: { name: CatName; className?: string }) {
  const Component = CATS[name];
  return <Component className={className} />;
}

/** Katze passend zur Position in einer Liste, damit nicht alle gleich aussehen. */
const CAT_CYCLE: CatName[] = ['cheer', 'wink', 'cool', 'love', 'think', 'support', 'sleepy'];
export function catForIndex(index: number): CatName {
  return CAT_CYCLE[index % CAT_CYCLE.length];
}

export function pick<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

/* --------------------------- Mutmach-Sprueche --------------------------- */

export const PHRASES = {
  welcome: [
    'Miau! Schoen dass du da bist. Wir kriegen das hin!',
    'Lernzeit! Ich hab die Snacks dabei.',
    'Kopf hoch, Schnurrbart raus. Los geht’s!',
    'Keine Panik. Panik ist was fuer Hunde.',
  ],
  import: [
    'Neue Karten? Her damit! Ich helf dir sortieren.',
    'CSV rein, Wissen raus. So einfach ist das.',
    'Ich hab schon mal auf die Enter-Taste gesessen.',
  ],
  emptyDecks: [
    'Noch keine Karten... aber ich glaub trotzdem an dich!',
    'Leeres Regal, volles Potenzial. Lad was hoch!',
    'Ohne Karten kann ich nur schlafen. Und das kann ich schon.',
  ],
  deckReady: [
    'Deine Karten warten. Ich auch.',
    'Ein Deck am Tag haelt die Klausurangst fern.',
    'Du hast das schon mal geschafft. Machst du wieder.',
  ],
  front: [
    'Denk in Ruhe nach. Ich renn nicht weg.',
    'Du weisst das. Ganz tief drin weisst du das.',
    'Erstmal raten ist auch eine Strategie!',
    'Ich glaub an dich. Und ich bin sehr waehlerisch.',
    'Atme. Denk. Miau.',
  ],
  back: [
    'Und? Warst du dran?',
    'Sei ehrlich zu dir. Ich petz nicht.',
    'Egal wie – du hast hingeschaut. Das zaehlt.',
  ],
  again: [
    'Kein Ding! Ich fall auch staendig vom Regal.',
    'Nochmal ist kein Rueckschritt, das ist Training.',
    'Beim ersten Mal klappt selten was. Frag meine Landungen.',
    'Vergessen ist menschlich. Ich bin froh, dass ich Katze bin.',
  ],
  hard: [
    'Schwer? Und trotzdem hast du’s gepackt. Respekt!',
    'Genau die Karten machen dich besser.',
    'Puh! Aber du hast nicht aufgegeben.',
  ],
  good: [
    'MIAU! Sauber gemacht!',
    'Das sass. Weiter so!',
    'Ich schnurre. Das ist mein hoechstes Lob.',
  ],
  easy: [
    'Du bist ja ein Genie! *schnurr*',
    'Zu leicht fuer dich. Ich bin beeindruckt.',
    'Das war Angeberei. Ich mag Angeberei.',
  ],
  done: [
    'Fertig! Zeit fuer ein Nickerchen – hast du dir verdient.',
    'Session geschafft. Ich bin stolz wie ein Kater auf dem Kratzbaum.',
    'Das war stark. Morgen machen wir weiter.',
  ],
  backup: [
    'Sicher ist sicher. Ich vergrab meine Sachen auch.',
    'Backup machen ist wie Kratzbaum: braucht man erst, wenn’s zu spaet ist.',
  ],
} as const;

/** Kommentar zur Klausur-Reife, gestaffelt nach Prozentwert. */
export function readinessComment(percent: number): { text: string; cat: CatName } {
  if (percent >= 90)
    return { text: 'Du bist klausurreif! Ich schnurr vor Stolz.', cat: 'love' };
  if (percent >= 70)
    return { text: 'Sehr stark! Da kann die Klausur kommen.', cat: 'cool' };
  if (percent >= 45)
    return { text: 'Gute Basis! Dranbleiben, du packst das.', cat: 'cheer' };
  if (percent >= 20)
    return { text: 'Wir sind auf dem Weg. Jede Karte zaehlt!', cat: 'support' };
  if (percent > 0)
    return { text: 'Aller Anfang ist zaeh. Ich bleib bei dir.', cat: 'think' };
  return { text: 'Noch nix gelernt – perfekter Moment zum Starten!', cat: 'wink' };
}
