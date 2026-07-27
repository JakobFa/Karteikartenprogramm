import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db';
import { Cat, pick } from './cats';
import { useLanguage } from './LanguageContext';
import { ImportDeck } from './components/ImportDeck';
import { DeckList } from './components/DeckList';
import { StudySession, type StudyMode } from './components/StudySession';
import { Backup } from './components/Backup';
import { ExamProgress } from './components/ExamProgress';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import './App.css';

type View = { name: 'overview' } | { name: 'study'; deckId: number; mode: StudyMode };

function App() {
  const [view, setView] = useState<View>({ name: 'overview' });
  const { t, lang, phrases } = useLanguage();
  const [greeting, setGreeting] = useState(() => pick(phrases.welcome));
  // Neuen Spruch in der neuen Sprache wuerfeln, sobald die Sprache gewechselt wird.
  useEffect(() => {
    setGreeting(pick(phrases.welcome));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

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
          aria-label={t.homeAria}
          title={t.homeAria}
        >
          <Cat name="cheer" className="cat cat-lg cat-wiggle" />
        </button>
        <h1 className="app-title">Karteikatzen</h1>
      </header>

      {view.name === 'overview' && (
        <main>
          <LanguageSwitcher />

          <section className="panel">
            <div className="cat-row" style={{ marginTop: 0 }}>
              <Cat name="support" className="cat cat-md" />
              <p className="speech">{greeting}</p>
            </div>
          </section>

          <ExamProgress />
          <ImportDeck onImported={() => setView({ name: 'overview' })} />
          <DeckList
            onStudy={(deckId) => setView({ name: 'study', deckId, mode: 'review' })}
            onCram={(deckId) => setView({ name: 'study', deckId, mode: 'cram' })}
          />
          <Backup />
        </main>
      )}

      {view.name === 'study' && studyingDeck && (
        <main>
          <StudySession
            key={`${view.deckId}-${view.mode}`}
            deckId={view.deckId}
            deckName={studyingDeck.name}
            mode={view.mode}
            onFinish={() => setView({ name: 'overview' })}
          />
        </main>
      )}
    </div>
  );
}

export default App;
