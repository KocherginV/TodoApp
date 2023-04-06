import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

export const Todo: React.FC = () => {
  return (
    <Card style={styles.todoContainer} mode={'elevated'}>
      <TextInput
        style={styles.todoText}
        editable
        maxLength={42}
        placeholder="New todo header"
      />
      <TextInput
        style={styles.todoText}
        editable
        multiline
        numberOfLines={4}
        maxLength={100}
        placeholder="New todo text"
      />
      <Text>Datepicker</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    height: 250,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'black',
    borderWidth: 0.15,
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'white',
  },
  todoText: {
    borderColor: 'black',
    borderBottomWidth: 1,
    margin: 10,
    padding: 5,
  },
});
