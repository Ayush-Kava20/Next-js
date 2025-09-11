import sql from 'better-sqlite3';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

const db = new sql('messages.db');

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      image TEXT,
      text TEXT
    )`);
}

initDb();

export function addMessage(message) {
  // db.prepare('INSERT INTO messages (text) VALUES (?)').run(message);
  db.prepare('INSERT INTO messages (image, text) VALUES (?, ?)').run(message.image, message.text);
}

export const getMessages =  unstable_cache(cache(function getMessages() {
  console.log('Fetching messages from db');
  return db.prepare('SELECT * FROM messages').all();
}), ['messages'], {
  tags: ['msg']
})
