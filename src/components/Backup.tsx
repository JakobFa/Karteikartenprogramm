import { useEffect, useRef, useState } from 'react';
import { exportBackup, importBackup } from '../backup';
import { Cat, pick } from '../cats';
import { useLanguage } from '../LanguageContext';

export function Backup() {
  const { t, lang, phrases } = useLanguage();
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [phrase, setPhrase] = useState(() => pick(phrases.backup));
  useEffect(() => {
    setPhrase(pick(phrases.backup));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleExport() {
    setBusy(true);
    setStatus(null);
    try {
      await exportBackup();
    } finally {
      setBusy(false);
    }
  }

  async function handleImportFile(file: File) {
    setBusy(true);
    setStatus(null);
    try {
      const { decks, cards } = await importBackup(file);
      setStatus(t.backup.restoredStatus(decks, cards));
    } catch (err) {
      const message = (err as Error).message;
      const translated =
        message === 'INVALID_JSON'
          ? t.backup.invalidJson
          : message === 'INVALID_FORMAT'
            ? t.backup.invalidFormat
            : message;
      setStatus(t.backup.errorStatus(translated));
    } finally {
      setBusy(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  return (
    <section className="panel backup">
      <h2 className="panel-title">
        {t.backup.title} <span className="starburst">{t.backup.badge}</span>
      </h2>
      <p className="hint">{t.backup.hint}</p>
      <div className="backup-actions">
        <button className="cbtn cbtn-cyan" onClick={handleExport} disabled={busy}>
          {t.backup.downloadBtn}
        </button>
        <label className="file-button cbtn cbtn-pink">
          {t.backup.importLabel}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            disabled={busy}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImportFile(file);
            }}
          />
        </label>
      </div>
      {status && <p className="backup-status">{status}</p>}
      <div className="cat-row">
        <Cat name="think" className="cat cat-sm" />
        <p className="speech">{phrase}</p>
      </div>
    </section>
  );
}
