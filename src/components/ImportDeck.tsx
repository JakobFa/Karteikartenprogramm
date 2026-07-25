import { useRef, useState } from 'react';
import { db, newCardDefaults } from '../db';
import { parseCsv } from '../csv';

interface ImportDeckProps {
  onImported: () => void;
}

export function ImportDeck({ onImported }: ImportDeckProps) {
  const [deckName, setDeckName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImport() {
    if (!file) {
      setErrors(['Bitte zuerst eine CSV-Datei auswählen.']);
      return;
    }
    const name = deckName.trim() || file.name.replace(/\.csv$/i, '');

    setBusy(true);
    setErrors([]);
    try {
      const text = await file.text();
      const { cards, errors: parseErrors } = parseCsv(text);

      if (cards.length === 0) {
        setErrors([...parseErrors, 'Keine gültigen Karten in der Datei gefunden.']);
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
    <div className="import-deck">
      <h2>Neues Deck aus CSV importieren</h2>
      <p className="hint">
        Format: pro Zeile <code>Frage,Antwort</code> (optional mit Kopfzeile).
      </p>
      <div className="import-form">
        <input
          type="text"
          placeholder="Deck-Name (optional, sonst Dateiname)"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <button onClick={handleImport} disabled={busy || !file}>
          {busy ? 'Importiere…' : 'Importieren'}
        </button>
      </div>
      {errors.length > 0 && (
        <ul className="errors">
          {errors.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
