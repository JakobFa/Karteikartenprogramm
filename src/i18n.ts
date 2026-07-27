import type { CatName } from './cats';

export type Lang = 'de' | 'en' | 'es' | 'pt';

export interface LanguageMeta {
  code: Lang;
  flag: string;
  label: string;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'pt', flag: '🇵🇹', label: 'Português' },
];

export const DEFAULT_LANG: Lang = 'de';

export interface Translations {
  homeAria: string;
  exam: { title: string; badge: string };
  readiness: { ariaLabel: string; mature: string; learning: string; fresh: string; total: string };
  import: {
    title: string;
    badge: string;
    rule1Prefix: string;
    rule1Bold: string;
    rule1Suffix: string;
    rule1Example: string;
    rule2: string;
    rule3Prefix: string;
    rule3Example: string;
    rule4: string;
    deckNamePlaceholder: string;
    chooseFile: string;
    submitIdle: string;
    submitBusy: string;
    noFileError: string;
    noCardsError: string;
    importFailedPrefix: string;
    skippedRowMsg: (row: number) => string;
    parseErrorMsg: (row: number, message: string) => string;
  };
  deckList: {
    loading: string;
    title: string;
    countSuffix: string;
    dueBadgeSuffix: string;
    ofPrefix: string;
    counting: string;
    studyBtn: string;
    allDoneBtn: string;
    deleteBtn: string;
    deleteConfirm: (name: string) => string;
  };
  study: {
    loading: string;
    doneTitle: string;
    doneSummary: (count: number, deck: string) => string;
    backToOverview: string;
    remaining: (count: number) => string;
    flipHint: string;
    gradeAgain: string;
    gradeHard: string;
    gradeGood: string;
    gradeEasy: string;
    sfx: { again: string; hard: string; good: string; easy: string };
  };
  backup: {
    title: string;
    badge: string;
    hint: string;
    downloadBtn: string;
    importLabel: string;
    restoredStatus: (decks: number, cards: number) => string;
    errorStatus: (msg: string) => string;
    invalidJson: string;
    invalidFormat: string;
  };
}

export interface PhraseBank {
  welcome: string[];
  import: string[];
  emptyDecks: string[];
  deckReady: string[];
  front: string[];
  back: string[];
  again: string[];
  hard: string[];
  good: string[];
  easy: string[];
  done: string[];
  backup: string[];
}

const de: Translations = {
  homeAria: 'Zurück zum Hauptmenü',
  exam: { title: 'Klausur-Reife', badge: 'alle Decks' },
  readiness: {
    ariaLabel: 'Klausur-Reife',
    mature: 'sitzt',
    learning: 'am Lernen',
    fresh: 'noch frisch',
    total: 'gesamt',
  },
  import: {
    title: 'Karten futtern',
    badge: 'CSV rein!',
    rule1Prefix: 'Genau ',
    rule1Bold: '2 Spalten',
    rule1Suffix: ' pro Zeile: ',
    rule1Example: 'Frage,Antwort',
    rule2: 'Kopfzeile optional (z. B. „Frage,Antwort“ oder „Front,Back“) — wird erkannt',
    rule3Prefix: 'Kommt ein Komma im Text vor? Dann Feld in Anführungszeichen setzen: ',
    rule3Example: '"Paris, Frankreich",Hauptstadt',
    rule4: 'Datei-Kodierung: UTF-8 (Standard bei Excel/Numbers/Sheets-Export)',
    deckNamePlaceholder: 'Deck-Name (optional)',
    chooseFile: 'Datei wählen',
    submitIdle: 'Los geht’s!',
    submitBusy: 'Schnurrt…',
    noFileError: 'Miau! Erst eine CSV-Datei aussuchen.',
    noCardsError: 'Keine gültigen Karten gefunden. Ich hab überall geschnüffelt!',
    importFailedPrefix: 'Import fehlgeschlagen: ',
    skippedRowMsg: (row) => `Zeile ${row}: erwarte zwei Spalten (Frage,Antwort), übersprungen`,
    parseErrorMsg: (row, message) => `Zeile ${row}: ${message}`,
  },
  deckList: {
    loading: 'Katze sucht deine Decks…',
    title: 'Deine Decks',
    countSuffix: 'Stück',
    dueBadgeSuffix: 'fällig',
    ofPrefix: 'von',
    counting: 'zähle…',
    studyBtn: 'Lernen',
    allDoneBtn: 'Alles sitzt!',
    deleteBtn: 'Weg damit',
    deleteConfirm: (name) => `Deck "${name}" und alle Karten wirklich löschen?`,
  },
  study: {
    loading: 'Katze holt die Karten…',
    doneTitle: 'Geschafft!',
    doneSummary: (count, deck) => `Du hast ${count} Karte(n) aus „${deck}“ gelernt.`,
    backToOverview: 'Zurück zur Übersicht',
    remaining: (count) => `noch ${count}`,
    flipHint: '👆 Klick mich um',
    gradeAgain: 'Nochmal',
    gradeHard: 'Schwer',
    gradeGood: 'Gut',
    gradeEasy: 'Leicht',
    sfx: { again: 'HOPPLA!', hard: 'PUH!', good: 'MIAU!', easy: 'WOW!' },
  },
  backup: {
    title: 'Backup',
    badge: 'nicht vergessen!',
    hint: 'Deine Karten leben nur in diesem Browser. Lad dir ab und zu ein Backup runter — oder nimm es mit auf ein anderes Gerät.',
    downloadBtn: 'Backup runterladen',
    importLabel: 'Backup einspielen',
    restoredStatus: (decks, cards) => `🐾 ${decks} Deck(s) mit ${cards} Karte(n) zurückgeholt!`,
    errorStatus: (msg) => `Autsch: ${msg}`,
    invalidJson: 'Datei ist kein gültiges JSON.',
    invalidFormat: 'Datei hat kein gültiges Backup-Format.',
  },
};

