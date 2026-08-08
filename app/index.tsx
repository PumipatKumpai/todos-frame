import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from "react-native";
import AddTodo from "./addTodo";
import Card from "./components/card";

export default function Index() {
  const  db  = useSQLiteContext();
  const [todos, setTodos] = useState<Todo[]>([]);
  type Todo = {
    id: number;
    title: string;
    completed: Number;
  };

  const getTodos = async () => {
    try {
      const results = await db.getAllAsync<Todo>(`SELECT * from todos`);
      setTodos(results);
    }
    catch(err) {
      Alert.alert("Cannot Read Todos.");
    }
  }

  useEffect(()=>{
    getTodos();
  }, []);

  return (
    <View style={styles.container}>
      <AddTodo refresh={getTodos} />
      <FlatList style={styles.list}
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <Card todo={item} refresh={getTodos} />
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={{fontSize: 28, textAlign: 'center'}}>No todos found.</Text>
          </View>
        )}
      />  
    </View>
  );
}

const styles = {
  container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
  },
  list: {
    width: '95%',
  },
  empty: {
            margin: 10, 
            padding: 10,
            backgroundColor: '#DDD',
  }
}