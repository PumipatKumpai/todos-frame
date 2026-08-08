import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';

export default function RootLayout() {
  const createTable = async (db: SQLiteDatabase) => {
    await db.execAsync(`
       CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                completed INTEGER NOT NULL DEFAULT 0
        );`);
      }
  return (
    <SQLiteProvider 
        databaseName="stdphones.db"
        onInit={createTable}
        options={{ useNewConnection: false}}>
      <Stack screenOptions={{
        headerStyle: {backgroundColor: '#6AF'},
        headerTintColor: 'white'
      }}>
        <Stack.Screen name="index" 
            options={{ title: 'Mobile App Todos List' }} />
      </Stack>
    </SQLiteProvider>
  );
}
