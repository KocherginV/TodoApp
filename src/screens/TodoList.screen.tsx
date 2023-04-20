import React from 'react';
import { ScrollView } from 'react-native';
import { useAppContext } from '../App.provider';
import { TodoListItemRow } from '../components/TodoListItemRow';

export const List: React.FC = () => {
  const appContext = useAppContext();
  return (
    <ScrollView>
      {appContext.todoList.length > 0 &&
        appContext.todoList
          .slice()
          .reverse()
          .map(item => (
            <TodoListItemRow
              item={item}
              key={new Date(item.timestamp).toISOString()}
            />
          ))}
    </ScrollView>
  );
};
