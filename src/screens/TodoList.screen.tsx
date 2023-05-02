import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useAppContext } from '../App.provider';
import { TodoListItemRow } from '../components/TodoListItemRow';

const Overlay = () => <View style={styles.overlay} />;
export const List: React.FC = () => {
  const appContext = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalVisible = (visible: boolean) => {
    setModalVisible(visible);
  };
  return (
    <ScrollView>
      {appContext.todoList.length > 0 &&
        appContext.todoList
          .slice()
          .reverse()
          .map(item => (
            <TodoListItemRow
              item={item}
              key={new Date(item.timestamp).toISOString()}
              handleModalVisible={handleModalVisible}
            />
          ))}
      {modalVisible && <Overlay />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});
