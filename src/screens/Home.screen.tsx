import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Todo } from '../components/Todo';
import { useAppContext } from '../App.provider';

export const Home: React.FC = () => {
  const appContext = useAppContext();

  return (
    <View style={styles.container}>
      <Todo onAdd={appContext.handleAddTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
