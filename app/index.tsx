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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AddTodo refresh={getTodos} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card todo={item} refresh={getTodos} />
        )}
        ListEmptyComponent={() => (
          <View style={{ 
            padding: 10,
            fontSize: 28,
          }}>
            <Text>No todos found.</Text>
          </View>
        )}
      />  
    </View>
  );
}
