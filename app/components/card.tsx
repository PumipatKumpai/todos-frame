import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSQLiteContext } from "expo-sqlite";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Card(props) {
  const todo = props.todo;  // Copy (shorten) todo property object
  const db = useSQLiteContext();
  const setCompleted = async () => {
    let markComplete = (todo.completed+1) % 2; // Toggle todo.completed
    try {
      await db.runAsync("UPDATE todos SET completed = ? WHERE id = ?", 
                  [markComplete, todo.id]);
      props.refresh();
    }
    catch (err: any) {
      Alert.alert(err.message);
    }
  }

  const removeTodo = async () => {
    Alert.alert(
      "Are you sure?", // Title
      'Do you really want to delete "' + todo.title + '"?', // Message
      [
        {
          text: "Cancel",
          //onPress: () => console.log("Cancel Pressed"),
          //style: "cancel" // Applies default cancel styling (iOS only)
        },
        { 
          text: "Delete", 
          onPress: async () => {
              try {
                await db.runAsync("DELETE From todos WHERE id =?", [todo.id]);
                props.refresh();
              }
              catch(err: any) {
                Alert.alert(err.message);
              }
          },
          //style: "destructive" // Applies red text styling (iOS only)
        }
      ],
      { cancelable: true } // Allows closing the popup by tapping outside (Android only)
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: todo.completed?'#BBB':'#47F'}]} key={todo.id}>
      <View>
        <Text style={styles.text}>{todo.title}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', 
                alignItems: 'center'}}>
        <TouchableOpacity onPress={()=>setCompleted()}
              style={{backgroundColor: 'red', borderRadius: 5,}}>
            <Text
              style={{fontWeight: 'bold', color: 'white', textAlign: 'center',}}>
                  {todo.completed ? <Text style={styles.done}> Done </Text> 
                                  : <Text style={styles.todo}> To Do </Text>}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={removeTodo}>
          <FontAwesome name="trash" size={24} color='#F88'
            style={{marginLeft: 20}} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: "center",
    justifyContent:"space-between",
    padding: 10,
    marginVertical: 2,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  todo: {
    backgroundColor: 'green',
    color: 'white',
  },
  done: {
    backgroundColor: 'grey',
    color: 'white',
  }
});