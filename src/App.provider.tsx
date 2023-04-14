import React from 'react';
import { ToDo } from './types';

type AppContextType = {
  todoList: ToDo[];
  handleAddTodo: (todo: ToDo) => void;
};

const defaultValue = {
  todoList: [],
  handleAddTodo: () => {},
};

const AppContext = React.createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC = ({ children }) => {
  const [todoList, setTodoList] = React.useState<ToDo[]>([]);
  const handleAddTodo = React.useCallback(
    (newTodo: ToDo) => {
      setTodoList(prevTodoList => [...prevTodoList, newTodo]);
    },
    [setTodoList],
  );

  return (
    <AppContext.Provider value={{ todoList, handleAddTodo }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
