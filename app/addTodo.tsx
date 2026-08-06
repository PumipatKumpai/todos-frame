import { useSQLiteContext } from "expo-sqlite";
import { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';

export default function AddTodo() {
  const db = useSQLiteContext();
  const [title, setTitle] = useState<string>('');
  const completed = 0; // Default value for completed

    const addTodo = async () => {
        try {
            await db.execAsync(`INSERT INTO todos (title, completed) VALUES (?, ?)`, [{title}, completed]);
            setTitle('');
            Alert.alert('Todo added successfully!');
        }
        catch (err) {
            Alert.alert(err.message);
            console.error(err.message);
        }
    };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter todo title"
        value={title}
        onChangeText={(text) => setTitle(text) }
      />
      <Button title="Add Todo" onPress={addTodo} />

    </View>
  );
}

const styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    input: {
        flex: 1,    
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
    }
}
