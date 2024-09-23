import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const TodoItem = ({ task, onToggleTask }) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onToggleTask(task.id)}
    >
      <Text style={[styles.text, task.done && styles.done]}>
        {task.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    fontSize: 18,
  },
  done: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});

export default TodoItem;
