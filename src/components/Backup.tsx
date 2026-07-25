import { useRef, useState } from 'react';
import { exportBackup, importBackup } from '../backup';

export function Backup() {
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
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
      setStatus(`${decks} Deck(s) mit ${cards} Karte(n) wiederhergestellt.`);
    } catch (err) {
      setStatus(`Fehler: ${(err as Error).message}`);
    } finally {
      setBusy(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  return (
    <div className="backup">
      <h2>Backup</h2>
      <p className="hint">
        Deine Daten liegen nur in diesem Browser. Lade regelmäßig ein Backup herunter, um sie
        zu sichern oder auf ein anderes Gerät zu übertragen.
      </p>
      <div className="backup-actions">
        <button onClick={handleExport} disabled={busy}>
          Backup herunterladen
        </button>
        <label className="file-button">
          Backup importieren
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
    </div>
  );
}
