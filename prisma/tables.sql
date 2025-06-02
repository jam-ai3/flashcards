-- main

CREATE TABLE IF NOT EXISTS User (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now')),
  isAdmin INTEGER DEFAULT 0,
  freeTrialStart TEXT
);

CREATE TABLE IF NOT EXISTS School (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Course (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  schoolId TEXT NOT NULL,
  FOREIGN KEY (schoolId) REFERENCES School(id)
);

CREATE TABLE IF NOT EXISTS ResetPassword (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  code TEXT NOT NULL UNIQUE,
  validUntil TEXT NOT NULL,
  userId TEXT NOT NULL UNIQUE,
  FOREIGN KEY (userId) REFERENCES User(id)
);

-- sales

CREATE TABLE IF NOT EXISTS Sale (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  productId TEXT NOT NULL,
  userId TEXT NOT NULL,
  pricePaidInPennies INTEGER NOT NULL,
  createdAt TEXT DEFAULT (datetime('now')),
  couponCode TEXT,
  FOREIGN KEY(userId) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS Subscription (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  createdAt TEXT DEFAULT (datetime('now')),
  expiresAt TEXT,
  type TEXT,
  isActive INTEGER DEFAULT 1,
  stripeId TEXT UNIQUE,
  userId TEXT NOT NULL,
  FOREIGN KEY(userId) REFERENCES User(id)
);

-- cards

CREATE TABLE IF NOT EXISTS FlashcardDeck (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  userId TEXT NOT NULL,
  courseId TEXT,
  logId TEXT NOT NULL UNIQUE,
  FOREIGN KEY(userId) REFERENCES User(id),
  FOREIGN KEY(courseId) REFERENCES Course(id),
  FOREIGN KEY(logId) REFERENCES CreationLog(id)
);

CREATE TABLE IF NOT EXISTS Flashcard (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  type TEXT NOT NULL,
  deckId TEXT NOT NULL,
  FOREIGN KEY(deckId) REFERENCES FlashcardDeck(id)
);

CREATE TABLE IF NOT EXISTS CreationLog (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  prompt TEXT NOT NULL,
  error TEXT,
  paymentType TEXT NOT NULL,
  inputType TEXT NOT NULL,
  inputFormat TEXT NOT NULL,
  userId TEXT NOT NULL,
  FOREIGN KEY(userId) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS Media (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  data BLOB NOT NULL,
  extension TEXT NOT NULL,
  flashcardId TEXT NOT NULL,
  FOREIGN KEY(flashcardId) REFERENCES Flashcard(id)
);

-- feedback

CREATE TABLE IF NOT EXISTS Review (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  rating INTEGER NOT NULL,
  message TEXT NOT NULL,
  createdAt TEXT DEFAULT (datetime('now')),
  userId TEXT NOT NULL,
  FOREIGN KEY(userId) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS Message (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS DeleteResponse (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT NOT NULL,
  questionOne TEXT NOT NULL,
  message TEXT NOT NULL
);