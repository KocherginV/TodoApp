import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Todo } from '../components/Todo';

export const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Todo />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
