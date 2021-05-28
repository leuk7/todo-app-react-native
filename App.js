import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  function handleAddTask(task) {
    if (!task || /^\s*$/.test(task)) {
      return;
    }
    // Will make the keyboard pop-up when cliked and disappear after use.
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask("");
  }

  function completeTask(index) {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <LinearGradient
      colors={[
        "rgba(48, 16, 255, 1)",
        
        "rgba(100, 115, 255, 1)",
       
      ]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.container}>
        {/* Today Task */}
        <View style={styles.taskWrapper}>
          <Text style={styles.sectionTitle}>
            Today's task
          </Text>

          <View style={styles.items}>
            {/* This where the tasks will go ! */}

            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}
                >
                  <Task key={index} text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {/* Write a task */}

        <KeyboardAvoidingView
          behavior={
            Platform.OS === "ios" ? "padding" : "height"
          }
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={"Write a task"}
            onChangeText={(text) => setTask(text)}
            value={task}
          />

          <TouchableOpacity
            onPress={() => handleAddTask(task)}
          >
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  linearGradient: {
    flex:1,
  },

  taskWrapper: {
    paddingTop: 88,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  addText: {},
});
