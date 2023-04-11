import React from 'react';
import { TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import { Card, Text } from 'react-native-paper';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';

export const Todo: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<Boolean>(false);

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
      <Pressable style={styles.button}>
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
  button: {
    borderColor: 'black',
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
    color: 'black',
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
});
