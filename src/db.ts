import Dexie, { type EntityTable } from 'dexie';

export interface Deck {
  id: number;
  name: string;
  createdAt: number;
}

export interface Card {
  id: number;
  deckId: number;
  front: string;
  back: string;
  // SM-2 scheduling state
  easeFactor: number; // starts at 2.5
  interval: number; // in days
  repetitions: number; // consecutive correct reviews
  dueDate: number; // timestamp; card is due when Date.now() >= dueDate
  lastReviewedAt: number | null;
}

export const db = new Dexie('KarteikartenDB') as Dexie & {
  decks: EntityTable<Deck, 'id'>;
  cards: EntityTable<Card, 'id'>;
};

db.version(1).stores({
  decks: '++id, name, createdAt',
  cards: '++id, deckId, dueDate',
});

export function newCardDefaults(): Pick<
  Card,
  'easeFactor' | 'interval' | 'repetitions' | 'dueDate' | 'lastReviewedAt'
> {
  return {
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    dueDate: Date.now(),
    lastReviewedAt: null,
  };
}