const en: Translations = {
  homeAria: 'Back to main menu',
  exam: { title: 'Exam readiness', badge: 'all decks' },
  readiness: {
    ariaLabel: 'Exam readiness',
    mature: 'mastered',
    learning: 'learning',
    fresh: 'fresh',
    total: 'total',
  },
  import: {
    title: 'Feed me cards',
    badge: 'CSV time!',
    rule1Prefix: 'Exactly ',
    rule1Bold: '2 columns',
    rule1Suffix: ' per line: ',
    rule1Example: 'Question,Answer',
    rule2: 'Header row optional (e.g. "Question,Answer" or "Front,Back") — auto-detected',
    rule3Prefix: 'Got a comma inside your text? Wrap the field in quotes: ',
    rule3Example: '"Paris, France",Capital',
    rule4: 'File encoding: UTF-8 (the default when exporting from Excel/Numbers/Sheets)',
    deckNamePlaceholder: 'Deck name (optional)',
    chooseFile: 'Choose file',
    submitIdle: "Let's go!",
    submitBusy: 'Purring…',
    noFileError: 'Meow! Pick a CSV file first.',
    noCardsError: 'No valid cards found. I sniffed everywhere!',
    importFailedPrefix: 'Import failed: ',
    skippedRowMsg: (row) => `Row ${row}: expected two columns (Question,Answer), skipped`,
    parseErrorMsg: (row, message) => `Row ${row}: ${message}`,
  },
  deckList: {
    loading: 'Cat is looking for your decks…',
    title: 'Your decks',
    countSuffix: 'decks',
    dueBadgeSuffix: 'due',
    ofPrefix: 'of',
    counting: 'counting…',
    studyBtn: 'Study',
    allDoneBtn: 'All set!',
    deleteBtn: 'Toss it',
    deleteConfirm: (name) => `Really delete the deck "${name}" and all its cards?`,
  },
  study: {
    loading: 'Cat is fetching the cards…',
    doneTitle: 'All done!',
    doneSummary: (count, deck) => `You studied ${count} card(s) from "${deck}".`,
    backToOverview: 'Back to overview',
    remaining: (count) => `${count} left`,
    flipHint: '👆 Tap me to flip',
    gradeAgain: 'Again',
    gradeHard: 'Hard',
    gradeGood: 'Good',
    gradeEasy: 'Easy',
    sfx: { again: 'OOPS!', hard: 'PHEW!', good: 'MEOW!', easy: 'WOW!' },
  },
  backup: {
    title: 'Backup',
    badge: "don't forget!",
    hint: 'Your cards only live in this browser. Download a backup now and then — or take it to another device.',
    downloadBtn: 'Download backup',
    importLabel: 'Restore backup',
    restoredStatus: (decks, cards) => `🐾 Restored ${decks} deck(s) with ${cards} card(s)!`,
    errorStatus: (msg) => `Ouch: ${msg}`,
    invalidJson: 'File is not valid JSON.',
    invalidFormat: 'File is not a valid backup format.',
  },
};

