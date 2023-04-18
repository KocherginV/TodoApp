import React from 'react';
import { ToDo } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  React.useEffect(() => {
    const loadTodoList = async () => {
      try {
        const storedTodoList = await AsyncStorage.getItem('todoList');
        if (storedTodoList !== null) {
          setTodoList(JSON.parse(storedTodoList));
        }
      } catch (error) {
        console.error('Failed to load from storage', error);
      }
    };
    loadTodoList();
  }, []);

  const handleAddTodo = React.useCallback(
    (newTodo: ToDo) => {
      setTodoList(prevTodoList => [...prevTodoList, newTodo]);
    },
    [setTodoList],
  );

  React.useEffect(() => {
    const saveTodoList = async () => {
      try {
        await AsyncStorage.setItem('todoList', JSON.stringify(todoList));
      } catch (error) {
        console.error('Failed to save todo list to storage: ', error);
      }
    };
    saveTodoList();
  }, [todoList]);

  return (
    <AppContext.Provider value={{ todoList, handleAddTodo }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
