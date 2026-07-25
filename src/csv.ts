import Papa from 'papaparse';

export interface ParsedCard {
  front: string;
  back: string;
}

export interface CsvParseResult {
  cards: ParsedCard[];
  errors: string[];
}

const HEADER_KEYWORDS = new Set([
  'frage',
  'antwort',
  'front',
  'back',
  'question',
  'answer',
]);

function looksLikeHeader(row: string[]): boolean {
  return row.some((cell) => HEADER_KEYWORDS.has(cell.trim().toLowerCase()));
}

export function parseCsv(fileContent: string): CsvParseResult {
  const result = Papa.parse<string[]>(fileContent, {
    skipEmptyLines: true,
  });

  const errors = result.errors.map(
    (e) => `Zeile ${e.row != null ? e.row + 1 : '?'}: ${e.message}`,
  );

  const rows = result.data;
  const startIndex = rows.length > 0 && looksLikeHeader(rows[0]) ? 1 : 0;

  const cards: ParsedCard[] = [];
  for (let i = startIndex; i < rows.length; i++) {
    const row = rows[i];
    const front = (row[0] ?? '').trim();
    const back = (row[1] ?? '').trim();
    if (!front || !back) {
      errors.push(`Zeile ${i + 1}: erwarte zwei Spalten (Frage,Antwort), übersprungen`);
      continue;
    }
    cards.push({ front, back });
  }

  return { cards, errors };
}