const es: Translations = {
  homeAria: 'Volver al menú principal',
  exam: { title: 'Preparación para el examen', badge: 'todos los mazos' },
  readiness: {
    ariaLabel: 'Preparación para el examen',
    mature: 'dominadas',
    learning: 'aprendiendo',
    fresh: 'nuevas',
    total: 'total',
  },
  import: {
    title: 'Dale de comer tarjetas',
    badge: '¡CSV al ataque!',
    rule1Prefix: 'Exactamente ',
    rule1Bold: '2 columnas',
    rule1Suffix: ' por línea: ',
    rule1Example: 'Pregunta,Respuesta',
    rule2: 'Fila de encabezado opcional (p. ej. «Pregunta,Respuesta» o «Front,Back») — se detecta sola',
    rule3Prefix: '¿Tu texto tiene una coma? Pon el campo entre comillas: ',
    rule3Example: '"París, Francia",Capital',
    rule4: 'Codificación del archivo: UTF-8 (la predeterminada al exportar desde Excel/Numbers/Sheets)',
    deckNamePlaceholder: 'Nombre del mazo (opcional)',
    chooseFile: 'Elegir archivo',
    submitIdle: '¡Vamos!',
    submitBusy: 'Ronroneando…',
    noFileError: '¡Miau! Primero elige un archivo CSV.',
    noCardsError: 'No encontré tarjetas válidas. ¡Y eso que olfateé todo!',
    importFailedPrefix: 'Error al importar: ',
    skippedRowMsg: (row) => `Fila ${row}: se esperaban dos columnas (Pregunta,Respuesta), omitida`,
    parseErrorMsg: (row, message) => `Fila ${row}: ${message}`,
  },
  deckList: {
    loading: 'El gato está buscando tus mazos…',
    title: 'Tus mazos',
    countSuffix: 'mazos',
    dueBadgeSuffix: 'pendientes',
    ofPrefix: 'de',
    counting: 'contando…',
    studyBtn: 'Estudiar',
    allDoneBtn: '¡Todo listo!',
    deleteBtn: 'Eliminar',
    deleteConfirm: (name) => `¿Seguro que quieres eliminar el mazo "${name}" y todas sus tarjetas?`,
  },
  study: {
    loading: 'El gato está buscando las tarjetas…',
    doneTitle: '¡Listo!',
    doneSummary: (count, deck) => `Estudiaste ${count} tarjeta(s) de "${deck}".`,
    backToOverview: 'Volver al resumen',
    remaining: (count) => `${count} restante(s)`,
    flipHint: '👆 Tócame para voltear',
    gradeAgain: 'Otra vez',
    gradeHard: 'Difícil',
    gradeGood: 'Bien',
    gradeEasy: 'Fácil',
    sfx: { again: '¡UPS!', hard: '¡UF!', good: '¡MIAU!', easy: '¡GUAU!' },
  },
  backup: {
    title: 'Backup',
    badge: '¡no lo olvides!',
    hint: 'Tus tarjetas solo viven en este navegador. Descarga una copia de seguridad de vez en cuando, o llévala a otro dispositivo.',
    downloadBtn: 'Descargar copia',
    importLabel: 'Restaurar copia',
    restoredStatus: (decks, cards) => `🐾 ¡${decks} mazo(s) con ${cards} tarjeta(s) restaurados!`,
    errorStatus: (msg) => `Ay: ${msg}`,
    invalidJson: 'El archivo no es un JSON válido.',
    invalidFormat: 'El archivo no tiene un formato de copia de seguridad válido.',
  },
};

