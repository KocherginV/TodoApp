import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export const Todo: React.FC = () => {
  return (
    <View style={styles.todoContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
  },
  todoText: {
    borderColor: 'black',
    borderBottomWidth: 1,
    margin: 10,
    padding: 5,
  },
});
