import Papa from 'papaparse';

export interface ParsedCard {
  front: string;
  back: string;
}

export interface CsvParseResult {
  cards: ParsedCard[];
  /** 1-indexierte Zeilen, die wegen fehlender Spalten übersprungen wurden. */
  skippedRows: number[];
  /** Rohe Parser-Fehler (Papaparse-Meldungen bleiben englisch). */
  parseErrors: { row: number | null; message: string }[];
}

const HEADER_KEYWORDS = new Set([
  'frage',
  'antwort',
  'front',
  'back',
  'question',
  'answer',
  'pregunta',
  'respuesta',
  'pergunta',
  'resposta',
]);

function looksLikeHeader(row: string[]): boolean {
  return row.some((cell) => HEADER_KEYWORDS.has(cell.trim().toLowerCase()));
}

export function parseCsv(fileContent: string): CsvParseResult {
  const result = Papa.parse<string[]>(fileContent, {
    skipEmptyLines: true,
  });

  const parseErrors = result.errors.map((e) => ({
    row: e.row != null ? e.row + 1 : null,
    message: e.message,
  }));

  const rows = result.data;
  const startIndex = rows.length > 0 && looksLikeHeader(rows[0]) ? 1 : 0;

  const cards: ParsedCard[] = [];
  const skippedRows: number[] = [];
  for (let i = startIndex; i < rows.length; i++) {
    const row = rows[i];
    const front = (row[0] ?? '').trim();
    const back = (row[1] ?? '').trim();
    if (!front || !back) {
      skippedRows.push(i + 1);
      continue;
    }
    cards.push({ front, back });
  }

  return { cards, skippedRows, parseErrors };
}