const pt: Translations = {
  homeAria: 'Voltar ao menu principal',
  exam: { title: 'Preparação para o exame', badge: 'todos os baralhos' },
  readiness: {
    ariaLabel: 'Preparação para o exame',
    mature: 'dominados',
    learning: 'a aprender',
    fresh: 'novos',
    total: 'total',
  },
  import: {
    title: 'Alimenta-me com cartões',
    badge: 'CSV chegou!',
    rule1Prefix: 'Exatamente ',
    rule1Bold: '2 colunas',
    rule1Suffix: ' por linha: ',
    rule1Example: 'Pergunta,Resposta',
    rule2: 'Linha de cabeçalho opcional (ex.: «Pergunta,Resposta» ou «Front,Back») — detetada automaticamente',
    rule3Prefix: 'O teu texto tem uma vírgula? Coloca o campo entre aspas: ',
    rule3Example: '"Paris, França",Capital',
    rule4: 'Codificação do ficheiro: UTF-8 (padrão ao exportar do Excel/Numbers/Sheets)',
    deckNamePlaceholder: 'Nome do baralho (opcional)',
    chooseFile: 'Escolher ficheiro',
    submitIdle: 'Vamos lá!',
    submitBusy: 'A ronronar…',
    noFileError: 'Miau! Escolhe primeiro um ficheiro CSV.',
    noCardsError: 'Não encontrei cartões válidos. E cheirei tudo!',
    importFailedPrefix: 'Falha ao importar: ',
    skippedRowMsg: (row) => `Linha ${row}: esperava duas colunas (Pergunta,Resposta), ignorada`,
    parseErrorMsg: (row, message) => `Linha ${row}: ${message}`,
  },
  deckList: {
    loading: 'O gato está a procurar os teus baralhos…',
    title: 'Os teus baralhos',
    countSuffix: 'baralhos',
    dueBadgeSuffix: 'pendentes',
    ofPrefix: 'de',
    counting: 'a contar…',
    studyBtn: 'Estudar',
    allDoneBtn: 'Tudo em dia!',
    deleteBtn: 'Eliminar',
    deleteConfirm: (name) => `Tens a certeza que queres eliminar o baralho "${name}" e todos os cartões?`,
  },
  study: {
    loading: 'O gato está a buscar os cartões…',
    doneTitle: 'Feito!',
    doneSummary: (count, deck) => `Estudaste ${count} cartão(ões) de "${deck}".`,
    backToOverview: 'Voltar ao resumo',
    remaining: (count) => `${count} restante(s)`,
    flipHint: '👆 Toca-me para virar',
    gradeAgain: 'De novo',
    gradeHard: 'Difícil',
    gradeGood: 'Bem',
    gradeEasy: 'Fácil',
    sfx: { again: 'OPA!', hard: 'UFA!', good: 'MIAU!', easy: 'UAU!' },
  },
  backup: {
    title: 'Backup',
    badge: 'não te esqueças!',
    hint: 'Os teus cartões só existem neste navegador. Faz uma cópia de segurança de vez em quando — ou leva-a para outro dispositivo.',
    downloadBtn: 'Descarregar cópia',
    importLabel: 'Restaurar cópia',
    restoredStatus: (decks, cards) => `🐾 ${decks} baralho(s) com ${cards} cartão(ões) restaurado(s)!`,
    errorStatus: (msg) => `Ai: ${msg}`,
    invalidJson: 'O ficheiro não é um JSON válido.',
    invalidFormat: 'O ficheiro não tem um formato de cópia de segurança válido.',
  },
};

export const TRANSLATIONS: Record<Lang, Translations> = { de, en, es, pt };

