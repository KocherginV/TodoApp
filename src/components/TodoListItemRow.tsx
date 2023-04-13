import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ToDo } from '../types';
import { Card, Text } from 'react-native-paper';

type TodoListItemRowProps = {
  item: ToDo;
};

export const TodoListItemRow: React.FC<TodoListItemRowProps> = ({ item }) => {
  return (
    <Card style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.headerText}>{item.header}</Text>
        <Text style={styles.timestampText}>
          {item.timestamp.toDateString()}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    backgroundColor: '#222e40',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#ebedf0',
  },
  timestampText: {
    color: '#ebedf0',
    fontWeight: 'bold',
  },
});
