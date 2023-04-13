import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Todo } from '../components/Todo';
import { ToDo } from '../types';
import { TodoListItemRow } from '../components/TodoListItemRow';

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
        <TodoListItemRow item={item} key={item.timestamp.toISOString()} />
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