const PHRASES_DE: PhraseBank = {
  welcome: [
    'Miau! Schön dass du da bist. Wir kriegen das hin!',
    'Lernzeit! Ich hab die Snacks dabei.',
    'Kopf hoch, Schnurrbart raus. Los geht’s!',
    'Keine Panik. Panik ist was für Hunde.',
  ],
  import: [
    'Neue Karten? Her damit! Ich helf dir sortieren.',
    'CSV rein, Wissen raus. So einfach ist das.',
    'Ich hab schon mal auf die Enter-Taste gesessen.',
  ],
  emptyDecks: [
    'Noch keine Karten... aber ich glaub trotzdem an dich!',
    'Leeres Regal, volles Potenzial. Lad was hoch!',
    'Ohne Karten kann ich nur schlafen. Und das kann ich schon.',
  ],
  deckReady: [
    'Deine Karten warten. Ich auch.',
    'Ein Deck am Tag hält die Klausurangst fern.',
    'Du hast das schon mal geschafft. Machst du wieder.',
  ],
  front: [
    'Denk in Ruhe nach. Ich renn nicht weg.',
    'Du weißt das. Ganz tief drin weißt du das.',
    'Erstmal raten ist auch eine Strategie!',
    'Ich glaub an dich. Und ich bin sehr wählerisch.',
    'Atme. Denk. Miau.',
  ],
  back: [
    'Und? Warst du dran?',
    'Sei ehrlich zu dir. Ich petz nicht.',
    'Egal wie – du hast hingeschaut. Das zählt.',
  ],
  again: [
    'Kein Ding! Ich fall auch ständig vom Regal.',
    'Nochmal ist kein Rückschritt, das ist Training.',
    'Beim ersten Mal klappt selten was. Frag meine Landungen.',
    'Vergessen ist menschlich. Ich bin froh, dass ich Katze bin.',
  ],
  hard: [
    'Schwer? Und trotzdem hast du’s gepackt. Respekt!',
    'Genau die Karten machen dich besser.',
    'Puh! Aber du hast nicht aufgegeben.',
  ],
  good: [
    'MIAU! Sauber gemacht!',
    'Das saß. Weiter so!',
    'Ich schnurre. Das ist mein höchstes Lob.',
  ],
  easy: [
    'Du bist ja ein Genie! *schnurr*',
    'Zu leicht für dich. Ich bin beeindruckt.',
    'Das war Angeberei. Ich mag Angeberei.',
  ],
  done: [
    'Fertig! Zeit für ein Nickerchen – hast du dir verdient.',
    'Session geschafft. Ich bin stolz wie ein Kater auf dem Kratzbaum.',
    'Das war stark. Morgen machen wir weiter.',
  ],
  backup: [
    'Sicher ist sicher. Ich vergrab meine Sachen auch.',
    'Backup machen ist wie Kratzbaum: braucht man erst, wenn’s zu spät ist.',
  ],
};

const PHRASES_EN: PhraseBank = {
  welcome: [
    "Meow! Glad you're here. We've got this!",
    'Study time! I brought snacks.',
    "Chin up, whiskers out. Let's go!",
    'No panic. Panic is for dogs.',
  ],
  import: [
    "New cards? Bring 'em on, I'll help sort.",
    'CSV in, knowledge out. Simple as that.',
    "I've sat on the Enter key before.",
  ],
  emptyDecks: [
    "No cards yet... but I still believe in you!",
    'Empty shelf, full potential. Upload something!',
    "Without cards I can only nap. And I'm already great at that.",
  ],
  deckReady: [
    "Your cards are waiting. So am I.",
    'One deck a day keeps exam-panic away.',
    "You've done this before. You'll do it again.",
  ],
  front: [
    "Take your time. I'm not going anywhere.",
    'You know this. Deep down, you know this.',
    'Guessing first is also a strategy!',
    "I believe in you. And I'm very picky.",
    'Breathe. Think. Meow.',
  ],
  back: [
    'So? Were you right?',
    "Be honest with yourself. I won't tell.",
    'Either way, you looked. That counts.',
  ],
  again: [
    'No big deal! I fall off shelves all the time.',
    "Again isn't a setback, it's training.",
    'First tries rarely work. Ask my landings.',
    "Forgetting is human. Glad I'm a cat.",
  ],
  hard: [
    'Hard? And you still got it. Respect!',
    'These exact cards make you better.',
    "Phew! But you didn't give up.",
  ],
  good: [
    'MEOW! Nicely done!',
    'That landed. Keep going!',
    "I'm purring. That's my highest praise.",
  ],
  easy: [
    "You're a genius! *purrs*",
    "Too easy for you. I'm impressed.",
    'That was showing off. I like showing off.',
  ],
  done: [
    'Done! Nap time — you earned it.',
    'Session complete. Proud as a cat on a scratching post.',
    "That was strong. Let's continue tomorrow.",
  ],
  backup: [
    'Better safe than sorry. I bury my stuff too.',
    "Backing up is like a scratching post: you need it before it's too late.",
  ],
};

