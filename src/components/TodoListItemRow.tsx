import React, { useRef } from 'react';
import { StyleSheet, View, Pressable, LayoutAnimation } from 'react-native';
import { ToDo } from '../types';
import { Card, Text } from 'react-native-paper';
import { useAppContext } from '../App.provider';
import { Swipeable } from 'react-native-gesture-handler';

type TodoListItemRowProps = {
  item: ToDo;
};
const springAnimation = {
  duration: 1400,
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.4,
  },
};

export const TodoListItemRow: React.FC<TodoListItemRowProps> = ({ item }) => {
  const appContext = useAppContext();
  const handlePress = React.useCallback(() => {
    LayoutAnimation.configureNext(springAnimation);
    appContext.handleDeleteTodo(item.timestamp);
  }, [appContext, item]);
  const swipeableRef = useRef<Swipeable | null>(null);
  const handleSwipeableRightOpen = React.useCallback(() => {
    swipeableRef?.current?.close();
    handlePress();
  }, [handlePress]);

  return (
    <Swipeable
      ref={swipeable => (swipeableRef.current = swipeable)}
      friction={2}
      rightThreshold={80}
      renderRightActions={() => <View style={styles.deleteBackground} />}
      onSwipeableWillOpen={handleSwipeableRightOpen}>
      <Card style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.headerText}>{item.header}</Text>
          <Text style={styles.timestampText}>
            {new Date(item.timestamp).toDateString()}
          </Text>
          <Pressable hitSlop={16} onPress={handlePress}>
            <Text style={styles.headerText}>Delete</Text>
          </Pressable>
        </View>
      </Card>
    </Swipeable>
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
  deleteBackground: {
    backgroundColor: '#e40c0c',
    width: 200,
    height: 57,
    alignSelf: 'center',
    marginRight: 20,
    borderRadius: 12,
  },
});
