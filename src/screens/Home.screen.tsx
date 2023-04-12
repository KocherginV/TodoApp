import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Todo } from '../components/Todo';
import { ToDo } from '../types';

export const Home: React.FC = () => {
  const [todoList, setTodoList] = React.useState<ToDo[]>([]);
  const handleAddTodo = React.useCallback(
    (newTodo: ToDo) => {
      setTodoList(prevTodoList => [...prevTodoList, newTodo]);
    },
    [setTodoList],
  );

  return (
    <View style={styles.container}>
      <Todo onAdd={handleAddTodo} />
      {todoList.map(item => (
        <Text key={item.timestamp.toISOString()}>
          {item.header} {item.text} {item.timestamp.toDateString()}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
