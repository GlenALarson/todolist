import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoList from './components/TodoList';
import AddTask from './components/AddTask';
import Constants from 'expo-constants'

const STORAGE_KEY = '@todo_list';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.log('Failed to load tasks.', error);
    }
  };

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.log('Failed to save tasks.', error);
    }
  };

  const addTask = (task) => {
    const newTasks = [...tasks, { id: Date.now(), text: task, done: false }];
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const toggleTask = (id) => {
    const newTasks = tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <AddTask onAddTask={addTask} />
      <TodoList tasks={tasks} onToggleTask={toggleTask} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default App;
