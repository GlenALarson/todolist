import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import TodoItem from './TodoItem';

const TodoList = ({ tasks, onToggleTask }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TodoItem task={item} onToggleTask={onToggleTask} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TodoList;
