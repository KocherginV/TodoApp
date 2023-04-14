import React from 'react';
import { ScrollView } from 'react-native';
import { useAppContext } from '../App.provider';
import { TodoListItemRow } from '../components/TodoListItemRow';

export const List: React.FC = () => {
  const appContext = useAppContext();
  return (
    <ScrollView>
      {appContext.todoList.map(item => (
        <TodoListItemRow item={item} key={item.timestamp.toISOString()} />
      ))}
    </ScrollView>
  );
};
