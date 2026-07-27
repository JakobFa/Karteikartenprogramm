import { useEffect, useRef, useState } from 'react';
import { db, newCardDefaults } from '../db';
import { parseCsv } from '../csv';
import { Cat, pick } from '../cats';
import { useLanguage } from '../LanguageContext';

interface ImportDeckProps {
  onImported: () => void;
}

export function ImportDeck({ onImported }: ImportDeckProps) {
  const { t, lang, phrases } = useLanguage();
  const [deckName, setDeckName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [phrase, setPhrase] = useState(() => pick(phrases.import));
  useEffect(() => {
    setPhrase(pick(phrases.import));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImport() {
    if (!file) {
      setErrors([t.import.noFileError]);
      return;
    }
    const name = deckName.trim() || file.name.replace(/\.csv$/i, '');

    setBusy(true);
    setErrors([]);
    try {
      const text = await file.text();
      const { cards, skippedRows, parseErrors } = parseCsv(text);

      const messages = [
        ...skippedRows.map((row) => t.import.skippedRowMsg(row)),
        ...parseErrors.map((e) => t.import.parseErrorMsg(e.row ?? 0, e.message)),
      ];

      if (cards.length === 0) {
        setErrors([...messages, t.import.noCardsError]);
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

      setErrors(messages);
      setDeckName('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      onImported();
    } catch (err) {
      setErrors([`${t.import.importFailedPrefix}${(err as Error).message}`]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="panel import-deck">
      <h2 className="panel-title">
        {t.import.title} <span className="starburst">{t.import.badge}</span>
      </h2>
      <ul className="hint csv-rules">
        <li>
          {t.import.rule1Prefix}
          <strong>{t.import.rule1Bold}</strong>
          {t.import.rule1Suffix}
          <code>{t.import.rule1Example}</code>
        </li>
        <li>{t.import.rule2}</li>
        <li>
          {t.import.rule3Prefix}
          <code>{t.import.rule3Example}</code>
        </li>
        <li>{t.import.rule4}</li>
      </ul>

      <div className="import-form">
        <input
          type="text"
          placeholder={t.import.deckNamePlaceholder}
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
        />
        <label className="file-button cbtn cbtn-cyan">
          {t.import.chooseFile}
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>
        <button className="cbtn cbtn-primary" onClick={handleImport} disabled={busy || !file}>
          {busy ? t.import.submitBusy : t.import.submitIdle}
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