const PHRASES_ES: PhraseBank = {
  welcome: [
    '¡Miau! Qué bueno que estás aquí. ¡Lo lograremos!',
    '¡Hora de estudiar! Traje bocadillos.',
    'Arriba esos bigotes. ¡Vamos!',
    'Sin pánico. El pánico es para los perros.',
  ],
  import: [
    '¿Tarjetas nuevas? ¡Tráelas! Te ayudo a ordenarlas.',
    'CSV entra, conocimiento sale. Así de simple.',
    'Una vez me senté sobre la tecla Enter.',
  ],
  emptyDecks: [
    'Todavía no hay tarjetas... ¡pero igual creo en ti!',
    'Estante vacío, potencial lleno. ¡Sube algo!',
    'Sin tarjetas solo puedo dormir. Y ya soy experto en eso.',
  ],
  deckReady: [
    'Tus tarjetas te esperan. Yo también.',
    'Un mazo al día mantiene lejos el pánico del examen.',
    'Ya lo lograste antes. Lo lograrás de nuevo.',
  ],
  front: [
    'Piénsalo con calma. No me voy a ninguna parte.',
    'Tú sabes esto. En el fondo, lo sabes.',
    '¡Adivinar primero también es una estrategia!',
    'Creo en ti. Y soy muy exigente.',
    'Respira. Piensa. Miau.',
  ],
  back: [
    '¿Y bien? ¿Acertaste?',
    'Sé honesto contigo mismo. Yo no le cuento a nadie.',
    'De cualquier forma, lo intentaste. Eso cuenta.',
  ],
  again: [
    '¡No pasa nada! Yo también me caigo de las repisas.',
    'Otra vez no es un retroceso, es entrenamiento.',
    'Casi nunca sale bien a la primera. Pregúntale a mis aterrizajes.',
    'Olvidar es humano. Qué bueno que soy un gato.',
  ],
  hard: [
    '¿Difícil? Y aún así lo lograste. ¡Respeto!',
    'Justo estas tarjetas te hacen mejor.',
    '¡Uf! Pero no te rendiste.',
  ],
  good: [
    '¡MIAU! ¡Bien hecho!',
    'Eso quedó. ¡Sigue así!',
    'Estoy ronroneando. Es mi mayor elogio.',
  ],
  easy: [
    '¡Eres un genio! *ronroneo*',
    'Demasiado fácil para ti. Estoy impresionado.',
    'Eso fue presumir. Me gusta presumir.',
  ],
  done: [
    '¡Listo! Hora de la siesta, te la ganaste.',
    'Sesión completada. Orgulloso como gato en su rascador.',
    'Eso estuvo fuerte. Mañana seguimos.',
  ],
  backup: [
    'Mejor prevenir que lamentar. Yo también entierro mis cosas.',
    'Hacer copias de seguridad es como un rascador: lo necesitas antes de que sea tarde.',
  ],
};

