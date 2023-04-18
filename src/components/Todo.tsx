import React from 'react';
import {
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  Image,
  View,
} from 'react-native';
import { Card, Text } from 'react-native-paper';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { ToDo } from '../types';

type TodoProps = {
  onAdd: (todo: ToDo) => void;
};

const imgSrc = require('../assets/check.png');

export const Todo: React.FC<TodoProps> = ({ onAdd }) => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [todoText, setTodoText] = React.useState('');
  const [todoHeader, setTodoHeader] = React.useState('');
  const [showPicker, setShowPicker] = useState<Boolean>(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const handleAdd = React.useCallback(() => {
    const newTodo: ToDo = {
      header: todoHeader,
      text: todoText,
      timestamp: date,
    };
    onAdd(newTodo);
    setTodoHeader('');
    setTodoText('');
    setDate(new Date());
    setIsSubmitted(true);
  }, [date, onAdd, todoHeader, todoText]);

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date,
  ): void => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const togglePicker = (): void => {
    if (Platform.OS === 'ios') {
      setShowPicker(true);
    } else {
      setShowPicker(!showPicker);
    }
  };

  if (isSubmitted) {
    return (
      <View style={styles.todoContainer}>
        <Image source={imgSrc} style={styles.image} />
        <Pressable style={styles.button} onPress={() => setIsSubmitted(false)}>
          <Text style={styles.submitBtnText}>Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <Card style={styles.todoContainer} mode={'elevated'}>
      <TextInput
        style={styles.todoText}
        editable
        maxLength={42}
        placeholder="New todo header"
        value={todoHeader}
        onChangeText={setTodoHeader}
      />
      <TextInput
        style={styles.todoText}
        editable
        multiline
        numberOfLines={4}
        maxLength={100}
        placeholder="New todo text"
        value={todoText}
        onChangeText={setTodoText}
      />
      <Text style={styles.datePickerHeader}>When do you want to finish?</Text>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
          style={styles.datePicker}
        />
      )}
      {!showPicker && (
        <Pressable
          onPress={togglePicker}
          style={[styles.button, styles.finishBtn]}>
          <Text style={styles.submitBtnText}>Select Finish Date</Text>
        </Pressable>
      )}
      {Platform.OS === 'android' && (
        <Text
          style={
            styles.selectedDateText
          }>{`Selected Finish Date: ${date.toLocaleDateString()}`}</Text>
      )}
      <Pressable style={styles.button} onPress={handleAdd}>
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
    borderColor: '#222e40',
    borderWidth: 0.15,
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'white',
  },
  todoText: {
    borderColor: '#222e40',
    borderBottomWidth: 1,
    margin: 10,
    padding: 5,
  },
  datePickerHeader: {
    margin: 10,
    marginBottom: 3,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#222e40',
  },
  datePicker: {
    margin: 10,
    marginTop: 3,
    alignSelf: 'center',
  },
  button: {
    borderColor: '#222e40',
    borderRadius: 10,
    borderWidth: 0.3,
    padding: 10,
    width: 180,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#e9e5e5',
  },
  submitBtnText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#222e40',
  },
  selectedDateText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 3,
  },
  finishBtn: {
    marginTop: 10,
  },
  placeholderTextAndroid: {
    marginBottom: 0,
  },
  image: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    marginTop: 40,
  },
});
