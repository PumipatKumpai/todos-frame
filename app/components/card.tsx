import { useSQLiteContext } from "expo-sqlite";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Card(props) {
    const id = props.todo.id;
  const db = useSQLiteContext();
    const setCompleted = async () => {
        try {
            await db.runAsync("UPDATE todos SET completed = 1 WHERE id = ?", [id]);
            props.refresh();
        }
        catch (err) {
            Alert.alert(err.message);
        }
    }


        return (
        <View style={styles.container} key={props.todo.id}>
          <View style={styles.text}>
            <Text style={styles.text}>{props.todo.title}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <TouchableOpacity onPress={()=>setCompleted()}
               style={{backgroundColor: 'red', borderRadius: 5,}}>
                <Text
                  style={{fontWeight: 'bold', color: 'white', textAlign: 'center',}}>
                    {props.todo.completed ? 'Completed' : 'Mark Completed'}
                </Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent:"space-between",
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: '#47F',
  },
  list: {
    backgroundColor: '#47F',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderColor: 'red',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  }
});