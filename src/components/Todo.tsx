import React from 'react';
import { TextInput, StyleSheet, Pressable } from 'react-native';
import { Card, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

export const Todo: React.FC = () => {
  const [date, setDate] = useState(new Date());
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
      <Text style={styles.datePickerHeader}>When do you want to finish?</Text>
      <DateTimePicker value={date} style={styles.datePicker} />
      <Pressable style={styles.submitBtn}>
        <Text style={styles.submitBtnText}>Submit</Text>
      </Pressable>
    </Card>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    minHeight: 270,
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
  datePickerHeader: {
    margin: 10,
    marginBottom: 3,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  datePicker: {
    margin: 10,
    marginTop: 3,
    alignSelf: 'center',
  },
  submitBtn: {
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 0.3,
    padding: 10,
    width: 180,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: '#e9e5e5',
  },
  submitBtnText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
});
