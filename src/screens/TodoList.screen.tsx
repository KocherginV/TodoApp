import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useAppContext } from '../App.provider';
import { TodoListItemRow } from '../components/TodoListItemRow';
import { FlashList } from '@shopify/flash-list';

const Overlay = () => <View style={styles.overlay} />;
export const List: React.FC = () => {
  const appContext = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalVisible = (visible: boolean) => {
    setModalVisible(visible);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlashList
        data={appContext.todoList.slice().reverse()}
        renderItem={({ item }) => (
          <TodoListItemRow
            item={item}
            handleModalVisible={handleModalVisible}
          />
        )}
        keyExtractor={item => {
          return item.timestamp.toString();
        }}
        estimatedItemSize={82}
      />
      {modalVisible && <Overlay />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});
