import { useRef, useState } from 'react';
import { db, newCardDefaults } from '../db';
import { parseCsv } from '../csv';
import { Cat, PHRASES, pick } from '../cats';

interface ImportDeckProps {
  onImported: () => void;
}

export function ImportDeck({ onImported }: ImportDeckProps) {
  const [deckName, setDeckName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [phrase] = useState(() => pick(PHRASES.import));
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImport() {
    if (!file) {
      setErrors(['Miau! Erst eine CSV-Datei aussuchen.']);
      return;
    }
    const name = deckName.trim() || file.name.replace(/\.csv$/i, '');

    setBusy(true);
    setErrors([]);
    try {
      const text = await file.text();
      const { cards, errors: parseErrors } = parseCsv(text);

      if (cards.length === 0) {
        setErrors([...parseErrors, 'Keine gueltigen Karten gefunden. Ich hab ueberall geschnueffelt!']);
        setBusy(false);
        return;
      }

      const deckId = await db.decks.add({ name, createdAt: Date.now() });
      await db.cards.bulkAdd(
        cards.map((c) => ({
          deckId,
          front: c.front,
          back: c.back,
          ...newCardDefaults(),
        })),
      );

      setErrors(parseErrors);
      setDeckName('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      onImported();
    } catch (err) {
      setErrors([`Import fehlgeschlagen: ${(err as Error).message}`]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="panel import-deck">
      <h2 className="panel-title">
        Karten futtern <span className="starburst">CSV rein!</span>
      </h2>
      <p className="hint">
        Format: pro Zeile <code>Frage,Antwort</code> (Kopfzeile ist okay).
      </p>

      <div className="import-form">
        <input
          type="text"
          placeholder="Deck-Name (optional)"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
        />
        <label className="file-button cbtn cbtn-cyan">
          Datei waehlen
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>
        <button className="cbtn cbtn-primary" onClick={handleImport} disabled={busy || !file}>
          {busy ? 'Schnurrt…' : 'Los geht’s!'}
        </button>
      </div>

      {file && <p className="file-name">🐾 {file.name}</p>}

      {errors.length > 0 && (
        <ul className="errors">
          {errors.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      )}

      <div className="cat-row">
        <Cat name="wink" className="cat cat-sm" />
        <p className="speech">{phrase}</p>
      </div>
    </section>
  );
}
