import { useRef, useState } from 'react';
import { exportBackup, importBackup } from '../backup';
import { Cat, PHRASES, pick } from '../cats';

export function Backup() {
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [phrase] = useState(() => pick(PHRASES.backup));
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
      setStatus(`🐾 ${decks} Deck(s) mit ${cards} Karte(n) zurueckgeholt!`);
    } catch (err) {
      setStatus(`Autsch: ${(err as Error).message}`);
    } finally {
      setBusy(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  return (
    <section className="panel backup">
      <h2 className="panel-title">
        Backup <span className="starburst">nicht vergessen!</span>
      </h2>
      <p className="hint">
        Deine Karten leben nur in diesem Browser. Lad dir ab und zu ein Backup runter — oder
        nimm es mit auf ein anderes Geraet.
      </p>
      <div className="backup-actions">
        <button className="cbtn cbtn-cyan" onClick={handleExport} disabled={busy}>
          Backup runterladen
        </button>
        <label className="file-button cbtn cbtn-pink">
          Backup einspielen
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
