import { useSQLiteContext } from "expo-sqlite";
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddTodo(props) {
  const [title, setTitle] = useState('');

  const db = useSQLiteContext();

    const addTodo = async () => {
        const trimmedTitle = title.trim();
        if (!trimmedTitle) {
            Alert.alert('Please enter a todo title.');
            return;
        }

        try {
            let query = "INSERT INTO todos (title, completed) VALUES (?, ?);";
            await db.runAsync(query, [title, 0]);
            setTitle('');
            props.refresh();
        }
        catch (err) {
            Alert.alert(err.message);
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
      <TouchableOpacity onPress={addTodo}>
        <Text style={styles.button}>New Todo</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    input: {
        flex: 1,    
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    button: {
      backgroundColor: 'green',
      color: 'white',
      padding: 10,
      borderRadius: 5,
    }
}
