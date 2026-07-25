import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db';
import { Cat, PHRASES, pick } from './cats';
import { ImportDeck } from './components/ImportDeck';
import { DeckList } from './components/DeckList';
import { StudySession } from './components/StudySession';
import { Backup } from './components/Backup';
import { ExamProgress } from './components/ExamProgress';
import './App.css';

type View = { name: 'overview' } | { name: 'study'; deckId: number };

function App() {
  const [view, setView] = useState<View>({ name: 'overview' });
  const [greeting] = useState(() => pick(PHRASES.welcome));

  const studyingDeck = useLiveQuery(
    () => (view.name === 'study' ? db.decks.get(view.deckId) : undefined),
    [view],
  );

  return (
    <div className="app">
      <header className="app-header">
        <button
          className="home-cat-btn"
          onClick={() => setView({ name: 'overview' })}
          aria-label="Zurück zum Hauptmenü"
          title="Zurück zum Hauptmenü"
        >
          <Cat name="cheer" className="cat cat-lg cat-wiggle" />
        </button>
        <h1 className="app-title">Karteikatzen</h1>
      </header>

      {view.name === 'overview' && (
        <main>
          <section className="panel">
            <div className="cat-row" style={{ marginTop: 0 }}>
              <Cat name="support" className="cat cat-md" />
              <p className="speech">{greeting}</p>
            </div>
          </section>

          <ExamProgress />
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