const PHRASES_PT: PhraseBank = {
  welcome: [
    'Miau! Que bom que estás aqui. Vamos conseguir!',
    'Hora de estudar! Trouxe petiscos.',
    'Cabeça erguida, bigodes para fora. Vamos lá!',
    'Sem pânico. Pânico é para cães.',
  ],
  import: [
    'Cartões novos? Traz aí, eu ajudo a organizar.',
    'CSV entra, conhecimento sai. Simples assim.',
    'Já me sentei em cima da tecla Enter.',
  ],
  emptyDecks: [
    'Ainda sem cartões... mas eu acredito em ti!',
    'Estante vazia, potencial pleno. Carrega algo!',
    'Sem cartões só posso dormir. E já sou craque nisso.',
  ],
  deckReady: [
    'Os teus cartões estão à espera. Eu também.',
    'Um baralho por dia mantém o pânico do exame afastado.',
    'Já conseguiste antes. Vais conseguir de novo.',
  ],
  front: [
    'Pensa com calma. Eu não vou a lado nenhum.',
    'Tu sabes isto. No fundo, tu sabes.',
    'Arriscar um palpite também é uma estratégia!',
    'Eu acredito em ti. E sou bem exigente.',
    'Respira. Pensa. Miau.',
  ],
  back: [
    'E então? Acertaste?',
    'Sê honesto contigo mesmo. Eu não conto a ninguém.',
    'De qualquer forma, tu olhaste. Isso conta.',
  ],
  again: [
    'Sem problema! Eu também caio das estantes.',
    'De novo não é um retrocesso, é treino.',
    'Quase nunca acerta de primeira. Pergunta às minhas aterragens.',
    'Esquecer é humano. Que bom que sou gato.',
  ],
  hard: [
    'Difícil? E ainda assim conseguiste. Respeito!',
    'São essas cartas que te tornam melhor.',
    'Ufa! Mas não desististe.',
  ],
  good: [
    'MIAU! Muito bem feito!',
    'Isso encaixou. Continua assim!',
    'Estou a ronronar. É o meu maior elogio.',
  ],
  easy: [
    'És um génio! *ronrom*',
    'Fácil demais para ti. Estou impressionado.',
    'Isso foi armar-se. Gosto de armar-se.',
  ],
  done: [
    'Feito! Hora da soneca — bem merecida.',
    'Sessão concluída. Orgulhoso como gato em arranhador.',
    'Isso foi forte. Amanhã continuamos.',
  ],
  backup: [
    'Seguro é melhor que arrepender. Eu também escondo as minhas coisas.',
    'Fazer backup é como um arranhador: precisas antes de ser tarde demais.',
  ],
};

export const PHRASES_BY_LANG: Record<Lang, PhraseBank> = {
  de: PHRASES_DE,
  en: PHRASES_EN,
  es: PHRASES_ES,
  pt: PHRASES_PT,
};

interface ReadinessTier {
  min: number;
  cat: CatName;
  text: Record<Lang, string>;
}

const READINESS_TIERS: ReadinessTier[] = [
  {
    min: 90,
    cat: 'love',
    text: {
      de: 'Du bist klausurreif! Ich schnurr vor Stolz.',
      en: "You're exam-ready! I'm purring with pride.",
      es: '¡Estás listo para el examen! Ronroneo de orgullo.',
      pt: 'Estás pronto para o exame! Ronrono de orgulho.',
    },
  },
  {
    min: 70,
    cat: 'cool',
    text: {
      de: 'Sehr stark! Da kann die Klausur kommen.',
      en: 'Very strong! Bring on that exam.',
      es: '¡Muy fuerte! Que venga el examen.',
      pt: 'Muito forte! Que venha o exame.',
    },
  },
  {
    min: 45,
    cat: 'cheer',
    text: {
      de: 'Gute Basis! Dranbleiben, du packst das.',
      en: "Solid base! Keep at it, you've got this.",
      es: '¡Buena base! Sigue así, tú puedes.',
      pt: 'Boa base! Continua assim, tu consegues.',
    },
  },
  {
    min: 20,
    cat: 'support',
    text: {
      de: 'Wir sind auf dem Weg. Jede Karte zählt!',
      en: "We're on our way. Every card counts!",
      es: 'Vamos por buen camino. ¡Cada tarjeta cuenta!',
      pt: 'Estamos no caminho certo. Cada cartão conta!',
    },
  },
  {
    min: 0.0001,
    cat: 'think',
    text: {
      de: 'Aller Anfang ist zäh. Ich bleib bei dir.',
      en: "Every start is tough. I'm right here with you.",
      es: 'Todo comienzo es difícil. Estoy contigo.',
      pt: 'Todo começo é difícil. Eu fico contigo.',
    },
  },
];

const READINESS_ZERO: Record<Lang, string> = {
  de: 'Noch nix gelernt – perfekter Moment zum Starten!',
  en: 'Nothing learned yet — perfect moment to start!',
  es: 'Todavía no has estudiado nada — ¡el momento perfecto para empezar!',
  pt: 'Ainda não aprendeste nada — momento perfeito para começar!',
};

export function readinessComment(percent: number, lang: Lang): { text: string; cat: CatName } {
  for (const tier of READINESS_TIERS) {
    if (percent >= tier.min) return { text: tier.text[lang], cat: tier.cat };
  }
  return { text: READINESS_ZERO[lang], cat: 'wink' };
}
