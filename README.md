# Karteikarten

Web-App zum Lernen von Karteikarten mit Spaced Repetition (SM-2-Algorithmus,
wie bei Anki). Karten werden per CSV importiert, alle Daten (Karten +
Lernfortschritt) werden ausschließlich lokal im Browser gespeichert
(IndexedDB) — es gibt keinen Server und keine Datenbank im Hintergrund.

## Entwicklung

```bash
npm install
npm run dev
```

## CSV-Format

Pro Zeile eine Karte: `Frage,Antwort`. Eine optionale Kopfzeile
(`Frage,Antwort` oder `Front,Back`) wird automatisch erkannt und übersprungen.

```csv
Frage,Antwort
Hauptstadt von Frankreich,Paris
2+2,4
```

## Backup

Da alle Daten nur im Browser dieses Geräts liegen, gibt es in der App unter
"Backup" einen Export- und Import-Button für eine JSON-Sicherungsdatei —
damit lassen sich Daten sichern oder auf ein anderes Gerät übertragen.

## Deployment auf GitHub Pages

1. Repo auf GitHub anlegen und Code pushen.
2. Falls der Repo-Name **nicht** `Karteikartenprogramm` ist, den `base`-Wert
   in `vite.config.ts` entsprechend anpassen (`/<repo-name>/`).
3. Deployen:

   ```bash
   npm run deploy
   ```

   Das baut die App und veröffentlicht `dist/` auf den `gh-pages`-Branch.
4. In den Repo-Einstellungen unter **Settings → Pages** als Quelle den
   `gh-pages`-Branch auswählen (falls nicht automatisch geschehen).
5. Die App ist danach unter `https://<username>.github.io/<repo-name>/`
   erreichbar.
