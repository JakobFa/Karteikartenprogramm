import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db';
import { ImportDeck } from './components/ImportDeck';
import { DeckList } from './components/DeckList';
import { StudySession } from './components/StudySession';
import { Backup } from './components/Backup';
import './App.css';

type View = { name: 'overview' } | { name: 'study'; deckId: number };

function App() {
  const [view, setView] = useState<View>({ name: 'overview' });

  const studyingDeck = useLiveQuery(
    () => (view.name === 'study' ? db.decks.get(view.deckId) : undefined),
    [view],
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Karteikarten</h1>
      </header>

      {view.name === 'overview' && (
        <main>
          <ImportDeck onImported={() => setView({ name: 'overview' })} />
          <DeckList onStudy={(deckId) => setView({ name: 'study', deckId })} />
          <Backup />
        </main>
      )}

      {view.name === 'study' && studyingDeck && (
        <main>
          <StudySession
            deckId={view.deckId}
            deckName={studyingDeck.name}
            onFinish={() => setView({ name: 'overview' })}
          />
        </main>
      )}
    </div>
  );
}

export default App;
