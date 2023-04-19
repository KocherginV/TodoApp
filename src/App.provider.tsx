import React from 'react';
import { ToDo } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

type AppContextType = {
  todoList: ToDo[];
  handleAddTodo: (todo: ToDo) => void;
  handleDeleteTodo: (timestamp: Date) => void;
};

const defaultValue = {
  todoList: [],
  handleAddTodo: () => {},
  handleDeleteTodo: () => {},
};

const AppContext = React.createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC = ({ children }) => {
  const [todoList, setTodoList] = React.useState<ToDo[]>([]);
  const getItemsFromStorage = async () => {
    try {
      const storedTodoList = await AsyncStorage.getItem('todoList');
      if (storedTodoList !== null) {
        setTodoList(JSON.parse(storedTodoList));
      }
    } catch (error) {
      console.error('Failed to load from storage', error);
    }
  };

  const setItemsToStorage = async (list: ToDo[]) => {
    try {
      await AsyncStorage.setItem('todoList', JSON.stringify(list));
    } catch (error) {
      console.error('Failed to save todo list to storage: ', error);
    }
  };

  React.useEffect(() => {
    const loadTodoList = getItemsFromStorage;
    loadTodoList();
  }, []);

  const handleAddTodo = React.useCallback(
    (newTodo: ToDo) => {
      setTodoList(prevTodoList => [...prevTodoList, newTodo]);
    },
    [setTodoList],
  );

  const handleDeleteTodo = React.useCallback(
    (timestamp: Date) => {
      Alert.alert(
        'Delete ToDo',
        'Delete this Todo?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              setTodoList(prevTodoList => {
                const updatedTodoList = prevTodoList.filter(
                  todo => todo.timestamp !== timestamp,
                );
                setItemsToStorage(updatedTodoList);
                return updatedTodoList;
              });
            },
          },
        ],
        { cancelable: true },
      );
    },
    [setTodoList],
  );

  React.useEffect(() => {
    const saveTodoList = setItemsToStorage;
    saveTodoList(todoList);
  });

  return (
    <AppContext.Provider value={{ todoList, handleAddTodo, handleDeleteTodo }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
