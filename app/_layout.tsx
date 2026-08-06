import { Stack } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';

export default function RootLayout() {
  return (
    <SQLiteProvider 
      databaseName="stdphones.db"
      onInit={async (db) => {
        await db.execAsync(`
       CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                completed INTEGER NOT NULL DEFAULT 0
        );
        PRAGMA journal_mode=WAL;
        `);
      }}
      options={{ useNewConnection: false}}
    >
      <Stack />
    </SQLiteProvider>
  );
}
